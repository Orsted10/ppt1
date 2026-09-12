import type { SlideProps } from '../types';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { OrganSafetyMatrix } from '../components/visuals/OrganSafetyMatrix';
import { ShieldAlert, FileCheck } from 'lucide-react';

const Slide7: React.FC<SlideProps> = ({ isActive, currentStep, onTotalStepsChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onTotalStepsChange(2);
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

    if (currentStep === 1) {
      gsap.to(card1Ref.current, { borderColor: 'var(--accent-emerald)', scale: 1.02, duration: 0.3 });
    } else {
      gsap.to(card1Ref.current, { borderColor: 'rgba(255, 255, 255, 0.08)', scale: 1, duration: 0.3 });
    }
  }, [currentStep, isActive]);

  return (
    <div ref={containerRef} className="slide-container">
      <div className="slide-content">
        <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '3.5rem', alignItems: 'center' }}>
          
          {/* Left Column: Narrative & FDA Act */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <div className="biotech-badge biotech-badge-rose slide-7-elem">
                <ShieldAlert size={13} />
                STEP 04 // PATIENT SAFETY FIRST
              </div>
              <h2 className="gradient-title-rose slide-7-elem" style={{ fontSize: '3.5rem', lineHeight: 1.05, marginBottom: '0.85rem' }}>
                PREDICTING TOXICITY BEFORE HUMAN TRIALS
              </h2>
              <p className="slide-7-elem" style={{ fontSize: '1.15rem', color: 'rgba(255, 255, 255, 0.85)' }}>
                A molecule can destroy disease in a petri dish, but if it damages the human heart or liver, it is lethal. AI simulates full-body toxicity inside silicone before any living subject is dosed.
              </p>
            </div>

            {/* Regulatory Breakthrough: FDA Modernization Act 2.0 */}
            <div ref={card1Ref} className="biotech-card slide-7-elem" style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(14, 18, 28, 0.7) 100%)',
              borderLeft: '4px solid #10b981', padding: '1.5rem 1.8rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <FileCheck size={24} color="#10b981" />
                <div style={{ fontWeight: 800, color: '#ffffff', fontSize: '1.15rem' }}>THE FDA MODERNIZATION ACT 2.0</div>
              </div>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                In a monumental scientific milestone, the US FDA officially authorized validated AI organ models and computational simulations as legal alternatives to animal testing for new drug approvals.
              </p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <span className="mono-text" style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 700 }}>✓ ZERO ANIMAL TESTING MANDATE</span>
                <span className="mono-text" style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 700 }}>✓ 95% PREDICTION ACCURACY</span>
              </div>
            </div>

            {/* Quick Stat Bar */}
            <div className="slide-7-elem" style={{ display: 'flex', gap: '1rem' }}>
              <div className="stat-box" style={{ flex: 1 }}>
                <div className="stat-number" style={{ color: 'var(--accent-emerald)', fontSize: '2.2rem' }}>95%</div>
                <div className="stat-label">Organ Toxicity Accuracy</div>
              </div>
              <div className="stat-box" style={{ flex: 1 }}>
                <div className="stat-number" style={{ color: '#f43f5e', fontSize: '2.2rem' }}>-80%</div>
                <div className="stat-label">Pre-Clinical Safety Attrition</div>
              </div>
            </div>
          </div>

          {/* Right Column: Holographic Organ Safety Matrix */}
          <div className="slide-7-elem" style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <OrganSafetyMatrix />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Slide7;
