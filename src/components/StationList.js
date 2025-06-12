import React from 'react';

function StationList({ stations, onSelect, current }) {
  return (
    <div className="station-list-container horizontal">
      <ul className="station-list horizontal">
        {stations.map((station) => (
          <li key={station.url}>
            <button
              className={`station-btn${station.url === current ? ' active' : ''}`}
              onClick={() => onSelect(station)}
            >
              {station.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StationList;