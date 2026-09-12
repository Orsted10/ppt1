import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface MedicineCapsule3DProps {
  height?: string;
  accentColor?: string;
}

export const MedicineCapsule3D: React.FC<MedicineCapsule3DProps> = ({
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
    camera.position.set(0, 0, 18);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const capsuleGroup = new THREE.Group();
    scene.add(capsuleGroup);

    // Half 1: Translucent Glowing Cyan
    const cap1Geo = new THREE.CapsuleGeometry(2.4, 3.2, 32, 64);
    const cap1Mat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(accentColor),
      transmission: 0.7,
      opacity: 0.9,
      transparent: true,
      roughness: 0.1,
      ior: 1.5,
      thickness: 1.2,
      emissive: new THREE.Color(accentColor),
      emissiveIntensity: 0.35,
    });
    const cap1 = new THREE.Mesh(cap1Geo, cap1Mat);
    capsuleGroup.add(cap1);

    // Inner Nano-beads (the AI-designed molecular medicine inside the capsule)
    const beadCount = 35;
    const beadGeo = new THREE.SphereGeometry(0.28, 16, 16);
    const beadMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.8,
      roughness: 0.1,
    });

    const beadsGroup = new THREE.Group();
    for (let i = 0; i < beadCount; i++) {
      const b = new THREE.Mesh(beadGeo, beadMat);
      // distribute inside capsule volume
      b.position.set(
        (Math.random() - 0.5) * 2.8,
        (Math.random() - 0.5) * 4.5,
        (Math.random() - 0.5) * 2.8
      );
      beadsGroup.add(b);
    }
    capsuleGroup.add(beadsGroup);

    // Outer orbital rings / field of targeted delivery
    const ringGeo = new THREE.TorusGeometry(4.2, 0.05, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#38bdf8'),
      transparent: true,
      opacity: 0.5,
    });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    ring1.rotation.x = Math.PI / 3;
    capsuleGroup.add(ring1);

    const ring2 = new THREE.Mesh(ringGeo, ringMat);
    ring2.rotation.y = Math.PI / 3;
    capsuleGroup.add(ring2);

    // Floating therapeutic aura sparkles
    const sparkleGeo = new THREE.BufferGeometry();
    const sparkleCount = 60;
    const sparklePos = new Float32Array(sparkleCount * 3);
    for (let i = 0; i < sparkleCount * 3; i += 3) {
      sparklePos[i] = (Math.random() - 0.5) * 14;
      sparklePos[i + 1] = (Math.random() - 0.5) * 14;
      sparklePos[i + 2] = (Math.random() - 0.5) * 14;
    }
    sparkleGeo.setAttribute('position', new THREE.BufferAttribute(sparklePos, 3));
    const sparkleMat = new THREE.PointsMaterial({
      size: 0.14,
      color: 0x00f2fe,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const sparkles = new THREE.Points(sparkleGeo, sparkleMat);
    scene.add(sparkles);

    // Lights
    const amb = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(amb);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight1.position.set(10, 15, 10);
    scene.add(dirLight1);

    const dirLight2 = new THREE.PointLight(accentColor, 4, 30);
    dirLight2.position.set(-10, -5, 5);
    scene.add(dirLight2);

    capsuleGroup.rotation.z = Math.PI / 5;

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

      // Slow zero-gravity float
      capsuleGroup.position.y = Math.sin(t * 1.5) * 0.4;
      capsuleGroup.rotation.y += 0.01;
      capsuleGroup.rotation.x = Math.sin(t * 0.8) * 0.15 + mouseY * 0.2;
      capsuleGroup.rotation.z = Math.PI / 5 + Math.cos(t * 0.6) * 0.1 + mouseX * 0.2;

      ring1.rotation.z = t * 0.4;
      ring2.rotation.z = -t * 0.3;

      sparkles.rotation.y = t * 0.05;

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
      cap1Geo.dispose();
      cap1Mat.dispose();
      beadGeo.dispose();
      beadMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      sparkleGeo.dispose();
      sparkleMat.dispose();
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
