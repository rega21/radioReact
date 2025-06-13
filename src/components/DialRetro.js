import React, { useRef } from "react";
import "./RadioRetro.css";

export default function DialRetro({ current, total, onChange }) {
  const dialRef = useRef(null);

  // Calcula la posición de la aguja
  const needleLeft = `${((current - 1) / (total - 1)) * 100}%`;

  function handleMouseDown(e) {
    const dial = dialRef.current;
    if (!dial) return;

    function onMouseMove(ev) {
      const rect = dial.getBoundingClientRect();
      let x = ev.clientX - rect.left;
      x = Math.max(0, Math.min(x, rect.width));
      const idx = Math.round((x / rect.width) * (total - 1)) + 1;
      if (onChange) onChange(idx);
    }

    function onMouseUp() {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  }

  return (
    <div className="dial-retro" ref={dialRef}>
      <div className="dial-scale">
        {[...Array(total)].map((_, i) => (
          <div
            key={i}
            className="dial-tick"
            style={{
              left: `${(i / (total - 1)) * 100}%`
            }}
          />
        ))}
      </div>
      <div
        className="dial-needle"
        style={{ left: needleLeft }}
        onMouseDown={handleMouseDown}
        title="Arrastra para sintonizar"
      />
    </div>
  );
}

