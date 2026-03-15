import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const trailRef = useRef(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const trail = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const canvas = trailRef.current;
    if (!dot || !ring || !canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      trail.current.push({ x: e.clientX, y: e.clientY, time: Date.now() });
      if (trail.current.length > 22) trail.current.shift();

      dot.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;

      const target = e.target;
      const isBtn = target.closest('button, a, .nav-link, .forge-btn, .btn-primary, .btn-secondary, .toolbar-btn, .filter-tab, .toggle-pill, .theme-chip, .mobile-menu-btn, .nav-cta');
      const isCard = target.closest('.game-card, .agent-card, .how-card, .stat-card');

      if (isBtn) {
        ring.classList.add('cursor-hover-btn');
        ring.classList.remove('cursor-hover-card');
        dot.style.background = 'var(--neon-pink)';
        dot.style.boxShadow = '0 0 10px var(--neon-pink), 0 0 20px var(--neon-pink)';
      } else if (isCard) {
        ring.classList.add('cursor-hover-card');
        ring.classList.remove('cursor-hover-btn');
        dot.style.background = 'var(--neon-cyan)';
        dot.style.boxShadow = '0 0 10px var(--neon-cyan), 0 0 20px var(--neon-cyan)';
      } else {
        ring.classList.remove('cursor-hover-btn', 'cursor-hover-card');
        dot.style.background = 'var(--neon-cyan)';
        dot.style.boxShadow = '0 0 10px var(--neon-cyan), 0 0 20px var(--neon-cyan)';
      }
    };

    const onMouseDown = () => {
      dot.style.transform += ' scale(0.5)';
    };
    const onMouseUp = () => {
      dot.style.transform = `translate(${mousePos.current.x - 3}px, ${mousePos.current.y - 3}px)`;
    };

    const animate = () => {
      const rx = ringPos.current.x + (mousePos.current.x - ringPos.current.x) * 0.13;
      const ry = ringPos.current.y + (mousePos.current.y - ringPos.current.y) * 0.13;
      ringPos.current = { x: rx, y: ry };

      const halfW = ring.offsetWidth / 2;
      const halfH = ring.offsetHeight / 2;
      ring.style.transform = `translate(${rx - halfW}px, ${ry - halfH}px)`;

      // Trail
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = Date.now();
      const recent = trail.current.filter(p => now - p.time < 300);

      recent.forEach((p, i) => {
        const age = now - p.time;
        const life = 1 - age / 300;
        const colors = ['255,214,10', '0,245,255', '255,45,107'];
        const colorIdx = Math.floor((i / recent.length) * colors.length);
        const color = colors[Math.min(colorIdx, colors.length - 1)];
        const size = (1 + (i / recent.length) * 3) * life;

        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${life * 0.45})`;
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('resize', onResize);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
      <canvas ref={trailRef} className="cursor-trail" />
    </>
  );
}
