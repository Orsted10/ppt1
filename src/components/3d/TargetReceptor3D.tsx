import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface TargetReceptor3DProps {
  height?: string;
  accentColor?: string;
}

export const TargetReceptor3D: React.FC<TargetReceptor3DProps> = ({
  height = '420px',
  accentColor = '#00f2fe',
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

    const cellGroup = new THREE.Group();
    scene.add(cellGroup);

    // Central biological cellular target (iridescent cell nucleus/organelle)
    const coreGeo = new THREE.IcosahedronGeometry(3.5, 3);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(accentColor),
      emissive: new THREE.Color(accentColor),
      emissiveIntensity: 0.35,
      roughness: 0.2,
      metalness: 0.1,
      transmission: 0.6,
      transparent: true,
      opacity: 0.85,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    cellGroup.add(coreMesh);

    // Glowing cell membrane lattice
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const wireMesh = new THREE.Mesh(coreGeo, wireMat);
    wireMesh.scale.set(1.05, 1.05, 1.05);
    cellGroup.add(wireMesh);

    // Transmembrane Receptor Protrusions (Y-shaped antibodies / kinase binding pockets)
    const receptorCount = 14;
    const receptorGeo = new THREE.CylinderGeometry(0.12, 0.2, 2.2, 12);
    const headGeo = new THREE.SphereGeometry(0.45, 16, 16);

    const recMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      emissive: 0x059669,
      emissiveIntensity: 0.5,
      roughness: 0.2,
    });

    const activeRecMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xd97706,
      emissiveIntensity: 0.9,
      roughness: 0.1,
    });

    const receptorsGroup = new THREE.Group();
    for (let i = 0; i < receptorCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / receptorCount);
      const theta = Math.sqrt(receptorCount * Math.PI) * phi;

      const x = Math.cos(theta) * Math.sin(phi);
      const y = Math.sin(theta) * Math.sin(phi);
      const z = Math.cos(phi);

      const norm = new THREE.Vector3(x, y, z).normalize();
      const pos = norm.clone().multiplyScalar(3.5);

      const rMesh = new THREE.Mesh(receptorGeo, i === 3 ? activeRecMat : recMat);
      rMesh.position.copy(pos).add(norm.clone().multiplyScalar(1.0));
      rMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), norm);

      const head = new THREE.Mesh(headGeo, i === 3 ? activeRecMat : recMat);
      head.position.copy(pos).add(norm.clone().multiplyScalar(2.1));

      receptorsGroup.add(rMesh);
      receptorsGroup.add(head);
    }
    cellGroup.add(receptorsGroup);

    // Orbiting therapeutic molecules / ligands
    const ligandGroup = new THREE.Group();
    const ligandGeo = new THREE.SphereGeometry(0.3, 16, 16);
    const ligandMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x00f2fe,
      emissiveIntensity: 0.8,
    });

    const numLigands = 8;
    const ligands: THREE.Mesh[] = [];
    for (let i = 0; i < numLigands; i++) {
      const lig = new THREE.Mesh(ligandGeo, ligandMat);
      ligands.push(lig);
      ligandGroup.add(lig);
    }
    cellGroup.add(ligandGroup);

    // Bioluminescent energy waves
    const waveGeo = new THREE.TorusGeometry(5.8, 0.04, 16, 80);
    const waveMat = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      transparent: true,
      opacity: 0.4,
    });
    const wave = new THREE.Mesh(waveGeo, waveMat);
    wave.rotation.x = Math.PI / 2.2;
    cellGroup.add(wave);

    // Lights
    const amb = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(amb);

    const light1 = new THREE.PointLight(accentColor, 4, 40);
    light1.position.set(10, 10, 10);
    scene.add(light1);

    const light2 = new THREE.PointLight('#10b981', 3, 40);
    light2.position.set(-10, -10, 10);
    scene.add(light2);

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

      cellGroup.rotation.y += 0.008;
      cellGroup.rotation.x = Math.sin(t * 0.4) * 0.15 + mouseY * 0.25;
      cellGroup.rotation.z = Math.cos(t * 0.3) * 0.1 + mouseX * 0.25;

      // Pulse cell breathing
      const breathe = 1 + Math.sin(t * 2) * 0.04;
      coreMesh.scale.set(breathe, breathe, breathe);

      // Animate orbiting ligands seeking target
      ligands.forEach((lig, idx) => {
        const speed = 0.8 + idx * 0.2;
        const angle = t * speed + (idx * Math.PI * 2) / numLigands;
        const rad = 6.2 + Math.sin(t * 2 + idx) * 0.6;
        lig.position.set(
          Math.cos(angle) * rad,
          Math.sin(angle * 0.7) * 2.5,
          Math.sin(angle) * rad
        );
      });

      wave.rotation.z = t * 0.3;

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
      coreGeo.dispose();
      coreMat.dispose();
      wireMat.dispose();
      receptorGeo.dispose();
      headGeo.dispose();
      recMat.dispose();
      activeRecMat.dispose();
      ligandGeo.dispose();
      ligandMat.dispose();
      waveGeo.dispose();
      waveMat.dispose();
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
