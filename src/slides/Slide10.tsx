import type { SlideProps } from '../types';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Slide10: React.FC<SlideProps> = ({ isActive, currentStep, onTotalStepsChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const transformBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onTotalStepsChange(2);
  }, [onTotalStepsChange]);

  useEffect(() => {
    if (isActive) {
      gsap.to(containerRef.current, { autoAlpha: 1, duration: 0.8 });
      gsap.set(titleRef.current, { opacity: 0 });
      gsap.set([boxRef.current, transformBoxRef.current], { opacity: 0, x: -50 });

      gsap.to(titleRef.current, { opacity: 1, duration: 1, delay: 0.2 });
      gsap.to(boxRef.current, { opacity: 1, x: 0, duration: 1, ease: 'expo.out', delay: 0.4 });
    } else {
      gsap.to(containerRef.current, { autoAlpha: 0, duration: 0.5 });
    }
  }, [isActive]);

  useEffect(() => {
    if (!isActive) return;

    if (currentStep === 1) {
      gsap.to(transformBoxRef.current, { opacity: 1, x: 0, duration: 0.8, ease: 'expo.out' });
      gsap.to(boxRef.current, { opacity: 0.3, duration: 0.8 });
    }

    if (currentStep < 1) {
      gsap.to(transformBoxRef.current, { opacity: 0, x: -50, duration: 0.4 });
      gsap.to(boxRef.current, { opacity: 1, duration: 0.4 });
    }
  }, [currentStep, isActive]);

  return (
    <div ref={containerRef} className="slide-container" style={{ zIndex: isActive ? 10 : 1 }}>
      <div className="slide-content">
        <h2 ref={titleRef} style={{ fontSize: '4.5rem', marginBottom: '4rem' }}>DRUG REPURPOSING</h2>

        <div style={{ display: 'flex', gap: '4rem', alignItems: 'center' }}>
          <div ref={boxRef} className="tech-panel" style={{ flex: 1 }}>
            <div className="mono-text" style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>KNOWN COMPOUND // SAFE</div>
            <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>EXISTING DRUG</h3>
            <p style={{ color: 'var(--text-muted)' }}>Originally designed for Disease A, it has already passed human safety trials but is currently sitting on the shelf.</p>
          </div>

          <div className="mono-text" style={{ fontSize: '2rem', color: 'var(--accent-primary)' }}>{'>>'}</div>

          <div ref={transformBoxRef} className="tech-panel" style={{ flex: 1, borderColor: 'var(--accent-primary)' }}>
            <div className="mono-text" style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }}>AI DISCOVERY // MATCH FOUND</div>
            <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--accent-primary)' }}>NEW APPLICATION</h3>
            <p style={{ color: 'var(--text-color)' }}>AI models discover that its molecular structure perfectly binds to the target for Disease B. A completely new treatment, ready in months instead of years.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide10;
