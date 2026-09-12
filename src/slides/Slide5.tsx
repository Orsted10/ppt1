import type { SlideProps } from '../types';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MolecularKey3D } from '../components/3d/MolecularKey3D';
import { Wand2, Sparkles, Binary } from 'lucide-react';

const Slide5: React.FC<SlideProps> = ({ isActive, currentStep, onTotalStepsChange }) => {
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
        '.slide-5-elem',
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
        <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '3.5rem', alignItems: 'center' }}>
          
          {/* Left Column: Narrative & Insilico Case Study */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <div className="biotech-badge biotech-badge-purple slide-5-elem">
                <Wand2 size={13} />
                STEP 02 // GENERATIVE CHEMISTRY
              </div>
              <h2 className="gradient-title-purple slide-5-elem" style={{ fontSize: '3.6rem', lineHeight: 1.05, marginBottom: '1rem' }}>
                CREATING MEDICINE ATOM BY ATOM
              </h2>
              <p className="slide-5-elem" style={{ fontSize: '1.15rem', color: 'rgba(255, 255, 255, 0.85)' }}>
                Traditional science searches through existing libraries. Generative AI does the impossible: it invents entirely new, tailor-made molecules designed to fit biological target pockets like custom keys into locks.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div ref={card1Ref} className="biotech-card slide-5-elem">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)', marginBottom: '0.4rem' }}>
                  <Binary size={16} />
                  <span className="mono-text" style={{ fontSize: '0.75rem', fontWeight: 700 }}>MOLECULAR DIFFUSION MODELS</span>
                </div>
                <p style={{ fontSize: '0.95rem' }}>
                  Just as AI image generators assemble pixels, chemical diffusion models (like RFdiffusion and Chroma) assemble atoms into stable, highly potent 3D therapeutic structures.
                </p>
              </div>

              <div ref={card2Ref} className="biotech-card slide-5-elem" style={{ borderLeft: '3px solid var(--accent-purple)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-purple)', marginBottom: '0.4rem' }}>
                  <Sparkles size={16} />
                  <span className="mono-text" style={{ fontSize: '0.75rem', fontWeight: 700 }}>LANDMARK: INSILICO MEDICINE (ISM001-055)</span>
                </div>
                <p style={{ fontSize: '0.95rem' }}>
                  The world's first drug discovered and designed entirely by AI (for fatal pulmonary fibrosis) advanced from <strong>concept to Phase II clinical trials in only 30 months</strong>—saving 4 years and tens of millions of dollars.
                </p>
              </div>
            </div>

            <div className="slide-5-elem" style={{ display: 'flex', gap: '1rem' }}>
              <div className="stat-box" style={{ flex: 1 }}>
                <div className="stat-number" style={{ color: 'var(--accent-purple)', fontSize: '2.2rem' }}>30 MOS</div>
                <div className="stat-label">Discovery to Phase II Trials</div>
              </div>
              <div className="stat-box" style={{ flex: 1 }}>
                <div className="stat-number" style={{ color: 'var(--accent-cyan)', fontSize: '2.2rem' }}>10⁶⁰</div>
                <div className="stat-label">Chemical Space Search Capacity</div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Interactive Molecular Scaffold */}
          <div className="slide-5-elem" style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ width: '100%', maxWidth: '480px', position: 'relative' }}>
              <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
                borderRadius: '50%', filter: 'blur(50px)', zIndex: 0
              }} />
              <MolecularKey3D height="460px" accentColor="#8b5cf6" />
              <div style={{
                position: 'absolute', bottom: '0.5rem', left: '50%', transform: 'translateX(-50%)',
                background: 'rgba(6, 8, 14, 0.85)', padding: '0.35rem 1rem', borderRadius: '9999px',
                border: '1px solid rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)',
                display: 'flex', alignItems: 'center', gap: '0.5rem', whiteSpace: 'nowrap'
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#8b5cf6', boxShadow: '0 0 8px #8b5cf6' }} />
                <span className="mono-text" style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                  3D GENERATIVE LIGAND SCAFFOLD
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Slide5;
