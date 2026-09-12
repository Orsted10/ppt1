import type { SlideProps } from '../types';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Users, UserCheck, FastForward } from 'lucide-react';

const Slide8: React.FC<SlideProps> = ({ isActive, currentStep, onTotalStepsChange }) => {
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
        '.slide-8-elem',
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
      gsap.to(card2Ref.current, { borderColor: 'var(--accent-emerald)', opacity: 1, scale: 1.02, duration: 0.3 });
    } else {
      gsap.to([card1Ref.current, card2Ref.current], { borderColor: 'rgba(255, 255, 255, 0.08)', opacity: 1, scale: 1, duration: 0.3 });
    }
  }, [currentStep, isActive]);

  return (
    <div ref={containerRef} className="slide-container">
      <div className="slide-content">
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div className="biotech-badge slide-8-elem">
              <Users size={13} />
              STEP 05 // HUMAN TRIALS REINVENTED
            </div>
            <h2 className="gradient-title slide-8-elem" style={{ fontSize: '3.6rem', marginBottom: '0.75rem' }}>
              SMARTER, FASTER CLINICAL TRIALS
            </h2>
            <p className="slide-8-elem" style={{ fontSize: '1.2rem', maxWidth: '780px', margin: '0 auto' }}>
              Over 80% of clinical trials are delayed due to patient recruitment bottlenecks. AI solves trial design by accurately matching candidates and simulating synthetic control groups.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2.5rem' }}>
            <div ref={card1Ref} className="biotech-card slide-8-elem" style={{ borderLeft: '3px solid var(--accent-cyan)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)', marginBottom: '0.75rem' }}>
                <UserCheck size={18} />
                <span className="mono-text" style={{ fontSize: '0.75rem', fontWeight: 700 }}>AI COHORT STRATIFICATION</span>
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#ffffff' }}>PRECISION PATIENT MATCHING</h3>
              <p style={{ fontSize: '0.95rem', marginBottom: '1rem' }}>
                Instead of testing on broad, heterogeneous groups, AI analyzes genetic and molecular biomarkers to identify the exact sub-population most likely to benefit from the drug.
              </p>
              <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.75rem' }}>
                <span className="mono-text" style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)' }}>• 60% Faster Recruitment</span>
                <span className="mono-text" style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)' }}>• Reduced Dropout Rates</span>
              </div>
            </div>

            <div ref={card2Ref} className="biotech-card slide-8-elem" style={{ borderLeft: '3px solid var(--accent-emerald)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-emerald)', marginBottom: '0.75rem' }}>
                <FastForward size={18} />
                <span className="mono-text" style={{ fontSize: '0.75rem', fontWeight: 700 }}>REVOLUTION: SYNTHETIC CONTROL ARMS</span>
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#ffffff' }}>ZERO-PLACEBO ETHICS</h3>
              <p style={{ fontSize: '0.95rem', marginBottom: '1rem' }}>
                For deadly diseases like ALS or glioblastoma, giving patients a sugar pill placebo is heartbreaking. AI creates <em>Synthetic Control Arms</em> from real-world health records—allowing 100% of human volunteers to receive active medicine.
              </p>
              <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.75rem' }}>
                <span className="mono-text" style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)' }}>• FDA Recognized Methodology</span>
                <span className="mono-text" style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)' }}>• Cuts Trial Cost by 40%</span>
              </div>
            </div>
          </div>

          {/* Trial Duration Acceleration Bar */}
          <div className="biotech-card slide-8-elem" style={{ padding: '1.5rem 2rem', background: 'rgba(255, 255, 255, 0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span className="mono-text" style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>CLINICAL PHASE DURATION ACCELERATION:</span>
              <span className="mono-text" style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)', fontWeight: 700 }}>50% REDUCTION IN TOTAL TRIAL TIMELINES</span>
            </div>
            <div style={{ height: '8px', width: '100%', background: 'rgba(255,255,255,0.08)', borderRadius: '9999px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '50%', background: 'linear-gradient(90deg, #00f2fe, #10b981)', borderRadius: '9999px' }} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Slide8;
