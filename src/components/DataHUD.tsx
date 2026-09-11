import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const DataHUD: React.FC = () => {
  const ring1Ref = useRef<SVGGElement>(null);
  const ring2Ref = useRef<SVGGElement>(null);
  const [randomData, setRandomData] = useState<string[]>([]);
  
  useEffect(() => {
    // Generate random scrolling HEX data
    const interval = setInterval(() => {
      const newHex = Array.from({ length: 5 }, () => 
        Math.floor(Math.random() * 16777215).toString(16).toUpperCase().padStart(6, '0')
      );
      setRandomData(newHex);
    }, 200);

    // Rotate rings
    if (ring1Ref.current) gsap.to(ring1Ref.current, { rotation: 360, transformOrigin: 'center', duration: 20, repeat: -1, ease: 'linear' });
    if (ring2Ref.current) gsap.to(ring2Ref.current, { rotation: -360, transformOrigin: 'center', duration: 15, repeat: -1, ease: 'linear' });

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 5, overflow: 'hidden'
    }}>
      {/* Left Data Column */}
      <div style={{ position: 'absolute', top: '15%', left: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div className="mono-text" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
          <div style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>// LIVE_STREAM</div>
          {randomData.map((d, i) => (
            <div key={i}>0x{d} : OK</div>
          ))}
        </div>
        
        <svg width="100" height="100" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4"/>
          <g ref={ring1Ref}>
            <circle cx="50" cy="50" r="35" fill="none" stroke="var(--accent-primary)" strokeWidth="2" strokeDasharray="60 40"/>
            <circle cx="50" cy="15" r="3" fill="var(--text-color)"/>
          </g>
          <g ref={ring2Ref}>
            <circle cx="50" cy="50" r="25" fill="none" stroke="var(--text-color)" strokeWidth="1" strokeDasharray="10 20"/>
          </g>
        </svg>

        <div className="mono-text" style={{ fontSize: '0.7rem', color: 'var(--text-color)' }}>
          MEM_ALLOC: 45.2%<br/>
          CPU_TEMP: 42°C<br/>
          NET_SYNC: ESTABLISHED
        </div>
      </div>

      {/* Right Sine Wave Graph */}
      <div style={{ position: 'absolute', bottom: '15%', right: '2rem', width: '150px', height: '100px' }}>
        <div className="mono-text" style={{ fontSize: '0.7rem', color: 'var(--accent-primary)', marginBottom: '0.5rem', textAlign: 'right' }}>// BIO_TELEMETRY</div>
        <svg width="150" height="60" viewBox="0 0 150 60">
          <path 
            d="M 0 30 Q 15 0, 30 30 T 60 30 T 90 30 T 120 30 T 150 30" 
            fill="none" 
            stroke="var(--text-color)" 
            strokeWidth="1.5"
          >
            <animate attributeName="d" 
              values="M 0 30 Q 15 0, 30 30 T 60 30 T 90 30 T 120 30 T 150 30;
                      M 0 30 Q 15 60, 30 30 T 60 30 T 90 30 T 120 30 T 150 30;
                      M 0 30 Q 15 0, 30 30 T 60 30 T 90 30 T 120 30 T 150 30" 
              dur="3s" repeatCount="indefinite"/>
          </path>
          <line x1="0" y1="30" x2="150" y2="30" stroke="var(--border)" strokeWidth="1" strokeDasharray="2 2" />
        </svg>
        <div style={{ width: '100%', height: '1px', backgroundColor: 'var(--border)', marginTop: '0.5rem' }}>
          <div style={{ width: '30%', height: '100%', backgroundColor: 'var(--accent-primary)' }}></div>
        </div>
      </div>
    </div>
  );
};
