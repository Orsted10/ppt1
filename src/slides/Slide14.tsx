import type { SlideProps } from '../types';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Globe, Eye, Scale } from 'lucide-react';

const Slide14: React.FC<SlideProps> = ({ isActive, currentStep, onTotalStepsChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onTotalStepsChange(4);
  }, [onTotalStepsChange]);

  useEffect(() => {
    if (isActive) {
      gsap.to(containerRef.current, { autoAlpha: 1, duration: 0.6 });
      gsap.fromTo(
        '.slide-14-elem',
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
        gsap.to(card, { opacity: 1, scale: 1, borderColor: 'rgba(255, 255, 255, 0.08)', duration: 0.3 });
      } else if (currentStep === idx + 1) {
        gsap.to(card, { opacity: 1, scale: 1.02, borderColor: idx === 0 ? '#f43f5e' : 'var(--accent-cyan)', duration: 0.3 });
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
            <div className="biotech-badge biotech-badge-rose slide-14-elem">
              <Scale size={13} />
              RESPONSIBLE INNOVATION
            </div>
            <h2 className="gradient-title-rose slide-14-elem" style={{ fontSize: '3.6rem', marginBottom: '0.75rem' }}>
              THE ETHICAL FRONTIER: SAFETY & EQUITY
            </h2>
            <p className="slide-14-elem" style={{ fontSize: '1.2rem', maxWidth: '820px', margin: '0 auto' }}>
              With immense computational power comes profound medical responsibility. We must ensure algorithms are free of bias, fully explainable, and accessible to all of humanity.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2.5rem' }}>
            <div ref={card1Ref} className="biotech-card slide-14-elem" style={{ borderTop: '3px solid #f43f5e' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f43f5e', marginBottom: '0.75rem' }}>
                <Globe size={18} />
                <span className="mono-text" style={{ fontSize: '0.75rem', fontWeight: 700 }}>GENOMIC INCLUSION</span>
              </div>
              <h3 style={{ fontSize: '1.3rem', color: '#ffffff', marginBottom: '0.5rem' }}>ELIMINATING DATA BIAS</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Over 78% of historical genetic research came from European ancestry. AI must train on diverse global populations so that cures work with equal efficacy for every human being.
              </p>
            </div>

            <div ref={card2Ref} className="biotech-card slide-14-elem" style={{ borderTop: '3px solid var(--accent-cyan)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)', marginBottom: '0.75rem' }}>
                <Eye size={18} />
                <span className="mono-text" style={{ fontSize: '0.75rem', fontWeight: 700 }}>TRANSPARENCY</span>
              </div>
              <h3 style={{ fontSize: '1.3rem', color: '#ffffff', marginBottom: '0.5rem' }}>NO "BLACK BOX" MEDICINE</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                When recommending treatments, AI cannot just output an answer—it must provide clear molecular and biological rationales that doctors and the FDA can verify and trust.
              </p>
            </div>

            <div ref={card3Ref} className="biotech-card slide-14-elem" style={{ borderTop: '3px solid var(--accent-emerald)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-emerald)', marginBottom: '0.75rem' }}>
                <Scale size={18} />
                <span className="mono-text" style={{ fontSize: '0.75rem', fontWeight: 700 }}>AFFORDABILITY</span>
              </div>
              <h3 style={{ fontSize: '1.3rem', color: '#ffffff', marginBottom: '0.5rem' }}>DEMOCRATIZING ACCESS</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                By collapsing $2.6B development costs by 70%, AI enables affordable medications for rare, neglected tropical diseases and underfunded healthcare systems globally.
              </p>
            </div>
          </div>

          <div className="biotech-card slide-14-elem" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 2rem', background: 'rgba(255, 255, 255, 0.02)' }}>
            <div className="mono-text" style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>
              ✓ FDA & WHO GUIDANCE ALIGNED
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Rigorous double-blind clinical trials remain the gold standard before any AI medicine reaches patient hands.
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Slide14;
