import React from 'react';
import { Twitter, Github, Globe } from 'lucide-react';

const FOOTER_LINKS = [
  { label: 'Forge a Game', href: '#forge-section' },
  { label: 'Game Gallery', href: '#gallery' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Teacher Mode', href: '#teacher-dashboard' },
  { label: 'About HELIOS', href: '#' },
];

export default function Footer({ onTeacherMode, showTeacherDash, onForgeClick }) {
  const scrollTo = (href) => {
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer" data-testid="footer">
      <div className="footer-grid">
        {/* Left: Logo + tagline */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{
              width: 40, height: 40,
              background: 'linear-gradient(135deg, #FFD60A, #FF2D6B)',
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Orbitron', fontWeight: 900, fontSize: 18, color: 'black',
            }}>
              H
            </div>
            <span style={{ fontFamily: 'Orbitron', fontWeight: 700, fontSize: 18, letterSpacing: 4, color: 'white' }}>
              HELIOS
            </span>
          </div>
          <p style={{
            fontFamily: 'Inter', fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7,
            marginBottom: 24, maxWidth: 280,
          }}>
            The world's most advanced AI game creation engine. Forge playable games in 60 seconds.
            Built for India's 250 million students.
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            {[
              { icon: <Twitter size={16} />, href: 'https://twitter.com', label: 'Twitter' },
              { icon: <Github size={16} />, href: 'https://github.com', label: 'GitHub' },
              { icon: <Globe size={16} />, href: 'https://helios.ai', label: 'Website' },
            ].map(social => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                style={{
                  width: 36, height: 36, borderRadius: 8,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--text-muted)',
                  transition: 'all 0.2s',
                  textDecoration: 'none',
                }}
                data-testid={`social-${social.label.toLowerCase()}`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Center: Links */}
        <div>
          <h4 style={{
            fontFamily: 'Orbitron', fontSize: 13, fontWeight: 700, letterSpacing: 3,
            color: 'var(--text-muted)', marginBottom: 20,
          }}>
            NAVIGATE
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {FOOTER_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  if (link.href === '#teacher-dashboard') onTeacherMode();
                  else scrollTo(link.href);
                }}
                style={{
                  fontFamily: 'Space Grotesk', fontSize: 14, color: 'var(--text-muted)',
                  textDecoration: 'none', transition: 'color 0.2s',
                }}
                data-testid={`footer-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Right: Powered by + India badge */}
        <div>
          <div style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 16,
            padding: 20,
            marginBottom: 20,
          }}>
            <div style={{ marginBottom: 12 }}>
              <span style={{ fontFamily: 'Orbitron', fontSize: 11, letterSpacing: 3, color: 'var(--text-muted)' }}>
                POWERED BY
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: 'linear-gradient(135deg, #7B2FBE, #9B4DCA)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Orbitron', fontSize: 14, color: 'white', fontWeight: 700,
              }}>
                E
              </div>
              <div>
                <div style={{ fontFamily: 'Space Grotesk', fontSize: 14, fontWeight: 600, color: 'white' }}>
                  Emergent AI
                </div>
                <div style={{ fontFamily: 'Space Grotesk', fontSize: 11, color: 'var(--text-muted)' }}>
                  Claude Sonnet · Powered
                </div>
              </div>
            </div>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255, 214, 10, 0.15)',
            borderRadius: 16,
            padding: 20,
            marginBottom: 20,
          }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>🇮🇳</div>
            <div style={{ fontFamily: 'Orbitron', fontSize: 13, fontWeight: 700, color: 'var(--neon-yellow)', marginBottom: 6 }}>
              MADE FOR INDIA
            </div>
            <p style={{ fontFamily: 'Inter', fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Built for 250 Million Indian students. Supports Hindi, English, and 7 regional languages.
            </p>
          </div>

          {/* Newsletter */}
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              type="email"
              placeholder="Your email"
              style={{
                flex: 1, background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 8, padding: '10px 14px',
                fontFamily: 'Space Grotesk', fontSize: 13, color: 'white',
                outline: 'none',
              }}
              data-testid="newsletter-input"
            />
            <button
              style={{
                background: 'var(--neon-yellow)', color: 'black',
                border: 'none', borderRadius: 8, padding: '10px 16px',
                fontFamily: 'Space Grotesk', fontSize: 13, fontWeight: 700,
                cursor: 'none', transition: 'box-shadow 0.2s',
              }}
              data-testid="newsletter-submit"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <span className="footer-copy">
          © 2025 HELIOS AI · Every game builds a brighter India 🇮🇳
        </span>
        <span className="footer-copy">
          Built with Emergent AI · Powered by Claude Sonnet
        </span>
      </div>
    </footer>
  );
}
