import React, { useState, useEffect } from 'react';
import { Activity, Radio, Database, RefreshCw, Globe, ShieldCheck } from 'lucide-react';

export const RealWorldEvidenceLoop: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const steps = [
    {
      id: 'surveillance',
      title: '24/7 PATIENT SURVEILLANCE',
      sub: 'Scanning 2.4M Electronic Health Records',
      stat: '< 48 Hours',
      statLabel: 'Adverse Signal Detection',
      icon: Radio,
      color: '#00f2fe',
    },
    {
      id: 'diversity',
      title: 'GLOBAL EFFICACY SIGNALS',
      sub: 'Multi-ethnic & real-world diversity analysis',
      stat: '45 Nations',
      statLabel: 'Patient Demographics',
      icon: Globe,
      color: '#10b981',
    },
    {
      id: 'learning',
      title: 'ACTIVE LEARNING RETRAINING',
      sub: 'Molecular generative weights updated live',
      stat: '100% Closed',
      statLabel: 'Feedback Loop Cycle',
      icon: RefreshCw,
      color: '#a855f7',
    },
    {
      id: 'iteration',
      title: 'NEXT-GEN FORMULATION',
      sub: 'Precision iteration of 2nd generation cures',
      stat: '3.4x Safer',
      statLabel: 'Iterative Safety Margin',
      icon: ShieldCheck,
      color: '#f59e0b',
    },
  ];

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: '1rem',
      position: 'relative',
    }}>
      {/* Background ambient glow */}
      <div style={{
        position: 'absolute',
        width: '380px',
        height: '380px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, transparent 70%)',
        filter: 'blur(50px)',
        zIndex: 0,
      }} />

      {/* Top Banner */}
      <div className="biotech-card" style={{
        zIndex: 1,
        padding: '0.85rem 1.4rem',
        background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.08) 0%, rgba(14, 18, 28, 0.8) 100%)',
        border: '1px solid rgba(168, 85, 247, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-purple)' }}>
          <Activity size={16} />
          <span className="mono-text" style={{ fontSize: '0.75rem', fontWeight: 800 }}>
            REAL-WORLD HEALTH SURVEILLANCE MATRIX
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
          <span className="mono-text" style={{ fontSize: '0.68rem', color: '#10b981', fontWeight: 700 }}>LIVE INGESTION</span>
        </div>
      </div>

      {/* 4 Loop Steps */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0.9rem',
        zIndex: 1,
      }}>
        {steps.map((step, index) => {
          const isCurrent = activeStep === index;
          const Icon = step.icon;
          return (
            <div
              key={step.id}
              onClick={() => setActiveStep(index)}
              className="biotech-card"
              style={{
                padding: '1rem 1.25rem',
                borderLeft: `3px solid ${step.color}`,
                borderColor: isCurrent ? step.color : 'rgba(255, 255, 255, 0.08)',
                background: isCurrent ? `linear-gradient(135deg, ${step.color}15 0%, rgba(14, 18, 28, 0.85) 100%)` : 'rgba(14, 18, 28, 0.65)',
                transform: isCurrent ? 'scale(1.02)' : 'scale(1)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: step.color }}>
                  <Icon size={16} />
                  <span className="mono-text" style={{ fontSize: '0.68rem', fontWeight: 800 }}>
                    0{index + 1} // {step.id.toUpperCase()}
                  </span>
                </div>
                {isCurrent && (
                  <span className="mono-text" style={{ fontSize: '0.65rem', color: step.color, fontWeight: 700 }}>
                    ACTIVE
                  </span>
                )}
              </div>
              <div style={{ fontWeight: 800, color: '#ffffff', fontSize: '0.92rem', marginBottom: '0.2rem' }}>
                {step.title}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                {step.sub}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '0.4rem' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 800, color: step.color, fontFamily: 'var(--font-display)' }}>
                  {step.stat}
                </span>
                <span className="mono-text" style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>
                  {step.statLabel}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Closed-Loop Continuous Feedback Banner */}
      <div className="biotech-card" style={{
        zIndex: 1,
        padding: '0.85rem 1.4rem',
        background: 'rgba(255, 255, 255, 0.02)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Database size={15} color="var(--accent-cyan)" />
          <span className="mono-text" style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
            HEALTHCARE CONTINUOUS INTELLIGENCE
          </span>
        </div>
        <span className="mono-text" style={{ fontSize: '0.72rem', color: 'var(--accent-purple)', fontWeight: 700 }}>
          EVERY PATIENT CURED POWERS THE NEXT DISCOVERY ↺
        </span>
      </div>
    </div>
  );
};
