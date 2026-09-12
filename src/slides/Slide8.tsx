import type { SlideProps } from '../types';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { TrialStratificationVisual } from '../components/visuals/TrialStratificationVisual';
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
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '3.5rem', alignItems: 'center' }}>
          
          {/* Left Column: Clinical Trial Narrative */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <div className="biotech-badge slide-8-elem">
                <Users size={13} />
                STEP 05 // HUMAN TRIALS REINVENTED
              </div>
              <h2 className="gradient-title slide-8-elem" style={{ fontSize: '3.5rem', lineHeight: 1.05, marginBottom: '0.85rem' }}>
                SMARTER, FASTER CLINICAL TRIALS
              </h2>
              <p className="slide-8-elem" style={{ fontSize: '1.15rem', color: 'rgba(255, 255, 255, 0.85)' }}>
                Over 80% of clinical trials are delayed due to patient recruitment bottlenecks. AI solves trial design by accurately matching candidates and simulating synthetic control groups.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div ref={card1Ref} className="biotech-card slide-8-elem" style={{ borderLeft: '3px solid var(--accent-cyan)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)', marginBottom: '0.4rem' }}>
                  <UserCheck size={16} />
                  <span className="mono-text" style={{ fontSize: '0.75rem', fontWeight: 700 }}>AI COHORT STRATIFICATION</span>
                </div>
                <div style={{ fontWeight: 800, color: '#ffffff', fontSize: '1.1rem', marginBottom: '0.3rem' }}>
                  PRECISION PATIENT MATCHING
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  Instead of testing broad, heterogeneous groups, AI analyzes genetic biomarkers to pinpoint the exact sub-population primed to respond to the therapy.
                </p>
              </div>

              <div ref={card2Ref} className="biotech-card slide-8-elem" style={{ borderLeft: '3px solid var(--accent-emerald)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-emerald)', marginBottom: '0.4rem' }}>
                  <FastForward size={16} />
                  <span className="mono-text" style={{ fontSize: '0.75rem', fontWeight: 700 }}>SYNTHETIC CONTROL ARMS</span>
                </div>
                <div style={{ fontWeight: 800, color: '#ffffff', fontSize: '1.1rem', marginBottom: '0.3rem' }}>
                  ZERO-PLACEBO ETHICS
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  For lethal diseases, giving patients placebos is tragic. AI constructs virtual control arms from real-world medical records—allowing 100% of human volunteers to receive active medicine.
                </p>
              </div>
            </div>

            <div className="slide-8-elem" style={{ display: 'flex', gap: '1rem' }}>
              <div className="stat-box" style={{ flex: 1 }}>
                <div className="stat-number" style={{ color: 'var(--accent-cyan)', fontSize: '2.2rem' }}>60%</div>
                <div className="stat-label">Faster Recruitment Velocity</div>
              </div>
              <div className="stat-box" style={{ flex: 1 }}>
                <div className="stat-number" style={{ color: 'var(--accent-emerald)', fontSize: '2.2rem' }}>-50%</div>
                <div className="stat-label">Total Trial Phase Duration</div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Patient Stratification Visualizer */}
          <div className="slide-8-elem" style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <TrialStratificationVisual />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Slide8;
