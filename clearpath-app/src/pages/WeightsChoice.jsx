import RailroadProgress from '../components/RailroadProgress';
import BackButton from '../components/BackButton';
import './WeightsChoice.css';

const WeightsChoice = ({ onSelect, onBack }) => {
  const handleChoice = (choice) => {
    console.log('Weights choice:', choice);
    onSelect(choice);
  };

  return (
    <div className="weights-page">
      <RailroadProgress currentStep={4} completedSteps={[1, 2, 3]} />

      <div className="weights-content">
        <div className="weights-nav">
          <BackButton onClick={onBack} />
        </div>

        <div className="weights-question">
          <h2>Do you want to use weights?</h2>
        </div>

        <div className="weights-buttons">
          <button
            className="weight-choice-button"
            onClick={() => handleChoice('yes')}
          >
            <span className="weight-choice-text">YES</span>
            <span className="weight-choice-glow"></span>
            <span className="weight-choice-shine"></span>
          </button>

          <button
            className="weight-choice-button"
            onClick={() => handleChoice('no')}
          >
            <span className="weight-choice-text">NO</span>
            <span className="weight-choice-glow"></span>
            <span className="weight-choice-shine"></span>
          </button>
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

export default WeightsChoice;
