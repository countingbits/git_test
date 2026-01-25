import { useState } from 'react';
import WhyAreYouHere from './pages/WhyAreYouHere';
import WhatToImprove from './pages/WhatToImprove';
import './App.css';

// Onboarding steps
const STEPS = {
  WHY: 'why',
  IMPROVE: 'improve',
  COMPLETE: 'complete'
};

function App() {
  const [currentStep, setCurrentStep] = useState(STEPS.WHY);
  const [userData, setUserData] = useState({
    motivation: null,
    improvement: null
  });

  const handleMotivationSelect = (motivation) => {
    setUserData(prev => ({ ...prev, motivation }));
    setCurrentStep(STEPS.IMPROVE);
  };

  const handleImprovementSelect = (improvement) => {
    setUserData(prev => ({ ...prev, improvement }));
    setCurrentStep(STEPS.COMPLETE);
    // Here you would typically save to backend/storage
    console.log('User onboarding complete:', { ...userData, improvement });
  };

  const handleBack = () => {
    setCurrentStep(STEPS.WHY);
  };

  // Render completion screen (placeholder for now)
  if (currentStep === STEPS.COMPLETE) {
    return (
      <div className="completion-page">
        <div className="completion-content">
          <div className="completion-icon">🎉</div>
          <h1>Welcome to ClearPath</h1>
          <p className="completion-message">
            You're on your way to becoming the best version of yourself.
          </p>
          <div className="user-choices">
            <div className="choice-badge">
              <span>{userData.motivation?.icon}</span>
              <span>{userData.motivation?.text}</span>
            </div>
            <div className="choice-arrow">→</div>
            <div className="choice-badge">
              <span>{userData.improvement?.icon}</span>
              <span>{userData.improvement?.text}</span>
            </div>
          </div>
          <p className="completion-next">
            Let's build your personalized fitness journey...
          </p>
          <button
            className="start-button"
            onClick={() => {
              setCurrentStep(STEPS.WHY);
              setUserData({ motivation: null, improvement: null });
            }}
          >
            Start Over (Demo)
          </button>
        </div>

        {/* Background orbs */}
        <div className="background-orbs">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
          <div className="orb orb-4"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      {currentStep === STEPS.WHY && (
        <WhyAreYouHere onSelect={handleMotivationSelect} />
      )}
      {currentStep === STEPS.IMPROVE && (
        <WhatToImprove
          motivation={userData.motivation}
          onSelect={handleImprovementSelect}
          onBack={handleBack}
        />
      )}
    </>
  );
}

export default App;
