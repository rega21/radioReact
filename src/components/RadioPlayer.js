import React, { useRef, useEffect, useState } from 'react';

function RadioPlayer({ streamUrl, stations, currentStation, setCurrentStation }) {
  const audioRef = useRef(null);
  const errorAudioRef = useRef(null);
  const [error, setError] = useState(false);
  const [volume, setVolume] = useState(1);
  const [timeoutId, setTimeoutId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOn, setIsOn] = useState(false);

  useEffect(() => {
    setError(false);
    setLoading(true);
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    if (audioRef.current && isOn) {
      audioRef.current.load();
      audioRef.current.volume = volume;
      audioRef.current.play().catch(() => {
        handleError();
      });
    }
    // eslint-disable-next-line
  }, [streamUrl, isOn]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
    if (errorAudioRef.current) {
      errorAudioRef.current.volume = volume;
    }
  }, [volume]);

  // Cuando cambia el estado de error, reproduce el sonido
  useEffect(() => {
    if (isOn && error && errorAudioRef.current) {
      errorAudioRef.current.currentTime = 0;
      errorAudioRef.current.play();
    } else if (errorAudioRef.current) {
      errorAudioRef.current.pause();
      errorAudioRef.current.currentTime = 0;
    }
  }, [error, isOn]);

  // Apaga todo si la radio está OFF
  useEffect(() => {
    if (!isOn) {
      handlePause();
    }
  }, [isOn]);

  const handlePlay = () => {
    if (!isOn) return;
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        handleError();
      });
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    if (errorAudioRef.current) {
      errorAudioRef.current.pause();
      errorAudioRef.current.currentTime = 0;
    }
    setLoading(false);
  };

  const handlePrev = () => {
    if (!isOn) return;
    const idx = stations.findIndex(st => st.url === currentStation.url);
    if (idx > 0) {
      setCurrentStation(stations[idx - 1]);
    }
  };

  const handleNext = () => {
    if (!isOn) return;
    const idx = stations.findIndex(st => st.url === currentStation.url);
    if (idx < stations.length - 1) {
      setCurrentStation(stations[idx + 1]);
    }
  };

  const handleAudioError = () => {
    handleError();
  };

  const handleCanPlay = () => setLoading(false);

  const handleError = () => {
    setError(true);
    // Espera 3 segundos y cambia automáticamente
    const id = setTimeout(() => {
      handleNext();
    }, 3000);
    setTimeoutId(id);
  };

  return (
    <div className="radio-player-container">
      <audio
        ref={audioRef}
        src={streamUrl}
        onError={handleAudioError}
        onCanPlay={handleCanPlay}
      />
      <audio
        ref={errorAudioRef}
        src="/static.mp3"
        preload="auto"
        loop
      />
      <div className="radio-buttons-row">
        <button
          aria-label="ON"
          className={isOn ? "on-btn active" : "on-btn"}
          onClick={() => setIsOn(true)}
        >
          ON
        </button>
        <button
          aria-label="OFF"
          className={!isOn ? "off-btn active" : "off-btn"}
          onClick={() => setIsOn(false)}
        >
          OFF
        </button>
        <button aria-label="OFF" onClick={handlePause}></button>
        <button aria-label="Prev" onClick={handlePrev}>◀</button>
        <button aria-label="Play" onClick={handlePlay}>▶</button>
        <button aria-label="Stop" onClick={handlePause}>■</button>
        <button aria-label="Next" onClick={handleNext}>▶▶</button>
      </div>
      <div style={{ marginTop: 16 }}>
        <label style={{ color: "#eebbc3", fontWeight: "bold" }}>
          Volumen&nbsp;
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={e => setVolume(Number(e.target.value))}
            style={{ verticalAlign: "middle" }}
          />
        </label>
      </div>
      {loading && !error && (
        <div className="radio-loader" title="Cargando..."></div>
      )}
    </div>
  );
}

export default RadioPlayer;