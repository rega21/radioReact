import React, { useRef } from "react";
import DialRetro from "./DialRetro";
import "./RadioRetro.css";

export default function RadioRetro({
  stations,
  currentStation,
  setCurrentStation,
  setError
}) {
  const errorAudioRef = useRef(null);

  return (
    <div className="radio-container">
      <img className="radio-bg" src="ruta/a/tu/imagen.jpg" alt="" />
      <DialRetro
        current={stations.findIndex(st => st.url === currentStation.url) + 1}
        total={stations.length}
        onTune={idx => {
          setCurrentStation(stations[idx - 1]);
          setError(false);
        }}
        onStatic={() => setError(true)}
      />
      <audio
        ref={errorAudioRef}
        src="/static.mp3"
        preload="auto"
        loop
      />
    </div>
  );
}