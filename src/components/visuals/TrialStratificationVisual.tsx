import React, { useState, useEffect } from 'react';
import { UserCheck, ShieldCheck, Cpu, Database, ChevronRight, Activity } from 'lucide-react';

export const TrialStratificationVisual: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'precision' | 'synthetic'>('precision');
  const [ticker, setTicker] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTicker((prev) => (prev + 1) % 100);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

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
      {/* Ambient background glow */}
      <div style={{
        position: 'absolute',
        width: '380px',
        height: '380px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0, 242, 254, 0.12) 0%, transparent 70%)',
        filter: 'blur(50px)',
        zIndex: 0,
      }} />

      {/* Header Banner: Genomic Multi-Omic Filtering */}
      <div className="biotech-card" style={{
        zIndex: 1,
        padding: '1rem 1.4rem',
        background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.08) 0%, rgba(14, 18, 28, 0.8) 100%)',
        border: '1px solid rgba(0, 242, 254, 0.3)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)' }}>
            <Cpu size={16} />
            <span className="mono-text" style={{ fontSize: '0.72rem', fontWeight: 800 }}>
              AI STRATIFICATION ENGINE // ACTIVE BIOMARKERS
            </span>
          </div>
          <span className="mono-text" style={{ fontSize: '0.7rem', color: 'var(--accent-emerald)', fontWeight: 700 }}>
            ● LIVE MATCHING
          </span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {['HER2+ OVEREXPRESSION', 'EGFR-L858R MUTATION', 'PD-L1 > 50%', 'TP53 WILD-TYPE'].map((tag, i) => (
            <span
              key={tag}
              className="mono-text"
              style={{
                fontSize: '0.68rem',
                padding: '0.2rem 0.6rem',
                borderRadius: '4px',
                background: i === 0 ? 'rgba(0, 242, 254, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                color: i === 0 ? 'var(--accent-cyan)' : 'rgba(255, 255, 255, 0.7)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Cohort Matrix Visualization */}
      <div className="biotech-card" style={{ zIndex: 1, padding: '1.25rem 1.4rem' }}>
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
          <button
            onClick={() => setActiveTab('precision')}
            style={{
              flex: 1,
              padding: '0.5rem 0.75rem',
              borderRadius: '6px',
              border: activeTab === 'precision' ? '1px solid var(--accent-cyan)' : '1px solid rgba(255, 255, 255, 0.08)',
              background: activeTab === 'precision' ? 'rgba(0, 242, 254, 0.15)' : 'rgba(255, 255, 255, 0.02)',
              color: activeTab === 'precision' ? '#ffffff' : 'var(--text-dim)',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              transition: 'all 0.2s ease',
            }}
          >
            <UserCheck size={14} color={activeTab === 'precision' ? 'var(--accent-cyan)' : undefined} />
            PRECISION COHORT
          </button>
          <button
            onClick={() => setActiveTab('synthetic')}
            style={{
              flex: 1,
              padding: '0.5rem 0.75rem',
              borderRadius: '6px',
              border: activeTab === 'synthetic' ? '1px solid var(--accent-emerald)' : '1px solid rgba(255, 255, 255, 0.08)',
              background: activeTab === 'synthetic' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.02)',
              color: activeTab === 'synthetic' ? '#ffffff' : 'var(--text-dim)',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              transition: 'all 0.2s ease',
            }}
          >
            <Database size={14} color={activeTab === 'synthetic' ? 'var(--accent-emerald)' : undefined} />
            SYNTHETIC CONTROL ARM
          </button>
        </div>

        {activeTab === 'precision' ? (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
              <span className="mono-text" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                GENOMIC CANDIDATE MATCHING:
              </span>
              <span className="mono-text" style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', fontWeight: 800 }}>
                1,240 OF 1,240 (100% RESPONDER PROFILE)
              </span>
            </div>

            {/* Visual Mini Patient Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(20, 1fr)',
              gap: '4px',
              padding: '0.75rem',
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              marginBottom: '0.75rem',
            }}>
              {Array.from({ length: 40 }).map((_, idx) => {
                const isHighlighted = (idx + ticker) % 5 === 0;
                return (
                  <div
                    key={idx}
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: isHighlighted ? '#10b981' : '#00f2fe',
                      boxShadow: isHighlighted ? '0 0 6px #10b981' : '0 0 4px rgba(0, 242, 254, 0.4)',
                      opacity: 0.85,
                      transition: 'all 0.3s ease',
                    }}
                  />
                );
              })}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <span>• Traditional Trial Response: <strong style={{ color: '#f43f5e' }}>22%</strong></span>
              <span>• AI Precision Cohort Response: <strong style={{ color: '#10b981' }}>84%</strong></span>
            </div>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
              <span className="mono-text" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                REAL-WORLD EHR DIGITAL TWINS:
              </span>
              <span className="mono-text" style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)', fontWeight: 800 }}>
                250,000 VIRTUAL HISTORICAL CONTROLS
              </span>
            </div>

            <div style={{
              padding: '0.85rem',
              background: 'rgba(16, 185, 129, 0.05)',
              borderRadius: '8px',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              marginBottom: '0.75rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                <ShieldCheck size={16} color="#10b981" />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>Zero Human Placebos Required</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                100% of human trial volunteers receive the therapeutic medicine. The control arm is mathematically synthesized from validated patient medical histories.
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <span>• Ethical Advantage: <strong style={{ color: '#10b981' }}>100% Treated</strong></span>
              <span>• Cost Reduction: <strong style={{ color: '#10b981' }}>-40%</strong></span>
            </div>
          </div>
        )}
      </div>

      {/* Trial Phase Milestone Acceleration */}
      <div className="biotech-card" style={{
        zIndex: 1,
        padding: '0.9rem 1.25rem',
        background: 'rgba(255, 255, 255, 0.02)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Activity size={14} color="var(--accent-cyan)" />
            <span className="mono-text" style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
              ACCELERATED APPROVAL PIPELINE
            </span>
          </div>
          <span className="mono-text" style={{ fontSize: '0.72rem', color: 'var(--accent-emerald)', fontWeight: 700 }}>
            50% FASTER TIMELINE
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <div style={{ flex: 1, height: '6px', background: 'var(--accent-cyan)', borderRadius: '9999px' }} />
          <ChevronRight size={12} color="var(--accent-cyan)" />
          <div style={{ flex: 1, height: '6px', background: 'var(--accent-emerald)', borderRadius: '9999px' }} />
          <ChevronRight size={12} color="var(--accent-emerald)" />
          <div style={{ flex: 1, height: '6px', background: 'linear-gradient(90deg, #10b981, #38bdf8)', borderRadius: '9999px' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.35rem', fontSize: '0.68rem', color: 'var(--text-dim)' }}>
          <span>PHASE I (SAFETY)</span>
          <span>PHASE II (EFFICACY)</span>
          <span>PHASE III (FAST TRACK)</span>
        </div>
      </div>
    </div>
  );
};
