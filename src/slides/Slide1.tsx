import type { SlideProps } from '../types';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Slide1: React.FC<SlideProps> = ({ isActive, currentStep, onTotalStepsChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  // Steps:
  // 0: title and subtitle
  // 1: reveal visual (tech core)
  // 2: reveal extra text
  useEffect(() => {
    onTotalStepsChange(3);
  }, [onTotalStepsChange]);

  useEffect(() => {
    if (isActive) {
      gsap.to(containerRef.current, { autoAlpha: 1, duration: 0.8 });
      
      gsap.set([subtitleRef.current, titleRef.current, textRef.current], { x: -50, opacity: 0 });
      gsap.set(visualRef.current, { scale: 0.8, opacity: 0, rotation: 45 });
      
      gsap.to(subtitleRef.current, { x: 0, opacity: 1, duration: 0.8, ease: 'power4.out', delay: 0.2 });
      gsap.to(titleRef.current, { x: 0, opacity: 1, duration: 1, ease: 'power4.out', delay: 0.4 });
    } else {
      gsap.to(containerRef.current, { autoAlpha: 0, duration: 0.5 });
    }
  }, [isActive]);

  useEffect(() => {
    if (!isActive) return;

    if (currentStep === 1) {
      gsap.to(visualRef.current, {
        scale: 1, opacity: 1, rotation: 0, duration: 1.2, ease: 'expo.out'
      });
    }

    if (currentStep === 2) {
      gsap.to(textRef.current, { x: 0, opacity: 1, duration: 0.8, ease: 'power4.out' });
      gsap.to(visualRef.current, { x: 100, duration: 1, ease: 'power4.out' });
    }

    if (currentStep < 2) {
      gsap.to(textRef.current, { opacity: 0, x: -50, duration: 0.4 });
      gsap.to(visualRef.current, { x: 0, duration: 0.8, ease: 'power4.out' });
    }
    if (currentStep < 1) {
      gsap.to(visualRef.current, { opacity: 0, scale: 0.8, rotation: 45, duration: 0.4 });
    }

  }, [currentStep, isActive]);

  return (
    <div ref={containerRef} className="slide-container" style={{ zIndex: isActive ? 10 : 1 }}>
      <div className="slide-content" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        
        <div style={{ flex: 1, paddingRight: '4rem' }}>
          <div ref={subtitleRef} className="mono-text" style={{ fontSize: '0.875rem', color: 'var(--accent-primary)', marginBottom: '2rem' }}>
            // INIT_SEQUENCE: 01
          </div>
          <h1 ref={titleRef} style={{ fontSize: '5.5rem', marginBottom: '2rem', lineHeight: 1 }}>
            THE DAWN <br/>OF A NEW ERA
          </h1>
          <div ref={textRef} className="tech-panel" style={{ marginTop: '3rem', maxWidth: '600px' }}>
            <p className="mono-text" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>SYSTEM_LOG: MEDICAL REVOLUTION</p>
            <p style={{ fontSize: '1.25rem' }}>
              For decades, discovering a new drug has been a grueling marathon. But we are standing at the edge of a revolution, where artificial intelligence collapses timelines and reimagines the possibilities of human health.
            </p>
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <div ref={visualRef} style={{ width: '400px', height: '400px', border: '1px solid var(--accent-primary)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'absolute', inset: '1rem', border: '1px dashed var(--text-muted)' }}></div>
            <div style={{ width: '50%', height: '50%', backgroundColor: 'var(--accent-primary)', filter: 'blur(60px)', opacity: 0.5 }}></div>
            <div className="mono-text" style={{ position: 'absolute', bottom: '-2rem', right: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>DATA_CORE_ACTIVE</div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Slide1;
