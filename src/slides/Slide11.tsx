import type { SlideProps } from '../types';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MedicineCapsule3D } from '../components/3d/MedicineCapsule3D';
import { Box, ShieldCheck, Factory } from 'lucide-react';

const Slide11: React.FC<SlideProps> = ({ isActive, currentStep, onTotalStepsChange }) => {
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
        '.slide-11-elem',
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
          
          {/* Left Column: Narrative */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <div className="biotech-badge slide-11-elem">
                <Box size={13} />
                STEP 07 // DELIVERY & PRODUCTION
              </div>
              <h2 className="gradient-title slide-11-elem" style={{ fontSize: '3.6rem', lineHeight: 1.05, marginBottom: '1rem' }}>
                AI FORMULATION & TARGETED DELIVERY
              </h2>
              <p className="slide-11-elem" style={{ fontSize: '1.15rem', color: 'rgba(255, 255, 255, 0.85)' }}>
                Inventing a cure is only half the battle. You must package and deliver the fragile molecule safely into human cells without degradation by the immune system.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div ref={card1Ref} className="biotech-card slide-11-elem">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)', marginBottom: '0.4rem' }}>
                  <ShieldCheck size={16} />
                  <span className="mono-text" style={{ fontSize: '0.75rem', fontWeight: 700 }}>LIPID NANOPARTICLE (LNP) AI DESIGN</span>
                </div>
                <p style={{ fontSize: '0.95rem' }}>
                  AI optimizes the microscopic fatty envelopes (nanoparticles) that protect fragile mRNA vaccines, ensuring they fuse precisely with target cells and release their payload safely.
                </p>
              </div>

              <div ref={card2Ref} className="biotech-card slide-11-elem" style={{ borderLeft: '3px solid var(--accent-emerald)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-emerald)', marginBottom: '0.4rem' }}>
                  <Factory size={16} />
                  <span className="mono-text" style={{ fontSize: '0.75rem', fontWeight: 700 }}>AUTOMATED RETROSYNTHESIS</span>
                </div>
                <p style={{ fontSize: '0.95rem' }}>
                  AI tools (like IBM RXN and Synthia) act as GPS for chemistry—calculating the exact step-by-step chemical recipes to synthesize complex new medicines cleanly, quickly, and at industrial scale.
                </p>
              </div>
            </div>

            <div className="slide-11-elem" style={{ display: 'flex', gap: '1rem' }}>
              <div className="stat-box" style={{ flex: 1 }}>
                <div className="stat-number" style={{ color: 'var(--accent-cyan)', fontSize: '2.2rem' }}>&gt; 90%</div>
                <div className="stat-label">Synthesis Route Success Rate</div>
              </div>
              <div className="stat-box" style={{ flex: 1 }}>
                <div className="stat-number" style={{ color: 'var(--accent-emerald)', fontSize: '2.2rem' }}>10X</div>
                <div className="stat-label">Manufacturing Scale-up Speed</div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Medicine Capsule Model */}
          <div className="slide-11-elem" style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ width: '100%', maxWidth: '480px', position: 'relative' }}>
              <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(circle, rgba(0, 242, 254, 0.12) 0%, transparent 70%)',
                borderRadius: '50%', filter: 'blur(50px)', zIndex: 0
              }} />
              <MedicineCapsule3D height="460px" accentColor="#00f2fe" />
              <div style={{
                position: 'absolute', bottom: '0.5rem', left: '50%', transform: 'translateX(-50%)',
                background: 'rgba(6, 8, 14, 0.85)', padding: '0.35rem 1rem', borderRadius: '9999px',
                border: '1px solid rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)',
                display: 'flex', alignItems: 'center', gap: '0.5rem', whiteSpace: 'nowrap'
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00f2fe', boxShadow: '0 0 8px #00f2fe' }} />
                <span className="mono-text" style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                  3D NANO-ENCAPSULATED CAPSULE
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Slide11;
