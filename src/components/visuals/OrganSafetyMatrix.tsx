import React from 'react';
import { Heart, Activity, Brain, ShieldCheck } from 'lucide-react';

export const OrganSafetyMatrix: React.FC = () => {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: '1.25rem',
      position: 'relative',
    }}>
      {/* Background ambient glow */}
      <div style={{
        position: 'absolute',
        width: '350px',
        height: '350px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, transparent 70%)',
        filter: 'blur(50px)',
        zIndex: 0,
      }} />

      {/* Heart Safety Card */}
      <div className="biotech-card" style={{
        zIndex: 1,
        padding: '1.25rem 1.75rem',
        borderLeft: '4px solid #f43f5e',
        background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.08) 0%, rgba(14, 18, 28, 0.75) 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(244, 63, 94, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f43f5e' }}>
            <Heart size={22} />
          </div>
          <div>
            <div style={{ fontWeight: 800, color: '#ffffff', fontSize: '1.05rem' }}>CARDIAC SAFETY (hERG)</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Arrhythmia & ion-channel risk prediction</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(16, 185, 129, 0.15)', padding: '0.35rem 0.85rem', borderRadius: '9999px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
          <ShieldCheck size={14} color="#10b981" />
          <span className="mono-text" style={{ fontSize: '0.75rem', fontWeight: 800, color: '#10b981' }}>SAFE [0.01 nM]</span>
        </div>
      </div>

      {/* Liver Safety Card */}
      <div className="biotech-card" style={{
        zIndex: 1,
        padding: '1.25rem 1.75rem',
        borderLeft: '4px solid #f59e0b',
        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(14, 18, 28, 0.75) 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b' }}>
            <Activity size={22} />
          </div>
          <div>
            <div style={{ fontWeight: 800, color: '#ffffff', fontSize: '1.05rem' }}>HEPATIC CLEARANCE (DILI)</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Liver enzyme metabolism & bio-accumulation</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(16, 185, 129, 0.15)', padding: '0.35rem 0.85rem', borderRadius: '9999px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
          <ShieldCheck size={14} color="#10b981" />
          <span className="mono-text" style={{ fontSize: '0.75rem', fontWeight: 800, color: '#10b981' }}>NON-TOXIC</span>
        </div>
      </div>

      {/* Blood-Brain Barrier Card */}
      <div className="biotech-card" style={{
        zIndex: 1,
        padding: '1.25rem 1.75rem',
        borderLeft: '4px solid #00f2fe',
        background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.08) 0%, rgba(14, 18, 28, 0.75) 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(0, 242, 254, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00f2fe' }}>
            <Brain size={22} />
          </div>
          <div>
            <div style={{ fontWeight: 800, color: '#ffffff', fontSize: '1.05rem' }}>BLOOD-BRAIN BARRIER</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Central nervous system permeability</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(0, 242, 254, 0.15)', padding: '0.35rem 0.85rem', borderRadius: '9999px', border: '1px solid rgba(0, 242, 254, 0.3)' }}>
          <ShieldCheck size={14} color="#00f2fe" />
          <span className="mono-text" style={{ fontSize: '0.75rem', fontWeight: 800, color: '#00f2fe' }}>TARGET PASS</span>
        </div>
      </div>
    </div>
  );
};
