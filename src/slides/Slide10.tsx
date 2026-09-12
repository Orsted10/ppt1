import type { SlideProps } from '../types';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { RefreshCw, Zap, Award } from 'lucide-react';

const Slide10: React.FC<SlideProps> = ({ isActive, currentStep, onTotalStepsChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onTotalStepsChange(2);
  }, [onTotalStepsChange]);

  useEffect(() => {
    if (isActive) {
      gsap.to(containerRef.current, { autoAlpha: 1, duration: 0.6 });
      gsap.fromTo(
        '.slide-10-elem',
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
      gsap.to(card2Ref.current, { borderColor: 'var(--accent-emerald)', scale: 1.02, duration: 0.3 });
      gsap.to(card1Ref.current, { opacity: 0.6, scale: 0.98, duration: 0.3 });
    } else {
      gsap.to([card1Ref.current, card2Ref.current], { borderColor: 'rgba(255, 255, 255, 0.08)', opacity: 1, scale: 1, duration: 0.3 });
    }
  }, [currentStep, isActive]);

  return (
    <div ref={containerRef} className="slide-container">
      <div className="slide-content">
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div className="biotech-badge biotech-badge-emerald slide-10-elem">
              <RefreshCw size={13} />
              RAPID CRISIS INTERVENTION
            </div>
            <h2 className="gradient-title-emerald slide-10-elem" style={{ fontSize: '3.6rem', marginBottom: '0.75rem' }}>
              DRUG REPURPOSING: SAVING LIVES IN 48 HOURS
            </h2>
            <p className="slide-10-elem" style={{ fontSize: '1.2rem', maxWidth: '780px', margin: '0 auto' }}>
              When a global pandemic or emergency strikes, there is no time to wait 10 years for a new chemical. AI cross-analyzes already-approved medicines to discover immediate secondary cures.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2.5rem' }}>
            <div ref={card1Ref} className="biotech-card slide-10-elem">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)', marginBottom: '0.75rem' }}>
                <Zap size={18} />
                <span className="mono-text" style={{ fontSize: '0.75rem', fontWeight: 700 }}>THE ZERO-SAFETY DELAY ADVANTAGE</span>
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#ffffff' }}>ALREADY PROVEN SAFE IN HUMANS</h3>
              <p style={{ fontSize: '0.95rem' }}>
                Over 4,000 FDA-approved drugs already have complete human safety and dosage data. If AI discovers an existing drug binds to a new virus or cancer receptor, it can enter human clinical use immediately.
              </p>
            </div>

            <div ref={card2Ref} className="biotech-card slide-10-elem" style={{ borderLeft: '3px solid var(--accent-emerald)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-emerald)', marginBottom: '0.75rem' }}>
                <Award size={18} />
                <span className="mono-text" style={{ fontSize: '0.75rem', fontWeight: 700 }}>LANDMARK: BENEVOLENTAI & BARICITINIB</span>
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#ffffff' }}>FROM VIRUS TO CURE IN 48 HOURS</h3>
              <p style={{ fontSize: '0.95rem' }}>
                In February 2020, BenevolentAI queried its knowledge graph for SARS-CoV-2 inhibitors. In <strong>48 hours</strong>, it predicted that <em>Baricitinib</em> (an arthritis drug) inhibited viral entry and dampened the fatal cytokine storm. Validated by the FDA, it saved countless critical patients.
              </p>
            </div>
          </div>

          {/* Metric Bar */}
          <div className="slide-10-elem" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            <div className="stat-box">
              <div className="stat-number" style={{ color: 'var(--accent-emerald)' }}>48 HRS</div>
              <div className="stat-label">AI Prediction Timeline in 2020</div>
            </div>
            <div className="stat-box">
              <div className="stat-number" style={{ color: 'var(--accent-cyan)' }}>4,000+</div>
              <div className="stat-label">Approved Drugs Continually Researched</div>
            </div>
            <div className="stat-box">
              <div className="stat-number" style={{ color: 'var(--accent-amber)' }}>38%</div>
              <div className="stat-label">Mortality Reduction in Severe ICU Cases</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Slide10;
