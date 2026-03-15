import React, { useState, useEffect, useRef } from 'react';

const PLACEHOLDER_PROMPTS = [
  'Make a game where I\'m a freedom fighter in 1947 Mumbai...',
  'Create a maths platformer for Class 5 students...',
  'Build a cricket game with legendary Indian players...',
  'Design a space explorer game about ISRO missions...',
  'Forge a puzzle game teaching Indian geography...',
];

const CLASS_LEVELS = ['Kindergarten', 'Class 1-2', 'Class 3-5', 'Class 6-8', 'Class 9-10', 'Class 11-12', 'All Ages', 'Adult/Professional'];
const SUBJECTS = ['🗺️ History', '🧮 Mathematics', '🔬 Science', '🌍 Geography', '📖 Literature', '🎵 Music', '🏃 Sports', '🎨 Art', '💻 Computer Science', '🌱 Environment', '🏛️ Civics', '🧠 General Knowledge', '⚔️ Adventure', '🎲 Pure Fun'];
const LANGUAGES = ['English', 'हिंदी (Hindi)', 'Hinglish', 'தமிழ் Tamil', 'తెలుగు Telugu', 'मराठी Marathi', 'বাংলা Bengali', 'Auto-Detect'];
const GAME_TYPES = ['🤖 Auto (AI Decides)', '🏃 Platformer', '🔫 Top-Down Shooter', '🧩 Puzzle', '♾️ Endless Runner', '❓ Quiz Adventure', '🃏 Card Game', '🏎️ Racing', '🗺️ RPG Adventure'];
const THEME_CHIPS = [
  { label: '⚔️ Action', text: 'action adventure game' },
  { label: '📚 Learn', text: 'educational learning game' },
  { label: '🏏 Sports', text: 'Indian sports game' },
  { label: '🔬 Science', text: 'science experiment game' },
  { label: '🗺️ History', text: 'Indian history game' },
  { label: '🧩 Puzzle', text: 'puzzle challenge game' },
  { label: '🚀 Space', text: 'ISRO space exploration game' },
  { label: '🌿 Nature', text: 'Indian nature and wildlife game' },
  { label: '🎵 Music', text: 'Indian music game' },
];
const TOGGLES = [
  { key: 'sound', label: '🔊 Sound' },
  { key: 'mobile', label: '📱 Mobile' },
  { key: 'educational', label: '🎓 Educational' },
];

