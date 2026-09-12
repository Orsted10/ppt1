import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ProteinOrigami3DProps {
  foldedState?: number; // 0 = loose chain, 1 = fully folded tertiary structure
  height?: string;
  accentColor?: string;
}

export const ProteinOrigami3D: React.FC<ProteinOrigami3DProps> = ({
  foldedState = 1,
  height = '420px',
  accentColor = '#10b981', // Emerald biotech life
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const h = container.clientHeight || 420;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / h, 0.1, 1000);
    camera.position.set(0, 0, 22);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const proteinGroup = new THREE.Group();
    scene.add(proteinGroup);

    // Generate complex 3D protein folding ribbon
    const points: THREE.Vector3[] = [];
    const numPoints = 60;
    for (let i = 0; i < numPoints; i++) {
      const t = (i / numPoints) * Math.PI * 4;
      // Complex knot-like protein backbone curve
      const x = Math.sin(t) * 5 + Math.sin(2 * t) * 2.5;
      const y = Math.cos(t) * 4 + Math.cos(3 * t) * 2;
      const z = Math.sin(3 * t) * 3 + Math.cos(2 * t) * 2.5;
      points.push(new THREE.Vector3(x, y, z));
    }

    const curve = new THREE.CatmullRomCurve3(points, true);
    const tubeGeo = new THREE.TubeGeometry(curve, 180, 0.35, 12, true);

    // Custom gradient vertex colors
    const colors = [];
    const color1 = new THREE.Color('#00f2fe'); // Bio-cyan
    const color2 = new THREE.Color(accentColor); // Emerald
    const color3 = new THREE.Color('#8b5cf6'); // Violet

    const pos = tubeGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const p = i / pos.count;
      const c = p < 0.5 ? color1.clone().lerp(color2, p * 2) : color2.clone().lerp(color3, (p - 0.5) * 2);
      colors.push(c.r, c.g, c.b);
    }
    tubeGeo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const tubeMat = new THREE.MeshPhongMaterial({
      vertexColors: true,
      shininess: 100,
      specular: 0x55ffff,
      wireframe: false,
    });

    const proteinMesh = new THREE.Mesh(tubeGeo, tubeMat);
    proteinGroup.add(proteinMesh);

    // Active catalytic site / binding pocket spheres
    const activeSites = [
      new THREE.Vector3(0, 1.5, 0),
      new THREE.Vector3(3.2, -1, 1.5),
      new THREE.Vector3(-2.8, 2, -1),
    ];

    const pocketMat = new THREE.MeshStandardMaterial({
      color: 0xffa500,
      emissive: 0xff4500,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.8,
    });

    const pocketGroup = new THREE.Group();
    activeSites.forEach((pos) => {
      const pMesh = new THREE.Mesh(new THREE.SphereGeometry(0.7, 24, 24), pocketMat);
      pMesh.position.copy(pos);
      pocketGroup.add(pMesh);

      // Glowing aura around active pocket
      const auraMat = new THREE.MeshBasicMaterial({
        color: 0xffaa00,
        transparent: true,
        opacity: 0.25,
        wireframe: true,
      });
      const aura = new THREE.Mesh(new THREE.SphereGeometry(1.2, 16, 16), auraMat);
      aura.position.copy(pos);
      pocketGroup.add(aura);
    });
    proteinGroup.add(pocketGroup);

    // Ambient floating hydration shell particles
    const shellGeo = new THREE.BufferGeometry();
    const shellCount = 120;
    const shellPos = new Float32Array(shellCount * 3);
    for (let i = 0; i < shellCount * 3; i += 3) {
      shellPos[i] = (Math.random() - 0.5) * 18;
      shellPos[i + 1] = (Math.random() - 0.5) * 16;
      shellPos[i + 2] = (Math.random() - 0.5) * 14;
    }
    shellGeo.setAttribute('position', new THREE.BufferAttribute(shellPos, 3));
    const shellMat = new THREE.PointsMaterial({
      size: 0.15,
      color: 0x00f2fe,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const shellPoints = new THREE.Points(shellGeo, shellMat);
    scene.add(shellPoints);

    // Lighting
    const amb = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(amb);

    const light1 = new THREE.DirectionalLight(0x00f2fe, 2.5);
    light1.position.set(15, 10, 15);
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(0x10b981, 2.0);
    light2.position.set(-15, -10, -10);
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

      // Gentle floating rotation
      proteinGroup.rotation.y += 0.008;
      proteinGroup.rotation.x = Math.sin(t * 0.5) * 0.15 + mouseY * 0.3;
      proteinGroup.rotation.z = Math.cos(t * 0.3) * 0.1 + mouseX * 0.3;

      // Pulse active pocket
      const pulse = 1 + Math.sin(t * 3) * 0.08;
      pocketGroup.scale.set(pulse, pulse, pulse);

      shellPoints.rotation.y = t * 0.03;

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
      tubeGeo.dispose();
      tubeMat.dispose();
      shellGeo.dispose();
      shellMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [accentColor, foldedState]);

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
