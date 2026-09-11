import type { SlideProps } from '../types';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Slide8: React.FC<SlideProps> = ({ isActive, currentStep, onTotalStepsChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const chartLinesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    onTotalStepsChange(2);
  }, [onTotalStepsChange]);

  useEffect(() => {
    if (isActive) {
      gsap.to(containerRef.current, { autoAlpha: 1, duration: 0.8 });
      gsap.set(titleRef.current, { x: -30, opacity: 0 });
      gsap.to(titleRef.current, { x: 0, opacity: 1, duration: 1, ease: 'expo.out', delay: 0.2 });

      chartLinesRef.current.forEach(line => gsap.set(line, { scaleY: 0, transformOrigin: 'bottom' }));
    } else {
      gsap.to(containerRef.current, { autoAlpha: 0, duration: 0.5 });
    }
  }, [isActive]);

  useEffect(() => {
    if (!isActive) return;

    if (currentStep === 1) {
      gsap.to(chartLinesRef.current, {
        scaleY: (i) => 1 - (i * 0.15),
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: 'power4.out'
      });
    }

    if (currentStep < 1) {
      gsap.to(chartLinesRef.current, { scaleY: 0, opacity: 0, duration: 0.4 });
    }
  }, [currentStep, isActive]);

  return (
    <div ref={containerRef} className="slide-container" style={{ zIndex: isActive ? 10 : 1 }}>
      <div className="slide-content" style={{ flexDirection: 'row', alignItems: 'center' }}>
        
        <div style={{ flex: 1, paddingRight: '4rem' }}>
          <h2 ref={titleRef} style={{ fontSize: '4.5rem', marginBottom: '2rem' }}>CLINICAL TRIAL<br/>OPTIMIZATION</h2>
          <div className="tech-panel" style={{ marginTop: '2rem' }}>
            <p style={{ color: 'var(--text-color)' }}>
              AI doesn't just discover drugs; it ensures they can be proven safe and effective. By simulating patient populations and analyzing real-world health data, AI optimizes trial designs, identifies ideal candidates, and predicts potential failure points before human trials begin.
            </p>
          </div>
        </div>

        <div style={{ flex: 1, height: '400px', display: 'flex', alignItems: 'flex-end', gap: '20px', borderBottom: '2px solid var(--border)', paddingBottom: '1rem' }}>
          {[1, 2, 3, 4, 5].map((_, i) => (
            <div
              key={i}
              ref={el => el && (chartLinesRef.current[i] = el)}
              style={{
                flex: 1,
                height: '100%',
                backgroundColor: i === 0 ? '#ef4444' : 'var(--accent-primary)',
                opacity: 0,
                position: 'relative'
              }}
            >
              <div className="mono-text" style={{ position: 'absolute', top: '-2rem', left: '50%', transform: 'translateX(-50%)', fontSize: '0.8rem', color: i === 0 ? '#ef4444' : 'var(--text-color)' }}>
                {i === 0 ? 'TRADITIONAL' : `AI_OPT_0${i}`}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Slide8;
