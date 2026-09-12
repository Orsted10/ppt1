import type { SlideProps } from '../types';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { DNAHelix3D } from '../components/3d/DNAHelix3D';
import { Sparkles, Clock, Zap } from 'lucide-react';

const Slide1: React.FC<SlideProps> = ({ isActive, currentStep, onTotalStepsChange }) => {
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
        '.slide-1-elem',
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
      gsap.to(card1Ref.current, { borderColor: 'rgba(244, 63, 94, 0.5)', scale: 1.02, duration: 0.4 });
      gsap.to(card2Ref.current, { opacity: 0.5, scale: 0.98, duration: 0.4 });
    } else if (currentStep === 2) {
      gsap.to(card1Ref.current, { borderColor: 'rgba(255, 255, 255, 0.08)', opacity: 0.7, scale: 1, duration: 0.4 });
      gsap.to(card2Ref.current, { borderColor: 'rgba(0, 242, 254, 0.6)', opacity: 1, scale: 1.02, duration: 0.4 });
    } else {
      gsap.to([card1Ref.current, card2Ref.current], { borderColor: 'rgba(255, 255, 255, 0.08)', opacity: 1, scale: 1, duration: 0.4 });
    }
  }, [currentStep, isActive]);

  return (
    <div ref={containerRef} className="slide-container">
      <div className="slide-content">
        <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '3.5rem', alignItems: 'center', height: '100%' }}>
          
          {/* Left Column: Narrative */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <div className="biotech-badge slide-1-elem">
                <Sparkles size={13} />
                THE NEXT FRONTIER OF HUMAN HEALTH
              </div>
              <h1 className="gradient-title slide-1-elem" style={{ fontSize: '3.8rem', lineHeight: 1.05, marginBottom: '1rem' }}>
                THE REVOLUTION IN MEDICINE & DRUG RECOVERY
              </h1>
              <p className="slide-1-elem" style={{ fontSize: '1.2rem', color: 'rgba(255, 255, 255, 0.8)', maxWidth: '680px' }}>
                For over a century, discovering a lifesaving cure was a painstaking, billion-dollar gamble. Today, Artificial Intelligence is turning biology from an unpredictable mystery into an engineerable science.
              </p>
            </div>

            {/* Comparison Cards: The Old Way vs The AI Way */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginTop: '0.5rem' }}>
              <div ref={card1Ref} className="biotech-card slide-1-elem" style={{ borderLeft: '3px solid #f43f5e' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f43f5e', marginBottom: '0.5rem' }}>
                  <Clock size={16} />
                  <span className="mono-text" style={{ fontSize: '0.75rem', fontWeight: 700 }}>THE OLD REALITY</span>
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.25rem' }}>12–15 YRS</div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  Decades of wet-lab trial and error, testing millions of random molecules by hand.
                </p>
              </div>

              <div ref={card2Ref} className="biotech-card slide-1-elem" style={{ borderLeft: '3px solid var(--accent-cyan)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)', marginBottom: '0.5rem' }}>
                  <Zap size={16} />
                  <span className="mono-text" style={{ fontSize: '0.75rem', fontWeight: 700 }}>THE AI REVOLUTION</span>
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.25rem' }}>WEEKS & MONTHS</div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  Generative algorithms design tailor-made cures from scratch in computational seconds.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Interactive DNA Double Helix */}
          <div className="slide-1-elem" style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ width: '100%', maxWidth: '480px', position: 'relative' }}>
              <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(circle, rgba(0, 242, 254, 0.15) 0%, transparent 70%)',
                borderRadius: '50%', filter: 'blur(40px)', zIndex: 0
              }} />
              <DNAHelix3D height="460px" accentColor="#00f2fe" />
              <div style={{
                position: 'absolute', bottom: '0.5rem', left: '50%', transform: 'translateX(-50%)',
                background: 'rgba(6, 8, 14, 0.8)', padding: '0.35rem 1rem', borderRadius: '9999px',
                border: '1px solid rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)',
                display: 'flex', alignItems: 'center', gap: '0.5rem', whiteSpace: 'nowrap'
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00f2fe', boxShadow: '0 0 8px #00f2fe' }} />
                <span className="mono-text" style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                  INTERACTIVE 3D GENOME STRAND
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Slide1;
