import React, { useEffect, useRef } from 'react';

export default function BackgroundCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Generate random stars
    const numStars = Math.min(Math.floor((width * height) / 10000), 120);
    const stars = Array.from({ length: numStars }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.5,
      baseAlpha: Math.random() * 0.4 + 0.3,
      speed: Math.random() * 0.02 + 0.005,
      color: Math.random() > 0.4 ? '#38bdf8' : '#a855f7',
    }));

    let animId;
    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle stars with twinkle (pure harmonic function, no cumulative drift)
      for (let star of stars) {
        const twinkle = Math.sin(angle * star.speed * 60) * 0.25;
        const currentAlpha = Math.max(0.1, Math.min(0.85, star.baseAlpha + twinkle));

        ctx.fillStyle = star.color;
        ctx.globalAlpha = currentAlpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      }

      angle += 0.01;
      animId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      const oldWidth = width;
      const oldHeight = height;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      
      // Reposition stars proportionally
      if (oldWidth > 0 && oldHeight > 0) {
        stars.forEach((star) => {
          star.x = (star.x / oldWidth) * width;
          star.y = (star.y / oldHeight) * height;
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-60"
      aria-hidden="true"
    />
  );
}
