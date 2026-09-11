import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const ScannerSweep: React.FC = () => {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lineRef.current) return;
    
    // Smooth scanning up and down
    gsap.to(lineRef.current, {
      top: '100%',
      duration: 8,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    });
  }, []);

  return (
    <div 
      style={{
        position: 'absolute',
        top: 0, left: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 6, overflow: 'hidden'
      }}
    >
      <div 
        ref={lineRef}
        style={{
          position: 'absolute',
          top: '0%', left: 0, width: '100%', height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(198,67,43,0.5), transparent)',
          boxShadow: '0 0 20px rgba(198,67,43,0.8)'
        }}
      ></div>
    </div>
  );
};
