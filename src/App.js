import React, { useState, useEffect } from 'react';
import './App.css';
import RadioPlayer from './components/RadioPlayer';
import RadioRetro from "./components/RadioRetro";

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

  // Activa play automáticamente al cambiar de estación
  useEffect(() => {
    setIsPlaying(true);
  }, [currentStation]);

  return (
    <div className="App">
      <img
        src="https://img.icons8.com/ios-filled/50/eebbc3/radio.png"
        alt="Radio"
        style={{ width: 48, marginBottom: 12, visibility: 'hidden' }}
      />
      <h1>{}</h1>

      <div style={{ marginTop: 32 }}>
        <RadioPlayer
          streamUrl={currentStation.url}
          stations={STATIONS}
          currentStation={currentStation}
          setCurrentStation={setCurrentStation}
          volume={volume}
          setVolume={setVolume}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
      </div>
      <RadioRetro
        stations={STATIONS}
        currentStation={currentStation}
        setCurrentStation={setCurrentStation}
      />
    </div>
  );
}

export default App;
