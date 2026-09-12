import React, { useEffect, useRef } from 'react';

export const BiotechBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    // Floating bioluminescent light particles
    const numParticles = 45;
    const particles = Array.from({ length: numParticles }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2.5 + 1,
      baseAlpha: Math.random() * 0.35 + 0.15,
      hue: Math.random() > 0.5 ? 185 : 155, // Cyan & Emerald bioluminescence
    }));

    let t = 0;
    const render = () => {
      t += 0.01;
      ctx.clearRect(0, 0, width, height);

      // Render floating bioluminescent particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const pulse = Math.sin(t * 2 + p.x * 0.01) * 0.15;
        const alpha = Math.max(0.05, p.baseAlpha + pulse);

        const grad = ctx.createRadialGradient(
          p.x, p.y, 0,
          p.x, p.y, p.radius * 4
        );
        grad.addColorStop(0, `hsla(${p.hue}, 90%, 65%, ${alpha})`);
        grad.addColorStop(1, `hsla(${p.hue}, 90%, 65%, 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2);
        ctx.fill();
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
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 0,
      }}
    >
      {/* Ambient Radial Bioluminescent Glows */}
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          left: '10%',
          width: '50vw',
          height: '50vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 242, 254, 0.06) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-20%',
          right: '5%',
          width: '60vw',
          height: '60vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, transparent 70%)',
          filter: 'blur(90px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '35%',
          right: '25%',
          width: '40vw',
          height: '40vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.04) 0%, transparent 70%)',
          filter: 'blur(90px)',
        }}
      />

      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
};
