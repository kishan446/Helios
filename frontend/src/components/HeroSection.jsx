import React, { useState, useEffect, useRef } from 'react';

const TICKER_ITEMS = [
  '⚔️ Samurai vs Robots · Mumbai',
  '🏏 Cricket Legend Story',
  '🔬 Science Quest India',
  '🗺️ Freedom Fighter 1947',
  '🧮 Fraction Adventure',
  '🌍 Geography Explorer',
  '🎵 Music Theory Game',
  '🏛️ Ancient India Quest',
];

function useCountUp(target, duration = 1500, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started || target === '∞') { setCount(target); return; }
    const num = parseInt(target);
    if (isNaN(num)) { setCount(target); return; }
    let start = 0;
    const step = num / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= num) { setCount(num); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);
  return count;
}

export default function HeroSection({ onForgeClick }) {
  const [glitching, setGlitching] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  const c60 = useCountUp(60, 1200, statsVisible);
  const c4 = useCountUp(4, 900, statsVisible);

  useEffect(() => {
    // Glitch every 5 seconds
    const glitchInterval = setInterval(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 450);
    }, 5000);

    // Scroll indicator
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Stats IntersectionObserver
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.5 }
    );
    if (statsRef.current) observer.observe(statsRef.current);

    return () => {
      clearInterval(glitchInterval);
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const tickerContent = [...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
    <React.Fragment key={i}>
      <span className="ticker-item">{item}</span>
      {i < TICKER_ITEMS.length * 2 - 1 && <span className="ticker-item ticker-sep">·</span>}
    </React.Fragment>
  ));

  return (
    <section className="hero-section" data-testid="hero-section">
      {/* Floating badge */}
      <div className="hero-badge" data-testid="hero-badge">
        🏆 2025 HACKATHON WINNER · BEST AI INNOVATION
      </div>

      {/* Main title */}
      <h1 className="hero-title">
        <span
          className="hero-title-white"
          style={{
            opacity: 0,
            animation: 'fadeSlideDown 0.8s 0.2s var(--ease-spring) forwards',
          }}
        >
          GAME
        </span>
        <span
          className={`hero-title-gradient ${glitching ? 'glitch-active' : ''}`}
          data-text="FORGE"
          style={{
            opacity: 0,
            animation: 'fadeSlideDown 0.8s 0.4s var(--ease-spring) forwards',
          }}
        >
          FORGE
        </span>
      </h1>

      {/* Subtitle */}
      <p
        className="hero-subtitle"
        style={{
          opacity: 0,
          animation: 'fadeSlideDown 0.8s 0.7s var(--ease-spring) forwards',
        }}
      >
        Turn <span className="highlight">Any Idea</span> Into a Playable Game —
        In <span className="highlight">60 Seconds</span>
      </p>

      {/* Stats */}
      <div
        className="hero-stats"
        ref={statsRef}
        style={{
          opacity: 0,
          animation: 'fadeSlideDown 0.8s 0.9s var(--ease-spring) forwards',
        }}
        data-testid="hero-stats"
      >
        <div className="stat-item">
          <span className="stat-number" data-testid="stat-60">{typeof c60 === 'number' ? c60 : c60}</span>
          <span className="stat-label">SECONDS TO FORGE</span>
        </div>
        <div className="stat-item">
          <span className="stat-number" data-testid="stat-4">{typeof c4 === 'number' ? c4 : c4}</span>
          <span className="stat-label">AI AGENTS ACTIVE</span>
        </div>
        <div className="stat-item">
          <span className="stat-number" style={{ color: 'var(--neon-cyan)' }}>∞</span>
          <span className="stat-label">GAMES POSSIBLE</span>
        </div>
      </div>

      {/* Infinite ticker */}
      <div
        className="ticker-wrapper"
        style={{
          opacity: 0,
          animation: 'fadeIn 0.8s 1.1s forwards',
        }}
      >
        <div className="ticker-content">{tickerContent}</div>
      </div>

      {/* CTA Buttons */}
      <div
        className="hero-cta-row"
        style={{
          opacity: 0,
          animation: 'fadeSlideDown 0.8s 1.0s var(--ease-spring) forwards',
        }}
      >
        <button
          className="btn-primary"
          onClick={onForgeClick}
          data-testid="hero-forge-btn"
        >
          ⚡ START FORGING
        </button>
        <button
          className="btn-secondary"
          onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
          data-testid="hero-gallery-btn"
        >
          ▶ SEE GAMES
        </button>
      </div>

      {/* Scroll indicator */}
      <div className={`scroll-indicator ${scrolled ? 'hidden' : ''}`}>
        <span className="scroll-text">SCROLL TO FORGE</span>
        <div className="scroll-arrow" />
      </div>

      <style>{`
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </section>
  );
}
