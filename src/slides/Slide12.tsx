import type { SlideProps } from '../types';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { RealWorldEvidenceLoop } from '../components/visuals/RealWorldEvidenceLoop';
import { Activity, Radio, RefreshCw } from 'lucide-react';

const Slide12: React.FC<SlideProps> = ({ isActive, currentStep, onTotalStepsChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onTotalStepsChange(3);
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

    if (currentStep === 1) {
      gsap.to(card1Ref.current, { borderColor: 'var(--accent-cyan)', scale: 1.02, duration: 0.3 });
      gsap.to(card2Ref.current, { opacity: 0.5, scale: 0.98, duration: 0.3 });
    } else if (currentStep === 2) {
      gsap.to(card1Ref.current, { borderColor: 'rgba(255, 255, 255, 0.08)', opacity: 0.7, scale: 1, duration: 0.3 });
      gsap.to(card2Ref.current, { borderColor: 'var(--accent-purple)', opacity: 1, scale: 1.02, duration: 0.3 });
    } else {
      gsap.to([card1Ref.current, card2Ref.current], { borderColor: 'rgba(255, 255, 255, 0.08)', opacity: 1, scale: 1, duration: 0.3 });
    }
  }, [currentStep, isActive]);

  return (
    <div ref={containerRef} className="slide-container">
      <div className="slide-content">
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '3.5rem', alignItems: 'center' }}>
          
          {/* Left Column: Narrative & Real-World Evidence */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <div className="biotech-badge slide-12-elem">
                <Activity size={13} />
                STEP 08 // THE CLOSED-LOOP HEALTH SYSTEM
              </div>
              <h2 className="gradient-title slide-12-elem" style={{ fontSize: '3.5rem', lineHeight: 1.05, marginBottom: '0.85rem' }}>
                REAL-WORLD EVIDENCE & CONTINUOUS LEARNING
              </h2>
              <p className="slide-12-elem" style={{ fontSize: '1.15rem', color: 'rgba(255, 255, 255, 0.85)' }}>
                The journey does not stop when a medicine reaches pharmacies. AI monitors millions of global patient outcomes in real time, constantly learning and improving the next wave of therapies.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div ref={card1Ref} className="biotech-card slide-12-elem" style={{ borderLeft: '3px solid var(--accent-cyan)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)', marginBottom: '0.4rem' }}>
                  <Radio size={16} />
                  <span className="mono-text" style={{ fontSize: '0.75rem', fontWeight: 700 }}>24/7 PHARMACOVIGILANCE</span>
                </div>
                <div style={{ fontWeight: 800, color: '#ffffff', fontSize: '1.1rem', marginBottom: '0.3rem' }}>
                  INSTANT ADVERSE DETECTION
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  AI algorithms scan electronic health records across millions of patients to detect ultra-rare drug side effects (1 in 100,000) within days, rather than waiting decades for paper reports.
                </p>
              </div>

              <div ref={card2Ref} className="biotech-card slide-12-elem" style={{ borderLeft: '3px solid var(--accent-purple)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-purple)', marginBottom: '0.4rem' }}>
                  <RefreshCw size={16} />
                  <span className="mono-text" style={{ fontSize: '0.75rem', fontWeight: 700 }}>THE CLOSED LEARNING LOOP</span>
                </div>
                <div style={{ fontWeight: 800, color: '#ffffff', fontSize: '1.1rem', marginBottom: '0.3rem' }}>
                  SELF-IMPROVING CURES
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  Real-world patient response telemetry streams back into the generative chemistry engine, automatically refining the molecular structure of 2nd-generation treatments.
                </p>
              </div>
            </div>

            <div className="slide-12-elem" style={{ display: 'flex', gap: '1rem' }}>
              <div className="stat-box" style={{ flex: 1 }}>
                <div className="stat-number" style={{ color: 'var(--accent-cyan)', fontSize: '2.2rem' }}>2.4M+</div>
                <div className="stat-label">Patient EHR Streams Monitored</div>
              </div>
              <div className="stat-box" style={{ flex: 1 }}>
                <div className="stat-number" style={{ color: 'var(--accent-purple)', fontSize: '2.2rem' }}>&lt; 48H</div>
                <div className="stat-label">Adverse Signal Resolution</div>
              </div>
            </div>
          </div>

          {/* Right Column: Real-World Evidence Loop Visualizer */}
          <div className="slide-12-elem" style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <RealWorldEvidenceLoop />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Slide12;
