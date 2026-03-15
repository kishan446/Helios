import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PLANS = [
  {
    name: 'FREE',
    price: '0',
    per: '/forever',
    desc: 'Perfect for exploring AI game creation',
    color: 'rgba(255,255,255,0.5)',
    features: [
      { text: '3 game generations per month', included: true },
      { text: 'All game genres & subjects', included: true },
      { text: 'Download as HTML file', included: true },
      { text: 'Play in browser instantly', included: true },
      { text: 'Bilingual support (EN/HI)', included: true },
      { text: 'Teacher dashboard', included: false },
      { text: 'Student analytics', included: false },
      { text: 'Priority generation queue', included: false },
      { text: 'API access', included: false },
    ],
    btn: 'Start Free →',
    btnClass: 'btn-secondary',
    to: '/forge',
  },
  {
    name: 'TEACHER',
    price: '9',
    per: '/month',
    desc: 'For educators building better lessons',
    featured: true,
    color: '#FFD60A',
    features: [
      { text: '50 game generations per month', included: true },
      { text: 'All game genres & subjects', included: true },
      { text: 'Download as HTML file', included: true },
      { text: 'Play in browser instantly', included: true },
      { text: 'Bilingual support (EN + 7 languages)', included: true },
      { text: 'Teacher dashboard', included: true },
      { text: 'Student analytics', included: true },
      { text: 'Priority generation queue', included: true },
      { text: 'API access', included: false },
    ],
    btn: 'Start Teaching →',
    btnClass: 'btn-primary',
    to: '/forge',
  },
  {
    name: 'SCHOOL',
    price: '49',
    per: '/month',
    desc: 'For institutions scaling to every classroom',
    color: 'rgba(255,255,255,0.5)',
    features: [
      { text: 'Unlimited game generations', included: true },
      { text: 'Unlimited teachers', included: true },
      { text: 'Custom branding', included: true },
      { text: 'All Teacher features', included: true },
      { text: 'API access', included: true },
      { text: 'LMS integration (Google Classroom)', included: true },
      { text: 'Dedicated account manager', included: true },
      { text: 'Custom game templates', included: true },
      { text: 'SLA support', included: true },
    ],
    btn: 'Contact Sales →',
    btnClass: 'btn-secondary',
    to: '#',
  },
];

