import React from 'react';

interface NavUIProps {
  currentSlide: number;
  totalSlides: number;
  slideTitles: string[];
}

export const NavUI: React.FC<NavUIProps> = ({
  currentSlide,
  totalSlides,
  slideTitles
}) => {
  const currentTitle = slideTitles[currentSlide] || "UNTITLED SCENE";
  
  return (
    <>
      {/* Corner Crosshairs */}
      <div className="crosshair crosshair-tl"><svg viewBox="0 0 12 12"><line x1="6" y1="0" x2="6" y2="12" strokeWidth="1"/><line x1="0" y1="6" x2="12" y2="6" strokeWidth="1"/></svg></div>
      <div className="crosshair crosshair-tr"><svg viewBox="0 0 12 12"><line x1="6" y1="0" x2="6" y2="12" strokeWidth="1"/><line x1="0" y1="6" x2="12" y2="6" strokeWidth="1"/></svg></div>
      <div className="crosshair crosshair-bl"><svg viewBox="0 0 12 12"><line x1="6" y1="0" x2="6" y2="12" strokeWidth="1"/><line x1="0" y1="6" x2="12" y2="6" strokeWidth="1"/></svg></div>
      <div className="crosshair crosshair-br"><svg viewBox="0 0 12 12"><line x1="6" y1="0" x2="6" y2="12" strokeWidth="1"/><line x1="0" y1="6" x2="12" y2="6" strokeWidth="1"/></svg></div>

      <header className="nav-header">
        <div className="hud-group">
          <div className="hud-dot"></div>
          <div>
            <div className="hud-text">ACT {String(currentSlide + 1).padStart(2, '0')}: THE SYSTEM</div>
            <div className="hud-subtext">SCENE: {currentTitle}</div>
          </div>
        </div>
        
        <div className="hud-group">
          <div className="hud-subtext" style={{ textAlign: 'right' }}>
            <span style={{ color: 'var(--accent-primary)' }}>SYS.OP</span> // {String(currentSlide + 1).padStart(2, '0')} — {String(totalSlides).padStart(2, '0')}
          </div>
        </div>
      </header>
    </>
  );
};
