import type { SlideProps } from '../types';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { CentaurSymbiosisVisual } from '../components/visuals/CentaurSymbiosisVisual';
import { HeartHandshake, Lightbulb, Brain } from 'lucide-react';

const Slide13: React.FC<SlideProps> = ({ isActive, currentStep, onTotalStepsChange }) => {
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

    if (currentStep === 1) {
      gsap.to(card1Ref.current, { borderColor: 'var(--accent-amber)', scale: 1.02, duration: 0.3 });
      gsap.to(card2Ref.current, { opacity: 0.5, scale: 0.98, duration: 0.3 });
    } else if (currentStep === 2) {
      gsap.to(card1Ref.current, { borderColor: 'rgba(255, 255, 255, 0.08)', opacity: 0.7, scale: 1, duration: 0.3 });
      gsap.to(card2Ref.current, { borderColor: 'var(--accent-purple)', opacity: 1, scale: 1.02, duration: 0.3 });
    } else {
      gsap.to([card1Ref.current, card2Ref.current], { borderColor: 'rgba(255, 255, 255, 0.08)', opacity: 1, scale: 1, duration: 0.3 });
    }
  }, [currentStep, isActive]);

  return (
    <div ref={containerRef} className="slide-container">
      <div className="slide-content">
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '3.5rem', alignItems: 'center' }}>
          
          {/* Left Column: Narrative & Centaur Philosophy */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <div className="biotech-badge slide-13-elem">
                <HeartHandshake size={13} />
                THE SYMBIOSIS OF MINDS
              </div>
              <h2 className="gradient-title slide-13-elem" style={{ fontSize: '3.5rem', lineHeight: 1.05, marginBottom: '0.85rem' }}>
                THE CENTAUR SCIENTIST: HUMAN + AI
              </h2>
              <p className="slide-13-elem" style={{ fontSize: '1.15rem', color: 'rgba(255, 255, 255, 0.85)' }}>
                AI does not replace the physician or medicinal chemist. It gives them superhuman cognitive amplification, turning 20 years of research intuition into a single afternoon of discovery.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div ref={card1Ref} className="biotech-card slide-13-elem" style={{ borderLeft: '3px solid var(--accent-amber)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-amber)', marginBottom: '0.4rem' }}>
                  <Lightbulb size={16} />
                  <span className="mono-text" style={{ fontSize: '0.75rem', fontWeight: 700 }}>THE HUMAN CLINICAL COMPASS</span>
                </div>
                <div style={{ fontWeight: 800, color: '#ffffff', fontSize: '1.1rem', marginBottom: '0.3rem' }}>
                  EMPATHY & CREATIVE HYPOTHESIS
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  Physicians and biologists define which diseases to attack, ask the critical first-principle questions, and provide ground-truth medical validation.
                </p>
              </div>

              <div ref={card2Ref} className="biotech-card slide-13-elem" style={{ borderLeft: '3px solid var(--accent-purple)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-purple)', marginBottom: '0.4rem' }}>
                  <Brain size={16} />
                  <span className="mono-text" style={{ fontSize: '0.75rem', fontWeight: 700 }}>THE AI QUANTUM COMPUTATION ENGINE</span>
                </div>
                <div style={{ fontWeight: 800, color: '#ffffff', fontSize: '1.1rem', marginBottom: '0.3rem' }}>
                  BILLIONS OF PARALLEL SIMULATIONS
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  Algorithms explore vast combinatorial chemistry spaces, screen safety profiles, and synthesize optimal molecular candidates without fatigue.
                </p>
              </div>
            </div>

            <div className="biotech-card slide-13-elem" style={{ padding: '1rem 1.4rem', background: 'rgba(0, 242, 254, 0.03)', border: '1px solid rgba(0, 242, 254, 0.2)' }}>
              <span className="mono-text" style={{ fontSize: '0.88rem', color: '#ffffff', fontWeight: 600 }}>
                "AI won't replace doctors or scientists. But doctors and scientists who use AI will replace those who don't."
              </span>
            </div>
          </div>

          {/* Right Column: Centaur Symbiosis Visualizer */}
          <div className="slide-13-elem" style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CentaurSymbiosisVisual />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Slide13;
