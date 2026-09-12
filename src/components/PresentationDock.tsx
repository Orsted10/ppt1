import React from 'react';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface PresentationDockProps {
  currentSlide: number;
  totalSlides: number;
  slideTitles: string[];
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  onSelectSlide: (index: number) => void;
}

export const PresentationDock: React.FC<PresentationDockProps> = ({
  currentSlide,
  totalSlides,
  slideTitles,
  currentStep,
  totalSteps,
  onNext,
  onPrev,
  onSelectSlide,
}) => {
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <nav className="presentation-dock" aria-label="Presentation Navigation">
      {/* Slide Progress Line across the top of dock */}
      <div className="dock-progress-bar">
        <div
          className="dock-progress-fill"
          style={{ width: `${((currentSlide + (totalSteps > 1 ? currentStep / totalSteps : 1)) / totalSlides) * 100}%` }}
        />
      </div>

      <div className="dock-content">
        {/* Left: Slide Index & Title */}
        <div className="dock-info">
          <span 
            className="dock-badge"
            onClick={() => onSelectSlide((currentSlide + 1) % totalSlides)}
            style={{ cursor: 'pointer' }}
            title="Click to advance slide"
          >
            SLIDE {String(currentSlide + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
          </span>
          <span className="dock-title">{slideTitles[currentSlide] || 'SCENE'}</span>
        </div>

        {/* Center: Step indicators for multi-step slides */}
        <div className="dock-steps">
          {totalSteps > 1 && (
            <div className="step-pill-group">
              <span className="step-label">PHASE</span>
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className={`step-pill ${i === currentStep ? 'active' : i < currentStep ? 'completed' : ''}`}
                  title={`Phase ${i + 1}`}
                >
                  <span className="step-dot" />
                  <span className="step-num">0{i + 1}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Controls & Shortcuts */}
        <div className="dock-actions">
          <span className="dock-hint">[SPACE / →] TO ADVANCE</span>

          <div className="dock-btn-group">
            <button
              onClick={onPrev}
              disabled={currentSlide === 0 && currentStep === 0}
              className="dock-nav-btn"
              title="Previous (Left Arrow)"
            >
              <ChevronLeft size={16} />
            </button>

            <button
              onClick={onNext}
              disabled={currentSlide === totalSlides - 1 && currentStep === totalSteps - 1}
              className="dock-nav-btn dock-nav-btn-primary"
              title="Next (Right Arrow or Space)"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          <button
            onClick={toggleFullscreen}
            className="dock-nav-btn"
            title="Toggle Fullscreen (F)"
          >
            <Maximize2 size={14} />
          </button>
        </div>
      </div>
    </nav>
  );
};
