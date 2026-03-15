import React, { useEffect, useState } from 'react';

const STAGES = [
  { icon: '🌍', label: 'Generating World...', emoji: '🌍' },
  { icon: '🎨', label: 'Designing Characters...', emoji: '🎨' },
  { icon: '💻', label: 'Coding Mechanics...', emoji: '💻' },
  { icon: '🧪', label: 'Testing Gameplay...', emoji: '🧪' },
  { icon: '✅', label: 'Ready to Play!', emoji: '✅' },
];

const AGENTS = [
  {
    name: 'ARCHITECT',
    role: 'World Design',
    icon: '🌍',
    color: '#00F5FF',
    statuses: ['Analyzing prompt...', 'Designing world...', 'Creating levels...', 'Architecture done!'],
  },
  {
    name: 'ARTIST',
    role: 'Visual Design',
    icon: '🎨',
    color: '#FF2D6B',
    statuses: ['Waiting...', 'Drawing sprites...', 'Adding effects...', 'Visuals complete!'],
  },
  {
    name: 'CODER',
    role: 'Game Engine',
    icon: '💻',
    color: '#FFD60A',
    statuses: ['Standing by...', 'Writing engine...', 'Adding physics...', 'Code complete!'],
  },
  {
    name: 'QA AGENT',
    role: 'Testing & Polish',
    icon: '🔍',
    color: '#00FF87',
    statuses: ['On standby...', 'Reviewing code...', 'Testing mobile...', 'All tests passed!'],
  },
];

const THINKING_MSGS = [
  'Designing your game world with Indian setting...',
  'Coding the player movement and physics systems...',
  'Embedding educational content and cultural elements...',
  'Testing all levels and mobile touch controls...',
  'Your game is almost ready!',
  '✅ Game forged successfully!',
];

export default function AgentPipeline({ progress, stage, isGenerating }) {
  const [agentStatuses, setAgentStatuses] = useState([0, 0, 0, 0]);
  const [thinkingIdx, setThinkingIdx] = useState(0);
  const [thinkingOpacity, setThinkingOpacity] = useState(1);

  useEffect(() => {
    if (!isGenerating && progress < 100) return;

    // Update agent statuses based on progress
    const newStatuses = AGENTS.map((_, i) => {
      const threshold = i * 25;
      const statusProgress = Math.max(0, progress - threshold);
      return Math.min(3, Math.floor(statusProgress / 8));
    });
    setAgentStatuses(newStatuses);

    // Update thinking text
    const idx = Math.min(THINKING_MSGS.length - 1, Math.floor(progress / 17));
    if (idx !== thinkingIdx) {
      setThinkingOpacity(0);
      setTimeout(() => {
        setThinkingIdx(idx);
        setThinkingOpacity(1);
      }, 300);
    }
  }, [progress, isGenerating]);

  // Rotate thinking text
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!isGenerating) return;
    const interval = setInterval(() => {
      setThinkingOpacity(0);
      setTimeout(() => {
        setThinkingIdx(p => (p + 1) % THINKING_MSGS.length);
        setThinkingOpacity(1);
      }, 300);
    }, 3500);
    return () => clearInterval(interval);
  }, [isGenerating]);

  const isAgentActive = (i) => {
    const threshold = i * 22;
    return progress >= threshold && progress < (i + 1) * 22 + 10;
  };

  const isAgentDone = (i) => {
    return progress >= (i + 1) * 22 + 10;
  };

  return (
    <div className="agent-pipeline" data-testid="agent-pipeline">
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        <div className="pipeline-header">
          <h2 style={{
            fontFamily: 'Orbitron', fontWeight: 700, fontSize: 'clamp(20px,3vw,28px)', color: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
          }}>
            <span style={{ display: 'inline-block', animation: isGenerating ? 'spin-slow 1s linear infinite' : 'none' }}>⚙️</span>
            AI AGENTS WORKING
          </h2>
          <p style={{ fontFamily: 'Space Grotesk', fontSize: 14, color: 'var(--text-muted)', marginTop: 8 }}>
            4 specialized agents collaborating in real-time
          </p>
        </div>

        {/* Stages list */}
        <div className="pipeline-stage-list" data-testid="pipeline-stages">
          {STAGES.map((s, i) => {
            const isDone = i < stage || (i === 4 && progress === 100);
            const isActive = i === stage && progress < 100;
            return (
              <div
                key={s.label}
                className={`stage-row ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`}
                data-testid={`stage-${i}`}
              >
                <span className={`stage-icon ${isActive ? 'spinning' : ''}`}>{s.emoji}</span>
                <span className="stage-text">{s.label}</span>
                <span className="stage-dot" />
              </div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="progress-bar-track" data-testid="progress-track">
          <span className="progress-pct">{progress}%</span>
          <div
            className="progress-bar-fill"
            style={{ width: `${progress}%` }}
            data-testid="progress-fill"
          />
        </div>

        {/* Agent Cards */}
        <div className="agent-cards-grid" data-testid="agent-cards">
          {AGENTS.map((agent, i) => {
            const active = isAgentActive(i);
            const done = isAgentDone(i);
            const statusIdx = Math.min(agentStatuses[i], agent.statuses.length - 1);

            return (
              <div
                key={agent.name}
                className={`agent-card ${active ? 'active' : ''} ${done ? 'done' : ''}`}
                style={active || done ? { borderColor: agent.color, boxShadow: `0 0 30px ${agent.color}25` } : {}}
                data-testid={`agent-card-${i}`}
              >
                {done && <div className="agent-done-badge">COMPLETE</div>}
                <span className="agent-icon">{agent.icon}</span>
                <div className="agent-name">{agent.name}</div>
                <div className="agent-role">{agent.role}</div>
                <div className="agent-status">{agent.statuses[statusIdx]}</div>
                <div className="agent-mini-bar">
                  <div
                    className="agent-mini-fill"
                    style={{
                      width: done ? '100%' : active ? `${Math.min(100, (progress - i * 22) * 3)}%` : '0%',
                      background: agent.color,
                      boxShadow: `0 0 6px ${agent.color}`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Thinking text */}
        <p
          className="thinking-text"
          style={{ opacity: thinkingOpacity, transition: 'opacity 0.4s' }}
          data-testid="thinking-text"
        >
          {THINKING_MSGS[thinkingIdx]}
        </p>
      </div>
    </div>
  );
}
