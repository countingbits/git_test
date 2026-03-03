import { useState, useEffect, useRef } from 'react';
import BackButton from '../components/BackButton';
import RailroadProgress from '../components/RailroadProgress';
import './FitnessDNA.css';

const DNA_QUESTIONS = [
  {
    id: 'workoutTime',
    question: 'When do you prefer to move?',
    options: [
      { value: 'morning',   label: 'Early Morning', color: '#FFD93D' },
      { value: 'midday',    label: 'Midday',         color: '#6BCB77' },
      { value: 'evening',   label: 'Evening',        color: '#4D96FF' },
      { value: 'night',     label: 'Late Night',     color: '#B57BFF' },
    ],
  },
  {
    id: 'duration',
    question: 'How long per session?',
    options: [
      { value: '15',  label: '15 minutes', color: '#00ff88' },
      { value: '30',  label: '30 minutes', color: '#00d4aa' },
      { value: '45',  label: '45 minutes', color: '#00b4d8' },
      { value: '60+', label: '60+ minutes',color: '#0096c7' },
    ],
  },
  {
    id: 'intensity',
    question: 'What energy feels right?',
    options: [
      { value: 'low',      label: 'Low & Steady',  color: '#a8e6cf' },
      { value: 'moderate', label: 'Moderate',       color: '#88d8b0' },
      { value: 'high',     label: 'High Energy',    color: '#ff8b94' },
      { value: 'mixed',    label: 'Mix It Up',      color: '#ffaaa5' },
    ],
  },
  {
    id: 'social',
    question: 'How do you like to train?',
    options: [
      { value: 'solo',     label: 'Solo',            color: '#dcd6f7' },
      { value: 'partner',  label: 'With a Partner',  color: '#a6b1e1' },
      { value: 'group',    label: 'In a Group',      color: '#b4869f' },
      { value: 'flexible', label: 'Depends on mood', color: '#985f6f' },
    ],
  },
  {
    id: 'challenge',
    question: "What's your biggest wall?",
    options: [
      { value: 'motivation',   label: 'Staying Motivated', color: '#f67280' },
      { value: 'time',         label: 'Finding Time',      color: '#c06c84' },
      { value: 'knowledge',    label: 'Knowing What To Do',color: '#6c5b7b' },
      { value: 'consistency',  label: 'Being Consistent',  color: '#355c7d' },
    ],
  },
  {
    id: 'recovery',
    question: 'How do you recover?',
    options: [
      { value: 'active',   label: 'Light Activity',      color: '#99e2b4' },
      { value: 'stretch',  label: 'Stretching & Yoga',   color: '#67b99a' },
      { value: 'rest',     label: 'Complete Rest',        color: '#469d89' },
      { value: 'mixed',    label: 'Mix of Everything',    color: '#248277' },
    ],
  },
];

// Spiral positions: each rung pair rotates around the central axis
function getRungTransform(index) {
  const angle = (index * 37) % 360; // offset per rung
  return `rotate(${angle}deg)`;
}

const FitnessDNA = ({ userData, onComplete, onBack }) => {
  const [phase, setPhase]               = useState('intro');   // intro → shifted → questions
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers]           = useState({});
  const [rungs, setRungs]               = useState([]);         // { color, id }
  const [questionKey, setQuestionKey]   = useState(0);          // force re-mount for animation
  const answeredRef = useRef(false);

  // Intro → shift → questions timing
  useEffect(() => {
    const t1 = setTimeout(() => setPhase('shifted'),   2600);
    const t2 = setTimeout(() => setPhase('questions'), 3300);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const handleAnswer = (option) => {
    if (answeredRef.current) return;
    answeredRef.current = true;

    const newAnswers = { ...answers, [DNA_QUESTIONS[currentQuestion].id]: option.value };
    setAnswers(newAnswers);
    setRungs(prev => [...prev, { color: option.color, id: Date.now() }]);

    if (currentQuestion < DNA_QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(q => q + 1);
        setQuestionKey(k => k + 1);
        answeredRef.current = false;
      }, 420);
    } else {
      setTimeout(() => onComplete({ answers: newAnswers }), 700);
    }
  };

  const totalRungs = 4 + rungs.length; // 4 base "seed" rungs always visible
  const currentQ   = DNA_QUESTIONS[currentQuestion];

  return (
    <div className="dna-page">
      {/* Nav */}
      {phase !== 'intro' && (
        <div className="dna-nav">
          <BackButton onClick={onBack} />
          <RailroadProgress currentStep={5} totalSteps={6} />
        </div>
      )}

      <div className={`dna-layout dna-layout--${phase}`}>

        {/* ── DNA Visualization ─────────────────── */}
        <div className="dna-vis-wrap">
          {phase === 'intro' && (
            <div className="dna-intro-label">
              <p className="dna-intro-sub">Building your</p>
              <h1 className="dna-intro-title">Fitness DNA</h1>
            </div>
          )}

          <div className="dna-strand-scroll">
            {/* Seed rungs */}
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={`seed-${i}`}
                className="dna-rung dna-rung--seed"
                style={{ '--rung-rot': getRungTransform(i), '--delay': `${i * 0.12}s` }}
              >
                <div className="rung-node" />
                <div className="rung-bar" />
                <div className="rung-node" />
              </div>
            ))}

            {/* Answer rungs */}
            {rungs.map((r, i) => (
              <div
                key={r.id}
                className="dna-rung dna-rung--answer"
                style={{
                  '--rung-color': r.color,
                  '--rung-rot':   getRungTransform(4 + i),
                  '--delay':      '0s',
                }}
              >
                <div className="rung-node" style={{ background: r.color, boxShadow: `0 0 8px ${r.color}` }} />
                <div className="rung-bar"  style={{ background: `linear-gradient(90deg, ${r.color}99, ${r.color})` }} />
                <div className="rung-node" style={{ background: r.color, boxShadow: `0 0 8px ${r.color}` }} />
              </div>
            ))}
          </div>

          {/* Ambient glow column */}
          <div className="dna-spine-glow" />
        </div>

        {/* ── Questions Panel ────────────────────── */}
        {phase === 'questions' && (
          <div className="dna-questions-wrap">
            <div className="dna-q-progress">
              <div
                className="dna-q-fill"
                style={{ width: `${(currentQuestion / DNA_QUESTIONS.length) * 100}%` }}
              />
            </div>
            <span className="dna-q-counter">{currentQuestion + 1} / {DNA_QUESTIONS.length}</span>

            <div className="dna-q-body" key={questionKey}>
              <h2 className="dna-q-title">{currentQ.question}</h2>

              <div className="dna-q-options">
                {currentQ.options.map((opt, idx) => (
                  <button
                    key={opt.value}
                    className="dna-opt"
                    onClick={() => handleAnswer(opt)}
                    style={{ '--opt-color': opt.color, '--opt-delay': `${idx * 0.07}s` }}
                  >
                    <span className="dna-opt-dot" style={{ background: opt.color }} />
                    <span className="dna-opt-label">{opt.label}</span>
                    <span className="dna-opt-arrow">›</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Background orbs */}
      <div className="background-orbs">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>
    </div>
  );
};

export default FitnessDNA;
