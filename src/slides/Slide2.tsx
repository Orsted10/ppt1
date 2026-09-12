import type { SlideProps } from '../types';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { AlertCircle, Hourglass, DollarSign, XCircle } from 'lucide-react';

const Slide2: React.FC<SlideProps> = ({ isActive, currentStep, onTotalStepsChange }) => {
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
        '.slide-2-elem',
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
        gsap.to(card, { opacity: 1, scale: 1.03, borderColor: idx === 2 ? '#f43f5e' : 'var(--accent-cyan)', duration: 0.3 });
      } else {
        gsap.to(card, { opacity: 0.45, scale: 0.98, borderColor: 'rgba(255, 255, 255, 0.08)', duration: 0.3 });
      }
    });
  }, [currentStep, isActive]);

  return (
    <div ref={containerRef} className="slide-container">
      <div className="slide-content">
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div className="biotech-badge biotech-badge-rose slide-2-elem">
              <AlertCircle size={13} />
              THE ATTRITION CRISIS (EROOM'S LAW)
            </div>
            <h2 className="gradient-title slide-2-elem" style={{ fontSize: '3.6rem', marginBottom: '0.75rem' }}>
              WHY MEDICINE RECOVERY WAS BROKEN
            </h2>
            <p className="slide-2-elem" style={{ fontSize: '1.2rem', maxWidth: '780px', margin: '0 auto' }}>
              Despite trillion-dollar technological advances, drug discovery became slower and more expensive every decade—known in science as <em>Eroom's Law</em>.
            </p>
          </div>

          {/* 3 Metric Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2.5rem' }}>
            <div ref={card1Ref} className="biotech-card slide-2-elem" style={{ borderTop: '3px solid var(--accent-cyan)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)', marginBottom: '0.75rem' }}>
                <Hourglass size={18} />
                <span className="mono-text" style={{ fontSize: '0.75rem', fontWeight: 700 }}>THE TIME TRAP</span>
              </div>
              <div className="stat-number" style={{ color: '#ffffff' }}>10–15</div>
              <div className="mono-text" style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', marginBottom: '0.5rem' }}>YEARS PER DRUG</div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Patients with aggressive or rare diseases wait over a decade for treatments to be approved.
              </p>
            </div>

            <div ref={card2Ref} className="biotech-card slide-2-elem" style={{ borderTop: '3px solid var(--accent-amber)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-amber)', marginBottom: '0.75rem' }}>
                <DollarSign size={18} />
                <span className="mono-text" style={{ fontSize: '0.75rem', fontWeight: 700 }}>THE CAPITAL DRAIN</span>
              </div>
              <div className="stat-number" style={{ color: '#ffffff' }}>$2.6B</div>
              <div className="mono-text" style={{ fontSize: '0.8rem', color: 'var(--accent-amber)', marginBottom: '0.5rem' }}>AVERAGE R&D COST</div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Skyrocketing costs lead to expensive medications that are out of reach for millions worldwide.
              </p>
            </div>

            <div ref={card3Ref} className="biotech-card slide-2-elem" style={{ borderTop: '3px solid #f43f5e' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f43f5e', marginBottom: '0.75rem' }}>
                <XCircle size={18} />
                <span className="mono-text" style={{ fontSize: '0.75rem', fontWeight: 700 }}>THE CLINICAL CLIFF</span>
              </div>
              <div className="stat-number" style={{ color: '#f43f5e' }}>90%</div>
              <div className="mono-text" style={{ fontSize: '0.8rem', color: '#f43f5e', marginBottom: '0.5rem' }}>CLINICAL FAILURE RATE</div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                9 out of 10 experimental medicines fail when tested in human clinical trials.
              </p>
            </div>
          </div>

          {/* Attrition Funnel Visualization */}
          <div className="biotech-card slide-2-elem" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 2rem', background: 'rgba(255, 255, 255, 0.02)' }}>
            <div className="mono-text" style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>TRADITIONAL FUNNEL:</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 700, color: '#ffffff', fontSize: '1.1rem' }}>10,000</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Compounds Screened</div>
              </div>
              <span style={{ color: 'var(--text-dim)' }}>→</span>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 700, color: 'var(--accent-amber)', fontSize: '1.1rem' }}>250</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Preclinical Testing</div>
              </div>
              <span style={{ color: 'var(--text-dim)' }}>→</span>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 700, color: '#38bdf8', fontSize: '1.1rem' }}>5</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Clinical Trials</div>
              </div>
              <span style={{ color: 'var(--text-dim)' }}>→</span>
              <div style={{ textAlign: 'center', background: 'rgba(16, 185, 129, 0.1)', padding: '0.35rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                <div style={{ fontWeight: 800, color: '#10b981', fontSize: '1.2rem' }}>1</div>
                <div style={{ fontSize: '0.75rem', color: '#10b981' }}>Approved Drug</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Slide2;
