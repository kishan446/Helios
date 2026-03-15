import React, { useState, useEffect } from 'react';

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'Forge', href: '#forge-section' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Teacher Mode', href: '#teacher-dashboard', isTeacher: true },
];

export default function Navbar({ onTeacherMode, onForgeClick, showTeacherDash }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (item, e) => {
    e.preventDefault();
    setMobileOpen(false);
    if (item.isTeacher) {
      onTeacherMode();
      setTimeout(() => {
        document.getElementById('teacher-dashboard')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const target = document.querySelector(item.href);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
    setActive(item.href.replace('#', ''));
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} data-testid="navbar">
        <a className="nav-logo" href="#home" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <div className="nav-logo-hex">H</div>
          <span className="nav-logo-text">HELIOS<span className="nav-logo-ultra">AI</span></span>
        </a>

        <div className="nav-links">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`nav-link ${(item.isTeacher && showTeacherDash) ? 'active' : ''}`}
              onClick={(e) => handleNavClick(item, e)}
              data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {item.label}
            </a>
          ))}
        </div>

        <button
          className="nav-cta magnetic"
          onClick={onForgeClick}
          data-testid="nav-forge-btn"
        >
          FORGE NOW →
        </button>

        <button
          className={`mobile-menu-btn ${mobileOpen ? 'open' : ''}`}
          onClick={() => setMobileOpen(v => !v)}
          data-testid="mobile-menu-btn"
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`} data-testid="mobile-menu">
        {NAV_ITEMS.map((item, i) => (
          <a
            key={item.label}
            href={item.href}
            className="nav-link"
            style={{
              fontSize: 18,
              opacity: 0,
              animation: mobileOpen ? `fadeSlideIn 0.4s ${i * 0.06}s forwards` : 'none',
            }}
            onClick={(e) => handleNavClick(item, e)}
          >
            {item.label}
          </a>
        ))}
        <button
          className="btn-primary"
          style={{ fontSize: 12, padding: '14px 28px', marginTop: 16 }}
          onClick={() => { setMobileOpen(false); onForgeClick(); }}
        >
          ⚡ FORGE NOW
        </button>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </>
  );
}
