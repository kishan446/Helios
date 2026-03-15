import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';

const FEATURES = [
  { icon: '✏️', title: 'DESCRIBE ANYTHING', body: 'Plain text, Hindi, English, Hinglish. No technical knowledge required. If you can imagine it, we can forge it.' },
  { icon: '🤖', title: 'FOUR AI AGENTS', body: 'Architect, Artist, Coder, and QA Agent work simultaneously to design, build, test, and polish your game.' },
  { icon: '⚡', title: '60 SECONDS FLAT', body: 'From text to playable HTML5 game in under a minute. No waiting, no queues, no subscriptions to start.' },
  { icon: '📱', title: 'WORKS EVERYWHERE', body: 'Desktop, tablet, phone. Every game includes touch controls. Share a file and play anywhere.' },
  { icon: '🎓', title: 'BUILT FOR LEARNING', body: 'Educational content embedded naturally — quizzes, fact cards, bilingual text. Learning hidden in play.' },
  { icon: '🇮🇳', title: 'INDIA-FIRST DESIGN', body: 'Hindi, 7 regional languages. Indian characters, history, culture. Built for 250 million Indian students.' },
];

const STEPS = [
  { num: '01', icon: '✏️', title: 'TYPE YOUR IDEA', body: 'Describe any game in plain language. Hindi, English, or Hinglish — our AI understands everything.' },
  { num: '02', icon: '🤖', title: '4 AGENTS ACTIVATE', body: 'Four specialized AI agents spring to life: Architect, Artist, Coder, and QA Agent.' },
  { num: '03', icon: '⚡', title: 'GAME FORGED IN 60s', body: 'A fully playable HTML5 game appears in your browser. Works on phone and laptop. Free.' },
  { num: '04', icon: '🎓', title: 'PLAY, LEARN, SHARE', body: 'Download as HTML. Share with students. Track learning. One game can reach thousands.' },
];

const TESTIMONIALS = [
  { quote: '"My Class 7 students played the Freedom Fighter game for an entire period. They absorbed more history in 30 minutes than from a week of reading."', author: 'Kavya Sharma', role: 'History Teacher, Delhi Public School', stars: 5 },
  { quote: '"I forged a fractions game for my Class 4 class at 9pm and used it the next morning. HELIOS completely changed how I approach lesson prep."', author: 'Rahul Mehta', role: 'Maths Teacher, Mumbai Municipal School', stars: 5 },
  { quote: '"The kids asked to play the science game AGAIN. In 12 years of teaching, students have never asked to repeat a lesson activity."', author: 'Priya Nair', role: 'Science Coordinator, Bangalore', stars: 5 },
];

const SHOWCASE_GAMES = [
  { title: 'Freedom Fighters 1947', desc: 'Collect secret messages from Gandhi & Nehru while avoiding British soldiers. Class 7 History.', thumb: '🏴', bg: 'linear-gradient(135deg, #1A0A00, #0A0500)', accent: '#FF9933', tag: 'History · Class 7' },
  { title: 'ISRO Space Explorer', desc: 'Pilot Chandrayaan, collect moon rocks, learn about Indian space missions. Class 8 Science.', thumb: '🚀', bg: 'linear-gradient(135deg, #000820, #000D30)', accent: '#8B5CF6', tag: 'Science · Class 8' },
  { title: 'Cricket Legend', desc: 'Play as legendary Indian cricketers — Sachin, Dhoni, Virat. For all ages.', thumb: '🏏', bg: 'linear-gradient(135deg, #001500, #002200)', accent: '#00FF87', tag: 'Sports · All Ages' },
];

