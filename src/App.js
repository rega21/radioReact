import React, { useState, useEffect } from 'react';
import './App.css';
import RadioPlayer from './components/RadioPlayer';
import RadioRetro from './components/RadioRetro';

const STATIONS = [
  { name: "Piano Jazz", url: "https://streamingv2.shoutcast.com/RadioArt-PianoJazz", category: "jazz" },
  { name: "Swiss Jazz", url: "https://stream.srg-ssr.ch/m/rsj/aacp_96", category: "jazz" },
  { name: "BBC World", url: "https://stream.live.vc.bbcmedia.co.uk/bbc_world_service", category: "noticias" },
  { name: "Paradise", url: "https://stream.radioparadise.com/aac-320", category: "rock" },
  { name: "Swiss Pop", url: "https://stream.srg-ssr.ch/m/rsp/aacp_96", category: "pop" },
  { name: "The Beat", url: "http://listen.181fm.com/181-beat_128k.mp3", category: "rap" },
  { name: "HipHop", url: "http://listen.181fm.com/181-oldschool_128k.mp3", category: "retro" },
  { name: "The Eagle", url: "http://listen.181fm.com/181-eagle_128k.mp3", category: "rock" },
  { name: "Energy 98", url: "http://listen.181fm.com/181-energy98_128k.mp3", category: "dance" },
  { name: "Classical", url: "http://listen.181fm.com/181-classical_128k.mp3", category: "classical" },
  { name: "Rock & Indie", url: "https://streamingv2.shoutcast.com/RadioArt-RockandIndie", category: "rock" },
];

function App() {
  const [currentStation, setCurrentStation] = useState(STATIONS[0]);
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(false);

  // Adelantar y retroceder estaciones
  const handlePrev = () => {
    const idx = STATIONS.findIndex(st => st.url === currentStation.url);
    if (idx > 0) {
      setCurrentStation(STATIONS[idx - 1]);
      setError(false);
    }
  };

  const handleNext = () => {
    const idx = STATIONS.findIndex(st => st.url === currentStation.url);
    if (idx < STATIONS.length - 1) {
      setCurrentStation(STATIONS[idx + 1]);
      setError(false);
    }
  };

  useEffect(() => {
    setIsPlaying(true);
  }, [currentStation]);

  return (
    <div className="App">
      
      <RadioPlayer
        streamUrl={currentStation.url}
        stations={STATIONS}
        currentStation={currentStation}
        setCurrentStation={setCurrentStation}
        volume={volume}
        setVolume={setVolume}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        error={error}
      />
      <RadioRetro
        stations={STATIONS}
        currentStation={currentStation}
        setCurrentStation={setCurrentStation}
        setError={setError}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
}

export default App;
