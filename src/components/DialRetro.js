import React, { useRef, useState } from "react";
import "./RadioRetro.css";

export default function DialRetro({ current, total, onTune, onStatic }) {
  const dialRef = useRef(null);
  const [needlePos, setNeedlePos] = useState((current - 1) / (total - 1));
  const visualTicks = total * 2 - 1; // Más ticks visuales para más estática

  function handleMouseDown(e) {
    const dial = dialRef.current;
    if (!dial) return;

    function onMouseMove(ev) {
      const rect = dial.getBoundingClientRect();
      let x = ev.clientX - rect.left;
      x = Math.max(0, Math.min(x, rect.width));
      const pos = x / rect.width;
      setNeedlePos(pos);

      // Tick real más cercano
      const realIdx = Math.round(pos * (total - 1)) + 1;
      const realTickPos = (realIdx - 1) / (total - 1);
      const distance = Math.abs(pos - realTickPos);

      // Solo sintoniza si está cerca de un tick real
      if (distance < 0.04) {
        if (realIdx !== current) {
          onTune(realIdx);
        }
      } else {
        onStatic();
      }
    }

    function onMouseUp() {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  }

  // Sincroniza la aguja cuando cambia la estación desde los botones
  React.useEffect(() => {
    setNeedlePos((current - 1) / (total - 1));
  }, [current, total]);

  return (
    <div className="dial-retro" ref={dialRef}>
      <div className="dial-scale">
        {[...Array(visualTicks)].map((_, i) => (
          <div
            key={i}
            className="dial-tick"
            style={{
              left: `${(i / (visualTicks - 1)) * 100}%`
            }}
          />
        ))}
      </div>
      <div
        className="dial-needle"
        style={{ left: `${needlePos * 100}%` }}
        onMouseDown={handleMouseDown}
        title="Arrastra para sintonizar"
      />
    </div>
  );
}

