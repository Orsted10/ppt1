import type { SlideProps } from '../types';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { KnowledgeGraph3D } from '../components/3d/KnowledgeGraph3D';
import { RefreshCw, Zap, Award } from 'lucide-react';

const Slide10: React.FC<SlideProps> = ({ isActive, currentStep, onTotalStepsChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onTotalStepsChange(2);
  }, [onTotalStepsChange]);

  useEffect(() => {
    if (isActive) {
      gsap.to(containerRef.current, { autoAlpha: 1, duration: 0.6 });
      gsap.fromTo(
        '.slide-10-elem',
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
      gsap.to(card2Ref.current, { borderColor: 'var(--accent-emerald)', scale: 1.02, duration: 0.3 });
      gsap.to(card1Ref.current, { opacity: 0.6, scale: 0.98, duration: 0.3 });
    } else {
      gsap.to([card1Ref.current, card2Ref.current], { borderColor: 'rgba(255, 255, 255, 0.08)', opacity: 1, scale: 1, duration: 0.3 });
    }
  }, [currentStep, isActive]);

  return (
    <div ref={containerRef} className="slide-container">
      <div className="slide-content">
        <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '3.5rem', alignItems: 'center' }}>
          
          {/* Left Column: Narrative & BenevolentAI Case */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <div className="biotech-badge biotech-badge-emerald slide-10-elem">
                <RefreshCw size={13} />
                RAPID CRISIS INTERVENTION
              </div>
              <h2 className="gradient-title-emerald slide-10-elem" style={{ fontSize: '3.5rem', lineHeight: 1.05, marginBottom: '0.85rem' }}>
                DRUG REPURPOSING: SAVING LIVES IN 48 HOURS
              </h2>
              <p className="slide-10-elem" style={{ fontSize: '1.15rem', color: 'rgba(255, 255, 255, 0.85)' }}>
                When a global epidemic or aggressive emergency strikes, there is no time to invent a new chemical from scratch. AI cross-analyzes already-approved medicines to discover immediate secondary cures.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div ref={card1Ref} className="biotech-card slide-10-elem">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)', marginBottom: '0.4rem' }}>
                  <Zap size={16} />
                  <span className="mono-text" style={{ fontSize: '0.75rem', fontWeight: 700 }}>THE ZERO-SAFETY DELAY ADVANTAGE</span>
                </div>
                <p style={{ fontSize: '0.95rem' }}>
                  Over <strong>4,000 FDA-approved drugs</strong> already have complete human clinical safety records. When AI discovers an existing drug targets a new disease, doctors can administer it immediately.
                </p>
              </div>

              <div ref={card2Ref} className="biotech-card slide-10-elem" style={{ borderLeft: '3px solid var(--accent-emerald)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-emerald)', marginBottom: '0.4rem' }}>
                  <Award size={16} />
                  <span className="mono-text" style={{ fontSize: '0.75rem', fontWeight: 700 }}>LANDMARK: BENEVOLENTAI & BARICITINIB</span>
                </div>
                <p style={{ fontSize: '0.95rem' }}>
                  In February 2020, BenevolentAI queried its knowledge graph. In <strong>48 hours</strong>, it predicted <em>Baricitinib</em> (an arthritis drug) stopped viral cellular entry and suppressed lethal lung inflammation. Validated by the FDA, it saved countless critical patients globally.
                </p>
              </div>
            </div>

            <div className="slide-10-elem" style={{ display: 'flex', gap: '1rem' }}>
              <div className="stat-box" style={{ flex: 1 }}>
                <div className="stat-number" style={{ color: 'var(--accent-emerald)', fontSize: '2.2rem' }}>48 HRS</div>
                <div className="stat-label">From Virus to Discovered Cure</div>
              </div>
              <div className="stat-box" style={{ flex: 1 }}>
                <div className="stat-number" style={{ color: 'var(--accent-cyan)', fontSize: '2.2rem' }}>38%</div>
                <div className="stat-label">Mortality Reduction in Severe Cases</div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Knowledge Graph Network */}
          <div className="slide-10-elem" style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ width: '100%', maxWidth: '480px', position: 'relative' }}>
              <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
                borderRadius: '50%', filter: 'blur(50px)', zIndex: 0
              }} />
              <KnowledgeGraph3D height="460px" accentColor="#10b981" />
              <div style={{
                position: 'absolute', bottom: '0.5rem', left: '50%', transform: 'translateX(-50%)',
                background: 'rgba(6, 8, 14, 0.85)', padding: '0.35rem 1rem', borderRadius: '9999px',
                border: '1px solid rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)',
                display: 'flex', alignItems: 'center', gap: '0.5rem', whiteSpace: 'nowrap'
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
                <span className="mono-text" style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                  3D BIOMEDICAL KNOWLEDGE GRAPH
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Slide10;
