import type { SlideProps } from '../types';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { HumanVitals3D } from '../components/3d/HumanVitals3D';
import { Dna, ShieldCheck, Heart } from 'lucide-react';

const Slide9: React.FC<SlideProps> = ({ isActive, currentStep, onTotalStepsChange }) => {
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
        '.slide-9-elem',
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
      gsap.to(card1Ref.current, { borderColor: 'var(--accent-rose)', scale: 1.02, duration: 0.3 });
      gsap.to(card2Ref.current, { opacity: 0.5, scale: 0.98, duration: 0.3 });
    } else if (currentStep === 2) {
      gsap.to(card1Ref.current, { borderColor: 'rgba(255, 255, 255, 0.08)', opacity: 0.7, scale: 1, duration: 0.3 });
      gsap.to(card2Ref.current, { borderColor: 'var(--accent-cyan)', opacity: 1, scale: 1.02, duration: 0.3 });
    } else {
      gsap.to([card1Ref.current, card2Ref.current], { borderColor: 'rgba(255, 255, 255, 0.08)', opacity: 1, scale: 1, duration: 0.3 });
    }
  }, [currentStep, isActive]);

  return (
    <div ref={containerRef} className="slide-container">
      <div className="slide-content">
        <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '3.5rem', alignItems: 'center' }}>
          
          {/* Left Column: Narrative & mRNA Vaccines */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <div className="biotech-badge biotech-badge-rose slide-9-elem">
                <Heart size={13} />
                STEP 06 // TAILORED TO YOUR GENES
              </div>
              <h2 className="gradient-title-rose slide-9-elem" style={{ fontSize: '3.6rem', lineHeight: 1.05, marginBottom: '1rem' }}>
                PERSONALIZED MEDICINE & CUSTOM mRNA
              </h2>
              <p className="slide-9-elem" style={{ fontSize: '1.15rem', color: 'rgba(255, 255, 255, 0.85)' }}>
                No two human bodies or tumors are identical. The future of medicine moves away from generic blockbuster pills toward treatments custom-crafted for a single patient's DNA.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div ref={card1Ref} className="biotech-card slide-9-elem">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-rose)', marginBottom: '0.4rem' }}>
                  <Dna size={16} />
                  <span className="mono-text" style={{ fontSize: '0.75rem', fontWeight: 700 }}>THE END OF "ONE-SIZE-FITS-ALL"</span>
                </div>
                <p style={{ fontSize: '0.95rem' }}>
                  Traditional chemotherapy attacks healthy cells alongside cancerous ones. Personalized oncology sequences the patient's individual tumor genome to pinpoint mutations unique only to the cancer.
                </p>
              </div>

              <div ref={card2Ref} className="biotech-card slide-9-elem" style={{ borderLeft: '3px solid var(--accent-cyan)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)', marginBottom: '0.4rem' }}>
                  <ShieldCheck size={16} />
                  <span className="mono-text" style={{ fontSize: '0.75rem', fontWeight: 700 }}>REAL BREAKTHROUGH: BIONTECH & MODERNA</span>
                </div>
                <p style={{ fontSize: '0.95rem' }}>
                  AI algorithms predict tumor <strong>neoantigens</strong> in hours. From a tumor biopsy, AI writes an individualized mRNA code that trains the patient's own immune system to hunt down and eliminate metastases with zero chemotherapy side effects.
                </p>
              </div>
            </div>

            <div className="slide-9-elem" style={{ display: 'flex', gap: '1rem' }}>
              <div className="stat-box" style={{ flex: 1 }}>
                <div className="stat-number" style={{ color: 'var(--accent-rose)', fontSize: '2.2rem' }}>100%</div>
                <div className="stat-label">Patient-Specific Mutation Targeting</div>
              </div>
              <div className="stat-box" style={{ flex: 1 }}>
                <div className="stat-number" style={{ color: 'var(--accent-cyan)', fontSize: '2.2rem' }}>&lt; 6 WKS</div>
                <div className="stat-label">From Biopsy to Custom Vaccine Dose</div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Human Vitals & Digital Twin Model */}
          <div className="slide-9-elem" style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ width: '100%', maxWidth: '480px', position: 'relative' }}>
              <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(circle, rgba(244, 63, 94, 0.12) 0%, transparent 70%)',
                borderRadius: '50%', filter: 'blur(50px)', zIndex: 0
              }} />
              <HumanVitals3D height="460px" accentColor="#f43f5e" />
              <div style={{
                position: 'absolute', bottom: '0.5rem', left: '50%', transform: 'translateX(-50%)',
                background: 'rgba(6, 8, 14, 0.85)', padding: '0.35rem 1rem', borderRadius: '9999px',
                border: '1px solid rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)',
                display: 'flex', alignItems: 'center', gap: '0.5rem', whiteSpace: 'nowrap'
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f43f5e', boxShadow: '0 0 8px #f43f5e' }} />
                <span className="mono-text" style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                  3D PATIENT DIGITAL TWIN
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Slide9;
