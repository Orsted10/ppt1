import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface MolecularKey3DProps {
  height?: string;
  accentColor?: string;
}

export const MolecularKey3D: React.FC<MolecularKey3DProps> = ({
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

    const molGroup = new THREE.Group();
    scene.add(molGroup);

    // Atom specs: position, element type, radius, color
    interface AtomSpec {
      pos: [number, number, number];
      type: 'C' | 'N' | 'O' | 'F' | 'S';
      color: string;
      radius: number;
    }

    const atoms: AtomSpec[] = [
      // Benzene/pyridine core ring
      { pos: [0, 2, 0], type: 'N', color: '#38bdf8', radius: 0.55 },
      { pos: [1.73, 1, 0], type: 'C', color: '#94a3b8', radius: 0.5 },
      { pos: [1.73, -1, 0], type: 'C', color: '#94a3b8', radius: 0.5 },
      { pos: [0, -2, 0], type: 'C', color: '#94a3b8', radius: 0.5 },
      { pos: [-1.73, -1, 0], type: 'C', color: '#94a3b8', radius: 0.5 },
      { pos: [-1.73, 1, 0], type: 'C', color: '#94a3b8', radius: 0.5 },

      // Functional branches / pharmacophore groups
      { pos: [3.4, 1.8, 0.5], type: 'O', color: '#f43f5e', radius: 0.55 },
      { pos: [3.4, -1.8, -0.5], type: 'N', color: '#38bdf8', radius: 0.55 },
      { pos: [5.0, -1.5, -0.2], type: 'C', color: '#94a3b8', radius: 0.5 },
      { pos: [-3.4, 1.8, -0.3], type: 'F', color: '#10b981', radius: 0.45 },
      { pos: [-3.4, -2.0, 0.4], type: 'S', color: '#f59e0b', radius: 0.65 },
      { pos: [-5.0, -1.2, 0.2], type: 'C', color: '#94a3b8', radius: 0.5 },
    ];

    // Chemical bonds (pairs of atom indices)
    const bonds: [number, number][] = [
      // Ring
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0],
      // Branches
      [1, 6], [2, 7], [7, 8], [5, 9], [4, 10], [10, 11]
    ];

    // Atom meshes
    atoms.forEach((atom) => {
      const geo = new THREE.SphereGeometry(atom.radius, 24, 24);
      const mat = new THREE.MeshPhongMaterial({
        color: new THREE.Color(atom.color),
        emissive: new THREE.Color(atom.color),
        emissiveIntensity: 0.4,
        shininess: 90,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(...atom.pos);
      molGroup.add(mesh);
    });

    // Bond cylinders
    const cylinderGeo = new THREE.CylinderGeometry(0.12, 0.12, 1, 12);
    const bondMat = new THREE.MeshStandardMaterial({
      color: 0xcccccc,
      metalness: 0.4,
      roughness: 0.3,
    });

    bonds.forEach(([idxA, idxB]) => {
      const a = new THREE.Vector3(...atoms[idxA].pos);
      const b = new THREE.Vector3(...atoms[idxB].pos);
      const dist = a.distanceTo(b);

      const bond = new THREE.Mesh(cylinderGeo, bondMat);
      bond.position.copy(a).add(b).multiplyScalar(0.5);
      bond.scale.set(1, dist, 1);
      bond.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        b.clone().sub(a).normalize()
      );
      molGroup.add(bond);
    });

    // Delocalized electron cloud ring (holographic glow inside ring)
    const ringGeo = new THREE.TorusGeometry(1.2, 0.04, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(accentColor),
      transparent: true,
      opacity: 0.6,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    molGroup.add(ring);

    // Floating binding affinity energy particles
    const pCount = 50;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount * 3; i += 3) {
      pPos[i] = (Math.random() - 0.5) * 14;
      pPos[i + 1] = (Math.random() - 0.5) * 12;
      pPos[i + 2] = (Math.random() - 0.5) * 10;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.12,
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // Lights
    const amb = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(amb);

    const light1 = new THREE.DirectionalLight(0xffffff, 2.5);
    light1.position.set(10, 10, 10);
    scene.add(light1);

    const light2 = new THREE.PointLight(accentColor, 3, 30);
    light2.position.set(-10, -5, 5);
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

      // Smooth tumble rotation
      molGroup.rotation.y += 0.01;
      molGroup.rotation.x = Math.sin(t * 0.4) * 0.2 + mouseY * 0.3;
      molGroup.rotation.z = Math.cos(t * 0.3) * 0.1 + mouseX * 0.3;

      particles.rotation.y = t * 0.04;

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
      cylinderGeo.dispose();
      bondMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      pGeo.dispose();
      pMat.dispose();
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
