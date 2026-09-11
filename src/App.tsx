import { useState } from 'react';
import './App.css';
import { useKeyPress } from './hooks/useKeyPress';
import { NavUI } from './components/NavUI';

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
  const [currentStep, setCurrentStep] = useState(0);
  const [totalStepsInCurrentSlide, setTotalStepsInCurrentSlide] = useState(1);

  const nextAction = () => {
    if (currentStep < totalStepsInCurrentSlide - 1) {
      setCurrentStep((prev) => prev + 1);
    } else if (currentSlide < SLIDES.length - 1) {
      setCurrentSlide((prev) => prev + 1);
      setCurrentStep(0);
    }
  };

  const prevAction = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    } else if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
      setCurrentStep(0);
    }
  };

  useKeyPress('ArrowRight', nextAction);
  useKeyPress('ArrowLeft', prevAction);
  useKeyPress(' ', nextAction);

  return (
    <main className="cinematic-frame">
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
      
      {SLIDES.map((SlideComponent, index) => {
        return (
          <SlideComponent
            key={index}
            isActive={index === currentSlide}
            currentStep={index === currentSlide ? currentStep : 0}
            onTotalStepsChange={
              index === currentSlide ? setTotalStepsInCurrentSlide : () => {}
            }
          />
        );
      })}
    </main>
  );
}

export default App;
