import { useState, useEffect } from 'react';
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

const STEP_ORDER = [STEPS.WHY, STEPS.IMPROVE, STEPS.STARTING, STEPS.WEIGHTS, STEPS.COMPLETE];

function App() {
  const [currentStep, setCurrentStep] = useState(STEPS.WHY);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionClass, setTransitionClass] = useState('');
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

  const navigateTo = (newStep, direction = 'forward') => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setTransitionClass(direction === 'forward' ? 'page-exit-left' : 'page-exit-right');

    setTimeout(() => {
      setCurrentStep(newStep);
      setTransitionClass(direction === 'forward' ? 'page-enter-right' : 'page-enter-left');

      setTimeout(() => {
        setTransitionClass('');
        setIsTransitioning(false);
      }, 300);
    }, 250);
  };

  const handleMotivationSelect = (motivation) => {
    setUserData(prev => ({ ...prev, motivation }));
    navigateTo(STEPS.IMPROVE, 'forward');
  };

  const handleImprovementSelect = (improvement) => {
    setUserData(prev => ({ ...prev, improvement }));
    navigateTo(STEPS.STARTING, 'forward');
  };

  const handleAssessmentsComplete = (assessments) => {
    setUserData(prev => ({ ...prev, assessments }));
    navigateTo(STEPS.WEIGHTS, 'forward');
  };

  const handleWeightsChoice = (choice) => {
    const wantsWeights = choice === 'yes';
    setUserData(prev => ({ ...prev, wantsWeights }));
    navigateTo(STEPS.COMPLETE, 'forward');
    console.log('User onboarding complete:', { ...userData, wantsWeights });
  };

  const handleBackToWhy = () => {
    navigateTo(STEPS.WHY, 'back');
  };

  const handleBackToImprove = () => {
    navigateTo(STEPS.IMPROVE, 'back');
  };

  const handleBackToStarting = () => {
    navigateTo(STEPS.STARTING, 'back');
  };

  const resetOnboarding = () => {
    navigateTo(STEPS.WHY, 'back');
    setTimeout(() => {
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
    }, 300);
  };

  // Render completion screen
  if (currentStep === STEPS.COMPLETE) {
    return (
      <div className={`page-wrapper ${transitionClass}`}>
        <div className="completion-page">
          <div className="completion-content">
            <div className="completion-checkmark">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1>Welcome to ClearPath</h1>
            <p className="completion-message">
              You're on your way to becoming the best version of yourself.
            </p>

            <div className="user-summary">
              <div className="summary-section">
                <h3>Your Journey</h3>
                <div className="user-choices">
                  <div className="choice-badge">
                    <span>{userData.motivation?.text}</span>
                  </div>
                  <div className="choice-arrow">→</div>
                  <div className="choice-badge">
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
      </div>
    );
  }

  return (
    <div className={`page-wrapper ${transitionClass}`}>
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
    </div>
  );
}

export default App;
