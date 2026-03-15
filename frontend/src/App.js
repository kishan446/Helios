import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import axios from 'axios';
import './App.css';
import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ToastSystem from './components/ToastSystem';
import HomePage from './pages/HomePage';
import ForgePage from './pages/ForgePage';
import GalleryPage from './pages/GalleryPage';
import TeacherPage from './pages/TeacherPage';
import PricingPage from './pages/PricingPage';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.23, 1, 0.32, 1] } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
};

function AnimatedRoutes({ onForge, isGenerating, genProgress, genStage, generatedGame, gameTitle, gameSettings, addToast }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <motion.div {...pageVariants}>
            <HomePage onForgeClick={() => window.location.href = '/forge'} />
          </motion.div>
        } />
        <Route path="/forge" element={
          <motion.div {...pageVariants}>
            <ForgePage
              onForge={onForge}
              isGenerating={isGenerating}
              genProgress={genProgress}
              genStage={genStage}
              generatedGame={generatedGame}
              gameTitle={gameTitle}
              gameSettings={gameSettings}
              addToast={addToast}
            />
          </motion.div>
        } />
        <Route path="/gallery" element={
          <motion.div {...pageVariants}>
            <GalleryPage />
          </motion.div>
        } />
        <Route path="/teacher" element={
          <motion.div {...pageVariants}>
            <TeacherPage />
          </motion.div>
        } />
        <Route path="/pricing" element={
          <motion.div {...pageVariants}>
            <PricingPage />
          </motion.div>
        } />
      </Routes>
    </AnimatePresence>
  );
}

function AppContent() {
  const [loaderDone, setLoaderDone] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [genProgress, setGenProgress] = useState(0);
  const [genStage, setGenStage] = useState(0);
  const [generatedGame, setGeneratedGame] = useState(null);
  const [gameTitle, setGameTitle] = useState('');
  const [gameSettings, setGameSettings] = useState({});
  const [toasts, setToasts] = useState([]);

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
    setGameSettings(settings || {});

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
        addToast('Game forged! Enjoy playing! 🎮', 'success');
      }, 1200);

    } catch (err) {
      clearInterval(interval);
      setIsGenerating(false);
      setGenProgress(0);
      addToast(err.response?.data?.detail || 'Generation failed. Try again.', 'error');
    }
  }, [addToast]);

  return (
    <div className="app-root">
      {!loaderDone && <Loader onComplete={() => setLoaderDone(true)} />}
      <div style={{ opacity: loaderDone ? 1 : 0, transition: 'opacity 0.5s ease' }}>
        <CustomCursor />
        <ParticleBackground />
        <Navbar />
        <main className="page-main">
          <AnimatedRoutes
            onForge={handleForge}
            isGenerating={isGenerating}
            genProgress={genProgress}
            genStage={genStage}
            generatedGame={generatedGame}
            gameTitle={gameTitle}
            gameSettings={gameSettings}
            addToast={addToast}
          />
        </main>
        <Footer />
        <ToastSystem toasts={toasts} removeToast={removeToast} />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
