import type { SlideProps } from '../types';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { scrambleText } from '../utils/scrambleText';

const Slide7: React.FC<SlideProps> = ({ isActive, currentStep, onTotalStepsChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onTotalStepsChange(3);
  }, [onTotalStepsChange]);

  useEffect(() => {
    if (isActive) {
      gsap.to(containerRef.current, { autoAlpha: 1, duration: 0.8 });
      gsap.set(titleRef.current, { y: 30, opacity: 0 });
      gsap.set([card1Ref.current, card2Ref.current], { y: 30, opacity: 0 });

      gsap.to(titleRef.current, { y: 0, opacity: 1, duration: 1, ease: 'expo.out', delay: 0.2 });
      if (titleRef.current) scrambleText(titleRef.current, "PREDICTING TOXICITY", 1000);
    } else {
      gsap.to(containerRef.current, { autoAlpha: 0, duration: 0.5 });
    }
  }, [isActive]);

  useEffect(() => {
    if (!isActive) return;

    if (currentStep === 1) gsap.to(card1Ref.current, { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out' });
    if (currentStep === 2) gsap.to(card2Ref.current, { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out' });

    if (currentStep < 2) gsap.to(card2Ref.current, { y: 30, opacity: 0, duration: 0.3 });
    if (currentStep < 1) gsap.to(card1Ref.current, { y: 30, opacity: 0, duration: 0.3 });
  }, [currentStep, isActive]);

  return (
    <div ref={containerRef} className="slide-container" style={{ zIndex: isActive ? 10 : 1 }}>
      <div className="slide-content">
        <h2 ref={titleRef} style={{ fontSize: '4.5rem', marginBottom: '3rem' }}>PREDICTING TOXICITY</h2>

        <div style={{ display: 'flex', gap: '2rem', maxWidth: '1200px' }}>
          
          <div ref={card1Ref} className="tech-panel interactable" style={{ flex: 1, borderTop: '2px solid #ef4444' }}>
            <div className="mono-text" style={{ color: '#ef4444', marginBottom: '2rem' }}>[TRADITIONAL] FAIL LATE</div>
            <p style={{ color: 'var(--text-muted)' }}>Toxicity is often discovered only during late-stage human trials, wasting billions of dollars and years of research.</p>
          </div>

          <div ref={card2Ref} className="tech-panel interactable" style={{ flex: 1, borderTop: '2px solid var(--accent-primary)' }}>
            <div className="mono-text" style={{ color: 'var(--accent-primary)', marginBottom: '2rem' }}>[AI MODEL] FAIL FAST</div>
            <p style={{ color: 'var(--text-color)' }}>Deep learning models predict adverse reactions and off-target effects in silicon before a single physical synthesis occurs.</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Slide7;
