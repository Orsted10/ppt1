import { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';
import { useKeyPress } from './hooks/useKeyPress';
import { BiotechBackground } from './components/BiotechBackground';
import { PresentationDock } from './components/PresentationDock';
import gsap from 'gsap';

import Slide1 from './slides/Slide1';
import Slide2 from './slides/Slide2';
import Slide3 from './slides/Slide3';
import Slide4 from './slides/Slide4';
import Slide5 from './slides/Slide5';
import Slide6 from './slides/Slide6';
import Slide7 from './slides/Slide7';
import Slide8 from './slides/Slide8';
import Slide9 from './slides/Slide9';
import Slide10 from './slides/Slide10';
import Slide11 from './slides/Slide11';
import Slide12 from './slides/Slide12';
import Slide13 from './slides/Slide13';
import Slide14 from './slides/Slide14';
import Slide15 from './slides/Slide15';

const SLIDES = [
  Slide1, Slide2, Slide3, Slide4, Slide5, 
  Slide6, Slide7, Slide8, Slide9, Slide10, 
  Slide11, Slide12, Slide13, Slide14, Slide15
];

const SLIDE_TITLES = [
  "THE PARADIGM SHIFT",
  "THE ATTRITION CRISIS",
  "THE STRUCTURAL REVOLUTION",
  "GENOMIC TARGETING",
  "DE NOVO DRUG DESIGN",
  "VIRTUAL SCREENING",
  "PREDICTIVE TOXICITY",
  "CLINICAL TRIAL INTELLIGENCE",
  "PERSONALIZED MEDICINE",
  "RAPID DRUG REPURPOSING",
  "AI FORMULATION & DELIVERY",
  "REAL-WORLD SURVEILLANCE",
  "HUMAN-AI CENTAUR SCIENTISTS",
  "THE ETHICAL FRONTIER",
  "THE AUTONOMOUS HORIZON"
];

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlideIndex, setPrevSlideIndex] = useState(-1);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [currentStep, setCurrentStep] = useState(0);
  const [totalStepsInCurrentSlide, setTotalStepsInCurrentSlide] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const slideContainerRef = useRef<HTMLDivElement>(null);
  
  const lastWheelTime = useRef(0);

  // Smooth cinematic 3D slide transition engine
  useEffect(() => {
    if (prevSlideIndex !== -1 && prevSlideIndex !== currentSlide) {
      const prevWrapper = document.getElementById(`slide-wrapper-${prevSlideIndex}`);
      const activeWrapper = document.getElementById(`slide-wrapper-${currentSlide}`);
      
      if (!prevWrapper || !activeWrapper) return;

      setIsTransitioning(true);

      gsap.fromTo(prevWrapper, 
        { y: '0%', scale: 1, rotationX: 0, opacity: 1 },
        { 
          y: direction === 'forward' ? '-100vh' : '100vh', 
          scale: 0.85, 
          rotationX: direction === 'forward' ? 12 : -12, 
          opacity: 0, 
          duration: 1.1, 
          ease: 'power3.inOut' 
        }
      );

      gsap.fromTo(activeWrapper,
        { 
          y: direction === 'forward' ? '100vh' : '-100vh', 
          scale: 0.85, 
          rotationX: direction === 'forward' ? -12 : 12, 
          opacity: 0 
        },
        { 
          y: '0%', 
          scale: 1, 
          rotationX: 0, 
          opacity: 1, 
          duration: 1.1, 
          ease: 'power3.inOut', 
          onComplete: () => {
            setIsTransitioning(false);
          }
        }
      );
    }
  }, [currentSlide, prevSlideIndex, direction]);

  const nextAction = useCallback(() => {
    if (isTransitioning) return;
    if (currentStep < totalStepsInCurrentSlide - 1) {
      setCurrentStep((prev) => prev + 1);
    } else if (currentSlide < SLIDES.length - 1) {
      setDirection('forward');
      setPrevSlideIndex(currentSlide);
      setCurrentSlide((prev) => prev + 1);
      setCurrentStep(0);
    }
  }, [currentStep, currentSlide, isTransitioning, totalStepsInCurrentSlide]);

  const prevAction = useCallback(() => {
    if (isTransitioning) return;
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    } else if (currentSlide > 0) {
      setDirection('backward');
      setPrevSlideIndex(currentSlide);
      setCurrentSlide((prev) => prev - 1);
      setCurrentStep(0);
    }
  }, [currentStep, currentSlide, isTransitioning]);

  const jumpToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    setDirection(index > currentSlide ? 'forward' : 'backward');
    setPrevSlideIndex(currentSlide);
    setCurrentSlide(index);
    setCurrentStep(0);
  };

  useKeyPress('ArrowRight', nextAction);
  useKeyPress('ArrowLeft', prevAction);
  useKeyPress(' ', nextAction);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastWheelTime.current < 1200) return;
      if (isTransitioning) return;

      if (e.deltaY > 50) {
        lastWheelTime.current = now;
        nextAction();
      } else if (e.deltaY < -50) {
        lastWheelTime.current = now;
        prevAction();
      }
    };

    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [nextAction, prevAction, isTransitioning]);

  return (
    <main className="cinematic-frame">
      {/* Bioluminescent floating particle background */}
      <BiotechBackground />

      {/* Subtle Dot Grid */}
      <div className="bg-grid"></div>

      {/* Top Header */}
      <header
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3.5rem',
          padding: '0 3rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 40,
          background: 'linear-gradient(180deg, rgba(6, 8, 14, 0.8) 0%, transparent 100%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-cyan)', boxShadow: '0 0 10px var(--accent-cyan)' }} />
          <span className="mono-text" style={{ fontSize: '0.75rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.85)' }}>
            AI IN MEDICINE & DRUG RECOVERY
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="mono-text" style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
            KEYNOTE EXPERIENCE // {String(currentSlide + 1).padStart(2, '0')} OF {String(SLIDES.length).padStart(2, '0')}
          </span>
        </div>
      </header>

      {/* Slides Viewport */}
      <div 
        ref={slideContainerRef} 
        style={{ 
          width: '100%', 
          height: '100%', 
          position: 'absolute', 
          inset: 0, 
          perspective: '1200px', 
          overflow: 'hidden' 
        }}
      >
        {SLIDES.map((SlideComponent, index) => {
          const isVisible = index === currentSlide || index === prevSlideIndex;

          return isVisible ? (
            <div 
              key={index} 
              id={`slide-wrapper-${index}`}
              className="gpu-accelerated"
              style={{
                position: 'absolute', 
                inset: 0,
                zIndex: index === currentSlide ? 10 : (index === prevSlideIndex ? 5 : 1)
              }}
            >
              <SlideComponent
                isActive={index === currentSlide}
                currentStep={index === currentSlide ? currentStep : 0}
                onTotalStepsChange={
                  index === currentSlide ? setTotalStepsInCurrentSlide : () => {}
                }
              />
            </div>
          ) : null;
        })}
      </div>

      {/* Modern Presentation Navigation Dock */}
      <PresentationDock 
        currentSlide={currentSlide}
        totalSlides={SLIDES.length}
        slideTitles={SLIDE_TITLES}
        currentStep={currentStep}
        totalSteps={totalStepsInCurrentSlide}
        onNext={nextAction}
        onPrev={prevAction}
        onSelectSlide={jumpToSlide}
      />
    </main>
  );
}

export default App;
