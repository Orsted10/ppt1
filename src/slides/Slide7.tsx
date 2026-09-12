import type { SlideProps } from '../types';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { HeartPulse, ShieldAlert, CheckCircle2, FileCheck, Stethoscope } from 'lucide-react';

const Slide7: React.FC<SlideProps> = ({ isActive, currentStep, onTotalStepsChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onTotalStepsChange(3);
  }, [onTotalStepsChange]);

  useEffect(() => {
    if (isActive) {
      gsap.to(containerRef.current, { autoAlpha: 1, duration: 0.6 });
      gsap.fromTo(
        '.slide-7-elem',
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
        gsap.to(card, { opacity: 1, scale: 1, duration: 0.3 });
      } else if (currentStep === 1 && idx === 0) {
        gsap.to(card, { opacity: 1, scale: 1.03, borderColor: '#f43f5e', duration: 0.3 });
      } else if (currentStep === 2 && idx > 0) {
        gsap.to(card, { opacity: 1, scale: 1.03, borderColor: 'var(--accent-emerald)', duration: 0.3 });
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
            <div className="biotech-badge biotech-badge-rose slide-7-elem">
              <ShieldAlert size={13} />
              STEP 04 // PATIENT SAFETY FIRST
            </div>
            <h2 className="gradient-title-rose slide-7-elem" style={{ fontSize: '3.6rem', marginBottom: '0.75rem' }}>
              PREDICTING TOXICITY BEFORE HUMAN TRIALS
            </h2>
            <p className="slide-7-elem" style={{ fontSize: '1.2rem', maxWidth: '780px', margin: '0 auto' }}>
              A molecule can destroy a cancer cell in a test tube, but if it damages the human heart or liver, it is useless. AI models simulate full-body toxicity inside silicone before any human is dosed.
            </p>
          </div>

          {/* 3 Organ Safety Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
            <div ref={card1Ref} className="biotech-card slide-7-elem" style={{ borderLeft: '3px solid #f43f5e' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f43f5e', marginBottom: '0.75rem' }}>
                <HeartPulse size={18} />
                <span className="mono-text" style={{ fontSize: '0.75rem', fontWeight: 700 }}>CARDIAC SAFETY (hERG)</span>
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.5rem' }}>95% ACCURACY</div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Predicts whether a molecule blocks cardiac potassium channels, preventing fatal sudden heart arrhythmias before animal testing.
              </p>
            </div>

            <div ref={card2Ref} className="biotech-card slide-7-elem" style={{ borderLeft: '3px solid var(--accent-amber)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-amber)', marginBottom: '0.75rem' }}>
                <Stethoscope size={18} />
                <span className="mono-text" style={{ fontSize: '0.75rem', fontWeight: 700 }}>LIVER METABOLISM (DILI)</span>
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.5rem' }}>HEPATIC CLEARANCE</div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Simulates how the liver metabolizes the compound, detecting drug-induced liver injury risks months in advance.
              </p>
            </div>

            <div ref={card3Ref} className="biotech-card slide-7-elem" style={{ borderLeft: '3px solid var(--accent-cyan)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)', marginBottom: '0.75rem' }}>
                <CheckCircle2 size={18} />
                <span className="mono-text" style={{ fontSize: '0.75rem', fontWeight: 700 }}>BLOOD-BRAIN BARRIER</span>
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.5rem' }}>CNS PERMEABILITY</div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Calculates if brain drugs can cross the blood-brain barrier to treat Alzheimer's and Parkinson's while keeping non-CNS drugs safe.
              </p>
            </div>
          </div>

          {/* FDA Modernization Act Landmark */}
          <div className="biotech-card slide-7-elem" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '1.25rem 2rem', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.25)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <FileCheck size={28} color="#10b981" />
              <div>
                <div style={{ fontWeight: 700, color: '#ffffff', fontSize: '1.05rem' }}>THE FDA MODERNIZATION ACT 2.0</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  In a historic regulatory shift, the US FDA officially approved the use of validated AI and computer models as legal alternatives to animal testing for new drug approvals.
                </div>
              </div>
            </div>
            <div className="mono-text" style={{ fontSize: '0.8rem', fontWeight: 700, color: '#10b981', padding: '0.4rem 1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '6px' }}>
              GLOBAL SHIFT
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Slide7;
