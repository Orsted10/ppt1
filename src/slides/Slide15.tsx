import type { SlideProps } from '../types';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { AutonomousLoop } from '../components/visuals/AutonomousLoop';
import { Sparkles, Bot } from 'lucide-react';

const Slide15: React.FC<SlideProps> = ({ isActive, currentStep, onTotalStepsChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onTotalStepsChange(2);
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
      gsap.to(card1Ref.current, { borderColor: 'var(--accent-emerald)', scale: 1.02, duration: 0.3 });
    } else {
      gsap.to(card1Ref.current, { borderColor: 'rgba(255, 255, 255, 0.08)', scale: 1, duration: 0.3 });
    }
  }, [currentStep, isActive]);

  return (
    <div ref={containerRef} className="slide-container">
      <div className="slide-content">
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '3.5rem', alignItems: 'center' }}>
          
          {/* Left Column: Grand Finale Vision */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <div className="biotech-badge slide-15-elem">
                <Sparkles size={13} />
                THE HORIZON // MEDICINE REBORN
              </div>
              <h1 className="gradient-title slide-15-elem" style={{ fontSize: '3.8rem', lineHeight: 1.05, marginBottom: '0.85rem' }}>
                THE FUTURE: ZERO-ATTRITION MEDICINE
              </h1>
              <p className="slide-15-elem" style={{ fontSize: '1.2rem', color: 'rgba(255, 255, 255, 0.85)' }}>
                We are crossing the threshold from an era of treating illness reactively to an era of engineering cures proactively. In this new world, no disease is permanently incurable.
              </p>
            </div>

            <div ref={card1Ref} className="biotech-card slide-15-elem" style={{ borderLeft: '4px solid var(--accent-cyan)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)', marginBottom: '0.4rem' }}>
                <Bot size={18} />
                <span className="mono-text" style={{ fontSize: '0.75rem', fontWeight: 700 }}>AUTONOMOUS SELF-DRIVING LABORATORIES</span>
              </div>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                Robotic chemistry suites directed by LLMs and reinforcement learning algorithms run continuous Design-Make-Test-Analyze experiments 24 hours a day with zero human fatigue.
              </p>
            </div>

            {/* Grand Finale Stats */}
            <div className="slide-15-elem" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              <div className="stat-box" style={{ padding: '1rem 1.25rem' }}>
                <div className="stat-number" style={{ color: 'var(--accent-cyan)', fontSize: '2.2rem' }}>100X</div>
                <div className="stat-label">Discovery Velocity</div>
              </div>
              <div className="stat-box" style={{ padding: '1rem 1.25rem' }}>
                <div className="stat-number" style={{ color: 'var(--accent-emerald)', fontSize: '2.2rem' }}>-70%</div>
                <div className="stat-label">R&D Cost Collapse</div>
              </div>
              <div className="stat-box" style={{ padding: '1rem 1.25rem' }}>
                <div className="stat-number" style={{ color: '#ffffff', fontSize: '2.2rem' }}>BILLIONS</div>
                <div className="stat-label">Lives Saved</div>
              </div>
            </div>
          </div>

          {/* Right Column: Autonomous DMTA Closed-Loop Visual */}
          <div className="slide-15-elem" style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <AutonomousLoop />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Slide15;
