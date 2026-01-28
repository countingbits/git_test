import './RailroadProgress.css';

const RailroadProgress = ({ currentStep, totalSteps = 5 }) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="railroad-progress">
      <div className="railroad-track">
        {steps.map((step, index) => {
          const isCompleted = step < currentStep;
          const isCurrent = step === currentStep;

          return (
            <div key={step} className="railroad-step">
              {/* Connecting line (before node, except first) */}
              {index > 0 && (
                <div
                  className={`railroad-line ${
                    isCompleted || isCurrent ? 'line-active' : ''
                  }`}
                />
              )}

              {/* Node */}
              <div
                className={`railroad-node ${
                  isCompleted ? 'node-completed' : ''
                } ${isCurrent ? 'node-current' : ''}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RailroadProgress;
