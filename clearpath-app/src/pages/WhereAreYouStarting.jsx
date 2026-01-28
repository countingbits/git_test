import { useState } from 'react';
import RailroadProgress from '../components/RailroadProgress';
import BackButton from '../components/BackButton';
import './WhereAreYouStarting.css';

const questions = [
  {
    id: 'exerciseFrequency',
    question: 'How often do you currently exercise?',
    options: [
      { value: 'never', label: 'Never' },
      { value: 'rarely', label: 'Rarely' },
      { value: '1-2x', label: '1-2x/week' },
      { value: '3-4x', label: '3-4x/week' },
      { value: '5+', label: '5+ times' }
    ]
  },
  {
    id: 'pushups',
    question: 'Can you do 5 push-ups right now?',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
      { value: 'not-sure', label: 'Not sure' }
    ]
  },
  {
    id: 'walking',
    question: 'How long can you walk without stopping?',
    options: [
      { value: '5min', label: '5 min' },
      { value: '15min', label: '15 min' },
      { value: '30min', label: '30 min' },
      { value: '1hour+', label: '1+ hour' }
    ]
  },
  {
    id: 'liftWeights',
    question: 'Do you currently lift weights?',
    options: [
      { value: 'never', label: 'Never tried' },
      { value: 'used-to', label: 'Used to' },
      { value: 'sometimes', label: 'Sometimes' },
      { value: 'regularly', label: 'Regularly' }
    ]
  }
];

const WhereAreYouStarting = ({ onComplete, onBack, initialAnswers = {} }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(initialAnswers);
  const [slideDirection, setSlideDirection] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleOptionSelect = (questionId, value) => {
    if (isAnimating) return;

    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    // If last question, complete the screen
    if (currentIndex === questions.length - 1) {
      setTimeout(() => {
        onComplete(newAnswers);
      }, 300);
      return;
    }

    // Animate to next question
    setIsAnimating(true);
    setSlideDirection('slide-out-left');

    setTimeout(() => {
      setCurrentIndex(currentIndex + 1);
      setSlideDirection('slide-in-right');

      setTimeout(() => {
        setSlideDirection('');
        setIsAnimating(false);
      }, 50);
    }, 300);
  };

  const handleBack = () => {
    if (isAnimating) return;

    if (currentIndex === 0) {
      // Go back to previous screen
      onBack();
      return;
    }

    // Animate to previous question
    setIsAnimating(true);
    setSlideDirection('slide-out-right');

    setTimeout(() => {
      setCurrentIndex(currentIndex - 1);
      setSlideDirection('slide-in-left');

      setTimeout(() => {
        setSlideDirection('');
        setIsAnimating(false);
      }, 50);
    }, 300);
  };

  return (
    <div className="starting-page">
      <RailroadProgress currentStep={3} totalSteps={5} />

      <div className="starting-content">
        <div className="starting-nav">
          <BackButton onClick={handleBack} />
          <div className="question-indicator">
            {currentIndex + 1} / {questions.length}
          </div>
        </div>

        <div className={`question-container ${slideDirection}`}>
          <h2 className="question-text">{currentQuestion.question}</h2>

          <div className="options-grid">
            {currentQuestion.options.map((option) => {
              const isSelected = answers[currentQuestion.id] === option.value;
              return (
                <button
                  key={option.value}
                  className={`option-button ${isSelected ? 'option-selected' : ''}`}
                  onClick={() => handleOptionSelect(currentQuestion.id, option.value)}
                  disabled={isAnimating}
                >
                  <span className="option-label">{option.label}</span>
                  <span className="option-glow"></span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Progress dots */}
        <div className="question-dots">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`question-dot ${
                index === currentIndex ? 'dot-active' : ''
              } ${index < currentIndex ? 'dot-completed' : ''}`}
            />
          ))}
        </div>
      </div>

      {/* Background orbs */}
      <div className="background-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>
    </div>
  );
};

export default WhereAreYouStarting;
