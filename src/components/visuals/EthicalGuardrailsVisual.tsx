import React from 'react';
import { Globe, Eye, Scale, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const EthicalGuardrailsVisual: React.FC = () => {
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
        background: 'radial-gradient(circle, rgba(244, 63, 94, 0.1) 0%, transparent 70%)',
        filter: 'blur(50px)',
        zIndex: 0,
      }} />

      {/* Top Banner: Responsible AI Framework */}
      <div className="biotech-card" style={{
        zIndex: 1,
        padding: '0.85rem 1.4rem',
        background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.08) 0%, rgba(14, 18, 28, 0.8) 100%)',
        border: '1px solid rgba(244, 63, 94, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f43f5e' }}>
          <Scale size={16} />
          <span className="mono-text" style={{ fontSize: '0.75rem', fontWeight: 800 }}>
            BIOETHICAL GOVERNANCE & SAFETY FRAMEWORK
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <ShieldCheck size={14} color="#10b981" />
          <span className="mono-text" style={{ fontSize: '0.68rem', color: '#10b981', fontWeight: 700 }}>FDA & WHO ALIGNED</span>
        </div>
      </div>

      {/* 3 Pillars */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', zIndex: 1 }}>
        {/* Pillar 1: Genomic Representation */}
        <div className="biotech-card" style={{ padding: '1rem 1.25rem', borderLeft: '3px solid #f43f5e' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#f43f5e' }}>
              <Globe size={16} />
              <span style={{ fontWeight: 800, color: '#ffffff', fontSize: '0.92rem' }}>GENOMIC DIVERSITY</span>
            </div>
            <span className="mono-text" style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 700 }}>
              100% BALANCED
            </span>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            Eliminates the historical 78% European bias, ensuring therapies work with equal potency across all ancestries.
          </p>
          <div style={{ display: 'flex', gap: '0.35rem', height: '6px', borderRadius: '9999px', overflow: 'hidden' }}>
            <div style={{ flex: 35, background: '#00f2fe' }} title="Asia (35%)" />
            <div style={{ flex: 25, background: '#10b981' }} title="Africa (25%)" />
            <div style={{ flex: 20, background: '#a855f7' }} title="Americas (20%)" />
            <div style={{ flex: 20, background: '#f59e0b' }} title="Europe (20%)" />
          </div>
        </div>

        {/* Pillar 2: Explainable XAI */}
        <div className="biotech-card" style={{ padding: '1rem 1.25rem', borderLeft: '3px solid var(--accent-cyan)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-cyan)' }}>
              <Eye size={16} />
              <span style={{ fontWeight: 800, color: '#ffffff', fontSize: '0.92rem' }}>EXPLAINABILITY (NO BLACK BOXES)</span>
            </div>
            <span className="mono-text" style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)', fontWeight: 700 }}>
              FULL AUDIT TRAIL
            </span>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
            Every molecular suggestion includes an atomic-level rationale, protein interaction energy map, and verified clinical citations.
          </p>
        </div>

        {/* Pillar 3: Affordability & Equity */}
        <div className="biotech-card" style={{ padding: '1rem 1.25rem', borderLeft: '3px solid var(--accent-emerald)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-emerald)' }}>
              <CheckCircle2 size={16} />
              <span style={{ fontWeight: 800, color: '#ffffff', fontSize: '0.92rem' }}>GLOBAL CURE ACCESSIBILITY</span>
            </div>
            <span className="mono-text" style={{ fontSize: '0.7rem', color: 'var(--accent-emerald)', fontWeight: 700 }}>
              -70% COST
            </span>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
            Collapsing drug development expenditure democratizes access for rare diseases and developing nations worldwide.
          </p>
        </div>
      </div>
    </div>
  );
};
