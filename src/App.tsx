import { useState, useEffect, useRef } from 'react';
import './App.css';
import { useKeyPress } from './hooks/useKeyPress';
import { NavUI } from './components/NavUI';
import { CustomCursor } from './components/CustomCursor';
import { DataStreamBackground } from './components/DataStreamBackground';
import { DataHUD } from './components/DataHUD';
import { ScannerSweep } from './components/ScannerSweep';
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
  "THE DAWN", "TRADITIONAL BOTTLENECK", "ENTER AI", "TARGET IDENTIFICATION",
  "MOLECULE GENERATION", "VIRTUAL SCREENING", "PREDICTING TOXICITY", 
  "TRIAL OPTIMIZATION", "PERSONALIZED MEDICINE", "DRUG REPURPOSING",
  "MANUFACTURING", "REAL-WORLD EVIDENCE", "HUMAN-AI SYNERGY",
  "ETHICAL FRONTIER", "FUTURE HORIZON"
];

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlideIndex, setPrevSlideIndex] = useState(-1);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [currentStep, setCurrentStep] = useState(0);
  const [totalStepsInCurrentSlide, setTotalStepsInCurrentSlide] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const slideContainerRef = useRef<HTMLDivElement>(null);
  
  // Throttle wheel events
  const lastWheelTime = useRef(0);

  // The actual cinematic 3D transition engine
  useEffect(() => {
    if (prevSlideIndex !== -1 && prevSlideIndex !== currentSlide) {
      const prevWrapper = document.getElementById(`slide-wrapper-${prevSlideIndex}`);
      const activeWrapper = document.getElementById(`slide-wrapper-${currentSlide}`);
      
      if (!prevWrapper || !activeWrapper) return;

      setIsTransitioning(true);

      // Outgoing slide: pushes back, rotates in 3D, and slides away
      gsap.fromTo(prevWrapper, 
        { y: '0%', scale: 1, rotationX: 0, filter: 'brightness(1)' },
        { y: direction === 'forward' ? '-100vh' : '100vh', scale: 0.7, rotationX: direction === 'forward' ? 20 : -20, filter: 'brightness(0.1)', duration: 1.6, ease: 'power4.inOut' }
      );

      // Incoming slide: comes from distance, rotates into place
      gsap.fromTo(activeWrapper,
        { y: direction === 'forward' ? '100vh' : '-100vh', scale: 0.7, rotationX: direction === 'forward' ? -20 : 20, filter: 'brightness(0.1)' },
        { y: '0%', scale: 1, rotationX: 0, filter: 'brightness(1)', duration: 1.6, ease: 'power4.inOut', onComplete: () => {
          setIsTransitioning(false);
        }}
      );
    }
  }, [currentSlide, prevSlideIndex, direction]);

  const nextAction = () => {
    if (isTransitioning) return;
    if (currentStep < totalStepsInCurrentSlide - 1) {
      setCurrentStep((prev) => prev + 1);
    } else if (currentSlide < SLIDES.length - 1) {
      setDirection('forward');
      setPrevSlideIndex(currentSlide);
      setCurrentSlide((prev) => prev + 1);
      setCurrentStep(0);
    }
  };

  const prevAction = () => {
    if (isTransitioning) return;
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    } else if (currentSlide > 0) {
      setDirection('backward');
      setPrevSlideIndex(currentSlide);
      setCurrentSlide((prev) => prev - 1);
      setCurrentStep(0);
    }
  };

  useKeyPress('ArrowRight', nextAction);
  useKeyPress('ArrowLeft', prevAction);
  useKeyPress(' ', nextAction);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastWheelTime.current < 1500) return; // Wait 1.5s between wheel triggers
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
  }, [currentSlide, currentStep, isTransitioning, totalStepsInCurrentSlide]);

  return (
    <main className="cinematic-frame">
      <CustomCursor />
      <DataStreamBackground />
      <DataHUD />
      <ScannerSweep />

      {/* Background Grid */}
      <div className="bg-grid"></div>

      {/* SVG Cinematic Grain Noise */}
      <svg className="noise-overlay" preserveAspectRatio="none">
        <filter id="cinematic-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"></feTurbulence>
          <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.035 0"></feColorMatrix>
        </filter>
        <rect width="100%" height="100%" filter="url(#cinematic-grain)"></rect>
      </svg>

      <NavUI 
        currentSlide={currentSlide}
        totalSlides={SLIDES.length}
        slideTitles={SLIDE_TITLES}
      />
      
      <div ref={slideContainerRef} style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, perspective: '1200px', overflow: 'hidden' }}>
        {SLIDES.map((SlideComponent, index) => {
          // Only render active or transitioning slides to keep DOM light, but keep them mounted if needed.
          // Wait, if we unmount them, the GSAP animation on the wrapper might fail if it's currently transitioning.
          // Let's just render all of them but hide the ones that are totally inactive.
          const isVisible = index === currentSlide || index === prevSlideIndex;

          return (
            <div 
              key={index} 
              id={`slide-wrapper-${index}`}
              style={{
                position: 'absolute', inset: 0,
                display: isVisible ? 'block' : 'none',
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
          );
        })}
      </div>
    </main>
  );
}

export default App;
