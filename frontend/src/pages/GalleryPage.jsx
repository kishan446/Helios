import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ALL_GAMES = [
  { id: 1, title: 'Freedom Fighters 1947', subject: '🗺️ History', classLabel: 'Class 7', stars: '4.9', plays: '12.4k', category: 'history', bg: 'linear-gradient(135deg,#1A0800,#0D0400)', emoji: '🏴', accent: '#FF9933', prompt: 'Freedom fighter in 1947 Mumbai collecting secret messages while avoiding British soldiers. Class 7 History. Bilingual.' },
  { id: 2, title: 'Fraction Quest', subject: '🧮 Maths', classLabel: 'Class 5', stars: '4.8', plays: '8.2k', category: 'maths', bg: 'radial-gradient(circle,#030520,#06083A)', emoji: '🧮', accent: '#6C8EFF', prompt: 'Maths platformer for Class 5 students collecting fractions to unlock doors.' },
  { id: 3, title: 'ISRO Space Explorer', subject: '🔬 Science', classLabel: 'Class 8', stars: '4.9', plays: '15.1k', category: 'science', bg: 'radial-gradient(circle,#040408,#080818)', emoji: '🚀', accent: '#8B5CF6', prompt: 'ISRO space explorer game piloting Chandrayaan collecting moon rocks, Class 8 Science.' },
  { id: 4, title: 'Mumbai Traffic Hero', subject: '⚔️ Adventure', classLabel: 'All Ages', stars: '4.7', plays: '9.6k', category: 'adventure', bg: 'linear-gradient(180deg,#140A00,#0A0500)', emoji: '🏙️', accent: '#FF6B00', prompt: 'Endless runner in Mumbai navigating through traffic collecting coins. Fun for all ages.' },
  { id: 5, title: 'Cricket Legend', subject: '🏃 Sports', classLabel: 'All Ages', stars: '4.8', plays: '21.3k', category: 'sports', bg: 'radial-gradient(circle,#001500,#002200)', emoji: '🏏', accent: '#00FF87', prompt: 'Cricket game with legendary Indian players Sachin Tendulkar and MS Dhoni. All ages.' },
  { id: 6, title: 'Ancient India Quest', subject: '🏛️ History', classLabel: 'Class 9', stars: '4.6', plays: '6.8k', category: 'history', bg: 'linear-gradient(135deg,#0D0800,#1A1000)', emoji: '🏛️', accent: '#FFD60A', prompt: 'Explore ancient Indian civilizations, collect artifacts from Indus Valley, Maurya and Gupta empires. Class 9.' },
  { id: 7, title: 'Photosynthesis Lab', subject: '🔬 Science', classLabel: 'Class 6', stars: '4.7', plays: '5.2k', category: 'science', bg: 'radial-gradient(circle,#001000,#002000)', emoji: '🌿', accent: '#00FF87', prompt: 'Science game teaching photosynthesis to Class 6 students with interactive plant growing mechanics.' },
  { id: 8, title: 'Mughal Empire Saga', subject: '🗺️ History', classLabel: 'Class 8', stars: '4.5', plays: '4.1k', category: 'history', bg: 'linear-gradient(135deg,#1A0000,#2D0808)', emoji: '🕌', accent: '#FF9933', prompt: 'Navigate the Mughal Empire, meet Akbar and Humayun, learn about medieval India. Class 8 History.' },
  { id: 9, title: 'Geometry Warriors', subject: '🧮 Maths', classLabel: 'Class 7', stars: '4.8', plays: '7.3k', category: 'maths', bg: 'radial-gradient(circle,#020215,#050530)', emoji: '📐', accent: '#00F5FF', prompt: 'Battle geometric shapes using math skills. Class 7 Geometry — angles, area, and theorems.' },
];

const FILTERS = [
  { label: 'All Games', key: 'all' },
  { label: '🗺️ History', key: 'history' },
  { label: '🧮 Maths', key: 'maths' },
  { label: '🔬 Science', key: 'science' },
  { label: '⚔️ Adventure', key: 'adventure' },
  { label: '🏃 Sports', key: 'sports' },
];

