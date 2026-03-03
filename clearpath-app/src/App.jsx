import { useState } from 'react';
import WhyAreYouHere from './pages/WhyAreYouHere';
import WhatToImprove from './pages/WhatToImprove';
import WhereAreYouStarting from './pages/WhereAreYouStarting';
import WeightsChoice from './pages/WeightsChoice';
import FitnessDNA from './pages/FitnessDNA';
import ClearPathLogo from './components/ClearPathLogo';
import './App.css';

const STEPS = {
  WHY:      'why',
  IMPROVE:  'improve',
  STARTING: 'starting',
  WEIGHTS:  'weights',
  DNA:      'dna',
  COMPLETE: 'complete',
};

function App() {
  const [currentStep, setCurrentStep]     = useState(STEPS.WHY);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionClass, setTransitionClass] = useState('');
  const [userData, setUserData] = useState({
    motivation:  null,
    improvement: null,
    assessments: {
      exerciseFrequency: null,
      pushups:           null,
      walking:           null,
      liftWeights:       null,
    },
    wantsWeights: null,
    fitnessDNA:   null,
  });

  const navigateTo = (newStep, direction = 'forward') => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTransitionClass(direction === 'forward' ? 'page-exit-left' : 'page-exit-right');
    setTimeout(() => {
      setCurrentStep(newStep);
      setTransitionClass(direction === 'forward' ? 'page-enter-right' : 'page-enter-left');
      setTimeout(() => { setTransitionClass(''); setIsTransitioning(false); }, 300);
    }, 250);
  };

  // Handlers
  const handleMotivationSelect   = (motivation)   => { setUserData(p => ({ ...p, motivation }));   navigateTo(STEPS.IMPROVE,  'forward'); };
  const handleImprovementSelect  = (improvement)  => { setUserData(p => ({ ...p, improvement }));  navigateTo(STEPS.STARTING, 'forward'); };
  const handleAssessmentsComplete = (assessments) => { setUserData(p => ({ ...p, assessments }));  navigateTo(STEPS.WEIGHTS,  'forward'); };
  const handleWeightsChoice      = (choice)       => {
    const wantsWeights = choice === 'yes';
    setUserData(p => ({ ...p, wantsWeights }));
    navigateTo(STEPS.DNA, 'forward');
  };
  const handleDNAComplete = (fitnessDNA) => {
    setUserData(p => ({ ...p, fitnessDNA }));
    navigateTo(STEPS.COMPLETE, 'forward');
  };

  // Back handlers
  const handleBackToWhy      = () => navigateTo(STEPS.WHY,      'back');
  const handleBackToImprove  = () => navigateTo(STEPS.IMPROVE,  'back');
  const handleBackToStarting = () => navigateTo(STEPS.STARTING, 'back');
  const handleBackToWeights  = () => navigateTo(STEPS.WEIGHTS,  'back');

  const resetOnboarding = () => {
    navigateTo(STEPS.WHY, 'back');
    setTimeout(() => setUserData({
      motivation: null, improvement: null,
      assessments: { exerciseFrequency: null, pushups: null, walking: null, liftWeights: null },
      wantsWeights: null, fitnessDNA: null,
    }), 300);
  };

  // ── Completion screen ─────────────────────────
  if (currentStep === STEPS.COMPLETE) {
    return (
      <div className={`page-wrapper ${transitionClass}`}>
        <div className="completion-page">
          <div className="completion-content">
            <div className="completion-logo">
              <ClearPathLogo size="xlarge" animated={true} />
            </div>

            <h1>Your path is clear.</h1>
            <p className="completion-message">
              Your Fitness DNA has been built. Time to start moving.
            </p>

            <div className="user-summary">
              <div className="summary-section">
                <h3>Your Profile</h3>
                <div className="profile-stats">
                  <div className="stat-item">
                    <span className="stat-label">Motivation</span>
                    <span className="stat-value">{userData.motivation?.text || '—'}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Goal</span>
                    <span className="stat-value">{userData.improvement?.text || '—'}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Uses weights</span>
                    <span className="stat-value">{userData.wantsWeights ? 'Yes' : 'No'}</span>
                  </div>
                  {userData.fitnessDNA?.answers?.workoutTime && (
                    <div className="stat-item">
                      <span className="stat-label">Preferred time</span>
                      <span className="stat-value">{userData.fitnessDNA.answers.workoutTime}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <button className="start-button" onClick={resetOnboarding}>
              Start Over (Demo)
            </button>
          </div>

          <div className="background-orbs">
            <div className="orb orb-1" />
            <div className="orb orb-2" />
            <div className="orb orb-3" />
            <div className="orb orb-4" />
          </div>
        </div>
      </div>
    );
  }

  // ── Main flow ─────────────────────────────────
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
      {currentStep === STEPS.DNA && (
        <FitnessDNA
          userData={userData}
          onComplete={handleDNAComplete}
          onBack={handleBackToWeights}
        />
      )}
    </div>
  );
}

export default App;
