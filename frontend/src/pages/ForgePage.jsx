import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PromptForge from '../components/PromptForge';
import AgentPipeline from '../components/AgentPipeline';
import GameOutput from '../components/GameOutput';

function StepHeader({ num, title, active }) {
  return (
    <div className="forge-step-header" data-testid={`step-header-${num}`}>
      <div className={`forge-step-num ${active ? 'active' : ''}`}>{num}</div>
      <span className={`forge-step-title ${active ? 'active' : ''}`}>{title}</span>
    </div>
  );
}

function HistorySection({ gameHistory, onSelectPrompt }) {
  if (!gameHistory || gameHistory.length === 0) return null;
  return (
    <div className="history-panel" data-testid="history-panel">
      <div className="history-title">RECENT FORGES</div>
      <div className="history-list">
        {gameHistory.map((item, i) => (
          <button
            key={i}
            className="history-item"
            onClick={() => onSelectPrompt(item.prompt)}
            data-testid={`history-item-${i}`}
          >
            <span className="history-item-time">
              {new Date(item.timestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
            </span>
            <span className="history-item-title">{item.title}</span>
            <span className="history-item-restore">↑ Restore</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ForgePage({ onForge, isGenerating, genProgress, genStage, generatedGame, gameTitle, gameSettings, addToast, gameHistory, onSaveToGallery, currentPrompt }) {
  const location = useLocation();

  // Fill prompt from URL query param (from Gallery "Forge Similar" links)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const promptParam = params.get('prompt');
    if (promptParam) {
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('fill-forge', { detail: { prompt: decodeURIComponent(promptParam) } }));
      }, 100);
    }
  }, [location.search]);

  useEffect(() => {
    if (isGenerating && genProgress < 5) {
      setTimeout(() => document.getElementById('pipeline-anchor')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 200);
    }
  }, [isGenerating, genProgress]);

  useEffect(() => {
    if (generatedGame) {
      setTimeout(() => document.getElementById('output-anchor')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 400);
    }
  }, [generatedGame]);

  const handleSelectHistoryPrompt = (prompt) => {
    window.dispatchEvent(new CustomEvent('fill-forge', { detail: { prompt } }));
  };

  const isIdle = !isGenerating && genProgress === 0 && !generatedGame;

  return (
    <div style={{ minHeight: '100vh', paddingTop: 64 }}>
      <div className="page-header">
        <div className="page-container">
          <span className="section-eyebrow">FORGE STUDIO</span>
          <h1 className="section-title">Create Your Game</h1>
          <p className="section-subtitle">Describe any game idea. Our 4 AI agents will build it in under 60 seconds.</p>
        </div>
      </div>

      {/* Step 01 */}
      <StepHeader num="01" title="DESCRIBE YOUR GAME" active={isIdle || isGenerating} />
      <div className="forge-section">
        <PromptForge onForge={onForge} isGenerating={isGenerating} />
      </div>

      {/* History — shown when idle with past forges */}
      {isIdle && (
        <HistorySection gameHistory={gameHistory} onSelectPrompt={handleSelectHistoryPrompt} />
      )}

      {/* Step 02: Agent Pipeline */}
      {(isGenerating || (genProgress > 0 && !generatedGame)) && (
        <>
          <StepHeader num="02" title="AI AGENTS FORGING" active={isGenerating} />
          <div id="pipeline-anchor">
            <AgentPipeline progress={genProgress} stage={genStage} isGenerating={isGenerating} />
          </div>
        </>
      )}

      {/* Step 03: Game Output */}
      {generatedGame && (
        <>
          <StepHeader num="03" title="YOUR GAME IS READY" active />
          <div id="output-anchor">
            <GameOutput
              html={generatedGame}
              title={gameTitle}
              settings={gameSettings}
              addToast={addToast}
              onRegenerate={(prompt, settings) => onForge(prompt || 'Regenerate this game with a fresh take', settings || gameSettings)}
              onSaveToGallery={onSaveToGallery}
              currentPrompt={currentPrompt}
            />
          </div>
        </>
      )}

      {/* Empty state */}
      {isIdle && (
        <div style={{
          textAlign: 'center', padding: '40px 24px 80px',
          borderTop: '1px solid rgba(255,255,255,0.04)',
          marginTop: gameHistory?.length > 0 ? 40 : 0,
        }}>
          <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.15 }}>🎮</div>
          <p style={{ fontFamily: 'Space Grotesk', fontSize: 14, color: 'rgba(255,255,255,0.15)' }}>
            Describe your idea above and hit Forge
          </p>
        </div>
      )}
    </div>
  );
}