export default function PromptForge({ onForge, isGenerating }) {
  const [prompt, setPrompt] = useState('');
  const [settings, setSettings] = useState({
    classLevel: 'Class 3-5',
    subject: '🗺️ History',
    language: 'English',
    gameType: '🤖 Auto (AI Decides)',
    educational: true,
    mobile: true,
    sound: true,
  });
  const [selectedChips, setSelectedChips] = useState([]);
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [displayPlaceholder, setDisplayPlaceholder] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const textareaRef = useRef(null);
  const charCount = prompt.length;

  // Cycling placeholder animation
  useEffect(() => {
    const fullText = PLACEHOLDER_PROMPTS[placeholderIdx];
    let i = 0;
    let deleting = false;
    let current = '';

    const type = () => {
      if (!deleting) {
        current = fullText.slice(0, i + 1);
        setDisplayPlaceholder(current);
        i++;
        if (i >= fullText.length) {
          deleting = true;
          setTimeout(type, 2200);
          return;
        }
        setTimeout(type, 48);
      } else {
        current = fullText.slice(0, i - 1);
        setDisplayPlaceholder(current);
        i--;
        if (i <= 0) {
          deleting = false;
          setPlaceholderIdx(p => (p + 1) % PLACEHOLDER_PROMPTS.length);
          return;
        }
        setTimeout(type, 28);
      }
    };

    const timer = setTimeout(type, 300);
    return () => clearTimeout(timer);
  }, [placeholderIdx]);

  // Listen for fill-forge event from gallery
  useEffect(() => {
    const handler = (e) => {
      setPrompt(e.detail.prompt);
      textareaRef.current?.focus();
    };
    window.addEventListener('fill-forge', handler);
    return () => window.removeEventListener('fill-forge', handler);
  }, []);

  const toggleChip = (chip) => {
    setSelectedChips(prev => {
      const idx = prev.indexOf(chip.label);
      if (idx >= 0) {
        return prev.filter(c => c !== chip.label);
      } else {
        setPrompt(p => p + (p ? ', ' : '') + chip.text);
        return [...prev, chip.label];
      }
    });
  };

  const handleForge = () => {
    if (!prompt.trim() || isGenerating) return;
    onForge(prompt.trim(), settings);
  };

  const updateSetting = (key, val) => setSettings(s => ({ ...s, [key]: val }));
  const toggleSetting = (key) => setSettings(s => ({ ...s, [key]: !s[key] }));

  return (
    <div className="forge-section" data-testid="forge-section">
      <div className="container" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span className="section-eyebrow">01 · DESCRIBE YOUR GAME</span>
          <h2 className="section-title">What World Shall We Build?</h2>
          <p className="section-subtitle">Type anything. Any language. Any genre. AI handles the rest.</p>
        </div>

        <div className="forge-box" data-testid="forge-box">
          <textarea
            ref={textareaRef}
            className="forge-textarea"
            value={prompt}
            onChange={e => setPrompt(e.target.value.slice(0, 500))}
            placeholder={displayPlaceholder || 'Describe your game idea...'}
            onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleForge(); }}
            data-testid="forge-textarea"
            disabled={isGenerating}
          />

          <div style={{
            width: '100%',
            height: 1,
            background: 'rgba(255,255,255,0.05)',
            margin: '16px 0',
          }} />

          {/* Settings Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
            {[
              { key: 'classLevel', label: '🎓 Class Level', options: CLASS_LEVELS },
              { key: 'subject', label: '📚 Subject', options: SUBJECTS },
              { key: 'language', label: '🌐 Language', options: LANGUAGES },
              { key: 'gameType', label: '🎮 Game Type', options: GAME_TYPES },
            ].map(sel => (
              <div key={sel.key}>
                <label style={{ display: 'block', fontFamily: 'Space Grotesk', fontSize: 11, letterSpacing: 2, color: 'var(--text-muted)', marginBottom: 6 }}>
                  {sel.label}
                </label>
                <select
                  className="forge-select"
                  value={settings[sel.key]}
                  onChange={e => updateSetting(sel.key, e.target.value)}
                  data-testid={`select-${sel.key}`}
                  disabled={isGenerating}
                >
                  {sel.options.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          {/* Feature Toggles */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
            {TOGGLES.map(toggle => (
              <button
                key={toggle.key}
                className={`toggle-pill ${settings[toggle.key] ? 'active' : ''}`}
                onClick={() => toggleSetting(toggle.key)}
                data-testid={`toggle-${toggle.key}`}
                disabled={isGenerating}
              >
                {toggle.label}
              </button>
            ))}
          </div>

          {/* Quick Theme Chips */}
          <div style={{ marginBottom: 20 }}>
            <span style={{ fontFamily: 'Space Grotesk', fontSize: 11, letterSpacing: 3, color: 'var(--text-muted)', marginRight: 12 }}>
              QUICK THEMES:
            </span>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 10 }}>
              {THEME_CHIPS.map(chip => (
                <button
                  key={chip.label}
                  className={`theme-chip ${selectedChips.includes(chip.label) ? 'selected' : ''}`}
                  onClick={() => toggleChip(chip)}
                  data-testid={`chip-${chip.label}`}
                  disabled={isGenerating}
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>

          {/* Bottom row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{
              fontFamily: 'Space Grotesk', fontSize: 12,
              color: charCount > 480 ? 'var(--neon-pink)' : charCount > 400 ? 'var(--neon-yellow)' : 'var(--text-muted)'
            }}>
              {charCount} / 500
            </span>
            <span style={{ fontFamily: 'Space Grotesk', fontSize: 12, color: 'var(--text-ghost)' }}>
              Press ⌘+Enter to forge
            </span>
          </div>
        </div>

        {/* Forge Button */}
        <div className="forge-btn-wrapper" data-testid="forge-btn-wrapper">
          <button
            className={`forge-btn ${isGenerating ? 'generating' : ''}`}
            onClick={handleForge}
            disabled={isGenerating || !prompt.trim()}
            data-testid="forge-btn"
          >
            <div className="forge-btn-inner">
              {isGenerating ? (
                <>
                  <span className="forge-gear">⚙️</span>
                  FORGING YOUR GAME...
                </>
              ) : (
                <>⚡ FORGE MY GAME</>
              )}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
