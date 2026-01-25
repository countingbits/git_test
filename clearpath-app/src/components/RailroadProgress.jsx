import './RailroadProgress.css';

const steps = [
  { id: 1, label: 'Why' },
  { id: 2, label: 'What' },
  { id: 3, label: 'Here' },
  { id: 4, label: 'Weights' },
  { id: 5, label: 'Done' }
];

const RailroadProgress = ({ currentStep, completedSteps = [] }) => {
  return (
    <div className="railroad-progress">
      <div className="railroad-track">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id);
          const isCurrent = currentStep === step.id;
          const isLocked = !isCompleted && !isCurrent;

          return (
            <div key={step.id} className="railroad-step">
              {/* Connecting line (before node, except first) */}
              {index > 0 && (
                <div
                  className={`railroad-line railroad-line-before ${
                    isCompleted || isCurrent ? 'line-active' : ''
                  }`}
                />
              )}

              {/* Node */}
              <div
                className={`railroad-node ${
                  isCompleted ? 'node-completed' : ''
                } ${isCurrent ? 'node-current' : ''} ${
                  isLocked ? 'node-locked' : ''
                }`}
              >
                {isCompleted ? (
                  <span className="node-checkmark">✓</span>
                ) : (
                  <span className="node-number">{step.id}</span>
                )}
              </div>

              {/* Label */}
              <span
                className={`railroad-label ${
                  isCompleted ? 'label-completed' : ''
                } ${isCurrent ? 'label-current' : ''} ${
                  isLocked ? 'label-locked' : ''
                }`}
              >
                {step.label}
              </span>

              {/* Connecting line (after node, except last) */}
              {index < steps.length - 1 && (
                <div
                  className={`railroad-line railroad-line-after ${
                    isCompleted ? 'line-active' : ''
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RailroadProgress;
