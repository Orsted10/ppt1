import type { SlideProps } from '../types';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ChemicalSpaceCloud } from '../components/visuals/ChemicalSpaceCloud';
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
        <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '3.5rem', alignItems: 'center' }}>
          
          {/* Left Column: Planetary Scale Screening & MIT Case */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <div className="biotech-badge slide-6-elem">
                <Zap size={13} />
                STEP 03 // MASSIVE COMPUTATIONAL TESTING
              </div>
              <h2 className="gradient-title slide-6-elem" style={{ fontSize: '3.5rem', lineHeight: 1.05, marginBottom: '0.85rem' }}>
                VIRTUAL SCREENING AT PLANETARY SCALE
              </h2>
              <p className="slide-6-elem" style={{ fontSize: '1.15rem', color: 'rgba(255, 255, 255, 0.85)' }}>
                Instead of pipetting liquids in petri dishes for years, AI simulates how billions of molecules interact with diseases inside a digital supercomputer in seconds.
              </p>
            </div>

            {/* Throughput Counter Banner */}
            <div className="biotech-card slide-6-elem" style={{
              background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.08) 0%, rgba(56, 189, 248, 0.03) 100%)',
              border: '1px solid rgba(0, 242, 254, 0.35)', padding: '1.5rem 2rem'
            }}>
              <div className="mono-text" style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', marginBottom: '0.25rem', letterSpacing: '0.15em' }}>
                AI COMPUTATIONAL DOCKING VELOCITY
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.85rem' }}>
                <div ref={numberRef} style={{ fontSize: '3.6rem', fontWeight: 800, fontFamily: 'var(--font-display)', color: '#ffffff', lineHeight: 1 }}>
                  0
                </div>
                <div className="mono-text" style={{ fontSize: '1.1rem', color: 'var(--accent-cyan)', fontWeight: 700 }}>
                  COMPOUNDS / SEC
                </div>
              </div>
            </div>

            {/* Comparative Cards: Physical Wet Lab vs MIT Halicin Case */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div ref={card1Ref} className="biotech-card slide-6-elem" style={{ padding: '1.25rem 1.4rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-dim)', marginBottom: '0.4rem' }}>
                  <FlaskConical size={16} />
                  <span className="mono-text" style={{ fontSize: '0.7rem', fontWeight: 700 }}>WET LAB ROBOTICS</span>
                </div>
                <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.25rem' }}>~100,000 / WK</div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Constrained by physical multi-well plates, chemical reagent costs, and weeks of time.
                </p>
              </div>

              <div ref={card2Ref} className="biotech-card slide-6-elem" style={{ padding: '1.25rem 1.4rem', borderLeft: '3px solid var(--accent-emerald)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-emerald)', marginBottom: '0.4rem' }}>
                  <ShieldCheck size={16} />
                  <span className="mono-text" style={{ fontSize: '0.7rem', fontWeight: 700 }}>MIT'S HALICIN BREAKTHROUGH</span>
                </div>
                <div style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--accent-emerald)', marginBottom: '0.25rem' }}>107M IN 3 DAYS</div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Discovered a potent antibiotic that wiped out drug-resistant superbugs in 72 hours.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Chemical Space Particle Cloud */}
          <div className="slide-6-elem" style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <ChemicalSpaceCloud />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Slide6;
