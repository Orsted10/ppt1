import type { SlideProps } from '../types';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { scrambleText } from '../utils/scrambleText';

const Slide12: React.FC<SlideProps> = ({ isActive, currentStep, onTotalStepsChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const pointsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    onTotalStepsChange(4);
  }, [onTotalStepsChange]);

  useEffect(() => {
    if (isActive) {
      gsap.to(containerRef.current, { autoAlpha: 1, duration: 0.8 });
      gsap.set(titleRef.current, { opacity: 0 });
      gsap.to(titleRef.current, { opacity: 1, duration: 1, delay: 0.2 });
      if (titleRef.current) scrambleText(titleRef.current, "REAL-WORLD EVIDENCE", 1200);
      
      pointsRef.current.forEach(point => gsap.set(point, { opacity: 0, x: -30 }));
    } else {
      gsap.to(containerRef.current, { autoAlpha: 0, duration: 0.5 });
    }
  }, [isActive]);

  useEffect(() => {
    if (!isActive) return;

    if (currentStep === 1) gsap.to(pointsRef.current[0], { opacity: 1, x: 0, duration: 0.5, ease: 'expo.out' });
    if (currentStep === 2) gsap.to(pointsRef.current[1], { opacity: 1, x: 0, duration: 0.5, ease: 'expo.out' });
    if (currentStep === 3) gsap.to(pointsRef.current[2], { opacity: 1, x: 0, duration: 0.5, ease: 'expo.out' });

    if (currentStep < 3) gsap.to(pointsRef.current[2], { opacity: 0, x: -30, duration: 0.3 });
    if (currentStep < 2) gsap.to(pointsRef.current[1], { opacity: 0, x: -30, duration: 0.3 });
    if (currentStep < 1) gsap.to(pointsRef.current[0], { opacity: 0, x: -30, duration: 0.3 });
  }, [currentStep, isActive]);

  return (
    <div ref={containerRef} className="slide-container" style={{ zIndex: isActive ? 10 : 1 }}>
      <div className="slide-content">
        <h2 ref={titleRef} style={{ fontSize: '4.5rem', marginBottom: '4rem' }}>REAL-WORLD EVIDENCE</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '800px' }}>
          
          <div ref={el => el && (pointsRef.current[0] = el)} className="tech-panel interactable" style={{ borderLeft: '2px solid var(--accent-primary)' }}>
            <div className="mono-text" style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>// POST_MARKET_SURVEILLANCE</div>
            <p>The AI's job isn't done when the drug is approved. It continuously monitors real-world patient data post-launch.</p>
          </div>

          <div ref={el => el && (pointsRef.current[1] = el)} className="tech-panel interactable" style={{ borderLeft: '2px solid var(--accent-primary)' }}>
            <div className="mono-text" style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>// FEEDBACK_LOOP</div>
            <p>It tracks long-term efficacy, extremely rare side effects, and unexpected benefits across millions of diverse patients.</p>
          </div>

          <div ref={el => el && (pointsRef.current[2] = el)} className="tech-panel interactable" style={{ borderLeft: '2px solid var(--accent-primary)' }}>
            <div className="mono-text" style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>// CONTINUOUS_LEARNING</div>
            <p>This data feeds directly back into the AI models, making future predictions even more accurate.</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Slide12;
