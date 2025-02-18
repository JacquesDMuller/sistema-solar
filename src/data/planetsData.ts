import Planet from '../types/Planet';
import * as THREE from 'three';

export const planetsData: Planet[] = [
  {
    id: 'mercury',
    name: 'Mercúrio',
    diameter: 4879,
    surfaceArea: 74800000,
    mass: '3.285 × 10^23 kg',
    distanceFromSun: 57900000,
    naturalSatellites: 0,
    rotationPeriod: '58.6 dias',
    translationPeriod: '88 dias',
    averageTemperature: 167,
    description: 'Mercúrio é o planeta mais próximo do Sol e o menor do Sistema Solar. Sua superfície é altamente craterade e sem atmosfera significativa.',
    color: '#A0522D',
    textureUrl: '/textures/mercury.jpg'
  },
  {
    id: 'venus',
    name: 'Vênus',
    diameter: 12104,
    surfaceArea: 460200000,
    mass: '4.867 × 10^24 kg',
    distanceFromSun: 108200000,
    naturalSatellites: 0,
    rotationPeriod: '243 dias',
    translationPeriod: '225 dias',
    averageTemperature: 464,
    description: 'Vênus é o planeta mais quente do Sistema Solar, com uma densa atmosfera de dióxido de carbono que cria um intenso efeito estufa.',
    color: '#DEB887',
    textureUrl: '/textures/venus.jpg'
  },
  {
    id: 'earth',
    name: 'Terra',
    diameter: 12742,
    surfaceArea: 510072000,
    mass: '5.972 × 10^24 kg',
    distanceFromSun: 149600000,
    naturalSatellites: 1,
    rotationPeriod: '23.9 horas',
    translationPeriod: '365.25 dias',
    averageTemperature: 15,
    description: 'Nosso planeta natal é o único conhecido a abrigar vida. Possui uma atmosfera rica em nitrogênio e oxigênio, e grandes quantidades de água líquida.',
    color: '#4169E1',
    textureUrl: '/textures/earth.jpg'
  },
  {
    id: 'mars',
    name: 'Marte',
    diameter: 6779,
    surfaceArea: 144800000,
    mass: '6.39 × 10^23 kg',
    distanceFromSun: 227900000,
    naturalSatellites: 2,
    rotationPeriod: '24.6 horas',
    translationPeriod: '687 dias',
    averageTemperature: -63,
    description: 'Conhecido como o Planeta Vermelho, Marte possui uma fina atmosfera e evidências de água líquida no passado. É um dos principais alvos para exploração espacial.',
    color: '#CD5C5C',
    textureUrl: '/textures/mars.jpg'
  },
  {
    id: 'jupiter',
    name: 'Júpiter',
    diameter: 139820,
    surfaceArea: 61420000000,
    mass: '1.898 × 10^27 kg',
    distanceFromSun: 778500000,
    naturalSatellites: 79,
    rotationPeriod: '9.9 horas',
    translationPeriod: '11.9 anos',
    averageTemperature: -110,
    description: 'O maior planeta do Sistema Solar, Júpiter é um gigante gasoso com uma Grande Mancha Vermelha e um poderoso campo magnético.',
    color: '#DEB887',
    textureUrl: '/textures/jupiter.jpg'
  },
  {
    id: 'saturn',
    name: 'Saturno',
    diameter: 116460,
    surfaceArea: 42700000000,
    mass: '5.683 × 10^26 kg',
    distanceFromSun: 1434000000,
    naturalSatellites: 82,
    rotationPeriod: '10.7 horas',
    translationPeriod: '29.5 anos',
    averageTemperature: -140,
    description: 'Famoso por seus belos anéis, Saturno é um gigante gasoso com uma densidade menor que a da água.',
    color: '#F4A460',
    textureUrl: '/textures/saturn.jpg'
  },
  {
    id: 'uranus',
    name: 'Urano',
    diameter: 50724,
    surfaceArea: 8083000000,
    mass: '8.681 × 10^25 kg',
    distanceFromSun: 2871000000,
    naturalSatellites: 27,
    rotationPeriod: '17.2 horas',
    translationPeriod: '84 anos',
    averageTemperature: -195,
    description: 'Urano é único por girar "de lado" em relação ao plano orbital. É um gigante de gelo com uma coloração azul-esverdeada.',
    color: '#87CEEB',
    textureUrl: '/textures/uranus.jpg'
  },
  {
    id: 'neptune',
    name: 'Netuno',
    diameter: 49244,
    surfaceArea: 7618000000,
    mass: '1.024 × 10^26 kg',
    distanceFromSun: 4495000000,
    naturalSatellites: 14,
    rotationPeriod: '16.1 horas',
    translationPeriod: '164.8 anos',
    averageTemperature: -200,
    description: 'O planeta mais distante do Sol, Netuno é um gigante de gelo com ventos mais rápidos que a velocidade do som.',
    color: '#4169E1',
    textureUrl: '/textures/neptune.jpg'
  }
];

const planets = planetsData.map(planet => {
  const geometry = new THREE.SphereGeometry(planet.diameter / 20000, 32, 32);
  const material = new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load(planet.textureUrl),
    metalness: 0,
    roughness: 0.8
  });
  // ... restante do código
}); 