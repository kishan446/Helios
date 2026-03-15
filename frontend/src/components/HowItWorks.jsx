import React, { useRef, useEffect, useState } from 'react';

const STEPS = [
  {
    num: '01',
    icon: '✏️',
    title: 'TYPE YOUR IDEA',
    body: 'Describe any game in plain language. Hindi, English, or Hinglish — our AI understands everything. No technical knowledge needed.',
    highlight: 'plain language',
    color: '#FFD60A',
    bg: 'rgba(255, 214, 10, 0.15)',
  },
  {
    num: '02',
    icon: '🤖',
    title: '4 AGENTS ACTIVATE',
    body: 'Four specialized AI agents spring to life: Architect crafts the world, Coder builds the engine, Educator embeds learning, QA ensures quality.',
    highlight: '4 agents',
    color: '#00F5FF',
    bg: 'rgba(0, 245, 255, 0.15)',
  },
  {
    num: '03',
    icon: '⚡',
    title: 'GAME FORGED IN 60s',
    body: 'A fully playable HTML5 game appears in your browser. No downloads needed to play. Works on phone and laptop. Completely free.',
    highlight: '60s',
    color: '#FF2D6B',
    bg: 'rgba(255, 45, 107, 0.15)',
  },
  {
    num: '04',
    icon: '🎓',
    title: 'PLAY, LEARN, SHARE',
    body: 'Download as a single HTML file. Share with students. Track learning via teacher dashboard. One game can reach thousands of students.',
    highlight: 'thousands of students',
    color: '#00FF87',
    bg: 'rgba(0, 255, 135, 0.15)',
  },
];

function HowCard({ step, visible, delay }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-8px) perspective(800px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg)`;
    card.style.boxShadow = `0 20px 60px rgba(0,0,0,0.3), 0 0 30px ${step.color}20`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = '';
      cardRef.current.style.boxShadow = '';
    }
  };

  const highlighted = step.body.replace(
    step.highlight,
    `<span style="color:${step.color};font-weight:600">${step.highlight}</span>`
  );

  return (
    <div
      ref={cardRef}
      className="how-card"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.6s ${delay}s, transform 0.6s ${delay}s cubic-bezier(0.23, 1, 0.32, 1)`,
        borderTop: `2px solid ${step.color}30`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-testid={`how-step-${step.num}`}
    >
      <div className="how-step-num">STEP {step.num}</div>
      <div
        className="how-icon-hex"
        style={{ background: step.bg }}
      >
        <span style={{ fontSize: 28 }}>{step.icon}</span>
      </div>
      <h3 className="how-card-title" style={{ color: step.color }}>{step.title}</h3>
      <p
        className="how-card-body"
        dangerouslySetInnerHTML={{ __html: highlighted }}
      />
    </div>
  );
}

export default function HowItWorks({ onForgeClick }) {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="how-section" ref={sectionRef} data-testid="how-section">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <span className="section-eyebrow">03 · THE PROCESS</span>
          <h2 className="section-title">How HELIOS Works</h2>
          <p className="section-subtitle">
            From a simple text description to a fully playable game in under a minute.
          </p>
        </div>

        <div className="how-grid">
          <div className="how-connector">
            {/* Animated traveling dot */}
            <div style={{
              position: 'absolute',
              width: 8, height: 8,
              borderRadius: '50%',
              background: 'var(--neon-yellow)',
              top: -3,
              boxShadow: '0 0 10px var(--neon-yellow)',
              animation: 'travelDot 4s linear infinite',
            }} />
          </div>
          {STEPS.map((step, i) => (
            <HowCard key={step.num} step={step} visible={visible} delay={i * 0.12} />
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 60 }}>
          <button
            className="btn-primary"
            onClick={onForgeClick}
            style={{ fontSize: 14, letterSpacing: 2 }}
            data-testid="how-forge-btn"
          >
            ⚡ TRY IT NOW — IT'S FREE
          </button>
        </div>
      </div>

      <style>{`
        @keyframes travelDot {
          0% { left: 0%; opacity: 0; }
          5% { opacity: 1; }
          95% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
      `}</style>
    </section>
  );
}
