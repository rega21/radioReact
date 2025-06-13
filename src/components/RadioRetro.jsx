import React from "react";
import DialRetro from "./DialRetro";
import "./RadioRetro.css";

export default function RadioRetro({ stations, currentStation, setCurrentStation }) {
  const currentIdx = stations.findIndex(st => st.url === currentStation.url) + 1;

  return (
    <div className="radio-container">
      <img className="radio-bg" src="ruta/a/tu/imagen.jpg" alt="" />
      <DialRetro
        current={currentIdx}
        total={stations.length}
        onChange={idx => {
          if (idx >= 1 && idx <= stations.length) {
            setCurrentStation(stations[idx - 1]);
            // Quita el foco de cualquier botón activo
            if (document.activeElement) {
              document.activeElement.blur();
            }
          }
        }}
      />
      
    </div>
  );
}