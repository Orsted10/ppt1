import type { SlideProps } from '../types';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { TargetReceptor3D } from '../components/3d/TargetReceptor3D';
import { Dna, Compass, Activity } from 'lucide-react';

const Slide4: React.FC<SlideProps> = ({ isActive, currentStep, onTotalStepsChange }) => {
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
        '.slide-4-elem',
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
          
          {/* Left Column: Narrative & Real Case Studies */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <div className="biotech-badge slide-4-elem">
                <Dna size={13} />
                STEP 01 // PRECISION BIOLOGY
              </div>
              <h2 className="gradient-title slide-4-elem" style={{ fontSize: '3.6rem', lineHeight: 1.05, marginBottom: '1rem' }}>
                GENOMIC TARGET DISCOVERY
              </h2>
              <p className="slide-4-elem" style={{ fontSize: '1.15rem', color: 'rgba(255, 255, 255, 0.85)' }}>
                Before designing a drug, scientists must find the root cause: the exact rogue protein or receptor causing the disease. AI turns decades of biological guesswork into immediate precision.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div ref={card1Ref} className="biotech-card slide-4-elem">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)', marginBottom: '0.4rem' }}>
                  <Compass size={16} />
                  <span className="mono-text" style={{ fontSize: '0.75rem', fontWeight: 700 }}>AI KNOWLEDGE GRAPHS</span>
                </div>
                <p style={{ fontSize: '0.95rem' }}>
                  AI reads across <strong>35 million scientific papers</strong>, global clinical trial records, and patient genome databases simultaneously to link diseases with candidate proteins in seconds.
                </p>
              </div>

              <div ref={card2Ref} className="biotech-card slide-4-elem" style={{ borderLeft: '3px solid var(--accent-emerald)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-emerald)', marginBottom: '0.4rem' }}>
                  <Activity size={16} />
                  <span className="mono-text" style={{ fontSize: '0.75rem', fontWeight: 700 }}>REAL BREAKTHROUGH: THE "UNDRUGGABLE" TARGETS</span>
                </div>
                <p style={{ fontSize: '0.95rem' }}>
                  Mutations like <strong>KRAS</strong> (responsible for 30% of human cancers) were deemed "undruggable" for 40 years. AI revealed hidden binding grooves that human scientists could never see.
                </p>
              </div>
            </div>

            <div className="slide-4-elem" style={{ display: 'flex', gap: '1rem' }}>
              <div className="stat-box" style={{ flex: 1 }}>
                <div className="stat-number" style={{ color: 'var(--accent-cyan)', fontSize: '2.2rem' }}>35M+</div>
                <div className="stat-label">Medical Papers Synthesized</div>
              </div>
              <div className="stat-box" style={{ flex: 1 }}>
                <div className="stat-number" style={{ color: 'var(--accent-emerald)', fontSize: '2.2rem' }}>&lt; 48 HRS</div>
                <div className="stat-label">From Gene to Validated Target</div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Living Cellular Receptor Model */}
          <div className="slide-4-elem" style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ width: '100%', maxWidth: '480px', position: 'relative' }}>
              <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(circle, rgba(0, 242, 254, 0.12) 0%, transparent 70%)',
                borderRadius: '50%', filter: 'blur(50px)', zIndex: 0
              }} />
              <TargetReceptor3D height="460px" accentColor="#00f2fe" />
              <div style={{
                position: 'absolute', bottom: '0.5rem', left: '50%', transform: 'translateX(-50%)',
                background: 'rgba(6, 8, 14, 0.85)', padding: '0.35rem 1rem', borderRadius: '9999px',
                border: '1px solid rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)',
                display: 'flex', alignItems: 'center', gap: '0.5rem', whiteSpace: 'nowrap'
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00f2fe', boxShadow: '0 0 8px #00f2fe' }} />
                <span className="mono-text" style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                  3D CELL MEMBRANE & RECEPTOR POCKETS
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Slide4;
