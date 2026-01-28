import './DNAHelix.css';

const DNAHelix = ({ progress = 0, size = 'medium' }) => {
  // Number of base pairs to show based on progress (0-1)
  const totalPairs = 12;
  const visiblePairs = Math.ceil(progress * totalPairs);

  return (
    <div className={`dna-helix dna-${size}`}>
      <div className="dna-container">
        {Array.from({ length: totalPairs }).map((_, index) => {
          const isVisible = index < visiblePairs;
          const delay = index * 0.08;

          return (
            <div
              key={index}
              className={`dna-pair ${isVisible ? 'pair-visible' : 'pair-hidden'}`}
              style={{
                '--pair-delay': `${delay}s`,
                '--rotation': `${index * 30}deg`
              }}
            >
              <div className="dna-node dna-node-left" />
              <div className="dna-bridge" />
              <div className="dna-node dna-node-right" />
            </div>
          );
        })}
      </div>
      <div className="dna-glow" />
    </div>
  );
};

export default DNAHelix;
