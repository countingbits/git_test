import './ClearPathLogo.css';

// A winding path that transitions into a DNA strand — "your path becomes your DNA"
const ClearPathLogo = ({ size = 'medium', animated = true }) => {
  return (
    <div className={`clearpath-logo logo-${size} ${animated ? 'logo-animated' : ''}`}>
      <svg viewBox="0 0 80 80" className="logo-svg" fill="none">
        {/* Winding path trail */}
        <path
          className="logo-trail"
          d="M 14 68 C 18 58 22 52 28 46 C 34 40 38 36 42 30 C 46 24 50 18 58 12"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Left helix strand */}
        <path
          className="logo-helix-left"
          d="M 26 46 C 30 42 34 38 38 34 C 42 30 46 26 50 22"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Right helix strand */}
        <path
          className="logo-helix-right"
          d="M 30 50 C 34 44 38 40 42 36 C 46 32 50 28 54 22"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* DNA rungs connecting the strands */}
        <line className="logo-rung logo-rung-1" x1="27" y1="45" x2="31" y2="49" strokeWidth="1.5" strokeLinecap="round" />
        <line className="logo-rung logo-rung-2" x1="32" y1="40" x2="36" y2="44" strokeWidth="1.5" strokeLinecap="round" />
        <line className="logo-rung logo-rung-3" x1="37" y1="35" x2="41" y2="39" strokeWidth="1.5" strokeLinecap="round" />
        <line className="logo-rung logo-rung-4" x1="42" y1="30" x2="46" y2="34" strokeWidth="1.5" strokeLinecap="round" />
        <line className="logo-rung logo-rung-5" x1="47" y1="25" x2="51" y2="29" strokeWidth="1.5" strokeLinecap="round" />

        {/* Footsteps along the lower path */}
        <ellipse className="logo-step logo-step-1" cx="18" cy="63" rx="3" ry="4.5" transform="rotate(-40 18 63)" />
        <ellipse className="logo-step logo-step-2" cx="24" cy="52" rx="3" ry="4.5" transform="rotate(-25 24 52)" />

        {/* Destination glow at top */}
        <circle className="logo-destination" cx="58" cy="12" r="5" />
        <circle className="logo-destination-outer" cx="58" cy="12" r="9" />
      </svg>
    </div>
  );
};

export default ClearPathLogo;
