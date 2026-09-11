import type { SlideProps } from '../types';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { scrambleText } from '../utils/scrambleText';

const Slide6: React.FC<SlideProps> = ({ isActive, currentStep, onTotalStepsChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const unitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onTotalStepsChange(2);
  }, [onTotalStepsChange]);

  useEffect(() => {
    if (isActive) {
      gsap.to(containerRef.current, { autoAlpha: 1, duration: 0.8 });
      gsap.set(titleRef.current, { y: 30, opacity: 0 });
      gsap.set([numberRef.current, unitRef.current], { scale: 0.9, opacity: 0 });

      gsap.to(titleRef.current, { y: 0, opacity: 1, duration: 1, ease: 'expo.out', delay: 0.2 });
      if (titleRef.current) scrambleText(titleRef.current, "VIRTUAL SCREENING", 1000);
    } else {
      gsap.to(containerRef.current, { autoAlpha: 0, duration: 0.5 });
    }
  }, [isActive]);

  useEffect(() => {
    if (!isActive) return;

    if (currentStep === 1) {
      gsap.to([numberRef.current, unitRef.current], { scale: 1, opacity: 1, duration: 0.5, ease: 'expo.out' });
      
      const obj = { val: 0 };
      gsap.to(obj, {
        val: 1000000000,
        duration: 2,
        ease: 'power4.inOut',
        onUpdate: () => {
          if (numberRef.current) numberRef.current.innerText = Math.floor(obj.val).toLocaleString();
        }
      });
    }

    if (currentStep < 1) {
      gsap.to([numberRef.current, unitRef.current], { scale: 0.9, opacity: 0, duration: 0.3 });
      if (numberRef.current) numberRef.current.innerText = "0";
    }
  }, [currentStep, isActive]);

  return (
    <div ref={containerRef} className="slide-container" style={{ zIndex: isActive ? 10 : 1 }}>
      <div className="slide-content interactable" style={{ alignItems: 'center', justifyContent: 'center' }}>
        <h2 ref={titleRef} style={{ fontSize: '3rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
          VIRTUAL SCREENING
        </h2>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
          <div ref={numberRef} className="mono-text" style={{ fontSize: '10rem', fontWeight: 700, color: 'var(--accent-primary)', lineHeight: 1 }}>
            0
          </div>
          <div ref={unitRef} className="mono-text" style={{ fontSize: '2rem', color: 'var(--text-muted)' }}>
            COMPOUNDS / SEC
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide6;
