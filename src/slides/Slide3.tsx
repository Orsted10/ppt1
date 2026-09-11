import type { SlideProps } from '../types';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { scrambleText } from '../utils/scrambleText';

const Slide3: React.FC<SlideProps> = ({ isActive, currentStep, onTotalStepsChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);
  const aiVisualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onTotalStepsChange(4);
  }, [onTotalStepsChange]);

  useEffect(() => {
    if (isActive) {
      gsap.to(containerRef.current, { autoAlpha: 1, duration: 0.8 });
      gsap.set(titleRef.current, { x: -50, opacity: 0 });
      gsap.set(aiVisualRef.current, { scaleY: 0, opacity: 0, transformOrigin: 'bottom center' });
      gsap.set([text1Ref.current, text2Ref.current, text3Ref.current], { x: 50, opacity: 0 });
      
      gsap.to(titleRef.current, { x: 0, opacity: 1, duration: 1, ease: 'expo.out', delay: 0.2 });
      if (titleRef.current) scrambleText(titleRef.current, "ENTER AI", 800);

      gsap.to(aiVisualRef.current, { scaleY: 1, opacity: 1, duration: 1.5, ease: 'expo.out', delay: 0.5 });
    } else {
      gsap.to(containerRef.current, { autoAlpha: 0, duration: 0.5 });
    }
  }, [isActive]);

  useEffect(() => {
    if (!isActive) return;

    if (currentStep === 1) gsap.to(text1Ref.current, { x: 0, opacity: 1, duration: 0.8, ease: 'power4.out' });
    if (currentStep === 2) gsap.to(text2Ref.current, { x: 0, opacity: 1, duration: 0.8, ease: 'power4.out' });
    if (currentStep === 3) gsap.to(text3Ref.current, { x: 0, opacity: 1, duration: 0.8, ease: 'power4.out' });

    if (currentStep < 3) gsap.to(text3Ref.current, { x: 50, opacity: 0, duration: 0.4 });
    if (currentStep < 2) gsap.to(text2Ref.current, { x: 50, opacity: 0, duration: 0.4 });
    if (currentStep < 1) gsap.to(text1Ref.current, { x: 50, opacity: 0, duration: 0.4 });
  }, [currentStep, isActive]);

  return (
    <div ref={containerRef} className="slide-container" style={{ zIndex: isActive ? 10 : 1 }}>
      <div className="slide-content" style={{ flexDirection: 'row' }}>
        
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className="mono-text" style={{ fontSize: '0.875rem', color: 'var(--accent-primary)', marginBottom: '1rem' }}>
            // SYS_OVERRIDE: AI_ENGAGED
          </div>
          <h2 ref={titleRef} style={{ fontSize: '4.5rem', marginBottom: '4rem' }}>ENTER AI</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div ref={text1Ref} className="tech-panel interactable">
              <h3 className="mono-text" style={{ color: 'var(--text-color)', marginBottom: '0.5rem', fontSize: '1rem' }}>[01] PATTERN RECOGNITION</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>AI algorithms sift through petabytes of genomic and clinical data to find hidden biological patterns impossible for humans to see.</p>
            </div>
            
            <div ref={text2Ref} className="tech-panel interactable">
              <h3 className="mono-text" style={{ color: 'var(--text-color)', marginBottom: '0.5rem', fontSize: '1rem' }}>[02] PREDICTIVE MODELING</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Instead of physical trial and error, AI predicts how a molecule will behave, bind, and interact within the human body.</p>
            </div>
            
            <div ref={text3Ref} className="tech-panel interactable" style={{ borderColor: 'var(--accent-primary)' }}>
              <h3 className="mono-text" style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem', fontSize: '1rem' }}>[03] GENERATIVE DESIGN</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Moving beyond discovery into creation—AI can "hallucinate" entirely new molecular structures that do not exist in nature.</p>
            </div>
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div ref={aiVisualRef} style={{ width: '2px', height: '80%', backgroundColor: 'var(--accent-primary)', position: 'relative' }}>
             <div style={{ position: 'absolute', top: '10%', left: '-50px', width: '100px', height: '1px', background: 'var(--border)' }}></div>
             <div style={{ position: 'absolute', top: '50%', left: '-100px', width: '200px', height: '1px', background: 'var(--border)' }}></div>
             <div style={{ position: 'absolute', top: '90%', left: '-50px', width: '100px', height: '1px', background: 'var(--border)' }}></div>
             <div className="mono-text" style={{ position: 'absolute', bottom: '-2rem', left: '-50px', color: 'var(--accent-primary)', fontSize: '0.75rem' }}>AI_PROCESSING...</div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Slide3;
