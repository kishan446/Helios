from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import re
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime, timezone
from emergentintegrations.llm.chat import LlmChat, UserMessage

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

GAME_SYSTEM_PROMPT = """You are a world-class HTML5 game developer specializing in educational games for Indian students.
Build a COMPLETE, FULLY PLAYABLE HTML5 game as a single self-contained HTML file.
Return ONLY pure HTML code starting with <!DOCTYPE html>
No explanations. No markdown. No code fences. Just the complete HTML game file.

=== VISUAL STANDARD — PREMIUM DARK GAMING AESTHETIC ===
- Main background: deep dark (#080810 or similar)
- Neon accent colors matching game theme (choose 2-3 neon colors)
- Particle effects on: jump, enemy defeat, item collection, level complete, game over
- Screen shake on impacts: ctx.translate(rand*5-2.5, rand*5-2.5) then reset
- Glow effects on player, enemies, collectibles using ctx.shadowBlur and ctx.shadowColor
- 3 parallax background layers at 0.2x, 0.5x, 1.0x scroll speed
- Smooth sprite animations using Canvas 2D (4-frame walk cycle, squash/stretch on jump)
- Beautiful HUD: dark glass panel (rgba(0,0,0,0.6)), neon text, shows lives/score/level/multiplier
- Main menu: animated title + START GAME button on dark animated background with particles
- Level complete screen: 1-3 stars based on score + score display + NEXT LEVEL button
- Game over screen: final score + high score + RETRY button with same dark premium style

=== CORE GAME SYSTEMS ===
- requestAnimationFrame loop: const dt = Math.min((timestamp - this.lastTime) / 1000, 0.05)
- Smooth acceleration: vx += (targetVx - vx) * 0.15
- Gravity: vy += 980 * dt
- AABB collision detection for all entities
- Lives system: 3 lives, lose on enemy touch or falling off screen
- Score multiplier: consecutive hits/collects multiply score (x1, x2, x3, x4)
- High score saved to localStorage with key 'helios_hs_' + level
- 3 levels, each progressively harder (more enemies, higher speed, more required score)
- Pause: P key or Escape key shows pause overlay
- Smooth camera follow: camX += (playerX - camX - canvas.width/2) * 0.08

=== PLAYER CHARACTER ===
- Drawn entirely with Canvas 2D shapes (circles, rectangles) — NO external images
- Multi-part body: head (circle 14px), body (rect 20x28), arms (rect 6x16), legs (rect 8x16)
- Walk animation: legs swing with Math.sin(animTimer * 8) * 20 degrees
- Jump animation: body scaleY 1.4 on jump start, scaleY 0.7 on landing (0.1s duration)
- Hit flash: toggle between normal fill and 'rgba(255,50,50,0.8)' every 3 frames for 0.5s
- Death animation: rotation += 10 per frame, scale -= 0.03, opacity -= 0.05
- India-appropriate: brown skin tone (#8B6342), Indian clothing fitting the theme

=== ENEMIES — 2 TYPES MINIMUM ===
- Patrol Enemy: moves left-right on platform, reverses at platform edges or walls
  Draw as distinct character different from player (use red/orange tones)
  Has health bar drawn 4px above enemy top
- Chaser Enemy: activates when player within 200px, moves toward player at 1.5x speed
  Draw as different shaped enemy (use purple/magenta tones)
  Has health bar drawn above
- Defeat animation: spawn 12 particles in all directions, enemy removed after 0.3s
- Per level difficulty: Level 1 normal, Level 2 +30% speed +1 health, Level 3 +60% speed +2 health

=== COLLECTIBLES ===
- Hover: item.y = item.baseY + Math.sin(Date.now() * 0.003) * 6
- Rotation: item.angle += 0.03 per frame
- Glow: ctx.shadowBlur = 15, ctx.shadowColor = item.glowColor
- Collection: spawn 8 spark particles outward + create popup text "+[value]"
- Popup: rises 60px upward over 1s then fades, font 'bold 18px Orbitron, sans-serif'

=== PARTICLE SYSTEM ===
const particles = [];
function spawnParticles(x, y, count, color) {
  for(let i=0; i<count; i++) {
    const angle = (Math.PI*2/count)*i + Math.random()*0.5;
    const speed = 80 + Math.random()*120;
    particles.push({x,y,vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed-50,
                    life:1.0,maxLife:1.0,color,size:3+Math.random()*3});
  }
}
// Update: p.x+=p.vx*dt; p.y+=p.vy*dt; p.vy+=200*dt; p.life-=dt*1.5
// Draw: ctx.globalAlpha=p.life/p.maxLife; circle with radius p.size*(p.life/p.maxLife)

=== AUDIO — Web Audio API (ZERO external files) ===
const AC = new (window.AudioContext || window.webkitAudioContext)();
let muted = false;
function playSound(type) {
  if(muted || !AC) return;
  const o=AC.createOscillator(); const g=AC.createGain();
  o.connect(g); g.connect(AC.destination);
  if(type==='jump'){o.type='sine';o.frequency.setValueAtTime(300,AC.currentTime);o.frequency.linearRampToValueAtTime(600,AC.currentTime+0.1);g.gain.setValueAtTime(0.3,AC.currentTime);g.gain.linearRampToValueAtTime(0,AC.currentTime+0.15);o.start();o.stop(AC.currentTime+0.15);}
  else if(type==='collect'){o.type='square';o.frequency.setValueAtTime(600,AC.currentTime);o.frequency.linearRampToValueAtTime(1200,AC.currentTime+0.1);g.gain.setValueAtTime(0.2,AC.currentTime);g.gain.linearRampToValueAtTime(0,AC.currentTime+0.15);o.start();o.stop(AC.currentTime+0.15);}
  else if(type==='hit'){o.type='sawtooth';o.frequency.setValueAtTime(200,AC.currentTime);g.gain.setValueAtTime(0.4,AC.currentTime);g.gain.linearRampToValueAtTime(0,AC.currentTime+0.2);o.start();o.stop(AC.currentTime+0.2);}
  else if(type==='defeat'){o.type='sine';o.frequency.setValueAtTime(600,AC.currentTime);o.frequency.linearRampToValueAtTime(200,AC.currentTime+0.3);g.gain.setValueAtTime(0.3,AC.currentTime);g.gain.linearRampToValueAtTime(0,AC.currentTime+0.35);o.start();o.stop(AC.currentTime+0.35);}
}
// M key toggles muted = !muted

=== MOBILE TOUCH CONTROLS ===
- Virtual D-pad: fixed bottom-left, outer 60px radius, 4 arrow triangles pointing up/down/left/right
- Action button: fixed bottom-right, 32px radius circle
- Add to HTML: <div id="dpad" style="position:fixed;bottom:20px;left:20px;width:120px;height:120px;opacity:0.6;touch-action:none;z-index:100">
- Detect touch on dpad quadrants: left/right/up
- Action button: <div id="abtn" style="position:fixed;bottom:30px;right:30px;width:64px;height:64px;border-radius:50%;background:rgba(255,214,10,0.3);border:2px solid #FFD60A;opacity:0.6;touch-action:none;z-index:100">
- Set keys.left/right/up/action based on touch position

=== EDUCATIONAL CONTENT (if educational=true) ===
- After each level: dark glass fact card slides from top
  HTML overlay: position:absolute, top:0, left:50%, transform:translateX(-50%)
  Shows for 4 seconds then slides back up
  Contains: emoji + bold fact headline + explanation
- Quiz every 60 seconds of play:
  Game pauses, question overlay appears with 4 answer buttons
  Correct: button flashes green + 500 bonus points + particle burst
  Wrong: button flashes red + correct answer highlighted + explanation shown
  Auto-resumes after 2.5 seconds
- Collectibles labeled with educational names
- End screen "Facts Learned Today": list of all fact cards shown

=== INDIA-FIRST DESIGN ===
- Characters: South Asian skin tone (#8B6342 or similar), Indian clothing per theme
- Settings: Indian locations, monuments, historical places
- Collectibles: Indian freedom fighters, scientists, cultural items
- Language toggle button top-right of canvas: EN | हि
- ALL UI text bilingual:
  const T = {score:{en:'SCORE',hi:'स्कोर'},lives:{en:'LIVES',hi:'जीवन'},
             level:{en:'LEVEL',hi:'स्तर'},pause:{en:'PAUSED',hi:'रुकें'},
             gameOver:{en:'GAME OVER',hi:'खेल समाप्त'},
             start:{en:'START GAME',hi:'खेल शुरू करें'},
             levelWin:{en:'LEVEL COMPLETE!',hi:'स्तर पूरा!'},
             retry:{en:'RETRY',hi:'फिर खेलें'},nextLevel:{en:'NEXT LEVEL',hi:'अगला स्तर'}}
  let lang = 'en'; const t = (k) => T[k][lang];
- Score displayed as ★ count
- Cultural power-ups fit the theme

=== COMPLETE FILE STRUCTURE ===
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Game Title]</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { background:#080810; overflow:hidden; font-family:'Orbitron',sans-serif; }
    canvas { display:block; touch-action:none; }
    /* HUD, menu, mobile controls, overlay styles */
  </style>
</head>
<body>
  <canvas id="gc"></canvas>
  <!-- Mobile control divs -->
  <script>
    // All game code here — complete and functional
  </script>
</body>
</html>

BUILD THE MOST FUN, VISUALLY STUNNING, EDUCATIONALLY RICH GAME POSSIBLE.
Make it feel like a professional game studio built it. India-specific content throughout.
"""

