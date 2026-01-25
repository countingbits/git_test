import './BackButton.css';

const BackButton = ({ onClick, label = 'Back' }) => {
  return (
    <button className="back-button-nav" onClick={onClick}>
      <span className="back-button-arrow">←</span>
      <span className="back-button-label">{label}</span>
    </button>
  );
};

export default BackButton;
