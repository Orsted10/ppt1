import type { SlideProps } from '../types';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { scrambleText } from '../utils/scrambleText';

const Slide13: React.FC<SlideProps> = ({ isActive, currentStep, onTotalStepsChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onTotalStepsChange(2);
  }, [onTotalStepsChange]);

  useEffect(() => {
    if (isActive) {
      gsap.to(containerRef.current, { autoAlpha: 1, duration: 0.8 });
      gsap.set(titleRef.current, { opacity: 0, y: 30 });
      gsap.to(titleRef.current, { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: 'expo.out' });
      if (titleRef.current) scrambleText(titleRef.current, "HUMAN-AI SYNERGY", 1000);

      gsap.set(textRef.current, { opacity: 0, y: 30 });
    } else {
      gsap.to(containerRef.current, { autoAlpha: 0, duration: 0.5 });
    }
  }, [isActive]);

  useEffect(() => {
    if (!isActive) return;
    if (currentStep === 1) {
      gsap.to(textRef.current, { opacity: 1, y: 0, duration: 1, ease: 'expo.out' });
    }
    if (currentStep < 1) {
      gsap.to(textRef.current, { opacity: 0, y: 30, duration: 0.5 });
    }
  }, [currentStep, isActive]);

  return (
    <div ref={containerRef} className="slide-container" style={{ zIndex: isActive ? 10 : 1 }}>
      <div className="slide-content" style={{ alignItems: 'center', justifyContent: 'center' }}>
        <h2 ref={titleRef} style={{ fontSize: '4.5rem', marginBottom: '3rem', textAlign: 'center' }}>HUMAN-AI SYNERGY</h2>

        <div ref={textRef} className="tech-panel interactable" style={{ maxWidth: '900px', textAlign: 'center' }}>
          <p style={{ fontSize: '1.5rem', lineHeight: 1.6, color: 'var(--text-color)' }}>
            AI is not replacing scientists. It is giving them super-powers. The future belongs to the <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>Cyborg Researcher</span>—human intuition and creativity, amplified by machine intelligence.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Slide13;
