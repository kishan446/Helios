import React, { useState, useEffect, useRef } from 'react';

const LETTERS = ['H', 'E', 'L', 'I', 'O', 'S'];
const STATUSES = [
  '▸ LOADING AGENT PIPELINE...',
  '▸ CALIBRATING GAME ENGINE...',
  '▸ WARMING UP AI MODELS...',
  '▸ READY TO FORGE WORLDS...',
];

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [statusIdx, setStatusIdx] = useState(0);
  const [tagline, setTagline] = useState('');
  const [exiting, setExiting] = useState(false);
  const fullTagline = 'INITIALIZING AI GAME ENGINE...';
  const doneRef = useRef(false);

  useEffect(() => {
    let charIdx = 0;
    const typeTimer = setInterval(() => {
      if (charIdx <= fullTagline.length) {
        setTagline(fullTagline.slice(0, charIdx));
        charIdx++;
      } else {
        clearInterval(typeTimer);
      }
    }, 40);
    return () => clearInterval(typeTimer);
  }, []);

  useEffect(() => {
    let prog = 0;
    const timer = setInterval(() => {
      prog += Math.random() * 4 + 2;
      if (prog >= 100) {
        prog = 100;
        clearInterval(timer);
        if (!doneRef.current) {
          doneRef.current = true;
          setTimeout(() => {
            setExiting(true);
            setTimeout(() => onComplete(), 700);
          }, 400);
        }
      }
      setProgress(Math.floor(prog));
      setStatusIdx(Math.min(3, Math.floor(prog / 25)));
    }, 60);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className={`loader-overlay ${exiting ? 'loader-exit' : ''}`}>
      <div className="loader-logo">
        {LETTERS.map((letter, i) => (
          <span
            key={i}
            className="loader-letter"
            style={{ animationDelay: `${i * 0.07}s` }}
          >
            {letter}
          </span>
        ))}
      </div>

      <div className="loader-tagline">{tagline}</div>

      <div style={{ width: 'min(400px, 80vw)' }}>
        <div className="loader-progress-bar-container">
          <div className="loader-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
          <span className="loader-status">{STATUSES[statusIdx]}</span>
          <span
            style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: 12,
              color: 'var(--neon-yellow)',
              fontWeight: 700
            }}
          >
            {progress}%
          </span>
        </div>
      </div>

      <div
        style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 11,
          letterSpacing: 3,
          color: 'rgba(255,255,255,0.15)',
          marginTop: 16,
        }}
      >
        BUILT WITH EMERGENT AI · FOR 250M INDIAN STUDENTS
      </div>
    </div>
  );
}
