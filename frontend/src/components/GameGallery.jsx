import React, { useState, useRef, useEffect } from 'react';

const GALLERY_GAMES = [
  {
    id: 1,
    title: 'Freedom Fighters 1947',
    subject: '🗺️ History',
    classLabel: 'Class 7',
    stars: '4.9',
    plays: '12.4k',
    category: 'history',
    thumbBg: 'linear-gradient(135deg, #FF9933 0%, #FFFFFF 40%, #138808 100%)',
    thumbContent: '🏴',
    glowColor: '#FF9933',
    prompt: 'A young Indian freedom fighter in 1947 Mumbai must collect secret messages from Gandhi, Nehru and Bose while avoiding British soldiers. Class 7 History. Hindi and English.',
  },
  {
    id: 2,
    title: 'Fraction Quest',
    subject: '🧮 Maths',
    classLabel: 'Class 5',
    stars: '4.8',
    plays: '8.2k',
    category: 'maths',
    thumbBg: 'radial-gradient(circle at 30% 30%, #0A0A2E, #1A1A5E)',
    thumbContent: '🧮',
    glowColor: '#00F5FF',
    prompt: 'A maths adventure platformer for Class 5 students where you collect fractions to unlock doors and solve puzzles. Educational game with quizzes.',
  },
  {
    id: 3,
    title: 'ISRO Space Explorer',
    subject: '🔬 Science',
    classLabel: 'Class 8',
    stars: '4.9',
    plays: '15.1k',
    category: 'science',
    thumbBg: 'radial-gradient(circle at 50% 50%, #000820, #001040)',
    thumbContent: '🚀',
    glowColor: '#8B5CF6',
    prompt: 'An ISRO space explorer game where you pilot Chandrayaan and collect moon rocks while learning about Indian space missions. Class 8 Science.',
  },
  {
    id: 4,
    title: 'Mumbai Traffic Hero',
    subject: '⚔️ Adventure',
    classLabel: 'All Ages',
    stars: '4.7',
    plays: '9.6k',
    category: 'adventure',
    thumbBg: 'linear-gradient(180deg, #FF6B00, #FF4000, #1A0A00)',
    thumbContent: '🏙️',
    glowColor: '#FF6B00',
    prompt: 'An endless runner set in Mumbai where you navigate through traffic, avoid obstacles, and collect coins while experiencing the city. Fun for all ages.',
  },
  {
    id: 5,
    title: 'Cricket Legend',
    subject: '🏃 Sports',
    classLabel: 'All Ages',
    stars: '4.8',
    plays: '21.3k',
    category: 'sports',
    thumbBg: 'radial-gradient(circle, #001A00, #003300)',
    thumbContent: '🏏',
    glowColor: '#00FF87',
    prompt: 'A cricket game featuring legendary Indian players like Sachin, Dhoni and Virat. Play matches and learn cricket history. For all ages.',
  },
  {
    id: 6,
    title: 'Ancient India Quest',
    subject: '🏛️ History',
    classLabel: 'Class 9',
    stars: '4.6',
    plays: '6.8k',
    category: 'history',
    thumbBg: 'linear-gradient(135deg, #2D1B00, #5C3800, #8B5A00)',
    thumbContent: '🏛️',
    glowColor: '#FFD60A',
    prompt: 'Explore ancient Indian civilizations, collect artifacts from the Indus Valley, Maurya and Gupta empires. Class 9 History. Bilingual Hindi-English.',
  },
];

const FILTER_TABS = [
  { label: 'All Games', key: 'all' },
  { label: '🗺️ History', key: 'history' },
  { label: '🧮 Maths', key: 'maths' },
  { label: '🔬 Science', key: 'science' },
  { label: '🌍 Geography', key: 'geography' },
  { label: '⚔️ Adventure', key: 'adventure' },
  { label: '🏏 Sports', key: 'sports' },
];

