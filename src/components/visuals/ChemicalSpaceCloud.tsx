import React, { useEffect, useRef } from 'react';

export const ChemicalSpaceCloud: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.clientWidth || 400);
    let height = (canvas.height = canvas.clientHeight || 400);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.clientWidth || 400;
      height = canvas.height = canvas.clientHeight || 400;
    };
    window.addEventListener('resize', onResize);

    // 120 streaming chemical stars/compounds
    const numStars = 140;
    const stars = Array.from({ length: numStars }, () => ({
      x: (Math.random() - 0.5) * width * 2,
      y: (Math.random() - 0.5) * height * 2,
      z: Math.random() * 800 + 50,
      baseRadius: Math.random() * 2 + 1,
      hue: Math.random() > 0.4 ? 185 : (Math.random() > 0.5 ? 270 : 155),
    }));

    const cx = width / 2;
    const cy = height / 2;

    const render = () => {
      ctx.fillStyle = 'rgba(4, 6, 10, 0.25)';
      ctx.fillRect(0, 0, width, height);

      // Central AI Docking Vortex
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 180);
      grad.addColorStop(0, 'rgba(0, 242, 254, 0.15)');
      grad.addColorStop(0.5, 'rgba(168, 85, 247, 0.05)');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, 180, 0, Math.PI * 2);
      ctx.fill();

      // Draw concentric target radar rings
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, 40, 0, Math.PI * 2);
      ctx.arc(cx, cy, 90, 0, Math.PI * 2);
      ctx.arc(cx, cy, 150, 0, Math.PI * 2);
      ctx.stroke();

      // Move stars toward viewer
      stars.forEach((star) => {
        star.z -= 6;
        if (star.z <= 10) {
          star.z = 800;
          star.x = (Math.random() - 0.5) * width * 2;
          star.y = (Math.random() - 0.5) * height * 2;
        }

        const k = 350 / star.z;
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const size = Math.max(0.8, (1 - star.z / 800) * 4);
          const alpha = Math.min(1, Math.max(0.1, (1 - star.z / 800) * 1.5));

          ctx.fillStyle = `hsla(${star.hue}, 90%, 65%, ${alpha})`;
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '420px', overflow: 'hidden', borderRadius: '20px' }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
      <div style={{
        position: 'absolute', bottom: '1rem', left: '50%', transform: 'translateX(-50%)',
        background: 'rgba(6, 8, 14, 0.85)', padding: '0.4rem 1.15rem', borderRadius: '9999px',
        border: '1px solid rgba(0, 242, 254, 0.3)', backdropFilter: 'blur(10px)',
        display: 'flex', alignItems: 'center', gap: '0.6rem', whiteSpace: 'nowrap'
      }}>
        <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#00f2fe', boxShadow: '0 0 10px #00f2fe' }} />
        <span className="mono-text" style={{ fontSize: '0.72rem', color: '#ffffff', fontWeight: 700 }}>
          10⁶⁰ CHEMICAL UNIVERSE // DOCKING VORTEX
        </span>
      </div>
    </div>
  );
};
