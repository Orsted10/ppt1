import type { SlideProps } from '../types';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { scrambleText } from '../utils/scrambleText';

const Slide14: React.FC<SlideProps> = ({ isActive, currentStep, onTotalStepsChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onTotalStepsChange(2);
  }, [onTotalStepsChange]);

  useEffect(() => {
    if (isActive) {
      gsap.to(containerRef.current, { autoAlpha: 1, duration: 0.8 });
      gsap.set([titleRef.current, textRef.current], { opacity: 0 });
      gsap.to(titleRef.current, { opacity: 1, duration: 1, delay: 0.2 });
      if (titleRef.current) scrambleText(titleRef.current, "THE ETHICAL FRONTIER", 1200);

    } else {
      gsap.to(containerRef.current, { autoAlpha: 0, duration: 0.5 });
    }
  }, [isActive]);

  useEffect(() => {
    if (!isActive) return;
    if (currentStep === 1) gsap.to(textRef.current, { opacity: 1, duration: 1 });
    if (currentStep < 1) gsap.to(textRef.current, { opacity: 0, duration: 0.5 });
  }, [currentStep, isActive]);

  return (
    <div ref={containerRef} className="slide-container" style={{ zIndex: isActive ? 10 : 1 }}>
      <div className="slide-content">
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', borderLeft: '1px solid var(--border)', paddingLeft: '4rem' }}>
          <h2 ref={titleRef} style={{ fontSize: '4.5rem', marginBottom: '2rem' }}>THE ETHICAL FRONTIER</h2>
          
          <div ref={textRef} className="interactable" style={{ maxWidth: '800px' }}>
            <p className="mono-text" style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }}>WARNING: UNCHARTED TERRITORY</p>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)' }}>
              With this immense power comes profound responsibility. We must navigate data privacy, algorithmic bias, and ensure equitable access to these miraculous new treatments globally.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide14;
