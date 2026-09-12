import type { SlideProps } from '../types';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Sparkles, Bot, Heart } from 'lucide-react';

const Slide15: React.FC<SlideProps> = ({ isActive, currentStep, onTotalStepsChange }) => {
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
        '.slide-15-elem',
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
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', textAlign: 'center' }}>
          
          <div className="biotech-badge slide-15-elem" style={{ margin: '0 auto 1.5rem auto' }}>
            <Sparkles size={13} />
            THE HORIZON // MEDICINE REBORN
          </div>
          
          <h1 className="gradient-title slide-15-elem" style={{ fontSize: '4.4rem', lineHeight: 1.05, marginBottom: '1.25rem' }}>
            THE FUTURE: ZERO-ATTRITION MEDICINE
          </h1>

          <p className="slide-15-elem" style={{ fontSize: '1.25rem', maxWidth: '820px', margin: '0 auto 2.5rem auto', color: 'rgba(255, 255, 255, 0.85)' }}>
            We are crossing the threshold from an era of treating illness reactively to an era of engineering cures proactively. In this new world, no disease is permanently incurable.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2.5rem', textAlign: 'left' }}>
            <div ref={card1Ref} className="biotech-card slide-15-elem" style={{ borderLeft: '3px solid var(--accent-cyan)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)', marginBottom: '0.75rem' }}>
                <Bot size={18} />
                <span className="mono-text" style={{ fontSize: '0.75rem', fontWeight: 700 }}>SELF-DRIVING LABORATORIES</span>
              </div>
              <h3 style={{ fontSize: '1.4rem', color: '#ffffff', marginBottom: '0.5rem' }}>AUTONOMOUS DISCOVERY</h3>
              <p style={{ fontSize: '0.95rem' }}>
                Robotic chemistry suites directed by LLMs and reinforcement learning algorithms execute continuous Design-Make-Test-Analyze cycles 24 hours a day, 365 days a year.
              </p>
            </div>

            <div ref={card2Ref} className="biotech-card slide-15-elem" style={{ borderLeft: '3px solid var(--accent-emerald)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-emerald)', marginBottom: '0.75rem' }}>
                <Heart size={18} />
                <span className="mono-text" style={{ fontSize: '0.75rem', fontWeight: 700 }}>THE HUMAN PROMISE</span>
              </div>
              <h3 style={{ fontSize: '1.4rem', color: '#ffffff', marginBottom: '0.5rem' }}>DISEASE ERADICATION</h3>
              <p style={{ fontSize: '0.95rem' }}>
                Future outbreaks neutralized in weeks. Tailored mRNA immunotherapies curing rare pediatric conditions. A healthier, longer life accessible to every corner of the globe.
              </p>
            </div>
          </div>

          {/* Grand Finale Stats */}
          <div className="slide-15-elem" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', maxWidth: '900px', margin: '0 auto' }}>
            <div className="stat-box" style={{ textAlign: 'center' }}>
              <div className="stat-number" style={{ color: 'var(--accent-cyan)', fontSize: '2.4rem' }}>100X</div>
              <div className="stat-label">Discovery Speed Multiplier</div>
            </div>
            <div className="stat-box" style={{ textAlign: 'center' }}>
              <div className="stat-number" style={{ color: 'var(--accent-emerald)', fontSize: '2.4rem' }}>-70%</div>
              <div className="stat-label">R&D Capital Cost Collapse</div>
            </div>
            <div className="stat-box" style={{ textAlign: 'center' }}>
              <div className="stat-number" style={{ color: '#ffffff', fontSize: '2.4rem' }}>BILLIONS</div>
              <div className="stat-label">Of Lives Positively Impacted</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Slide15;