function GameCard3D({ game }) {
  const cardRef = useRef(null);
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(900px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg) translateZ(6px)`;
  };
  const handleMouseLeave = () => {
    if (cardRef.current) { cardRef.current.style.transform = ''; cardRef.current.style.transition = 'transform 0.5s var(--ease-spring)'; setTimeout(() => { if (cardRef.current) cardRef.current.style.transition = ''; }, 500); }
  };

  return (
    <div ref={cardRef} className="game-card" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} data-testid={`game-card-${game.id}`}>
      <div className="game-thumb" style={{ background: game.bg }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 54, filter: `drop-shadow(0 0 20px ${game.accent}60)`, userSelect: 'none' }}>{game.emoji}</div>
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 50%, ${game.accent}10, transparent 70%)` }} />
        <div className="thumb-overlay" />
        <div className="play-overlay">
          <Link to={`/forge?prompt=${encodeURIComponent(game.prompt)}`} style={{ textDecoration: 'none' }}>
            <div className="play-btn-circle">▶</div>
          </Link>
          <span className="play-label">FORGE SIMILAR</span>
        </div>
      </div>
      <div className="game-card-info">
        <div className="game-card-title">{game.title}</div>
        <div className="game-card-meta">
          <span className="meta-tag">{game.subject}</span>
          <span className="meta-tag">{game.classLabel}</span>
          <span className="meta-stars">★ {game.stars}</span>
        </div>
        <div style={{ marginTop: 6, fontFamily: 'Space Grotesk', fontSize: 11, color: 'rgba(255,255,255,0.2)' }}>{game.plays} plays</div>
      </div>
    </div>
  );
}

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const filtered = activeFilter === 'all' ? ALL_GAMES : ALL_GAMES.filter(g => g.category === activeFilter);

  return (
    <div style={{ minHeight: '100vh', paddingTop: 64 }}>
      <div className="page-header">
        <div className="page-container">
          <span className="section-eyebrow">GAME LIBRARY</span>
          <h1 className="section-title">Browse AI-Forged Games</h1>
          <p className="section-subtitle">All games created by HELIOS AI. Free to play, free to download and share with students.</p>
          <div style={{ display: 'flex', gap: 32, justifyContent: 'center', marginTop: 32 }}>
            {[['9+', 'Ready-Made Games'], ['Free', 'Forever'], ['5 min', 'To Customise']].map(([n, l]) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'Orbitron', fontSize: 28, fontWeight: 800, color: '#FFD60A' }}>{n}</div>
                <div style={{ fontFamily: 'Space Grotesk', fontSize: 11, letterSpacing: 3, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="gallery-section">
        {/* Filters */}
        <div className="gallery-filters" data-testid="gallery-filters">
          {FILTERS.map(tab => (
            <button key={tab.key} className={`filter-tab ${activeFilter === tab.key ? 'active' : ''}`} onClick={() => setActiveFilter(tab.key)} data-testid={`filter-${tab.key}`}>{tab.label}</button>
          ))}
        </div>

        {/* Grid */}
        <div className="gallery-grid" data-testid="gallery-grid">
          {filtered.map(game => <GameCard3D key={game.id} game={game} />)}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 24px' }}>
            <p style={{ fontFamily: 'Space Grotesk', fontSize: 15, color: 'rgba(255,255,255,0.2)' }}>No games in this category yet.</p>
            <Link to="/forge" className="btn-primary" style={{ marginTop: 24, display: 'inline-flex', textDecoration: 'none' }}>⚡ Forge One Now</Link>
          </div>
        )}

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: 60, padding: '0 24px' }}>
          <p style={{ fontFamily: 'Inter', fontSize: 15, color: 'rgba(255,255,255,0.3)', marginBottom: 20 }}>Don't see your subject? Forge any game in 60 seconds.</p>
          <Link to="/forge" className="btn-primary" style={{ textDecoration: 'none' }}>⚡ Create Your Own Game</Link>
        </div>
      </div>
    </div>
  );
}