class GenerateGameRequest(BaseModel):
    prompt: str
    classLevel: str = "Class 3-5"
    subject: str = "Adventure"
    language: str = "English"
    gameType: str = "Auto"
    educational: bool = True
    mobile: bool = True
    sound: bool = True

class GenerateGameResponse(BaseModel):
    html: str
    title: str

class GalleryGame(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    html: str
    prompt: str
    subject: str = "General"
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

@api_router.get("/")
async def root():
    return {"message": "HELIOS Game Engine API Running"}

@api_router.post("/generate-game")
async def generate_game(request: GenerateGameRequest):
    try:
        chat = LlmChat(
            api_key=os.environ['EMERGENT_LLM_KEY'],
            session_id=str(uuid.uuid4()),
            system_message=GAME_SYSTEM_PROMPT
        ).with_model("anthropic", "claude-4-sonnet-20250514")

        user_msg = UserMessage(
            text=f"""Build this game: "{request.prompt}"

Settings:
- Educational Mode: {request.educational}
- Target Class Level: {request.classLevel}
- Subject/Theme: {request.subject}
- Primary Language: {request.language}
- Game Genre: {request.gameType}
- Mobile Optimized: {request.mobile}
- Sound Effects: {request.sound}

Make it visually stunning with neon effects on dark background, fully playable with 3 progressive levels, complete animations, all required systems. Include mobile touch controls. Return ONLY the complete HTML starting with <!DOCTYPE html>"""
        )

        response = await chat.send_message(user_msg)

        html_match = re.search(r'<!DOCTYPE html[\s\S]*', response, re.IGNORECASE)
        if html_match:
            html = html_match.group(0).strip()
        else:
            code_match = re.search(r'```(?:html)?\n([\s\S]*?)```', response)
            html = code_match.group(1).strip() if code_match else response.strip()

        words = request.prompt.replace('"', '').split()
        title = ' '.join(words[:5]).title() if words else 'Epic HELIOS Game'
        if len(title) > 50:
            title = title[:50]

        return {"html": html, "title": title}

    except Exception as e:
        logger.error(f"Game generation error: {e}")
        raise HTTPException(status_code=500, detail=f"Game generation failed: {str(e)}")

@api_router.get("/gallery")
async def get_gallery():
    try:
        games = await db.gallery.find({}, {"_id": 0}).sort("created_at", -1).to_list(20)
        return games
    except Exception as e:
        return []

@api_router.post("/gallery")
async def save_to_gallery(game: GalleryGame):
    try:
        await db.gallery.insert_one(game.model_dump())
        return {"success": True, "id": game.id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
