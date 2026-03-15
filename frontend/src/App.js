import React, { useState, useCallback } from 'react';
import axios from 'axios';
import './App.css';
import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import PromptForge from './components/PromptForge';
import AgentPipeline from './components/AgentPipeline';
import GameOutput from './components/GameOutput';
import GameGallery from './components/GameGallery';
import HowItWorks from './components/HowItWorks';
import TeacherDashboard from './components/TeacherDashboard';
import Footer from './components/Footer';
import ToastSystem from './components/ToastSystem';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function App() {
  const [loaderDone, setLoaderDone] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [genProgress, setGenProgress] = useState(0);
  const [genStage, setGenStage] = useState(0);
  const [generatedGame, setGeneratedGame] = useState(null);
  const [gameTitle, setGameTitle] = useState('');
  const [gameSettings, setGameSettings] = useState({});
  const [toasts, setToasts] = useState([]);
  const [showTeacherDash, setShowTeacherDash] = useState(false);

  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3800);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const handleForge = useCallback(async (prompt, settings) => {
    setIsGenerating(true);
    setGenProgress(0);
    setGenStage(0);
    setGeneratedGame(null);
    setGameSettings(settings);

    setTimeout(() => {
      document.getElementById('agent-pipeline')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 200);

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 1.8 + 0.3;
      if (progress >= 87) { progress = 87; clearInterval(interval); }
      setGenProgress(Math.floor(progress));
      setGenStage(Math.min(3, Math.floor(progress / 22)));
    }, 700);

    try {
      const response = await axios.post(`${API}/generate-game`, {
        prompt, ...settings
      }, { timeout: 180000 });

      clearInterval(interval);
      setGenProgress(100);
      setGenStage(4);

      setTimeout(() => {
        setGeneratedGame(response.data.html);
        setGameTitle(response.data.title);
        setIsGenerating(false);
        setTimeout(() => {
          document.getElementById('game-output-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
        addToast('Your game is forged! Enjoy playing! 🎮', 'success');
      }, 1500);

    } catch (err) {
      clearInterval(interval);
      setIsGenerating(false);
      const msg = err.response?.data?.detail || 'Game generation failed. Please try again.';
      addToast(msg, 'error');
      setGenProgress(0);
    }
  }, [addToast]);

  const handleRegenerate = useCallback((prompt, settings) => {
    handleForge(prompt, settings || gameSettings);
  }, [handleForge, gameSettings]);

  const scrollToForge = useCallback(() => {
    document.getElementById('forge-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <div className="app-root">
      {!loaderDone && <Loader onComplete={() => setLoaderDone(true)} />}
      <div style={{ opacity: loaderDone ? 1 : 0, transition: 'opacity 0.6s ease' }}>
        <CustomCursor />
        <ParticleBackground />
        <Navbar
          onTeacherMode={() => setShowTeacherDash(v => !v)}
          onForgeClick={scrollToForge}
          showTeacherDash={showTeacherDash}
        />
        <main>
          <section id="home">
            <HeroSection onForgeClick={scrollToForge} />
          </section>

          <section id="forge-section">
            <PromptForge onForge={handleForge} isGenerating={isGenerating} />
          </section>

          {(isGenerating || genProgress > 0) && (
            <div id="agent-pipeline">
              <AgentPipeline
                progress={genProgress}
                stage={genStage}
                isGenerating={isGenerating}
              />
            </div>
          )}

          {generatedGame && (
            <section id="game-output-section">
              <GameOutput
                html={generatedGame}
                title={gameTitle}
                settings={gameSettings}
                addToast={addToast}
                onRegenerate={handleRegenerate}
              />
            </section>
          )}

          <section id="gallery">
            <GameGallery onPlayGame={(prompt) => {
              scrollToForge();
              setTimeout(() => {
                window.dispatchEvent(new CustomEvent('fill-forge', { detail: { prompt } }));
              }, 400);
            }} />
          </section>

          <section id="how-it-works">
            <HowItWorks onForgeClick={scrollToForge} />
          </section>

          {showTeacherDash && (
            <section id="teacher-dashboard">
              <TeacherDashboard />
            </section>
          )}
        </main>

        <Footer
          onTeacherMode={() => setShowTeacherDash(v => !v)}
          showTeacherDash={showTeacherDash}
          onForgeClick={scrollToForge}
        />
        <ToastSystem toasts={toasts} removeToast={removeToast} />
      </div>
    </div>
  );
}

export default App;
