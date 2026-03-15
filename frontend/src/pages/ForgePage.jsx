import React, { useEffect } from 'react';
import PromptForge from '../components/PromptForge';
import AgentPipeline from '../components/AgentPipeline';
import GameOutput from '../components/GameOutput';

export default function ForgePage({ onForge, isGenerating, genProgress, genStage, generatedGame, gameTitle, gameSettings, addToast }) {
  // Scroll to pipeline when generating starts
  useEffect(() => {
    if (isGenerating && genProgress < 5) {
      setTimeout(() => document.getElementById('pipeline-anchor')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 200);
    }
  }, [isGenerating]);

  // Scroll to output when done
  useEffect(() => {
    if (generatedGame) {
      setTimeout(() => document.getElementById('output-anchor')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 400);
    }
  }, [generatedGame]);

  return (
    <div style={{ minHeight: '100vh', paddingTop: 64 }}>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-container">
          <span className="section-eyebrow">FORGE STUDIO</span>
          <h1 className="section-title">Create Your Game</h1>
          <p className="section-subtitle">Describe any game idea. Our 4 AI agents will build it in under 60 seconds.</p>
        </div>
      </div>

      {/* Forge Input */}
      <div className="forge-section">
        <PromptForge onForge={onForge} isGenerating={isGenerating} />
      </div>

      {/* Agent Pipeline */}
      {(isGenerating || genProgress > 0) && (
        <div id="pipeline-anchor">
          <AgentPipeline progress={genProgress} stage={genStage} isGenerating={isGenerating} />
        </div>
      )}

      {/* Game Output */}
      {generatedGame && (
        <div id="output-anchor">
          <GameOutput
            html={generatedGame}
            title={gameTitle}
            settings={gameSettings}
            addToast={addToast}
            onRegenerate={(prompt, settings) => onForge(prompt || 'Regenerate this game with a fresh take', settings || gameSettings)}
          />
        </div>
      )}

      {/* Empty state when nothing generated yet */}
      {!isGenerating && genProgress === 0 && !generatedGame && (
        <div style={{ textAlign: 'center', padding: '60px 24px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>🎮</div>
          <p style={{ fontFamily: 'Space Grotesk', fontSize: 15, color: 'rgba(255,255,255,0.25)' }}>
            Your game will appear here after forging
          </p>
        </div>
      )}
    </div>
  );
}
