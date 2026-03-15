import React, { useRef, useState } from 'react';
import { Maximize2, RefreshCw, Download, Share2, GraduationCap, BookmarkPlus, Copy } from 'lucide-react';

export default function GameOutput({ html, title, settings, addToast, onRegenerate, onSaveToGallery, currentPrompt }) {
  const iframeRef = useRef(null);
  const [showLearning, setShowLearning] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleFullscreen = () => {
    const frame = iframeRef.current;
    if (!frame) return;
    if (frame.requestFullscreen) frame.requestFullscreen();
    else if (frame.webkitRequestFullscreen) frame.webkitRequestFullscreen();
  };

  const handleDownload = () => {
    const cleanTitle = title.toLowerCase().replace(/[^a-z0-9]/g, '_').substring(0, 40);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${cleanTitle}_helios.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    addToast('Game downloaded! Share with students.', 'success');
  };

  const handleShare = async () => {
    const shareText = `Check out this AI-generated game: "${title}" — made with HELIOS AI!`;
    if (navigator.share) {
      try { await navigator.share({ title, text: shareText, url: window.location.href }); } catch {}
    } else {
      await navigator.clipboard.writeText(shareText + '\n' + window.location.href);
      addToast('Share link copied!', 'info');
    }
  };

  const handleSaveGallery = async () => {
    if (!onSaveToGallery || saved || saving) return;
    setSaving(true);
    const id = await onSaveToGallery(html, title, currentPrompt, settings);
    setSaving(false);
    if (id) setSaved(true);
  };

  const handleClassroomCode = async () => {
    const code = [
      `HELIOS GAME: "${title}"`,
      `Play free at: ${window.location.origin}/forge`,
      `Prompt to recreate: "${currentPrompt}"`,
    ].join('\n');
    try {
      await navigator.clipboard.writeText(code);
      addToast('Classroom code copied! Share with students.', 'success');
    } catch {
      addToast('Could not copy. Try manually.', 'error');
    }
  };

  const handleRegenerate = () => {
    if (onRegenerate) onRegenerate(null, settings);
    addToast('Regenerating with a fresh take...', 'info');
  };

  const TOOLBAR = [
    { icon: <Maximize2 size={14} />, label: 'FULLSCREEN', onClick: handleFullscreen, primary: true, testid: 'btn-fullscreen' },
    { icon: <Download size={14} />, label: 'DOWNLOAD', onClick: handleDownload, testid: 'btn-download' },
    {
      icon: <BookmarkPlus size={14} />,
      label: saving ? 'SAVING...' : saved ? 'SAVED ✓' : 'SAVE TO GALLERY',
      onClick: handleSaveGallery,
      testid: 'btn-save-gallery',
      disabled: saved || saving,
    },
    { icon: <Copy size={14} />, label: 'CLASSROOM CODE', onClick: handleClassroomCode, testid: 'btn-classroom-code' },
    { icon: <Share2 size={14} />, label: 'SHARE', onClick: handleShare, testid: 'btn-share' },
    { icon: <GraduationCap size={14} />, label: 'TEACHER VIEW', onClick: () => setShowLearning(v => !v), testid: 'btn-teacher' },
    { icon: <RefreshCw size={14} />, label: 'REGENERATE', onClick: handleRegenerate, testid: 'btn-regenerate' },
  ];

  const CONTROLS = ['← → Move', 'SPACE Jump', 'P Pause', 'M Music', 'ESC Menu'];

  return (
    <div className="game-output" data-testid="game-output">
      <div className="game-title-bar" data-testid="game-title-bar">
        <h2 className="game-output-title" data-testid="game-title">{title}</h2>
        <div className="game-badges">
          {settings?.subject && <span className="game-badge">{settings.subject}</span>}
          {settings?.classLevel && <span className="game-badge">{settings.classLevel}</span>}
          {settings?.language && settings.language !== 'English' && (
            <span className="game-badge">{settings.language}</span>
          )}
          <span className="game-badge" style={{ color: 'rgba(255,255,255,0.7)', borderColor: 'rgba(255,255,255,0.2)' }}>
            ● LIVE
          </span>
        </div>
      </div>

      <div className="game-frame-outer" data-testid="game-frame-outer">
        <div className="game-frame-glow" />
        <div className="frame-corner tl" />
        <div className="frame-corner tr" />
        <div className="frame-corner bl" />
        <div className="frame-corner br" />
        <div className="game-frame-inner">
          <iframe
            ref={iframeRef}
            srcDoc={html}
            title={title}
            sandbox="allow-scripts allow-same-origin"
            id="game-frame"
            data-testid="game-iframe"
            style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontFamily: 'Space Grotesk', fontSize: 11, letterSpacing: 2, color: 'var(--text-muted)', marginRight: 4 }}>
          CONTROLS:
        </span>
        {CONTROLS.map(ctrl => (
          <span key={ctrl} style={{
            fontFamily: 'Space Grotesk', fontSize: 12, padding: '4px 10px',
            borderRadius: 6, background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)',
          }}>
            {ctrl}
          </span>
        ))}
      </div>

      <div className="game-toolbar" data-testid="game-toolbar">
        {TOOLBAR.map(btn => (
          <button
            key={btn.label}
            className={`toolbar-btn ${btn.primary ? 'primary' : ''}`}
            onClick={btn.onClick}
            disabled={btn.disabled}
            data-testid={btn.testid}
            style={btn.disabled ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
          >
            {btn.icon}
            {btn.label}
          </button>
        ))}
      </div>

      {showLearning && settings?.educational && (
        <div
          style={{
            marginTop: 24, background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: 24,
          }}
          data-testid="learning-summary"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <span style={{ fontSize: 20 }}>📚</span>
            <span style={{ fontFamily: 'Orbitron', fontSize: 14, fontWeight: 700, color: 'white' }}>
              LEARNING OBJECTIVES
            </span>
          </div>
          {[
            'Historical context and chronological understanding',
            'Key figures and their contributions',
            'Geographic and cultural knowledge',
            'Critical thinking through gameplay decisions',
            'Bilingual vocabulary development (EN/HI)',
          ].map((obj, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 10 }}>
              <span style={{ color: 'rgba(255,255,255,0.5)', flexShrink: 0, marginTop: 2 }}>✓</span>
              <span style={{ fontFamily: 'Inter', fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>{obj}</span>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: 20, display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ fontFamily: 'Space Grotesk', fontSize: 12, color: 'var(--text-muted)', letterSpacing: 2 }}>
          TRY VARIATIONS →
        </span>
        {['Harder version', 'Easier version', 'Different setting'].map(v => (
          <button
            key={v}
            className="theme-chip"
            onClick={() => {
              addToast(`Generating "${v}"...`, 'info');
              onRegenerate?.(v, settings);
            }}
            data-testid={`variation-${v.replace(/\s+/g, '-').toLowerCase()}`}
          >
            {v}
          </button>
        ))}
      </div>
    </div>
  );
}
