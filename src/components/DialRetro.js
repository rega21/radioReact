import React, { useRef, useState } from "react";
import './DialRetro.css';

const TICKS = 14;

export default function DialRetro({ current, total, onChange, stationName }) {
  const dialRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  // Calcula la posición horizontal de la aguja (0% a 100%)
  const percent = (current - 1) / (TICKS - 1); // 7 porque hay 8 emisoras
  const needleLeft = `calc(${percent * 100}% + 32px)`; // 32px = left de .dial-scale

  // Mouse/touch drag handlers
  const handleMouseDown = (e) => {
    setDragging(true);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    const rect = dialRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - 32; // 32px = left padding
    const scaleWidth = rect.width - 64; // 32px left + 32px right
    let percent = x / scaleWidth;
    percent = Math.max(0, Math.min(1, percent));
    const station = Math.round(percent * (TICKS - 1)) + 1;
    if (station !== current) onChange(station);
  };

  const handleMouseUp = () => {
    setDragging(false);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="dial-retro" ref={dialRef}>
      <div
        className="dial-scale"
        onClick={e => {
          const rect = dialRef.current.getBoundingClientRect();
          const x = e.clientX - rect.left - 32;
          const scaleWidth = rect.width - 64;
          let percent = x / scaleWidth;
          percent = Math.max(0, Math.min(1, percent));
          const station = Math.round(percent * (TICKS - 1)) + 1;
          if (station !== current) onChange(station);
        }}
      >
        {[...Array(TICKS)].map((_, i) => (
          <div
            key={i}
            className="dial-tick"
            style={{
              left: `${(i / (TICKS - 1)) * 100}%`
            }}
            title={`Emisora ${i + 1}`}
          />
        ))}
      </div>
      <div
        className="dial-needle"
        style={{ left: needleLeft }}
        onMouseDown={handleMouseDown}
        title="Arrastra para sintonizar"
      />
      <div className="dial-label">
        {stationName}

      </div>
    </div>
  );
}

