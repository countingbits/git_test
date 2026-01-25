import GlassButton from '../components/GlassButton';
import './WhyAreYouHere.css';

const motivations = [
  {
    id: 'tired',
    text: "I'm tired of being sick and tired",
    icon: '💫'
  },
  {
    id: 'change',
    text: 'I want to change my life',
    icon: '🦋'
  },
  {
    id: 'stronger',
    text: 'I want to get stronger',
    icon: '💪'
  },
  {
    id: 'look-better',
    text: 'I want to look better',
    icon: '✨'
  },
  {
    id: 'feel-better',
    text: 'I want to feel better',
    icon: '🌟'
  },
  {
    id: 'healthy',
    text: 'I want to be healthier',
    icon: '❤️'
  }
];

const WhyAreYouHere = ({ onSelect }) => {
  return (
    <div className="why-page">
      <div className="why-content">
        <div className="why-header">
          <h1 className="why-logo">clearpath.io</h1>
          <p className="why-tagline">Your journey begins with a single step</p>
        </div>

        <div className="why-question">
          <h2>Why are you here?</h2>
          <p>Choose what resonates with you most</p>
        </div>

        <div className="why-buttons">
          {motivations.map((motivation, index) => (
            <GlassButton
              key={motivation.id}
              onClick={() => onSelect(motivation)}
              delay={index * 100}
              icon={motivation.icon}
            >
              {motivation.text}
            </GlassButton>
          ))}
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

export default WhyAreYouHere;