const FAQS = [
  { q: 'Is the Free plan really free forever?', a: 'Yes. No credit card required. You get 3 game generations per month at zero cost, permanently.' },
  { q: 'How long does game generation take?', a: 'Most games are forged in 30–90 seconds depending on complexity. Simple quiz games are faster, full platformers take a bit longer.' },
  { q: 'Can I customise the generated games?', a: 'Every game is a self-contained HTML file. You can open it in any editor and modify the code directly.' },
  { q: 'Do the games work on mobile phones?', a: 'Yes. Every generated game includes touch controls. Students can play on their phones without installing anything.' },
  { q: 'Can I use HELIOS in Hindi?', a: 'Absolutely. Games can be forged from Hindi prompts and include in-game text in Hindi, Tamil, Telugu, Marathi, Bengali, and more.' },
];

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div style={{ minHeight: '100vh', paddingTop: 64 }}>
      {/* Header */}
      <div className="page-header">
        <div className="page-container">
          <span className="section-eyebrow">PRICING</span>
          <h1 className="section-title">Simple, Honest Pricing</h1>
          <p className="section-subtitle">Start for free. No credit card. No tricks. Scale when you're ready.</p>
        </div>
      </div>

      {/* Pricing Cards */}
      <section className="section-pad">
        <div className="pricing-grid">
          {PLANS.map((plan, i) => (
            <div key={plan.name} className={`pricing-card ${plan.featured ? 'featured' : ''}`} data-testid={`pricing-${plan.name.toLowerCase()}`}>
              <div className="pricing-name">{plan.name}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 6 }}>
                {plan.price !== '0' && <span style={{ fontFamily: 'Orbitron', fontSize: 14, color: 'rgba(255,255,255,0.4)', alignSelf: 'flex-start', marginTop: 6 }}>$</span>}
                <span className="pricing-price" style={{ color: plan.featured ? '#FFD60A' : 'white' }}>{plan.price === '0' ? 'FREE' : plan.price}</span>
                <span className="pricing-per">{plan.per}</span>
              </div>
              <p className="pricing-desc">{plan.desc}</p>
              <ul className="pricing-features">
                {plan.features.map((f, j) => (
                  <li key={j} className="pricing-feature">
                    <span className={`pricing-check ${f.included ? '' : 'off'}`}>{f.included ? '✓' : '—'}</span>
                    <span style={{ color: f.included ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.2)' }}>{f.text}</span>
                  </li>
                ))}
              </ul>
              <Link
                to={plan.to}
                className={plan.btnClass}
                style={{ width: '100%', justifyContent: 'center', textDecoration: 'none', fontSize: 12 }}
              >
                {plan.btn}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Compare Table */}
      <section className="section-pad-sm">
        <div className="page-container">
          <h2 style={{ fontFamily: 'Orbitron', fontSize: 24, fontWeight: 800, color: 'white', textAlign: 'center', marginBottom: 32 }}>Feature Comparison</h2>
          <div style={{ background: '#080808', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <th style={{ padding: '16px 20px', textAlign: 'left', fontFamily: 'Space Grotesk', fontSize: 12, letterSpacing: 2, color: 'rgba(255,255,255,0.3)' }}>FEATURE</th>
                  {PLANS.map(p => <th key={p.name} style={{ padding: '16px 20px', textAlign: 'center', fontFamily: 'Orbitron', fontSize: 12, color: p.featured ? '#FFD60A' : 'rgba(255,255,255,0.5)', letterSpacing: 2 }}>{p.name}</th>)}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Monthly games', '3', '50', 'Unlimited'],
                  ['All subjects/genres', '✓', '✓', '✓'],
                  ['Download HTML', '✓', '✓', '✓'],
                  ['Languages', '2', '9', '9+'],
                  ['Teacher dashboard', '—', '✓', '✓'],
                  ['Student analytics', '—', '✓', '✓'],
                  ['API access', '—', '—', '✓'],
                  ['LMS integration', '—', '—', '✓'],
                  ['Custom branding', '—', '—', '✓'],
                  ['Dedicated support', '—', '—', '✓'],
                ].map(([feat, ...vals], i) => (
                  <tr key={feat} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)' }}>
                    <td style={{ padding: '14px 20px', fontFamily: 'Inter', fontSize: 14, color: 'rgba(255,255,255,0.55)' }}>{feat}</td>
                    {vals.map((val, j) => (
                      <td key={j} style={{ padding: '14px 20px', textAlign: 'center', fontFamily: 'Space Grotesk', fontSize: 14, fontWeight: 600, color: val === '✓' ? 'rgba(255,255,255,0.8)' : val === '—' ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.7)' }}>
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad-sm">
        <div className="page-container" style={{ maxWidth: 700 }}>
          <h2 style={{ fontFamily: 'Orbitron', fontSize: 24, fontWeight: 800, color: 'white', textAlign: 'center', marginBottom: 40 }}>Frequently Asked</h2>
          {FAQS.map((faq, i) => (
            <div
              key={i}
              style={{
                borderBottom: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden',
              }}
              data-testid={`faq-${i}`}
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{
                  width: '100%', padding: '20px 0', background: 'none', border: 'none', cursor: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, textAlign: 'left',
                }}
              >
                <span style={{ fontFamily: 'Space Grotesk', fontSize: 15, fontWeight: 600, color: 'white' }}>{faq.q}</span>
                <span style={{ color: '#FFD60A', fontSize: 20, flexShrink: 0, transform: openFaq === i ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s' }}>+</span>
              </button>
              <div style={{
                maxHeight: openFaq === i ? '200px' : '0', overflow: 'hidden',
                transition: 'max-height 0.3s var(--ease-smooth)',
              }}>
                <p style={{ fontFamily: 'Inter', fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, paddingBottom: 20 }}>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section-pad">
        <div style={{ padding: '0 24px' }}>
          <div className="cta-banner">
            <span className="section-eyebrow">NO RISK</span>
            <h2 style={{ fontFamily: 'Orbitron', fontWeight: 900, fontSize: 'clamp(26px,4vw,48px)', color: 'white', marginBottom: 12 }}>
              Start Free Today
            </h2>
            <p style={{ fontFamily: 'Inter', fontSize: 16, color: 'rgba(255,255,255,0.4)', marginBottom: 32 }}>No credit card. Cancel anytime. Your first game is always free.</p>
            <Link to="/forge" className="btn-primary" style={{ textDecoration: 'none', fontSize: 14, letterSpacing: 2 }}>⚡ FORGE YOUR FIRST GAME</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
