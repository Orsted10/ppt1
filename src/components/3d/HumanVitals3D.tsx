import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface HumanVitals3DProps {
  height?: string;
  accentColor?: string;
}

export const HumanVitals3D: React.FC<HumanVitals3DProps> = ({
  height = '420px',
  accentColor = '#f43f5e', // Vital rose / crimson
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const h = container.clientHeight || 420;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / h, 0.1, 1000);
    camera.position.set(0, 0, 20);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const vitalsGroup = new THREE.Group();
    scene.add(vitalsGroup);

    // Procedural 3D anatomical particle silhouette
    const particleCount = 600;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const col1 = new THREE.Color(accentColor);
    const col2 = new THREE.Color('#38bdf8');

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      // Generate stylized human torso / heart cluster shape
      const u = Math.random();
      const v = Math.random();

      // Head
      if (i < 80) {
        const theta = u * Math.PI * 2;
        const phi = Math.acos(2 * v - 1);
        positions[idx] = Math.sin(phi) * Math.cos(theta) * 1.5;
        positions[idx + 1] = 6.2 + Math.cos(phi) * 1.5;
        positions[idx + 2] = Math.sin(phi) * Math.sin(theta) * 1.5;
      }
      // Heart core (dense glowing cluster)
      else if (i < 200) {
        const rad = Math.pow(u, 0.5) * 1.6;
        const angle = v * Math.PI * 2;
        positions[idx] = Math.cos(angle) * rad + 0.4;
        positions[idx + 1] = 2.2 + Math.sin(angle) * rad;
        positions[idx + 2] = (Math.random() - 0.5) * 1.4;
      }
      // Torso & Body Constellation
      else {
        const t = u * 9;
        const widthAtT = Math.sin(t / 9 * Math.PI) * 3.5 + 0.5;
        const angle = v * Math.PI * 2;
        positions[idx] = Math.cos(angle) * widthAtT * (0.4 + Math.random() * 0.6);
        positions[idx + 1] = 4.5 - t;
        positions[idx + 2] = Math.sin(angle) * (widthAtT * 0.6) * (0.4 + Math.random() * 0.6);
      }

      const c = Math.random() > 0.4 ? col1 : col2;
      colors[idx] = c.r;
      colors[idx + 1] = c.g;
      colors[idx + 2] = c.b;
    }

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const pMat = new THREE.PointsMaterial({
      size: 0.22,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const pointsMesh = new THREE.Points(pGeo, pMat);
    vitalsGroup.add(pointsMesh);

    // Glowing Heartbeat Core Sphere
    const heartGeo = new THREE.SphereGeometry(1.2, 24, 24);
    const heartMat = new THREE.MeshBasicMaterial({
      color: 0xf43f5e,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const heart = new THREE.Mesh(heartGeo, heartMat);
    heart.position.set(0.4, 2.2, 0);
    vitalsGroup.add(heart);

    // ECG Pulse wave ring around heart
    const ecgRingGeo = new THREE.TorusGeometry(2.4, 0.04, 16, 60);
    const ecgRingMat = new THREE.MeshBasicMaterial({
      color: 0xff0055,
      transparent: true,
      opacity: 0.5,
    });
    const ecgRing = new THREE.Mesh(ecgRingGeo, ecgRingMat);
    ecgRing.position.set(0.4, 2.2, 0);
    ecgRing.rotation.x = Math.PI / 2.2;
    vitalsGroup.add(ecgRing);

    // Ambient floating life particles
    const lifeGeo = new THREE.BufferGeometry();
    const lifeCount = 80;
    const lifePos = new Float32Array(lifeCount * 3);
    for (let i = 0; i < lifeCount * 3; i += 3) {
      lifePos[i] = (Math.random() - 0.5) * 16;
      lifePos[i + 1] = (Math.random() - 0.5) * 18;
      lifePos[i + 2] = (Math.random() - 0.5) * 12;
    }
    lifeGeo.setAttribute('position', new THREE.BufferAttribute(lifePos, 3));
    const lifeMat = new THREE.PointsMaterial({
      size: 0.12,
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const lifeParticles = new THREE.Points(lifeGeo, lifeMat);
    scene.add(lifeParticles);

    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Slow anatomical rotation
      vitalsGroup.rotation.y += 0.009;
      vitalsGroup.rotation.x = mouseY * 0.2;
      vitalsGroup.rotation.z = mouseX * 0.15;

      // Heartbeat pulse rhythm: lub-dub
      const beatCycle = (t * 1.8) % 1;
      let pulseScale = 1;
      if (beatCycle < 0.15) {
        pulseScale = 1 + Math.sin((beatCycle / 0.15) * Math.PI) * 0.35;
      } else if (beatCycle > 0.2 && beatCycle < 0.35) {
        pulseScale = 1 + Math.sin(((beatCycle - 0.2) / 0.15) * Math.PI) * 0.2;
      }
      heart.scale.set(pulseScale, pulseScale, pulseScale);
      ecgRing.scale.set(pulseScale * 1.1, pulseScale * 1.1, pulseScale * 1.1);

      lifeParticles.rotation.y = t * 0.03;

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!container) return;
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      pGeo.dispose();
      pMat.dispose();
      heartGeo.dispose();
      heartMat.dispose();
      ecgRingGeo.dispose();
      ecgRingMat.dispose();
      lifeGeo.dispose();
      lifeMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [accentColor]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height,
        position: 'relative',
        overflow: 'hidden',
      }}
    />
  );
};
