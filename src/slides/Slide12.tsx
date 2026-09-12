import type { SlideProps } from '../types';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Activity, Radio, Database } from 'lucide-react';

const Slide12: React.FC<SlideProps> = ({ isActive, currentStep, onTotalStepsChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onTotalStepsChange(4);
  }, [onTotalStepsChange]);

  useEffect(() => {
    if (isActive) {
      gsap.to(containerRef.current, { autoAlpha: 1, duration: 0.6 });
      gsap.fromTo(
        '.slide-12-elem',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
      );
    } else {
      gsap.to(containerRef.current, { autoAlpha: 0, duration: 0.4 });
    }
  }, [isActive]);

  useEffect(() => {
    if (!isActive) return;

    const cards = [card1Ref.current, card2Ref.current, card3Ref.current];
    cards.forEach((card, idx) => {
      if (!card) return;
      if (currentStep === 0) {
        gsap.to(card, { opacity: 1, scale: 1, borderColor: 'rgba(255, 255, 255, 0.08)', duration: 0.3 });
      } else if (currentStep === idx + 1) {
        gsap.to(card, { opacity: 1, scale: 1.02, borderColor: 'var(--accent-cyan)', duration: 0.3 });
      } else {
        gsap.to(card, { opacity: 0.5, scale: 0.98, borderColor: 'rgba(255, 255, 255, 0.08)', duration: 0.3 });
      }
    });
  }, [currentStep, isActive]);

  return (
    <div ref={containerRef} className="slide-container">
      <div className="slide-content">
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div className="biotech-badge slide-12-elem">
              <Activity size={13} />
              STEP 08 // THE CLOSED-LOOP HEALTH SYSTEM
            </div>
            <h2 className="gradient-title slide-12-elem" style={{ fontSize: '3.6rem', marginBottom: '0.75rem' }}>
              REAL-WORLD EVIDENCE & CONTINUOUS LEARNING
            </h2>
            <p className="slide-12-elem" style={{ fontSize: '1.2rem', maxWidth: '780px', margin: '0 auto' }}>
              The journey does not stop when a medicine reaches pharmacies. AI monitors millions of global patient outcomes in real time, constantly learning and improving the next wave of therapies.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2.5rem' }}>
            <div ref={card1Ref} className="biotech-card slide-12-elem" style={{ borderTop: '3px solid var(--accent-cyan)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)', marginBottom: '0.75rem' }}>
                <Radio size={18} />
                <span className="mono-text" style={{ fontSize: '0.75rem', fontWeight: 700 }}>24/7 SURVEILLANCE</span>
              </div>
              <h3 style={{ fontSize: '1.3rem', color: '#ffffff', marginBottom: '0.5rem' }}>PHARMACOVIGILANCE</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                AI algorithms scan electronic health records across millions of patients to detect ultra-rare drug side effects (1 in 100,000) within days, rather than decades.
              </p>
            </div>

            <div ref={card2Ref} className="biotech-card slide-12-elem" style={{ borderTop: '3px solid var(--accent-emerald)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-emerald)', marginBottom: '0.75rem' }}>
                <Database size={18} />
                <span className="mono-text" style={{ fontSize: '0.75rem', fontWeight: 700 }}>REAL-WORLD EFFICACY</span>
              </div>
              <h3 style={{ fontSize: '1.3rem', color: '#ffffff', marginBottom: '0.5rem' }}>DIVERSE POPULATIONS</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Traditional trials test narrow demographics. AI analyzes how medicines perform in real, everyday patients of all ethnicities, ages, and medical backgrounds.
              </p>
            </div>

            <div ref={card3Ref} className="biotech-card slide-12-elem" style={{ borderTop: '3px solid var(--accent-purple)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-purple)', marginBottom: '0.75rem' }}>
                <Activity size={18} />
                <span className="mono-text" style={{ fontSize: '0.75rem', fontWeight: 700 }}>THE FEEDBACK LOOP</span>
              </div>
              <h3 style={{ fontSize: '1.3rem', color: '#ffffff', marginBottom: '0.5rem' }}>CONTINUOUS IMPROVEMENT</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Real-world patient response data flows straight back into the generative models, training the next generation of medicines to be even safer, stronger, and more targeted.
              </p>
            </div>
          </div>

          {/* Connected Flow Diagram */}
          <div className="biotech-card slide-12-elem" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '1.25rem 2rem', background: 'rgba(255, 255, 255, 0.02)' }}>
            <span className="mono-text" style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>AI DISCOVERY</span>
            <span style={{ color: 'var(--text-dim)' }}>→</span>
            <span className="mono-text" style={{ fontSize: '0.85rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>CLINICAL VALIDATION</span>
            <span style={{ color: 'var(--text-dim)' }}>→</span>
            <span className="mono-text" style={{ fontSize: '0.85rem', color: '#ffffff', fontWeight: 600 }}>PATIENT RECOVERY</span>
            <span style={{ color: 'var(--text-dim)' }}>→</span>
            <span className="mono-text" style={{ fontSize: '0.85rem', color: 'var(--accent-purple)', fontWeight: 600 }}>REAL-WORLD AI LEARNING LOOP ↺</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Slide12;
