import type { SlideProps } from '../types';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Slide15: React.FC<SlideProps> = ({ isActive, currentStep, onTotalStepsChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onTotalStepsChange(2);
  }, [onTotalStepsChange]);

  useEffect(() => {
    if (isActive) {
      gsap.to(containerRef.current, { autoAlpha: 1, duration: 0.8 });
      gsap.set(titleRef.current, { opacity: 0, scale: 0.9 });
      gsap.set(pulseRef.current, { scale: 0, opacity: 0 });
      gsap.to(titleRef.current, { opacity: 1, scale: 1, duration: 1.5, ease: 'expo.out', delay: 0.2 });
    } else {
      gsap.to(containerRef.current, { autoAlpha: 0, duration: 0.5 });
    }
  }, [isActive]);

  useEffect(() => {
    if (!isActive) return;
    if (currentStep === 1) {
      gsap.to(pulseRef.current, { scale: 3, opacity: 0, duration: 2, repeat: -1, ease: 'power2.out' });
      gsap.to(titleRef.current, { color: 'var(--accent-primary)', duration: 1 });
    }
    if (currentStep < 1) {
      gsap.killTweensOf(pulseRef.current);
      gsap.to(pulseRef.current, { scale: 0, opacity: 0, duration: 0.5 });
      gsap.to(titleRef.current, { color: 'var(--text-color)', duration: 1 });
    }
  }, [currentStep, isActive]);

  return (
    <div ref={containerRef} className="slide-container" style={{ zIndex: isActive ? 10 : 1 }}>
      <div className="slide-content" style={{ alignItems: 'center', justifyContent: 'center' }}>
        
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div ref={pulseRef} style={{ position: 'absolute', width: '200px', height: '200px', borderRadius: '50%', border: '2px solid var(--accent-primary)', opacity: 0 }} />
          <h1 ref={titleRef} style={{ fontSize: '6rem', textAlign: 'center', zIndex: 10, letterSpacing: '-0.02em' }}>
            THE FUTURE<br/>IS NOW
          </h1>
        </div>

      </div>
    </div>
  );
};

export default Slide15;
