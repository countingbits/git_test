import { useState } from 'react';
import WhyAreYouHere from './pages/WhyAreYouHere';
import WhatToImprove from './pages/WhatToImprove';
import WhereAreYouStarting from './pages/WhereAreYouStarting';
import WeightsChoice from './pages/WeightsChoice';
import './App.css';

// Onboarding steps
const STEPS = {
  WHY: 'why',
  IMPROVE: 'improve',
  STARTING: 'starting',
  WEIGHTS: 'weights',
  COMPLETE: 'complete'
};

function App() {
  const [currentStep, setCurrentStep] = useState(STEPS.WHY);
  const [userData, setUserData] = useState({
    motivation: null,
    improvement: null,
    assessments: {
      exerciseFrequency: null,
      pushups: null,
      walking: null,
      liftWeights: null
    },
    wantsWeights: null
  });

  const handleMotivationSelect = (motivation) => {
    setUserData(prev => ({ ...prev, motivation }));
    setCurrentStep(STEPS.IMPROVE);
  };

  const handleImprovementSelect = (improvement) => {
    setUserData(prev => ({ ...prev, improvement }));
    setCurrentStep(STEPS.STARTING);
  };

  const handleAssessmentsComplete = (assessments) => {
    setUserData(prev => ({ ...prev, assessments }));
    setCurrentStep(STEPS.WEIGHTS);
  };

  const handleWeightsChoice = (choice) => {
    const wantsWeights = choice === 'yes';
    setUserData(prev => ({ ...prev, wantsWeights }));
    setCurrentStep(STEPS.COMPLETE);
    // Log the complete user data
    console.log('User onboarding complete:', { ...userData, wantsWeights });
  };

  const handleBackToWhy = () => {
    setCurrentStep(STEPS.WHY);
  };

  const handleBackToImprove = () => {
    setCurrentStep(STEPS.IMPROVE);
  };

  const handleBackToStarting = () => {
    setCurrentStep(STEPS.STARTING);
  };

  const resetOnboarding = () => {
    setCurrentStep(STEPS.WHY);
    setUserData({
      motivation: null,
      improvement: null,
      assessments: {
        exerciseFrequency: null,
        pushups: null,
        walking: null,
        liftWeights: null
      },
      wantsWeights: null
    });
  };

  // Render completion screen
  if (currentStep === STEPS.COMPLETE) {
    return (
      <div className="completion-page">
        <div className="completion-content">
          <div className="completion-icon">🎉</div>
          <h1>Welcome to ClearPath</h1>
          <p className="completion-message">
            You're on your way to becoming the best version of yourself.
          </p>

          <div className="user-summary">
            <div className="summary-section">
              <h3>Your Journey</h3>
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
            </div>

            <div className="summary-section">
              <h3>Your Profile</h3>
              <div className="profile-stats">
                <div className="stat-item">
                  <span className="stat-label">Exercise frequency</span>
                  <span className="stat-value">{userData.assessments?.exerciseFrequency || 'N/A'}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">5 push-ups</span>
                  <span className="stat-value">{userData.assessments?.pushups || 'N/A'}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Walking endurance</span>
                  <span className="stat-value">{userData.assessments?.walking || 'N/A'}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Weight training</span>
                  <span className="stat-value">{userData.assessments?.liftWeights || 'N/A'}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Wants weights</span>
                  <span className="stat-value">{userData.wantsWeights ? 'Yes' : 'No'}</span>
                </div>
              </div>
            </div>
          </div>

          <p className="completion-next">
            Let's build your personalized fitness journey...
          </p>
          <button className="start-button" onClick={resetOnboarding}>
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
          onBack={handleBackToWhy}
        />
      )}
      {currentStep === STEPS.STARTING && (
        <WhereAreYouStarting
          onComplete={handleAssessmentsComplete}
          onBack={handleBackToImprove}
          initialAnswers={userData.assessments}
        />
      )}
      {currentStep === STEPS.WEIGHTS && (
        <WeightsChoice
          onSelect={handleWeightsChoice}
          onBack={handleBackToStarting}
        />
      )}
    </>
  );
}

export default App;