function RevealCard({ children, delay = 0 }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(32px)', transition: `opacity 0.6s ${delay}s, transform 0.6s ${delay}s` }}>
      {children}
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Stats Bar */}
      <div className="stats-bar">
        <div className="stats-bar-grid">
          {[
            { num: '12,847', label: 'Games Forged' },
            { num: '2.4M', label: 'Students Reached' },
            { num: '890', label: 'Teachers Active' },
            { num: '24', label: 'Languages' },
          ].map((s, i) => (
            <div key={i} className="stats-bar-item">
              <span className="stats-bar-number" style={{ color: i === 0 ? '#FFD60A' : 'white' }}>{s.num}</span>
              <span className="stats-bar-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <section className="section-pad">
        <div className="page-container">
          <div className="section-center">
            <span className="section-eyebrow">CAPABILITIES</span>
            <h2 className="section-title">Everything You Need</h2>
            <p className="section-subtitle">From idea to playable game — the complete AI-powered toolkit for educators and creators.</p>
          </div>
          <div className="features-grid">
            {FEATURES.map((f, i) => (
              <RevealCard key={i} delay={i * 0.06}>
                <div className="feature-grid-item" data-testid={`feature-${i}`}>
                  <span className="feature-icon">{f.icon}</span>
                  <div className="feature-title">{f.title}</div>
                  <p className="feature-body">{f.body}</p>
                </div>
              </RevealCard>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-line" />

      {/* How It Works */}
      <section className="section-pad">
        <div style={{ textAlign: 'center', padding: '0 24px', marginBottom: 0 }}>
          <span className="section-eyebrow">THE PROCESS</span>
          <h2 className="section-title">How HELIOS Works</h2>
        </div>
        <div className="how-grid" style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.06)' }}>
          {STEPS.map((step, i) => (
            <RevealCard key={i} delay={i * 0.1}>
              <div className="how-card" data-testid={`how-step-${step.num}`}>
                <div className="how-step-num">STEP {step.num}</div>
                <div className="how-icon-hex"><span>{step.icon}</span></div>
                <div className="how-card-title">{step.title}</div>
                <p className="how-card-body">{step.body}</p>
              </div>
            </RevealCard>
          ))}
        </div>
      </section>

      <div className="divider-line" />

      {/* Showcase */}
      <section className="section-pad">
        <div style={{ textAlign: 'center', padding: '0 24px', marginBottom: 48 }}>
          <span className="section-eyebrow">FEATURED GAMES</span>
          <h2 className="section-title">AI-Forged, Ready to Play</h2>
          <p className="section-subtitle">Every game below was created by HELIOS AI in under 90 seconds.</p>
        </div>
        <div className="showcase-grid">
          {SHOWCASE_GAMES.map((g, i) => (
            <RevealCard key={i} delay={i * 0.1}>
              <div style={{
                background: g.bg, border: '1px solid rgba(255,255,255,0.07)', borderRadius: 18,
                overflow: 'hidden', transition: 'transform 0.3s, box-shadow 0.3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = `0 20px 60px ${g.accent}20`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
                data-testid={`showcase-${i}`}
              >
                <div style={{ aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 72, position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 50%, ${g.accent}12, transparent 70%)` }} />
                  {g.thumb}
                </div>
                <div style={{ padding: '20px 22px 22px' }}>
                  <div style={{ fontFamily: 'Space Grotesk', fontSize: 16, fontWeight: 700, color: 'white', marginBottom: 6 }}>{g.title}</div>
                  <p style={{ fontFamily: 'Inter', fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, marginBottom: 14 }}>{g.desc}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: 'Space Grotesk', fontSize: 11, color: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 100, padding: '3px 10px' }}>{g.tag}</span>
                    <Link to="/forge" style={{ fontFamily: 'Space Grotesk', fontSize: 12, fontWeight: 700, color: '#FFD60A', textDecoration: 'none', letterSpacing: 1 }}>FORGE SIMILAR →</Link>
                  </div>
                </div>
              </div>
            </RevealCard>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <Link to="/gallery" className="btn-ghost">View All Games →</Link>
        </div>
      </section>

      <div className="divider-line" />

      {/* Testimonials */}
      <section className="section-pad">
        <div style={{ textAlign: 'center', padding: '0 24px', marginBottom: 48 }}>
          <span className="section-eyebrow">TRUSTED BY EDUCATORS</span>
          <h2 className="section-title">Teachers Love HELIOS</h2>
        </div>
        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, i) => (
            <RevealCard key={i} delay={i * 0.1}>
              <div className="testimonial-card" data-testid={`testimonial-${i}`}>
                <div className="testimonial-stars">{'★'.repeat(t.stars)}</div>
                <p className="testimonial-quote">"{t.quote.replace(/"/g,'')}"</p>
                <div className="testimonial-author">{t.author}</div>
                <div className="testimonial-role">{t.role}</div>
              </div>
            </RevealCard>
          ))}
        </div>
      </section>

      <div className="divider-line" />

      {/* Pricing Preview */}
      <section className="section-pad">
        <div style={{ textAlign: 'center', padding: '0 24px', marginBottom: 48 }}>
          <span className="section-eyebrow">SIMPLE PRICING</span>
          <h2 className="section-title">Start Free. Scale As You Grow.</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, maxWidth: 900px, margin: '0 auto', padding: '0 24px' }}>
          {[
            { name: 'FREE', price: '0', per: '/forever', desc: 'Perfect for personal use and exploration', features: ['3 games per month', 'All game types', 'Download HTML', 'Play in browser'], btn: 'Get Started Free' },
            { name: 'TEACHER', price: '9', per: '/month', desc: 'For educators building curriculum-aligned games', features: ['50 games per month', 'Teacher dashboard', 'Student analytics', 'Class management', 'Priority generation'], featured: true, btn: 'Start Teaching' },
            { name: 'SCHOOL', price: '49', per: '/month', desc: 'For entire schools and institutions', features: ['Unlimited games', 'Unlimited teachers', 'Custom branding', 'API access', 'Dedicated support', 'LMS integration'], btn: 'Contact Sales' },
          ].map((plan, i) => (
            <RevealCard key={i} delay={i * 0.1}>
              <div className={`pricing-card ${plan.featured ? 'featured' : ''}`} data-testid={`pricing-${plan.name.toLowerCase()}`}>
                <div className="pricing-name">{plan.name}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
                  <span style={{ fontFamily: 'Orbitron', fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 8 }}>$</span>
                  <span className="pricing-price">{plan.price}</span>
                  <span className="pricing-per">{plan.per}</span>
                </div>
                <p className="pricing-desc">{plan.desc}</p>
                <ul className="pricing-features">
                  {plan.features.map((f, j) => (
                    <li key={j} className="pricing-feature"><span className="pricing-check">✓</span>{f}</li>
                  ))}
                </ul>
                <Link to={plan.name === 'SCHOOL' ? '#' : '/forge'} className={plan.featured ? 'btn-primary' : 'btn-secondary'} style={{ width: '100%', justifyContent: 'center', textDecoration: 'none', fontSize: 12 }}>
                  {plan.btn}
                </Link>
              </div>
            </RevealCard>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="section-pad">
        <div style={{ padding: '0 24px' }}>
          <div className="cta-banner" data-testid="cta-banner">
            <span className="section-eyebrow">READY TO FORGE?</span>
            <h2 style={{ fontFamily: 'Orbitron', fontWeight: 900, fontSize: 'clamp(28px,5vw,56px)', color: 'white', lineHeight: 1.05, marginBottom: 16 }}>
              Your First Game is<br /><span style={{ color: '#FFD60A' }}>One Prompt Away</span>
            </h2>
            <p style={{ fontFamily: 'Inter', fontSize: 17, color: 'rgba(255,255,255,0.4)', marginBottom: 40, maxWidth: 500, margin: '0 auto 40px' }}>
              No credit card. No signup required. Type your idea and watch AI forge it into reality.
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/forge" className="btn-primary" style={{ fontSize: 14, letterSpacing: 3 }}>⚡ FORGE YOUR GAME</Link>
              <Link to="/pricing" className="btn-secondary">View Plans →</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
