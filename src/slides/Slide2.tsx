import type { SlideProps } from '../types';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Slide2: React.FC<SlideProps> = ({ isActive, currentStep, onTotalStepsChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const box1Ref = useRef<HTMLDivElement>(null);
  const box2Ref = useRef<HTMLDivElement>(null);
  const box3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onTotalStepsChange(4);
  }, [onTotalStepsChange]);

  useEffect(() => {
    if (isActive) {
      gsap.to(containerRef.current, { autoAlpha: 1, duration: 0.8 });
      gsap.set(titleRef.current, { y: -50, opacity: 0 });
      gsap.set([box1Ref.current, box2Ref.current, box3Ref.current], { scaleX: 0, opacity: 0, transformOrigin: 'left center' });
      
      gsap.to(titleRef.current, { y: 0, opacity: 1, duration: 1, ease: 'expo.out', delay: 0.2 });
    } else {
      gsap.to(containerRef.current, { autoAlpha: 0, duration: 0.5 });
    }
  }, [isActive]);

  useEffect(() => {
    if (!isActive) return;

    if (currentStep === 1) gsap.to(box1Ref.current, { scaleX: 1, opacity: 1, duration: 0.8, ease: 'power4.out' });
    if (currentStep === 2) gsap.to(box2Ref.current, { scaleX: 1, opacity: 1, duration: 0.8, ease: 'power4.out' });
    if (currentStep === 3) gsap.to(box3Ref.current, { scaleX: 1, opacity: 1, duration: 0.8, ease: 'power4.out' });

    if (currentStep < 3) gsap.to(box3Ref.current, { scaleX: 0, opacity: 0, duration: 0.4 });
    if (currentStep < 2) gsap.to(box2Ref.current, { scaleX: 0, opacity: 0, duration: 0.4 });
    if (currentStep < 1) gsap.to(box1Ref.current, { scaleX: 0, opacity: 0, duration: 0.4 });

  }, [currentStep, isActive]);

  const boxStyle: React.CSSProperties = {
    flex: 1,
    padding: '3rem 2rem',
    margin: '0 1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '1rem',
    borderBottom: '1px solid var(--border)'
  };

  return (
    <div ref={containerRef} className="slide-container" style={{ zIndex: isActive ? 10 : 1 }}>
      <div className="slide-content" style={{ justifyContent: 'center' }}>
        
        <h2 ref={titleRef} style={{ fontSize: '4rem', marginBottom: '4rem' }}>
          THE TRADITIONAL<br/>BOTTLENECK
        </h2>

        <div style={{ display: 'flex', width: '100%', maxWidth: '1400px' }}>
          
          <div ref={box1Ref} className="tech-panel" style={boxStyle}>
            <div className="mono-text" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>// METRIC_01: TIME</div>
            <div style={{ fontSize: '4rem', fontWeight: 700, color: 'var(--text-color)' }}>10-15</div>
            <div className="mono-text" style={{ fontSize: '1rem', color: 'var(--accent-primary)' }}>YEARS TO MARKET</div>
          </div>

          <div ref={box2Ref} className="tech-panel" style={boxStyle}>
            <div className="mono-text" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>// METRIC_02: COST</div>
            <div style={{ fontSize: '4rem', fontWeight: 700, color: 'var(--text-color)' }}>$2.6B</div>
            <div className="mono-text" style={{ fontSize: '1rem', color: 'var(--accent-primary)' }}>AVERAGE R&D COST</div>
          </div>

          <div ref={box3Ref} className="tech-panel" style={{ ...boxStyle, borderColor: '#ef4444' }}>
            <div className="mono-text" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>// METRIC_03: RISK</div>
            <div style={{ fontSize: '4rem', fontWeight: 700, color: '#ef4444' }}>90%</div>
            <div className="mono-text" style={{ fontSize: '1rem', color: '#ef4444' }}>CLINICAL FAILURE RATE</div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Slide2;
