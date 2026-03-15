# HELIOS AI Game Engine — PRD

## Overview
HELIOS is an AI-powered HTML5 game creation platform built for Indian students and educators.
Users describe a game in plain language; 4 AI agents collaborate to forge a fully playable HTML5 game in ~60 seconds.

---

## Architecture
- **Frontend**: React 18, Tailwind CSS, Framer Motion, Recharts, Lucide React
- **Backend**: FastAPI, Python, Motor (MongoDB async driver)
- **AI**: Claude Sonnet via Emergent LLM Key (emergentintegrations library)
- **DB**: MongoDB (game gallery persistence)
- **Fonts**: Orbitron (headers), Space Grotesk (UI), Inter (body) via Google Fonts

---

## User Personas
1. **Indian Students (K-12)** — Primary; play and learn via games in Hindi/English
2. **Teachers / Educators** — Create curriculum-aligned games; use teacher dashboard analytics
3. **Game Enthusiasts** — Explore AI-generated games; share them

---

## Core Requirements (Static)
1. AI game generation via Claude Sonnet in < 90 seconds
2. Fully playable HTML5 games in iframe with download capability
3. Bilingual support (Hindi + English) in generated games
4. India-first cultural content in generated games
5. 4-agent pipeline visualization during generation
6. Game gallery with procedural CSS thumbnails
7. Teacher dashboard with learning analytics
8. Particle background + custom neon cursor UI

---

## What's Implemented (as of 2026-02-XX)

### Backend
- `POST /api/generate-game` — Calls Claude Sonnet with comprehensive game system prompt; returns complete HTML5 game
- `GET /api/gallery` — Returns saved gallery games from MongoDB
- `POST /api/gallery` — Saves a generated game to gallery
- Input validation for empty/too-short prompts

### Frontend Components
| Component | Description |
|-----------|-------------|
| `Loader.jsx` | 3-second loader with HELIOS letter assembly + progress bar |
| `CustomCursor.jsx` | Neon dot + trailing ring + trail canvas |
| `ParticleBackground.jsx` | Canvas particles + connections + aurora orbs + cyber grid + scanline |
| `Navbar.jsx` | Glassmorphism fixed nav + mobile hamburger menu |
| `HeroSection.jsx` | Glitch title + stats counter + infinite ticker + CTA buttons |
| `PromptForge.jsx` | Textarea + 4 settings dropdowns + toggles + theme chips + forge button |
| `AgentPipeline.jsx` | 4 agent cards + stage list + progress bar + thinking text |
| `GameOutput.jsx` | iframe + corner decorations + rotating glow ring + toolbar |
| `GameGallery.jsx` | 6 games, filter tabs, 3D card tilt, procedural CSS thumbnails |
| `HowItWorks.jsx` | 4-step timeline with 3D hover cards |
| `TeacherDashboard.jsx` | Stats + student table + Recharts line chart + topic heatmap |
| `Footer.jsx` | 3-column grid + social links + India badge + newsletter |
| `ToastSystem.jsx` | Slide-in toast notifications (success/error/info/warning) |

### Design System
- Dark void background (#020204)
- Neon accents: Yellow #FFD60A, Cyan #00F5FF, Pink #FF2D6B, Green #00FF87
- All animations: CSS keyframes + requestAnimationFrame
- Magnetic button effect via JS transforms
- 3D card tilt via perspective transforms

---

## Prioritized Backlog

### P0 (Critical — current iteration)
- [x] Game generation working end-to-end
- [x] Agent pipeline animation during generation
- [x] Game output iframe with download
- [x] Core UI sections all rendering

### P1 (High — next iteration)
- [ ] Real game gallery persistence (save generated games to gallery)
- [ ] Share game functionality (generate shareable link)
- [ ] Implement "Translate" button in game output toolbar
- [ ] Implement "Retheme" button variation

### P2 (Medium)
- [ ] Real teacher authentication + actual student data
- [ ] Game versioning (store multiple versions per prompt)
- [ ] Social sharing (Twitter, WhatsApp)
- [ ] Mobile-optimized touch controls test
- [ ] PDF export from teacher dashboard

---

## Next Tasks
1. Add "Save to Gallery" functionality after game generation
2. Implement share link with URL parameters
3. Add streaming response for game generation to show real-time progress
4. Consider adding more gallery games with more diverse subjects
5. Add actual student authentication for teacher dashboard
