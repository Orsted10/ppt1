import type { SlideProps } from '../types';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ShieldCheck, Zap, FlaskConical } from 'lucide-react';

const Slide6: React.FC<SlideProps> = ({ isActive, currentStep, onTotalStepsChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onTotalStepsChange(2);
  }, [onTotalStepsChange]);

  useEffect(() => {
    if (isActive) {
      gsap.to(containerRef.current, { autoAlpha: 1, duration: 0.6 });
      gsap.fromTo(
        '.slide-6-elem',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
      );

      // Animate big counter
      const counterObj = { val: 0 };
      gsap.to(counterObj, {
        val: 1000000000,
        duration: 2.2,
        ease: 'power4.out',
        onUpdate: () => {
          if (numberRef.current) {
            numberRef.current.innerText = Math.floor(counterObj.val).toLocaleString();
          }
        },
      });
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
            <div className="biotech-badge slide-6-elem">
              <Zap size={13} />
              STEP 03 // MASSIVE COMPUTATIONAL TESTING
            </div>
            <h2 className="gradient-title slide-6-elem" style={{ fontSize: '3.6rem', marginBottom: '0.75rem' }}>
              VIRTUAL SCREENING AT PLANETARY SCALE
            </h2>
            <p className="slide-6-elem" style={{ fontSize: '1.2rem', maxWidth: '780px', margin: '0 auto' }}>
              Instead of pipetting liquids in petri dishes for years, AI simulates how billions of molecules interact with diseases inside a digital supercomputer in seconds.
            </p>
          </div>

          {/* Center Huge Counter Banner */}
          <div className="biotech-card slide-6-elem" style={{
            background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.06) 0%, rgba(56, 189, 248, 0.03) 100%)',
            border: '1px solid rgba(0, 242, 254, 0.3)', textAlign: 'center', padding: '2rem', marginBottom: '2rem'
          }}>
            <div className="mono-text" style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', marginBottom: '0.5rem', letterSpacing: '0.2em' }}>
              CURRENT AI SCREENING THROUGHPUT
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '1rem' }}>
              <div ref={numberRef} style={{ fontSize: '5rem', fontWeight: 800, fontFamily: 'var(--font-display)', color: '#ffffff', lineHeight: 1 }}>
                0
              </div>
              <div className="mono-text" style={{ fontSize: '1.4rem', color: 'var(--accent-cyan)', fontWeight: 700 }}>
                COMPOUNDS / SEC
              </div>
            </div>
          </div>

          {/* Comparative Cards: Physical Wet Lab vs MIT Halicin Case */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div ref={card1Ref} className="biotech-card slide-6-elem">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-dim)', marginBottom: '0.5rem' }}>
                <FlaskConical size={16} />
                <span className="mono-text" style={{ fontSize: '0.75rem', fontWeight: 700 }}>PHYSICAL HIGH-THROUGHPUT ROBOTICS</span>
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.25rem' }}>~100,000 / WEEK</div>
              <p style={{ fontSize: '0.95rem' }}>
                Requires millions in chemical reagents, physical multi-well plates, robotic arms, and weeks of lab technician oversight.
              </p>
            </div>

            <div ref={card2Ref} className="biotech-card slide-6-elem" style={{ borderLeft: '3px solid var(--accent-emerald)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-emerald)', marginBottom: '0.5rem' }}>
                <ShieldCheck size={16} />
                <span className="mono-text" style={{ fontSize: '0.75rem', fontWeight: 700 }}>REAL CASE: MIT'S HALICIN ANTIBIOTIC</span>
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--accent-emerald)', marginBottom: '0.25rem' }}>107 MILLION IN 3 DAYS</div>
              <p style={{ fontSize: '0.95rem' }}>
                MIT screened 107M compounds in 3 days, discovering <strong>Halicin</strong>—a revolutionary antibiotic that eradicated deadly, drug-resistant bacterial superbugs.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Slide6;
