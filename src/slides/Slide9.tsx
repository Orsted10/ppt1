import type { SlideProps } from '../types';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { scrambleText } from '../utils/scrambleText';

const Slide9: React.FC<SlideProps> = ({ isActive, currentStep, onTotalStepsChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ringsRef = useRef<HTMLDivElement[]>([]);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onTotalStepsChange(2);
  }, [onTotalStepsChange]);

  useEffect(() => {
    if (isActive) {
      gsap.to(containerRef.current, { autoAlpha: 1, duration: 0.8 });
      gsap.set(titleRef.current, { opacity: 0, scale: 0.9 });
      gsap.to(titleRef.current, { opacity: 1, scale: 1, duration: 1, ease: 'power4.out', delay: 0.2 });
      if (titleRef.current) scrambleText(titleRef.current, "PERSONALIZED\nMEDICINE", 1000);

      ringsRef.current.forEach((ring, i) => {
        gsap.set(ring, { scale: 0.5, opacity: 0 });
        gsap.to(ring, { rotation: 360, duration: 20 + i * 10, repeat: -1, ease: 'linear' });
      });
      gsap.set(textRef.current, { opacity: 0, y: 30 });
    } else {
      gsap.to(containerRef.current, { autoAlpha: 0, duration: 0.5 });
      ringsRef.current.forEach(ring => gsap.killTweensOf(ring));
    }
  }, [isActive]);

  useEffect(() => {
    if (!isActive) return;

    if (currentStep === 1) {
      gsap.to(ringsRef.current, { scale: (i) => 1 + i * 0.2, opacity: (i) => 0.8 - i * 0.2, duration: 1.5, stagger: 0.2, ease: 'expo.out' });
      gsap.to(textRef.current, { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: 'expo.out' });
    }

    if (currentStep < 1) {
      gsap.to(ringsRef.current, { scale: 0.5, opacity: 0, duration: 0.5 });
      gsap.to(textRef.current, { opacity: 0, y: 30, duration: 0.5 });
    }
  }, [currentStep, isActive]);

  return (
    <div ref={containerRef} className="slide-container" style={{ zIndex: isActive ? 10 : 1 }}>
      <div className="slide-content interactable" style={{ alignItems: 'center', justifyContent: 'center' }}>
        
        <div style={{ position: 'relative', width: '400px', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '4rem' }}>
          {[0, 1, 2].map(i => (
            <div
              key={i}
              ref={el => { if (el) ringsRef.current[i] = el; }}
              style={{ position: 'absolute', width: `${100 + i * 50}%`, height: `${100 + i * 50}%`, border: `1px dashed ${i === 0 ? 'var(--accent-primary)' : 'var(--text-muted)'}`, borderRadius: '50%' }}
            />
          ))}
          <h2 ref={titleRef} style={{ fontSize: '3rem', textAlign: 'center', zIndex: 10, backgroundColor: 'var(--bg-color)', padding: '1rem' }}>
            PERSONALIZED<br/>MEDICINE
          </h2>
        </div>

        <div ref={textRef} className="tech-panel interactable" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-color)' }}>
            We are moving away from the "one-size-fits-all" paradigm. AI analyzes an individual's unique genetic makeup to tailor treatments specifically for them, maximizing efficacy and eliminating adverse reactions.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Slide9;
