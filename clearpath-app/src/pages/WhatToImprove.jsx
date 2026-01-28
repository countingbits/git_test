import GlassButton from '../components/GlassButton';
import './WhatToImprove.css';

const improvements = [
  {
    id: 'lose-weight',
    text: 'I need to lose weight'
  },
  {
    id: 'gain-muscle',
    text: 'I need to gain muscle'
  },
  {
    id: 'heart-health',
    text: 'I need my heart to be healthy'
  },
  {
    id: 'breathe-better',
    text: 'I need to breathe better'
  },
  {
    id: 'flexibility',
    text: 'I need to be more flexible'
  },
  {
    id: 'energy',
    text: 'I need more energy'
  }
];

const WhatToImprove = ({ motivation, onSelect, onBack }) => {
  return (
    <div className="improve-page">
      <div className="improve-content">
        <button className="back-button" onClick={onBack}>
          <span className="back-arrow">←</span>
          <span>Back</span>
        </button>

        <div className="improve-header">
          <div className="motivation-badge">
            <span>{motivation?.text}</span>
          </div>
          <h1 className="improve-title">Let's get specific</h1>
          <p className="improve-subtitle">What do you want to improve?</p>
        </div>

        <div className="improve-buttons">
          {improvements.map((improvement, index) => (
            <GlassButton
              key={improvement.id}
              onClick={() => onSelect(improvement)}
              delay={index * 100}
            >
              {improvement.text}
            </GlassButton>
          ))}
        </div>

        <div className="improve-footer">
          <p>Don't worry, you can always change this later</p>
        </div>
      </div>

      {/* Animated background elements */}
      <div className="background-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
        <div className="orb orb-4"></div>
      </div>
    </div>
  );
};

export default WhatToImprove;
