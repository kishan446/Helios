import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Forge', to: '/forge' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Teacher', to: '/teacher' },
  { label: 'Pricing', to: '/pricing' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location.pathname]);

  const isActive = (to) => to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} data-testid="navbar">
        <Link to="/" className="nav-logo" data-testid="nav-logo">
          <div className="nav-logo-hex">H</div>
          <span className="nav-logo-text">HELIOS<span className="nav-logo-sup">AI</span></span>
        </Link>

        <div className="nav-links">
          {NAV_LINKS.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`nav-link ${isActive(link.to) ? 'active' : ''}`}
              data-testid={`nav-${link.label.toLowerCase()}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link to="/forge" className="nav-cta" data-testid="nav-cta">
          FORGE NOW →
        </Link>

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
        {NAV_LINKS.map((link, i) => (
          <Link
            key={link.to}
            to={link.to}
            className={`nav-link ${isActive(link.to) ? 'active' : ''}`}
            style={{
              fontSize: 18, padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)',
              opacity: mobileOpen ? 0 : 0,
              animation: mobileOpen ? `fadeUp 0.4s ${i * 0.06}s forwards` : 'none',
            }}
          >
            {link.label}
          </Link>
        ))}
        <Link
          to="/forge"
          className="btn-primary"
          style={{ marginTop: 24, textAlign: 'center', textDecoration: 'none', justifyContent: 'center' }}
        >
          ⚡ FORGE NOW
        </Link>
      </div>
    </>
  );
}