function GameCard({ game, onPlay }) {
  const cardRef = useRef(null);
  const sheenRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(1000px) rotateX(${-y * 12}deg) rotateY(${x * 12}deg) translateZ(8px)`;

    if (sheenRef.current) {
      sheenRef.current.style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(255,255,255,0.08), transparent 70%)`;
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
      cardRef.current.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
      setTimeout(() => {
        if (cardRef.current) cardRef.current.style.transition = '';
      }, 500);
    }
  };

  return (
    <div
      ref={cardRef}
      className="game-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-testid={`game-card-${game.id}`}
    >
      {/* Thumbnail */}
      <div className="game-thumb" style={{ background: game.thumbBg, position: 'relative' }}>
        {/* Procedural content */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 56,
          filter: `drop-shadow(0 0 16px ${game.glowColor})`,
          userSelect: 'none',
        }}>
          {game.thumbContent}
        </div>

        {/* Animated particles overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(circle at 50% 50%, ${game.glowColor}15, transparent 70%)`,
        }} />

        {/* Gradient overlay */}
        <div className="thumb-overlay" />

        {/* Sheen */}
        <div ref={sheenRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', transition: 'background 0.1s' }} />

        {/* Play overlay */}
        <div className="play-overlay">
          <div className="play-btn-circle">▶</div>
          <span className="play-label">PLAY NOW</span>
        </div>
      </div>

      {/* Card info */}
      <div className="game-card-info" onClick={() => onPlay(game.prompt)}>
        <div className="game-card-title">{game.title}</div>
        <div className="game-card-meta">
          <span className="meta-tag">{game.subject}</span>
          <span className="meta-tag">{game.classLabel}</span>
          <span className="meta-stars">★ {game.stars}</span>
        </div>
        <div style={{ marginTop: 6, fontFamily: 'Space Grotesk', fontSize: 11, color: 'var(--text-muted)' }}>
          {game.plays} plays
        </div>
      </div>
    </div>
  );
}

export default function GameGallery({ onPlayGame }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Fallback: show after short delay regardless
    const fallback = setTimeout(() => setVisible(true), 600);
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { observer.disconnect(); clearTimeout(fallback); };
  }, []);

  const filtered = activeFilter === 'all'
    ? GALLERY_GAMES
    : GALLERY_GAMES.filter(g => g.category === activeFilter);

  return (
    <section className="gallery-section" ref={sectionRef} data-testid="gallery-section">
      <div style={{ textAlign: 'center', marginBottom: 48, padding: '0 24px' }}>
        <span className="section-eyebrow">02 · FEATURED GAMES</span>
        <h2 className="section-title">Play Ready-Made Games</h2>
        <p className="section-subtitle">All built by HELIOS AI · Free to play · Free to download</p>
      </div>

      {/* Filters */}
      <div className="gallery-filters" style={{ padding: '0 24px' }} data-testid="gallery-filters">
        {FILTER_TABS.map(tab => (
          <button
            key={tab.key}
            className={`filter-tab ${activeFilter === tab.key ? 'active' : ''}`}
            onClick={() => setActiveFilter(tab.key)}
            data-testid={`filter-${tab.key}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="gallery-grid" data-testid="gallery-grid">
        {filtered.map((game, i) => (
          <div
            key={game.id}
            className="reveal-scale"
            style={{
              animationDelay: `${i * 0.08}s`,
              opacity: visible ? 1 : 0,
              transform: visible ? 'scale(1)' : 'scale(0.9)',
              transition: `opacity 0.5s ${i * 0.08}s, transform 0.5s ${i * 0.08}s cubic-bezier(0.34, 1.56, 0.64, 1)`,
            }}
          >
            <GameCard
              game={game}
              onPlay={onPlayGame}
            />
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 24px', color: 'var(--text-muted)', fontFamily: 'Space Grotesk' }}>
          No games in this category yet. Be the first to forge one!
        </div>
      )}
    </section>
  );
}
