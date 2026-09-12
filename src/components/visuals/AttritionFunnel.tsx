import React from 'react';

export const AttritionFunnel: React.FC = () => {
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
      {/* Ambient background glow */}
      <div style={{
        position: 'absolute',
        width: '320px',
        height: '320px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(244, 63, 94, 0.12) 0%, transparent 70%)',
        filter: 'blur(50px)',
        zIndex: 0,
      }} />

      {/* Funnel SVG Graphic */}
      <svg viewBox="0 0 500 400" style={{ width: '100%', maxWidth: '440px', height: 'auto', zIndex: 1 }}>
        <defs>
          <linearGradient id="funnelGrad1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#fb7185" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="funnelGrad2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="funnelGrad3" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#7dd3fc" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="cureGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
        </defs>

        {/* Level 1: Discovery (10,000) */}
        <polygon points="40,40 460,40 410,120 90,120" fill="url(#funnelGrad1)" stroke="#f43f5e" strokeWidth="1.5" />
        <text x="250" y="75" textAnchor="middle" fill="#ffffff" fontFamily="var(--font-display)" fontSize="20" fontWeight="800">
          10,000 COMPOUNDS
        </text>
        <text x="250" y="98" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontFamily="var(--font-mono)" fontSize="11" letterSpacing="2">
          EARLY TARGET DISCOVERY
        </text>

        {/* Level 2: Preclinical (250) */}
        <polygon points="95,130 405,130 360,210 140,210" fill="url(#funnelGrad2)" stroke="#f59e0b" strokeWidth="1.5" />
        <text x="250" y="165" textAnchor="middle" fill="#ffffff" fontFamily="var(--font-display)" fontSize="18" fontWeight="800">
          250 PRECLINICAL CANDIDATES
        </text>
        <text x="250" y="188" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontFamily="var(--font-mono)" fontSize="11" letterSpacing="2">
          ANIMAL & LAB VALIDATION
        </text>

        {/* Level 3: Human Clinical Trials (5) */}
        <polygon points="145,220 355,220 310,300 190,300" fill="url(#funnelGrad3)" stroke="#38bdf8" strokeWidth="1.5" />
        <text x="250" y="255" textAnchor="middle" fill="#ffffff" fontFamily="var(--font-display)" fontSize="18" fontWeight="800">
          5 HUMAN CLINICAL TRIALS
        </text>
        <text x="250" y="278" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontFamily="var(--font-mono)" fontSize="11" letterSpacing="2">
          PHASE I, II, III (90% ATTRITION)
        </text>

        {/* Dropping Arrow Beams */}
        <line x1="250" y1="305" x2="250" y2="335" stroke="#10b981" strokeWidth="3" strokeDasharray="4 4" />

        {/* Level 4: 1 Approved Medicine */}
        <rect x="175" y="340" width="150" height="50" rx="25" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" strokeWidth="2" />
        <circle cx="205" cy="365" r="10" fill="url(#cureGrad)" />
        <text x="255" y="371" textAnchor="middle" fill="#ffffff" fontFamily="var(--font-display)" fontSize="15" fontWeight="800">
          1 APPROVED CURE
        </text>
      </svg>
    </div>
  );
};
