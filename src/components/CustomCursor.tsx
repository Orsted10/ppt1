import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Hide default cursor on the whole body
    document.body.style.cursor = 'none';

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power2.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power2.out" });

    const onMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onMouseDown = () => {
      gsap.to(cursor, { scale: 0.7, duration: 0.1 });
    };

    const onMouseUp = () => {
      gsap.to(cursor, { scale: 1, duration: 0.1 });
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    // Make elements with pointer turn the cursor into an interactive state
    const addHoverEvents = () => {
      const interactables = document.querySelectorAll('button, a, .interactable');
      interactables.forEach(el => {
        el.addEventListener('mouseenter', () => {
          gsap.to(cursor, { scale: 1.5, rotation: 45, borderColor: 'var(--accent-primary)', duration: 0.2 });
        });
        el.addEventListener('mouseleave', () => {
          gsap.to(cursor, { scale: 1, rotation: 0, borderColor: 'rgba(255, 255, 255, 0.4)', duration: 0.2 });
        });
      });
    };

    // A quick hack: poll to add hover events as DOM changes (since slides mount/unmount)
    const interval = setInterval(addHoverEvents, 1000);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      clearInterval(interval);
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '32px',
        height: '32px',
        border: '1px solid rgba(255, 255, 255, 0.4)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mixBlendMode: 'difference'
      }}
    >
      <div style={{ width: '4px', height: '4px', backgroundColor: 'var(--accent-primary)', borderRadius: '50%' }}></div>
    </div>
  );
};
