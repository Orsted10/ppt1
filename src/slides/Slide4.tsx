import type { SlideProps } from '../types';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { scrambleText } from '../utils/scrambleText';

const Slide4: React.FC<SlideProps> = ({ isActive, currentStep, onTotalStepsChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const targetAreaRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onTotalStepsChange(3);
  }, [onTotalStepsChange]);

  useEffect(() => {
    if (isActive) {
      gsap.to(containerRef.current, { autoAlpha: 1, duration: 0.8 });
      gsap.set(titleRef.current, { y: -30, opacity: 0 });
      gsap.to(titleRef.current, { y: 0, opacity: 1, duration: 1, delay: 0.2 });
      if (titleRef.current) scrambleText(titleRef.current, "TARGET IDENTIFICATION", 1200);

      dotsRef.current.forEach((dot) => {
        if (!dot) return;
        gsap.to(dot, {
          x: 'random(-150, 150)', y: 'random(-150, 150)', duration: 'random(1, 3)', repeat: -1, yoyo: true, ease: 'sine.inOut'
        });
      });
      
      gsap.set(lineRef.current, { scaleX: 0, opacity: 0 });
      gsap.set(infoRef.current, { opacity: 0, x: 30 });
      
    } else {
      gsap.to(containerRef.current, { autoAlpha: 0, duration: 0.5 });
      dotsRef.current.forEach(dot => gsap.killTweensOf(dot));
    }
  }, [isActive]);

  useEffect(() => {
    if (!isActive) return;
    
    const targetDot = dotsRef.current[4];

    if (currentStep === 1) {
      gsap.killTweensOf(targetDot);
      gsap.to(targetDot, {
        scale: 3, backgroundColor: 'var(--accent-primary)',
        x: 0, y: 0, duration: 0.5, ease: 'expo.out'
      });
      dotsRef.current.forEach((dot, i) => {
        if (i !== 4) gsap.to(dot, { opacity: 0.1, duration: 0.5 });
      });
    }

    if (currentStep === 2) {
      gsap.to(lineRef.current, { scaleX: 1, opacity: 1, duration: 0.5, transformOrigin: 'left center', ease: 'expo.out' });
      gsap.to(infoRef.current, { opacity: 1, x: 0, duration: 0.8, delay: 0.2, ease: 'expo.out' });
    }

    if (currentStep < 2) {
      gsap.to(lineRef.current, { scaleX: 0, opacity: 0, duration: 0.3 });
      gsap.to(infoRef.current, { opacity: 0, x: 30, duration: 0.3 });
    }
    
    if (currentStep < 1) {
      gsap.to(targetDot, { scale: 1, backgroundColor: 'var(--text-muted)', duration: 0.5 });
      dotsRef.current.forEach((dot) => {
        gsap.to(dot, { opacity: 1, duration: 0.5 });
        gsap.to(dot, { x: 'random(-150, 150)', y: 'random(-150, 150)', duration: 'random(1, 3)', repeat: -1, yoyo: true, ease: 'sine.inOut' });
      });
    }
  }, [currentStep, isActive]);

  return (
    <div ref={containerRef} className="slide-container" style={{ zIndex: isActive ? 10 : 1 }}>
      <div className="slide-content">
        <h2 ref={titleRef} style={{ fontSize: '4.5rem', marginBottom: '4rem' }}>
          TARGET IDENTIFICATION
        </h2>

        <div style={{ display: 'flex', height: '50vh', position: 'relative' }}>
          <div ref={targetAreaRef} className="interactable" style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)', overflow: 'hidden' }}>
            <div className="mono-text" style={{ position: 'absolute', top: '1rem', left: '1rem', color: 'var(--text-muted)', fontSize: '0.75rem' }}>// SCANNING_GENOME_DB</div>
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={i}
                ref={el => el && (dotsRef.current[i] = el)}
                style={{
                  position: 'absolute', width: '4px', height: '4px', backgroundColor: 'var(--text-muted)',
                  top: `50%`, left: `50%`, zIndex: i === 4 ? 2 : 1
                }}
              />
            ))}
          </div>

          <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
            <div ref={lineRef} style={{ position: 'absolute', left: 0, top: '50%', width: '100px', height: '1px', backgroundColor: 'var(--accent-primary)' }} />
            <div ref={infoRef} className="tech-panel" style={{ marginLeft: '100px', width: 'calc(100% - 100px)' }}>
              <h3 className="mono-text" style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--accent-primary)' }}>TARGET_LOCK: KINASE_P38</h3>
              <p style={{ color: 'var(--text-color)', lineHeight: 1.8 }}>
                AI knowledge graphs analyze literature, omics data, and clinical records to connect diseases with specific biological targets. What takes human researchers years of literature review is computed in seconds.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide4;
