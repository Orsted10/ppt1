import type { SlideProps } from '../types';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ProteinOrigami3D } from '../components/3d/ProteinOrigami3D';
import { Award, Layers, Cpu } from 'lucide-react';

const Slide3: React.FC<SlideProps> = ({ isActive, currentStep, onTotalStepsChange }) => {
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
        '.slide-3-elem',
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
        <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '3.5rem', alignItems: 'center' }}>
          
          {/* Left Column: Narrative & Insights */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <div className="biotech-badge biotech-badge-emerald slide-3-elem">
                <Award size={13} />
                THE 50-YEAR BIOLOGICAL CHALLENGE SOLVED
              </div>
              <h2 className="gradient-title-emerald slide-3-elem" style={{ fontSize: '3.6rem', lineHeight: 1.05, marginBottom: '1rem' }}>
                ALPHAFOLD & THE STRUCTURAL REVOLUTION
              </h2>
              <p className="slide-3-elem" style={{ fontSize: '1.15rem', color: 'rgba(255, 255, 255, 0.85)' }}>
                Proteins are the intricate molecular machines of human biology. To cure a disease, scientists must know the exact 3D shape of a target protein down to the individual atom.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div ref={card1Ref} className="biotech-card slide-3-elem">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)', marginBottom: '0.4rem' }}>
                  <Layers size={16} />
                  <span className="mono-text" style={{ fontSize: '0.75rem', fontWeight: 700 }}>THE HISTORICAL BOTTLENECK</span>
                </div>
                <p style={{ fontSize: '0.95rem' }}>
                  Discovering the shape of a single protein took <strong>3 to 5 years</strong> of expensive X-ray crystallography or cryo-EM electron microscopy. Over 50 years, humanity mapped only 190,000 structures.
                </p>
              </div>

              <div ref={card2Ref} className="biotech-card slide-3-elem" style={{ borderLeft: '3px solid var(--accent-emerald)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-emerald)', marginBottom: '0.4rem' }}>
                  <Cpu size={16} />
                  <span className="mono-text" style={{ fontSize: '0.75rem', fontWeight: 700 }}>THE DEEPMIND BREAKTHROUGH</span>
                </div>
                <p style={{ fontSize: '0.95rem' }}>
                  Google DeepMind's <strong>AlphaFold</strong> predicted <strong>214,000,000 protein structures</strong>—virtually all cataloged proteins known to science—with atomic-level accuracy in mere months.
                </p>
              </div>
            </div>

            <div className="slide-3-elem" style={{ display: 'flex', gap: '1rem' }}>
              <div className="stat-box" style={{ flex: 1 }}>
                <div className="stat-number" style={{ color: 'var(--accent-emerald)', fontSize: '2.2rem' }}>214M+</div>
                <div className="stat-label">3D Protein Shapes Mapped</div>
              </div>
              <div className="stat-box" style={{ flex: 1 }}>
                <div className="stat-number" style={{ color: 'var(--accent-cyan)', fontSize: '2.2rem' }}>98.5%</div>
                <div className="stat-label">Human Proteome Coverage</div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Protein Origami Ribbon */}
          <div className="slide-3-elem" style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ width: '100%', maxWidth: '480px', position: 'relative' }}>
              <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
                borderRadius: '50%', filter: 'blur(50px)', zIndex: 0
              }} />
              <ProteinOrigami3D height="460px" accentColor="#10b981" />
              <div style={{
                position: 'absolute', bottom: '0.5rem', left: '50%', transform: 'translateX(-50%)',
                background: 'rgba(6, 8, 14, 0.8)', padding: '0.35rem 1rem', borderRadius: '9999px',
                border: '1px solid rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)',
                display: 'flex', alignItems: 'center', gap: '0.5rem', whiteSpace: 'nowrap'
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
                <span className="mono-text" style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                  ALPHAFOLD 3D FOLDED RIBBON
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Slide3;
