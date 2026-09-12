import type { SlideProps } from '../types';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { scrambleText } from '../utils/scrambleText';

const Slide5: React.FC<SlideProps> = ({ isActive, currentStep, onTotalStepsChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  const hex1Ref = useRef<HTMLDivElement>(null);
  const hex2Ref = useRef<HTMLDivElement>(null);
  const hex3Ref = useRef<HTMLDivElement>(null);
  const hex4Ref = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    onTotalStepsChange(5);
  }, [onTotalStepsChange]);

  useEffect(() => {
    if (isActive) {
      gsap.to(containerRef.current, { autoAlpha: 1, duration: 0.8 });
      gsap.set(titleRef.current, { y: -30, opacity: 0 });
      gsap.set([hex1Ref.current, hex2Ref.current, hex3Ref.current, hex4Ref.current], { scale: 0, opacity: 0, rotation: -45 });
      linesRef.current.forEach(l => gsap.set(l, { scaleX: 0 }));
      
      gsap.to(titleRef.current, { y: 0, opacity: 1, duration: 1, delay: 0.2 });
      if (titleRef.current) scrambleText(titleRef.current, "MOLECULE GENERATION", 1200);

    } else {
      gsap.to(containerRef.current, { autoAlpha: 0, duration: 0.5 });
    }
  }, [isActive]);

  useEffect(() => {
    if (!isActive) return;

    if (currentStep === 1) gsap.to(hex1Ref.current, { scale: 1, opacity: 1, rotation: 0, duration: 0.6, ease: 'back.out(1.7)' });
    if (currentStep === 2) {
      gsap.to(linesRef.current[0], { scaleX: 1, duration: 0.3, transformOrigin: 'left' });
      gsap.to(hex2Ref.current, { scale: 1, opacity: 1, rotation: 0, duration: 0.6, ease: 'back.out(1.7)', delay: 0.2 });
    }
    if (currentStep === 3) {
      gsap.to(linesRef.current[1], { scaleX: 1, duration: 0.3, transformOrigin: 'left' });
      gsap.to(hex3Ref.current, { scale: 1, opacity: 1, rotation: 0, duration: 0.6, ease: 'back.out(1.7)', delay: 0.2 });
    }
    if (currentStep === 4) {
      gsap.to(linesRef.current[2], { scaleX: 1, duration: 0.3, transformOrigin: 'left' });
      gsap.to(hex4Ref.current, { scale: 1, opacity: 1, rotation: 0, duration: 0.6, ease: 'back.out(1.7)', delay: 0.2 });
      
      gsap.to([hex1Ref.current, hex2Ref.current, hex3Ref.current, hex4Ref.current], {
        borderColor: 'var(--accent-primary)',
        color: 'var(--accent-primary)',
        boxShadow: '0 0 20px rgba(198, 67, 43, 0.4)',
        duration: 0.5, delay: 0.5
      });
    }

    if (currentStep < 4) {
      gsap.to(hex4Ref.current, { scale: 0, opacity: 0, rotation: -45, duration: 0.3 });
      gsap.to(linesRef.current[2], { scaleX: 0, duration: 0.3 });
      gsap.to([hex1Ref.current, hex2Ref.current, hex3Ref.current], { borderColor: 'var(--border)', color: 'var(--text-color)', boxShadow: 'none', duration: 0.3 });
    }
    if (currentStep < 3) {
      gsap.to(hex3Ref.current, { scale: 0, opacity: 0, rotation: -45, duration: 0.3 });
      gsap.to(linesRef.current[1], { scaleX: 0, duration: 0.3 });
    }
    if (currentStep < 2) {
      gsap.to(hex2Ref.current, { scale: 0, opacity: 0, rotation: -45, duration: 0.3 });
      gsap.to(linesRef.current[0], { scaleX: 0, duration: 0.3 });
    }
    if (currentStep < 1) gsap.to(hex1Ref.current, { scale: 0, opacity: 0, rotation: -45, duration: 0.3 });

  }, [currentStep, isActive]);

  const hexStyle: React.CSSProperties = {
    position: 'absolute', width: '60px', height: '69px', border: '2px solid var(--border)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: 'var(--font-mono)', fontSize: '1rem',
    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
    backgroundColor: 'var(--bg-color)', zIndex: 2
  };
  
  const lineStyle: React.CSSProperties = {
    position: 'absolute', height: '2px', backgroundColor: 'var(--border)', zIndex: 1
  };

  return (
    <div ref={containerRef} className="slide-container" style={{ zIndex: isActive ? 10 : 1 }}>
      <div className="slide-content" style={{ alignItems: 'center', justifyContent: 'center' }}>
        <h2 ref={titleRef} style={{ fontSize: '4.5rem', marginBottom: '4rem', textAlign: 'center' }}>
          MOLECULE GENERATION
        </h2>

        <div className="interactable" style={{ position: 'relative', width: '500px', height: '300px' }}>
          <div className="mono-text" style={{ position: 'absolute', top: 0, left: 0, color: 'var(--text-muted)', fontSize: '0.75rem' }}>// GEN_MODEL: DIFFUSION</div>
          <div ref={hex1Ref} style={{ ...hexStyle, top: '50%', left: '30%', transform: 'translate(-50%, -50%)' }}>C</div>
          <div ref={el => { if (el) linesRef.current[0] = el; }} style={{ ...lineStyle, top: '50%', left: '30%', width: '100px', transform: 'rotate(-30deg)' }}></div>
          <div ref={hex2Ref} style={{ ...hexStyle, top: 'calc(50% - 50px)', left: 'calc(30% + 86px)', transform: 'translate(-50%, -50%)' }}>N</div>
          <div ref={el => { if (el) linesRef.current[1] = el; }} style={{ ...lineStyle, top: '50%', left: '30%', width: '100px', transform: 'rotate(30deg)' }}></div>
          <div ref={hex3Ref} style={{ ...hexStyle, top: 'calc(50% + 50px)', left: 'calc(30% + 86px)', transform: 'translate(-50%, -50%)' }}>O</div>
          <div ref={el => { if (el) linesRef.current[2] = el; }} style={{ ...lineStyle, top: 'calc(50% + 50px)', left: 'calc(30% + 86px)', width: '100px' }}></div>
          <div ref={hex4Ref} style={{ ...hexStyle, top: 'calc(50% + 50px)', left: 'calc(30% + 186px)', transform: 'translate(-50%, -50%)' }}>H</div>
        </div>
      </div>
    </div>
  );
};

export default Slide5;
