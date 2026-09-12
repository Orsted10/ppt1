import React, { useState } from 'react';
import { Lightbulb, Brain, Sparkles, ArrowRightLeft } from 'lucide-react';

export const CentaurSymbiosisVisual: React.FC = () => {
  const [synergyMode, setSynergyMode] = useState<'both' | 'human' | 'ai'>('both');

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
        background: 'radial-gradient(circle, rgba(0, 242, 254, 0.12) 0%, transparent 70%)',
        filter: 'blur(50px)',
        zIndex: 0,
      }} />

      {/* Mode Switcher */}
      <div style={{ display: 'flex', gap: '0.5rem', zIndex: 1, justifyContent: 'center' }}>
        <button
          onClick={() => setSynergyMode('both')}
          style={{
            padding: '0.35rem 0.9rem',
            borderRadius: '9999px',
            border: synergyMode === 'both' ? '1px solid var(--accent-cyan)' : '1px solid rgba(255, 255, 255, 0.1)',
            background: synergyMode === 'both' ? 'rgba(0, 242, 254, 0.15)' : 'rgba(255, 255, 255, 0.02)',
            color: synergyMode === 'both' ? '#ffffff' : 'var(--text-dim)',
            fontSize: '0.72rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            transition: 'all 0.2s ease',
          }}
        >
          <Sparkles size={12} color={synergyMode === 'both' ? 'var(--accent-cyan)' : undefined} />
          CENTAUR SYNTHESIS
        </button>
        <button
          onClick={() => setSynergyMode('human')}
          style={{
            padding: '0.35rem 0.9rem',
            borderRadius: '9999px',
            border: synergyMode === 'human' ? '1px solid var(--accent-amber)' : '1px solid rgba(255, 255, 255, 0.1)',
            background: synergyMode === 'human' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255, 255, 255, 0.02)',
            color: synergyMode === 'human' ? '#ffffff' : 'var(--text-dim)',
            fontSize: '0.72rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            transition: 'all 0.2s ease',
          }}
        >
          <Lightbulb size={12} color={synergyMode === 'human' ? 'var(--accent-amber)' : undefined} />
          HUMAN INTUITION
        </button>
        <button
          onClick={() => setSynergyMode('ai')}
          style={{
            padding: '0.35rem 0.9rem',
            borderRadius: '9999px',
            border: synergyMode === 'ai' ? '1px solid var(--accent-purple)' : '1px solid rgba(255, 255, 255, 0.1)',
            background: synergyMode === 'ai' ? 'rgba(168, 85, 247, 0.15)' : 'rgba(255, 255, 255, 0.02)',
            color: synergyMode === 'ai' ? '#ffffff' : 'var(--text-dim)',
            fontSize: '0.72rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            transition: 'all 0.2s ease',
          }}
        >
          <Brain size={12} color={synergyMode === 'ai' ? 'var(--accent-purple)' : undefined} />
          AI SCALE
        </button>
      </div>

      {/* Two Pillars Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', zIndex: 1 }}>
        {/* Left: Human Doctor & Chemist */}
        <div
          className="biotech-card"
          style={{
            padding: '1.25rem',
            borderTop: '3px solid var(--accent-amber)',
            opacity: synergyMode === 'ai' ? 0.35 : 1,
            transform: synergyMode === 'human' || synergyMode === 'both' ? 'scale(1.01)' : 'scale(0.99)',
            transition: 'all 0.3s ease',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-amber)', marginBottom: '0.5rem' }}>
            <Lightbulb size={18} />
            <span className="mono-text" style={{ fontSize: '0.72rem', fontWeight: 800 }}>HUMAN COGNITION</span>
          </div>
          <div style={{ fontWeight: 800, color: '#ffffff', fontSize: '1.05rem', marginBottom: '0.4rem' }}>
            CLINICAL INTUITION
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ color: 'var(--accent-amber)' }}>•</span> Biological curiosity & hypothesis
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ color: 'var(--accent-amber)' }}>•</span> Patient empathy & bedside context
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ color: 'var(--accent-amber)' }}>•</span> Ethical guardrails & FDA approval
            </li>
          </ul>
        </div>

        {/* Right: AI Supercomputing System */}
        <div
          className="biotech-card"
          style={{
            padding: '1.25rem',
            borderTop: '3px solid var(--accent-purple)',
            opacity: synergyMode === 'human' ? 0.35 : 1,
            transform: synergyMode === 'ai' || synergyMode === 'both' ? 'scale(1.01)' : 'scale(0.99)',
            transition: 'all 0.3s ease',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-purple)', marginBottom: '0.5rem' }}>
            <Brain size={18} />
            <span className="mono-text" style={{ fontSize: '0.72rem', fontWeight: 800 }}>AI MACHINE INTELLIGENCE</span>
          </div>
          <div style={{ fontWeight: 800, color: '#ffffff', fontSize: '1.05rem', marginBottom: '0.4rem' }}>
            PLANETARY COMPUTATION
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ color: 'var(--accent-purple)' }}>•</span> 10⁶⁰ Chemical space exploration
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ color: 'var(--accent-purple)' }}>•</span> Billions of docking simulations/sec
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ color: 'var(--accent-purple)' }}>•</span> Zero fatigue, 24/7 execution
            </li>
          </ul>
        </div>
      </div>

      {/* Center Synthesis: The Centaur Multiplier */}
      <div className="biotech-card" style={{
        zIndex: 1,
        padding: '1.1rem 1.4rem',
        background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.1) 0%, rgba(168, 85, 247, 0.08) 100%)',
        border: '1px solid rgba(0, 242, 254, 0.35)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)' }}>
            <ArrowRightLeft size={16} />
            <span className="mono-text" style={{ fontSize: '0.75rem', fontWeight: 800 }}>
              THE CENTAUR MULTIPLIER (HUMAN + AI)
            </span>
          </div>
          <span className="mono-text" style={{ fontSize: '0.72rem', color: 'var(--accent-emerald)', fontWeight: 700 }}>
            ZERO BLACK-BOX RISK
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', textAlign: 'center' }}>
          <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '0.5rem', borderRadius: '6px' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-cyan)', fontFamily: 'var(--font-display)' }}>
              100X
            </div>
            <div className="mono-text" style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>DISCOVERY SPEED</div>
          </div>
          <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '0.5rem', borderRadius: '6px' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-emerald)', fontFamily: 'var(--font-display)' }}>
              0
            </div>
            <div className="mono-text" style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>HALLUCINATIONS</div>
          </div>
          <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '0.5rem', borderRadius: '6px' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-display)' }}>
              100%
            </div>
            <div className="mono-text" style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>CLINICAL TRUST</div>
          </div>
        </div>
      </div>
    </div>
  );
};
