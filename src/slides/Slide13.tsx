import type { SlideProps } from '../types';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { UserCheck, Brain, HeartHandshake, Lightbulb } from 'lucide-react';

const Slide13: React.FC<SlideProps> = ({ isActive, currentStep, onTotalStepsChange }) => {
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
        '.slide-13-elem',
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
        gsap.to(card, { opacity: 1, scale: 1.02, borderColor: 'var(--accent-cyan)', duration: 0.3 });
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
            <div className="biotech-badge slide-13-elem">
              <HeartHandshake size={13} />
              THE SYMBIOSIS OF MINDS
            </div>
            <h2 className="gradient-title slide-13-elem" style={{ fontSize: '3.6rem', marginBottom: '0.75rem' }}>
              THE CENTAUR SCIENTIST: HUMAN + AI
            </h2>
            <p className="slide-13-elem" style={{ fontSize: '1.2rem', maxWidth: '820px', margin: '0 auto' }}>
              AI does not replace the physician or medicinal chemist. It gives them superhuman cognitive tools, turning 20 years of research intuition into a single afternoon of discovery.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2.5rem' }}>
            <div ref={card1Ref} className="biotech-card slide-13-elem" style={{ borderTop: '3px solid var(--accent-cyan)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)', marginBottom: '0.75rem' }}>
                <Lightbulb size={18} />
                <span className="mono-text" style={{ fontSize: '0.75rem', fontWeight: 700 }}>HUMAN CREATIVITY</span>
              </div>
              <h3 style={{ fontSize: '1.3rem', color: '#ffffff', marginBottom: '0.5rem' }}>ORIGINAL HYPOTHESES</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Doctors and scientists provide biological curiosity, clinical empathy, and the vision of what incurable diseases to attack first.
              </p>
            </div>

            <div ref={card2Ref} className="biotech-card slide-13-elem" style={{ borderTop: '3px solid var(--accent-emerald)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-emerald)', marginBottom: '0.75rem' }}>
                <Brain size={18} />
                <span className="mono-text" style={{ fontSize: '0.75rem', fontWeight: 700 }}>AI COMPUTATION</span>
              </div>
              <h3 style={{ fontSize: '1.3rem', color: '#ffffff', marginBottom: '0.5rem' }}>BILLIONS OF SIMULATIONS</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                AI sifts through quantum chemistry states, predicts binding kinetics, and tests billions of options in seconds without human fatigue.
              </p>
            </div>

            <div ref={card3Ref} className="biotech-card slide-13-elem" style={{ borderTop: '3px solid var(--accent-purple)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-purple)', marginBottom: '0.75rem' }}>
                <UserCheck size={18} />
                <span className="mono-text" style={{ fontSize: '0.75rem', fontWeight: 700 }}>ETHICAL OVERSIGHT</span>
              </div>
              <h3 style={{ fontSize: '1.3rem', color: '#ffffff', marginBottom: '0.5rem' }}>SAFE CLINICAL CARE</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Final decisions, safety guardrails, and compassionate patient care remain firmly in human hands with full regulatory validation.
              </p>
            </div>
          </div>

          <div className="biotech-card slide-13-elem" style={{ textAlign: 'center', padding: '1.5rem', background: 'rgba(0, 242, 254, 0.03)', border: '1px solid rgba(0, 242, 254, 0.2)' }}>
            <span className="mono-text" style={{ fontSize: '1rem', color: '#ffffff', fontWeight: 600 }}>
              "AI won't replace doctors or scientists. But doctors and scientists who use AI will replace those who don't."
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Slide13;
