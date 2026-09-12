import React from 'react';
import { Bot, Cpu, FlaskConical, BarChart3 } from 'lucide-react';

export const AutonomousLoop: React.FC = () => {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    }}>
      {/* Background ambient glow */}
      <div style={{
        position: 'absolute',
        width: '380px',
        height: '380px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0, 242, 254, 0.12) 0%, transparent 70%)',
        filter: 'blur(60px)',
        zIndex: 0,
      }} />

      {/* Circular DMTA Cycle Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1.25rem',
        maxWidth: '440px',
        width: '100%',
        zIndex: 1,
      }}>
        {/* Stage 1: DESIGN */}
        <div className="biotech-card" style={{ padding: '1.25rem 1.5rem', borderLeft: '3px solid #00f2fe' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#00f2fe', marginBottom: '0.4rem' }}>
            <Cpu size={18} />
            <span className="mono-text" style={{ fontSize: '0.75rem', fontWeight: 800 }}>01 // DESIGN</span>
          </div>
          <div style={{ fontWeight: 800, color: '#ffffff', fontSize: '1.1rem' }}>GENERATIVE AI</div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Molecules engineered in silicone</p>
        </div>

        {/* Stage 2: MAKE */}
        <div className="biotech-card" style={{ padding: '1.25rem 1.5rem', borderLeft: '3px solid #a855f7' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#a855f7', marginBottom: '0.4rem' }}>
            <FlaskConical size={18} />
            <span className="mono-text" style={{ fontSize: '0.75rem', fontWeight: 800 }}>02 // MAKE</span>
          </div>
          <div style={{ fontWeight: 800, color: '#ffffff', fontSize: '1.1rem' }}>ROBOTIC SYNTHESIS</div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Automated chemical assembly</p>
        </div>

        {/* Stage 4: ANALYZE */}
        <div className="biotech-card" style={{ padding: '1.25rem 1.5rem', borderLeft: '3px solid #10b981' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981', marginBottom: '0.4rem' }}>
            <BarChart3 size={18} />
            <span className="mono-text" style={{ fontSize: '0.75rem', fontWeight: 800 }}>04 // ANALYZE</span>
          </div>
          <div style={{ fontWeight: 800, color: '#ffffff', fontSize: '1.1rem' }}>ACTIVE LEARNING</div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Feedback loops refine next generation</p>
        </div>

        {/* Stage 3: TEST */}
        <div className="biotech-card" style={{ padding: '1.25rem 1.5rem', borderLeft: '3px solid #f59e0b' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f59e0b', marginBottom: '0.4rem' }}>
            <Bot size={18} />
            <span className="mono-text" style={{ fontSize: '0.75rem', fontWeight: 800 }}>03 // TEST</span>
          </div>
          <div style={{ fontWeight: 800, color: '#ffffff', fontSize: '1.1rem' }}>HIGH-THROUGHPUT</div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>In-vitro cellular validation</p>
        </div>
      </div>

      <div style={{
        marginTop: '1.25rem',
        background: 'rgba(0, 242, 254, 0.1)',
        padding: '0.4rem 1.25rem',
        borderRadius: '9999px',
        border: '1px solid rgba(0, 242, 254, 0.3)',
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
      }}>
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00f2fe', boxShadow: '0 0 8px #00f2fe' }} />
        <span className="mono-text" style={{ fontSize: '0.72rem', color: '#ffffff', fontWeight: 700 }}>
          CLOSED-LOOP 24/7 AUTONOMOUS DISCOVERY CYCLE
        </span>
      </div>
    </div>
  );
};
