import './GlassButton.css';

const GlassButton = ({ children, onClick, delay = 0, icon }) => {
  return (
    <button
      className="glass-button"
      onClick={onClick}
      style={{ animationDelay: `${delay}ms` }}
    >
      <span className="glass-button-shine"></span>
      <span className="glass-button-content">
        {icon && <span className="glass-button-icon">{icon}</span>}
        <span className="glass-button-text">{children}</span>
      </span>
      <span className="glass-button-glow"></span>
    </button>
  );
};

export default GlassButton;
