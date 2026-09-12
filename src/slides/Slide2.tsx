import type { SlideProps } from '../types';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { AttritionFunnel } from '../components/visuals/AttritionFunnel';
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
        <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '3.5rem', alignItems: 'center' }}>
          
          {/* Left Column: Narrative & Metrics */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <div className="biotech-badge biotech-badge-rose slide-2-elem">
                <AlertCircle size={13} />
                THE ATTRITION CRISIS // EROOM'S LAW
              </div>
              <h2 className="gradient-title-rose slide-2-elem" style={{ fontSize: '3.5rem', lineHeight: 1.05, marginBottom: '0.85rem' }}>
                WHY MEDICINE RECOVERY WAS BROKEN
              </h2>
              <p className="slide-2-elem" style={{ fontSize: '1.15rem', color: 'rgba(255, 255, 255, 0.85)' }}>
                Over the past 70 years, drug discovery became exponentially slower and more expensive every decade—a paradox known as <em>Eroom's Law</em>.
              </p>
            </div>

            {/* 3 Metric Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              <div ref={card1Ref} className="biotech-card slide-2-elem" style={{ padding: '1.25rem 1.4rem', borderTop: '3px solid var(--accent-cyan)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-cyan)', marginBottom: '0.5rem' }}>
                  <Hourglass size={16} />
                  <span className="mono-text" style={{ fontSize: '0.7rem', fontWeight: 700 }}>TIME</span>
                </div>
                <div className="stat-number" style={{ fontSize: '2.2rem' }}>10–15</div>
                <div className="mono-text" style={{ fontSize: '0.72rem', color: 'var(--accent-cyan)' }}>YEARS PER DRUG</div>
              </div>

              <div ref={card2Ref} className="biotech-card slide-2-elem" style={{ padding: '1.25rem 1.4rem', borderTop: '3px solid var(--accent-amber)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-amber)', marginBottom: '0.5rem' }}>
                  <DollarSign size={16} />
                  <span className="mono-text" style={{ fontSize: '0.7rem', fontWeight: 700 }}>CAPITAL</span>
                </div>
                <div className="stat-number" style={{ fontSize: '2.2rem' }}>$2.6B</div>
                <div className="mono-text" style={{ fontSize: '0.72rem', color: 'var(--accent-amber)' }}>AVERAGE COST</div>
              </div>

              <div ref={card3Ref} className="biotech-card slide-2-elem" style={{ padding: '1.25rem 1.4rem', borderTop: '3px solid #f43f5e' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#f43f5e', marginBottom: '0.5rem' }}>
                  <XCircle size={16} />
                  <span className="mono-text" style={{ fontSize: '0.7rem', fontWeight: 700 }}>FAILURE</span>
                </div>
                <div className="stat-number" style={{ fontSize: '2.2rem', color: '#f43f5e' }}>90%</div>
                <div className="mono-text" style={{ fontSize: '0.72rem', color: '#f43f5e' }}>CLINICAL CLIFF</div>
              </div>
            </div>

            <div className="biotech-card slide-2-elem" style={{ padding: '1.25rem 1.75rem', borderLeft: '3px solid var(--accent-cyan)' }}>
              <div style={{ fontWeight: 700, color: '#ffffff', fontSize: '1.05rem', marginBottom: '0.3rem' }}>THE HUMAN CONSEQUENCE</div>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
                Millions of patients suffering from aggressive cancers, Alzheimer's, and rare pediatric diseases cannot wait 15 years for clinical trials to finish. We urgently needed a paradigm shift.
              </p>
            </div>
          </div>

          {/* Right Column: Visual Attrition Funnel */}
          <div className="slide-2-elem" style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <AttritionFunnel />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Slide2;
