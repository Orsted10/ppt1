export interface SlideProps {
  isActive: boolean;
  currentStep: number;
  onTotalStepsChange: (steps: number) => void;
}
