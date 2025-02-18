import React, { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import PlanetInfo from './PlanetInfo';
import { planetsData } from '../data/planetsData';
import '../styles/SolarSystem.scss';

const SolarSystem: React.FC = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const planetsRef = useRef<THREE.Mesh[]>([]);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationRef = useRef<number>();

  // Efeito para criar a cena
  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    cameraRef.current = camera;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    rendererRef.current = renderer;
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;
    camera.position.z = 50;

    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 5;
    controls.maxDistance = 100;

    // Iluminação
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const sunLight = new THREE.PointLight(0xffffff, 2, 0, 0);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    // Sol
    const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xffff00,
      emissive: 0xffff00,
      emissiveIntensity: 1
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);

    // Planetas
    const planets = planetsData.map(planet => {
      const geometry = new THREE.SphereGeometry(planet.diameter / 20000, 32, 32);
      const material = new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load(planet.textureUrl),
        metalness: 0,
        roughness: 0.8
      });
      const mesh = new THREE.Mesh(geometry, material);
      
      mesh.position.x = planet.distanceFromSun / 10000000;
      scene.add(mesh);
      
      if (planet.id === 'saturn') {
        const ringGeometry = new THREE.RingGeometry(
          planet.diameter / 15000,
          planet.diameter / 12000,
          32
        );
        const ringMaterial = new THREE.MeshBasicMaterial({
          color: 0xc0a875,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.8
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = Math.PI / 2;
        mesh.add(ring);
      }
      
      return mesh;
    });

    planetsRef.current = planets;

    return () => {
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []); // Sem dependências - cria a cena apenas uma vez

  // Efeito para controlar a animação
  useEffect(() => {
    if (!sceneRef.current || !rendererRef.current || !cameraRef.current || !controlsRef.current) return;

    const scene = sceneRef.current;
    const renderer = rendererRef.current;
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    const planets = planetsRef.current;

    const animate = () => {
      if (!selectedPlanet) {
        planets.forEach((planet, index) => {
          planet.rotation.y += 0.01 / (index + 1);
          planet.position.x = Math.cos(Date.now() * 0.0001 / (index + 1)) * planetsData[index].distanceFromSun / 10000000;
          planet.position.z = Math.sin(Date.now() * 0.0001 / (index + 1)) * planetsData[index].distanceFromSun / 10000000;
        });
      }

      controls.update();
      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [selectedPlanet]);

  // Efeito para lidar com cliques
  useEffect(() => {
    if (!sceneRef.current || !cameraRef.current || !controlsRef.current) return;

    const camera = cameraRef.current;
    const controls = controlsRef.current;
    const planets = planetsRef.current;

    const zoomToPlanet = (planetMesh: THREE.Mesh) => {
      const position = new THREE.Vector3();
      planetMesh.getWorldPosition(position);

      const targetPosition = position.clone().add(new THREE.Vector3(5, 2, 5));
      const duration = 1000;
      const startPosition = camera.position.clone();
      const startTime = Date.now();

      const animateZoom = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3);

        camera.position.lerpVectors(startPosition, targetPosition, easeProgress);
        controls.target.lerp(position, easeProgress);

        if (progress < 1) {
          requestAnimationFrame(animateZoom);
        }
      };

      animateZoom();
    };

    const onMouseClick = (event: MouseEvent) => {
      const mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      );

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(planets);

      if (intersects.length > 0) {
        const planetIndex = planets.indexOf(intersects[0].object);
        setSelectedPlanet(planetsData[planetIndex].id);
        zoomToPlanet(intersects[0].object as THREE.Mesh);
      }
    };

    window.addEventListener('click', onMouseClick);

    return () => {
      window.removeEventListener('click', onMouseClick);
    };
  }, []);

  return (
    <div className="solar-system-container">
      <div className="solar-system" ref={containerRef} />
      {selectedPlanet && (
        <div className="planet-info-sidebar">
          <PlanetInfo 
            planet={planetsData.find(p => p.id === selectedPlanet)!}
            onClose={() => {
              if (cameraRef.current && controlsRef.current) {
                const duration = 1000;
                const startPosition = cameraRef.current.position.clone();
                const targetPosition = new THREE.Vector3(0, 0, 50);
                const startTime = Date.now();

                const animateReturn = () => {
                  const now = Date.now();
                  const progress = Math.min((now - startTime) / duration, 1);
                  const easeProgress = 1 - Math.pow(1 - progress, 3);

                  cameraRef.current!.position.lerpVectors(startPosition, targetPosition, easeProgress);
                  controlsRef.current!.target.lerp(new THREE.Vector3(0, 0, 0), easeProgress);

                  if (progress < 1) {
                    requestAnimationFrame(animateReturn);
                  } else {
                    setSelectedPlanet(null);
                  }
                };

                animateReturn();
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

export default SolarSystem; 