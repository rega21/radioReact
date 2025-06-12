import React, { useRef, useEffect, useState } from 'react';

function RadioPlayer({ streamUrl, stations, currentStation, setCurrentStation }) {
  const audioRef = useRef(null);
  const [error, setError] = useState(false);
  const [volume, setVolume] = useState(1);
  const [timeoutId, setTimeoutId] = useState(null);
  const [countdown, setCountdown] = useState(3);
  const [loading, setLoading] = useState(true);
  const [activeBtn, setActiveBtn] = useState(null); // 'play', 'pause', 'next'

  useEffect(() => {
    setError(false);
    setCountdown(3);
    setLoading(true);
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.volume = volume;
      audioRef.current.play().catch(() => {
        handleError();
      });
    }
    // eslint-disable-next-line
  }, [streamUrl]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Maneja el contador regresivo cuando hay error
  useEffect(() => {
    let intervalId;
    if (error) {
      setCountdown(3);
      intervalId = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(intervalId);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setCountdown(3);
    }
    return () => clearInterval(intervalId);
  }, [error]);

  const handlePlay = () => {
    audioRef.current.play().catch(() => {
      handleError();
    });
    setActiveBtn('play');
  };

  const handlePause = () => {
    audioRef.current.pause();
    setActiveBtn('pause');
  };

  const handleAudioError = () => {
    handleError();
  };

  const handleCanPlay = () => setLoading(false);

  const handleError = () => {
    setError(true);
    setCountdown(3);
    // Espera 3 segundos y cambia automáticamente
    const id = setTimeout(() => {
      skipToNext();
    }, 3000);
    setTimeoutId(id);
  };

  // Función para saltar a la siguiente emisora
  const skipToNext = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    const idx = stations.findIndex(st => st.url === currentStation.url);
    if (idx !== -1) {
      const nextIdx = (idx + 1) % stations.length; // Loop
      setCurrentStation(stations[nextIdx]);
      setActiveBtn('next');
    }
  };

  return (
    <div className="radio-player-container">
      <audio
        ref={audioRef}
        src={streamUrl}
        onError={handleAudioError}
        onCanPlay={handleCanPlay}
      />
      <div className="radio-player-controls">
        <button
          className={`radio-btn${activeBtn === 'play' ? ' active' : ''}`}
          onClick={() => {
            handlePlay();
            setActiveBtn('play');
            setTimeout(() => setActiveBtn(null), 500);
          }}
          aria-label="Reproducir"
        >
          ▶ Play
        </button>
        <button
          className={`radio-btn pause${activeBtn === 'pause' ? ' active' : ''}`}
          onClick={() => { handlePause(); setActiveBtn('pause'); }}
          aria-label="Pausar"
        >
          ■ Pause
        </button>
        <button
          className={`radio-btn${activeBtn === 'next' ? ' active' : ''}`}
          style={{ marginLeft: 8 }}
          onClick={() => { skipToNext(); setActiveBtn('next'); }}
          disabled={stations.length <= 1}
          title="Siguiente emisora"
          aria-label="Siguiente emisora"
        >
          Next ▶
        </button>
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
      {error && (
        <div className="radio-player-error">
          Problemas de señal, cambiando automáticamente en {countdown} segundos...
        </div>
      )}
      {loading && !error && (
        <div className="radio-loader" title="Cargando..."></div>
      )}
    </div>
  );
}

export default RadioPlayer;