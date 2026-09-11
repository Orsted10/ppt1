import type { SlideProps } from '../types';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { scrambleText } from '../utils/scrambleText';

const Slide11: React.FC<SlideProps> = ({ isActive, currentStep, onTotalStepsChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const beltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onTotalStepsChange(2);
  }, [onTotalStepsChange]);

  useEffect(() => {
    if (isActive) {
      gsap.to(containerRef.current, { autoAlpha: 1, duration: 0.8 });
      gsap.set(titleRef.current, { opacity: 0 });
      gsap.to(titleRef.current, { opacity: 1, duration: 1, delay: 0.2 });
      if (titleRef.current) scrambleText(titleRef.current, "MANUFACTURING & SCALE", 1200);

      gsap.set(beltRef.current, { opacity: 0, scaleX: 0, transformOrigin: 'left' });
    } else {
      gsap.to(containerRef.current, { autoAlpha: 0, duration: 0.5 });
    }
  }, [isActive]);

  useEffect(() => {
    if (!isActive) return;

    if (currentStep === 1) {
      gsap.to(beltRef.current, { opacity: 1, scaleX: 1, duration: 1.5, ease: 'power4.out' });
    }

    if (currentStep < 1) {
      gsap.to(beltRef.current, { opacity: 0, scaleX: 0, duration: 0.5 });
    }
  }, [currentStep, isActive]);

  return (
    <div ref={containerRef} className="slide-container" style={{ zIndex: isActive ? 10 : 1 }}>
      <div className="slide-content">
        <h2 ref={titleRef} style={{ fontSize: '4.5rem', marginBottom: '4rem' }}>MANUFACTURING & SCALE</h2>

        <div className="tech-panel interactable" style={{ maxWidth: '800px', marginBottom: '4rem' }}>
          <p style={{ color: 'var(--text-color)' }}>
            AI optimizes the chemical synthesis pathways. What looks good on a computer screen must be physically manufacturable at a massive scale. AI determines the most efficient, cost-effective, and environmentally friendly way to synthesize the drug.
          </p>
        </div>

        <div style={{ position: 'relative', width: '100%', height: '100px', borderBottom: '2px dashed var(--border)' }}>
          <div ref={beltRef} style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '2px', backgroundColor: 'var(--accent-primary)' }}>
            <div className="mono-text" style={{ position: 'absolute', top: '-2rem', right: '0', color: 'var(--accent-primary)', fontSize: '0.8rem' }}>SYNTHESIS_PATHWAY_OPTIMIZED</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide11;
