import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface DNAHelix3DProps {
  interactive?: boolean;
  accentColor?: string;
  height?: string;
}

export const DNAHelix3D: React.FC<DNAHelix3DProps> = ({
  interactive = true,
  accentColor = '#00f2fe',
  height = '420px',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const h = container.clientHeight || 420;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / h, 0.1, 1000);
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for DNA
    const dnaGroup = new THREE.Group();
    scene.add(dnaGroup);

    // Color palette
    const colPrimary = new THREE.Color(accentColor);
    const colSecondary = new THREE.Color('#8b5cf6');
    const colRung = new THREE.Color('#38bdf8');

    // Materials
    const sphereMat1 = new THREE.MeshPhongMaterial({
      color: colPrimary,
      emissive: colPrimary,
      emissiveIntensity: 0.5,
      shininess: 90,
    });
    const sphereMat2 = new THREE.MeshPhongMaterial({
      color: colSecondary,
      emissive: colSecondary,
      emissiveIntensity: 0.5,
      shininess: 90,
    });
    const rungMat = new THREE.MeshPhongMaterial({
      color: colRung,
      emissive: colRung,
      emissiveIntensity: 0.3,
      transparent: true,
      opacity: 0.75,
    });

    const sphereGeo = new THREE.SphereGeometry(0.32, 16, 16);
    const rungGeo = new THREE.CylinderGeometry(0.06, 0.06, 1, 8);

    const numNodes = 40;
    const radius = 3.6;
    const totalHeight = 18;
    const twists = 2.4;

    for (let i = 0; i < numNodes; i++) {
      const progress = i / numNodes;
      const angle = progress * Math.PI * 2 * twists;
      const y = (progress - 0.5) * totalHeight;

      const x1 = Math.cos(angle) * radius;
      const z1 = Math.sin(angle) * radius;

      const x2 = Math.cos(angle + Math.PI) * radius;
      const z2 = Math.sin(angle + Math.PI) * radius;

      // Node 1
      const node1 = new THREE.Mesh(sphereGeo, sphereMat1);
      node1.position.set(x1, y, z1);
      dnaGroup.add(node1);

      // Node 2
      const node2 = new THREE.Mesh(sphereGeo, sphereMat2);
      node2.position.set(x2, y, z2);
      dnaGroup.add(node2);

      // Connecting Base-pair Rung
      const rung = new THREE.Mesh(rungGeo, rungMat);
      rung.position.set((x1 + x2) / 2, y, (z1 + z2) / 2);
      rung.scale.set(1, radius * 2, 1);
      rung.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        new THREE.Vector3(x1 - x2, 0, z1 - z2).normalize()
      );
      dnaGroup.add(rung);
    }

    // Floating bioluminescent dust particles
    const particleCount = 80;
    const particleGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 16;
      posArray[i + 1] = (Math.random() - 0.5) * 22;
      posArray[i + 2] = (Math.random() - 0.5) * 12;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.12,
      color: new THREE.Color('#38bdf8'),
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(accentColor, 3.5, 50);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight('#8b5cf6', 3.0, 50);
    pointLight2.position.set(-10, -10, 10);
    scene.add(pointLight2);

    // Tilt DNA slightly for cinematic angle
    dnaGroup.rotation.z = 0.35;
    dnaGroup.rotation.x = 0.2;

    // Mouse Interaction
    let targetRotX = 0.2;
    let targetRotY = 0;
    const onMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      targetRotY = x * 0.8;
      targetRotX = 0.2 - y * 0.4;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Continuous slow rotation with mouse parallax
      dnaGroup.rotation.y += 0.012 + (targetRotY - dnaGroup.rotation.y * 0.1) * 0.02;
      dnaGroup.rotation.x += (targetRotX - dnaGroup.rotation.x) * 0.05;

      // Floating particles slow drift
      particles.rotation.y = elapsedTime * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      sphereGeo.dispose();
      rungGeo.dispose();
      particleGeo.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [accentColor, interactive]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height,
        position: 'relative',
        cursor: interactive ? 'grab' : 'default',
        overflow: 'hidden',
      }}
    />
  );
};
