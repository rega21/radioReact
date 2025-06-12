import React, { useState } from 'react';
import './App.css';
import RadioPlayer from './components/RadioPlayer';
import DialRetro from './components/DialRetro';

const STATIONS = [
  { name: "Art Piano Jazz", url: "https://streamingv2.shoutcast.com/RadioArt-PianoJazz", category: "jazz" },
  { name: "Swiss Jazz", url: "https://stream.srg-ssr.ch/m/rsj/aacp_96", category: "jazz" },
  { name: "BBC World Service", url: "https://stream.live.vc.bbcmedia.co.uk/bbc_world_service", category: "noticias" },
  { name: "Radio Paradise", url: "https://stream.radioparadise.com/aac-320", category: "rock" },
  { name: "Swiss Pop", url: "https://stream.srg-ssr.ch/m/rsp/aacp_96", category: "pop" },
  { name: "181.FM The Beat", url: "http://listen.181fm.com/181-beat_128k.mp3", category: "rap" },
  { name: "181.FM Old School HipHop", url: "http://listen.181fm.com/181-oldschool_128k.mp3", category: "retro" },
  { name: "181.FM The Eagle (Classic Rock)", url: "http://listen.181fm.com/181-eagle_128k.mp3", category: "rock" },
  { name: "181.FM Energy 98", url: "http://listen.181fm.com/181-energy98_128k.mp3", category: "dance" },
  { name: "181.FM Classical", url: "http://listen.181fm.com/181-classical_128k.mp3", category: "classical" },
  { name: "Art - Rock & Indie", url: "https://streamingv2.shoutcast.com/RadioArt-RockandIndie", category: "rock" },
];

function App() {
  const [currentStation, setCurrentStation] = useState(STATIONS[0]);
  const [volume, setVolume] = useState(1);
  const currentIdx = STATIONS.findIndex(st => st.url === currentStation.url) + 1;

  return (
    <div className="App">
      <img
        src="https://img.icons8.com/ios-filled/50/eebbc3/radio.png"
        alt="Radio"
        style={{ width: 48, marginBottom: 12, visibility: 'hidden' }}
      />
      <h1>{currentStation.name}</h1>

      <DialRetro
        current={currentIdx}
        total={STATIONS.length}
        onChange={idx => setCurrentStation(STATIONS[idx - 1])}
       
      />
      <div style={{ marginTop: 32 }}>
        <RadioPlayer
          streamUrl={currentStation.url}
          stations={STATIONS}
          currentStation={currentStation}
          setCurrentStation={setCurrentStation}
          volume={volume}
          setVolume={setVolume}
        />
      </div>
    </div>
  );
}

export default App;
