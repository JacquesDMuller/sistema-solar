import React from 'react';
import Planet from '../types/Planet';
import '../styles/PlanetInfo.scss';

interface PlanetInfoProps {
  planet: Planet;
  onClose: () => void;
}

const PlanetInfo: React.FC<PlanetInfoProps> = ({ planet, onClose }) => {
  return (
    <div className="planet-info">
      <div className="planet-info-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>{planet.name}</h2>
        <div className="info-grid">
          <div className="info-row">
            <span>Diâmetro:</span>
            <span>{planet.diameter.toLocaleString()} km</span>
          </div>
          <div className="info-row">
            <span>Área da superfície:</span>
            <span>{planet.surfaceArea.toLocaleString()} km²</span>
          </div>
          <div className="info-row">
            <span>Massa:</span>
            <span>{planet.mass}</span>
          </div>
          <div className="info-row">
            <span>Distância do Sol:</span>
            <span>{planet.distanceFromSun.toLocaleString()} km</span>
          </div>
          <div className="info-row">
            <span>Satélites naturais:</span>
            <span>{planet.naturalSatellites}</span>
          </div>
          <div className="info-row">
            <span>Período de rotação:</span>
            <span>{planet.rotationPeriod}</span>
          </div>
          <div className="info-row">
            <span>Período de translação:</span>
            <span>{planet.translationPeriod}</span>
          </div>
          <div className="info-row">
            <span>Temperatura média:</span>
            <span>{planet.averageTemperature}°C</span>
          </div>
        </div>
        <p className="description">{planet.description}</p>
      </div>
    </div>
  );
};

export default PlanetInfo; 