import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const TICKER_ITEMS = ['Samurai vs Robots', 'Cricket Legend', 'Science Quest India', 'Freedom Fighter 1947', 'Fraction Adventure', 'Geography Explorer', 'Music Theory Game', 'Ancient India Quest'];

function useCountUp(target, duration = 1400, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started || typeof target !== 'number') { setCount(target); return; }
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
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
  const cK = useCountUp(12, 1400, statsVisible);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 380);
    }, 5500);
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true); }, { threshold: 0.4 });
    if (statsRef.current) observer.observe(statsRef.current);
    return () => { clearInterval(glitchInterval); window.removeEventListener('scroll', handleScroll); observer.disconnect(); };
  }, []);

  const tickerContent = [...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
    <React.Fragment key={i}>
      <span className={`ticker-item ${i % 2 === 0 ? 'accent' : ''}`}>{item}</span>
      <span className="ticker-item" style={{ color: 'rgba(255,255,255,0.1)' }}>·</span>
    </React.Fragment>
  ));

  return (
    <section className="hero-section" data-testid="hero-section">
      <div className="hero-eyebrow" data-testid="hero-eyebrow">
        <span className="hero-eyebrow-dot" />
        HELIOS AI GAME ENGINE · BUILT FOR INDIA
      </div>

      <h1 className="hero-title" style={{ opacity: 0, animation: 'fadeUp 0.9s 0.2s var(--ease-spring) forwards' }}>
        <span className="hero-title-line1">GAME</span>
        <span className={`hero-title-line2 ${glitching ? 'glitch-active' : ''}`} data-text="FORGE">
          FORGE
        </span>
      </h1>

      <p className="hero-subtitle" style={{ opacity: 0, animation: 'fadeUp 0.9s 0.4s var(--ease-spring) forwards' }}>
        Turn <span className="accent-text">any idea</span> into a fully playable HTML5 game.
        No code. No design skills. Just type and hit forge.
        Done in <span className="accent-text">60 seconds</span>.
      </p>

      <div className="hero-cta-row" style={{ opacity: 0, animation: 'fadeUp 0.9s 0.55s var(--ease-spring) forwards' }}>
        <Link to="/forge" className="btn-primary" data-testid="hero-forge-btn">
          ⚡ START FORGING
        </Link>
        <Link to="/gallery" className="btn-secondary" data-testid="hero-gallery-btn">
          Browse Games →
        </Link>
      </div>

      <div className="hero-stats" ref={statsRef} style={{ opacity: 0, animation: 'fadeUp 0.9s 0.65s var(--ease-spring) forwards' }} data-testid="hero-stats">
        <div className="stat-item">
          <span className="stat-number accent" data-testid="stat-60">{c60}</span>
          <span className="stat-label">Seconds to Forge</span>
        </div>
        <div className="stat-item">
          <span className="stat-number" data-testid="stat-4">{c4}</span>
          <span className="stat-label">AI Agents Active</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{cK}K+</span>
          <span className="stat-label">Games Created</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">∞</span>
          <span className="stat-label">Games Possible</span>
        </div>
      </div>

      <div className="ticker-wrapper" style={{ opacity: 0, animation: 'fadeIn 1s 0.8s forwards' }}>
        <div className="ticker-content">{tickerContent}</div>
      </div>

      <div className={`scroll-indicator ${scrolled ? 'hidden' : ''}`}>
        <span className="scroll-text">Scroll to Explore</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}
