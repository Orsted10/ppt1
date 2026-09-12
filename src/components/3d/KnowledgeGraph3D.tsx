import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface KnowledgeGraph3DProps {
  height?: string;
  accentColor?: string;
}

export const KnowledgeGraph3D: React.FC<KnowledgeGraph3DProps> = ({
  height = '420px',
  accentColor = '#10b981', // Emerald repurposing discovery
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const h = container.clientHeight || 420;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / h, 0.1, 1000);
    camera.position.set(0, 0, 24);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const graphGroup = new THREE.Group();
    scene.add(graphGroup);

    // Node definitions (Biomedical Knowledge Graph)
    interface GraphNode {
      id: string;
      label: string;
      pos: [number, number, number];
      color: string;
      radius: number;
    }

    const nodes: GraphNode[] = [
      // Central Drug (Baricitinib)
      { id: 'drug', label: 'BARICITINIB', pos: [0, 0, 0], color: '#10b981', radius: 1.4 },
      // Target Kinases
      { id: 'jak1', label: 'JAK1 KINASE', pos: [-4.5, 2.5, 2], color: '#00f2fe', radius: 0.9 },
      { id: 'jak2', label: 'JAK2 KINASE', pos: [4.5, 2.8, -1.5], color: '#00f2fe', radius: 0.9 },
      // Disease 1 (Original: Arthritis)
      { id: 'ra', label: 'ARTHRITIS', pos: [-6.5, -3, 1], color: '#f59e0b', radius: 0.8 },
      // Disease 2 (Repurposed: COVID-19 Cytokine Storm)
      { id: 'covid', label: 'SARS-CoV-2', pos: [5.5, -2.5, 2.5], color: '#f43f5e', radius: 1.1 },
      // Pathway nodes
      { id: 'il6', label: 'IL-6 CYTOKINE', pos: [1.5, 5, -2], color: '#a855f7', radius: 0.75 },
      { id: 'ace2', label: 'AAK1 ENDOCYTOSIS', pos: [-2, -4.8, -2], color: '#a855f7', radius: 0.75 },
      { id: 'tnf', label: 'TNF-ALPHA', pos: [-3, 4.2, 1.5], color: '#38bdf8', radius: 0.65 },
      { id: 'stat3', label: 'STAT3 SIGNAL', pos: [3.5, 4.5, 2], color: '#38bdf8', radius: 0.65 },
    ];

    // Edges between nodes
    const edges: [number, number][] = [
      [0, 1], [0, 2], [0, 6], // Drug connects to JAK1, JAK2, and Endocytosis
      [1, 3], // JAK1 connects to Arthritis
      [1, 5], [2, 5], // Kinases connect to IL-6 Cytokine
      [2, 4], [6, 4], // Kinases and Endocytosis connect to SARS-CoV-2
      [1, 7], [2, 8], [5, 4] // Cross pathways
    ];

    // Create Node Meshes
    nodes.forEach((node) => {
      const geo = new THREE.SphereGeometry(node.radius, 24, 24);
      const mat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(node.color),
        emissive: new THREE.Color(node.color),
        emissiveIntensity: 0.6,
        roughness: 0.2,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(...node.pos);
      graphGroup.add(mesh);

      // Glowing outer ring for central drug
      if (node.id === 'drug' || node.id === 'covid') {
        const ringGeo = new THREE.TorusGeometry(node.radius * 1.5, 0.05, 16, 64);
        const ringMat = new THREE.MeshBasicMaterial({
          color: new THREE.Color(node.color),
          transparent: true,
          opacity: 0.5,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.position.set(...node.pos);
        ring.rotation.x = Math.PI / 3;
        graphGroup.add(ring);
      }
    });

    // Create Connecting Energy Beams
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.5,
      linewidth: 2,
    });

    edges.forEach(([aIdx, bIdx]) => {
      const p1 = new THREE.Vector3(...nodes[aIdx].pos);
      const p2 = new THREE.Vector3(...nodes[bIdx].pos);

      const lineGeo = new THREE.BufferGeometry().setFromPoints([p1, p2]);
      const line = new THREE.Line(lineGeo, lineMat);
      graphGroup.add(line);
    });

    // Floating Data Signal Packets moving along edges
    const packetCount = 20;
    const packetGeo = new THREE.SphereGeometry(0.18, 12, 12);
    const packetMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });

    const packets: { mesh: THREE.Mesh; edgeIdx: number; progress: number; speed: number }[] = [];
    for (let i = 0; i < packetCount; i++) {
      const edgeIdx = i % edges.length;
      const mesh = new THREE.Mesh(packetGeo, packetMat);
      graphGroup.add(mesh);
      packets.push({
        mesh,
        edgeIdx,
        progress: Math.random(),
        speed: 0.005 + Math.random() * 0.008,
      });
    }

    // Lights
    const amb = new THREE.AmbientLight(0xffffff, 1.3);
    scene.add(amb);

    const light1 = new THREE.PointLight(accentColor, 4, 50);
    light1.position.set(10, 10, 10);
    scene.add(light1);

    const light2 = new THREE.PointLight('#00f2fe', 3, 50);
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

      // Slow 3D orbital tumble
      graphGroup.rotation.y += 0.008;
      graphGroup.rotation.x = Math.sin(t * 0.4) * 0.15 + mouseY * 0.25;
      graphGroup.rotation.z = Math.cos(t * 0.3) * 0.1 + mouseX * 0.25;

      // Animate packet signals flowing through edges
      packets.forEach((pkt) => {
        pkt.progress += pkt.speed;
        if (pkt.progress > 1) pkt.progress = 0;

        const [aIdx, bIdx] = edges[pkt.edgeIdx];
        const pA = new THREE.Vector3(...nodes[aIdx].pos);
        const pB = new THREE.Vector3(...nodes[bIdx].pos);
        pkt.mesh.position.lerpVectors(pA, pB, pkt.progress);
      });

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
      packetGeo.dispose();
      packetMat.dispose();
      lineMat.dispose();
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
