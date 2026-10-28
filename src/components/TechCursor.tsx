import React, { useEffect, useState, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

export const TechCursor: React.FC = () => {
  const { theme } = usePortfolio();

  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Smooth lerped trailing position for the outer reticle ring
  const trailPos = useRef({ x: -100, y: -100 });
  const requestRef = useRef<number | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check if hovering over clickable elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const clickable = target.closest('button, a, input, textarea, select, [role="button"], .cursor-pointer');
        setIsHovering(Boolean(clickable));
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  // Animation frame loop for smooth spring/lerp trailing
  useEffect(() => {
    const animate = () => {
      const ease = 0.18;
      trailPos.current.x += (mousePos.x - trailPos.current.x) * ease;
      trailPos.current.y += (mousePos.y - trailPos.current.y) * ease;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${trailPos.current.x}px, ${trailPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (spotlightRef.current) {
        spotlightRef.current.style.background = `radial-gradient(550px circle at ${mousePos.x}px ${mousePos.y}px, ${
          theme === 'dark' ? 'rgba(251, 191, 36, 0.05)' : 'rgba(245, 158, 11, 0.04)'
        }, transparent 60%)`;
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [mousePos, theme]);

  if (!isVisible) return null;

  return (
    <>
      {/* Ambient Tech Flashlight Spotlight across viewport */}
      <div
        ref={spotlightRef}
        className="pointer-events-none fixed inset-0 z-20 transition-opacity duration-300"
      />

      {/* Main Precise Center Cursor Dot */}
      <div
        className="pointer-events-none fixed top-0 left-0 z-50 -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{
          transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`
        }}
      >
        <div
          className={`w-2 h-2 rounded-full bg-amber-400 transition-all duration-150 ${
            isClicking
              ? 'scale-50 bg-rose-400 ring-4 ring-rose-400/40'
              : isHovering
              ? 'scale-125 bg-amber-300 ring-4 ring-amber-400/30 shadow-[0_0_12px_#F59E0B]'
              : 'shadow-[0_0_8px_#F59E0B]'
          }`}
        />
      </div>

      {/* Trailing Cybernetic Tech Ring with Corner Reticles */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-40 will-change-transform"
      >
        <div
          className={`relative flex items-center justify-center transition-all duration-200 ease-out ${
            isHovering
              ? 'w-12 h-12 border-2 border-amber-400 bg-amber-400/10 rounded-xl rotate-45 scale-110 shadow-[0_0_20px_rgba(251,191,36,0.3)]'
              : isClicking
              ? 'w-7 h-7 border border-rose-400/80 rounded-full scale-90'
              : 'w-9 h-9 border border-amber-400/50 rounded-full'
          }`}
        >
          {/* 4 Optical Crosshair Reticle Notches */}
          {!isHovering && (
            <>
              <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-0.5 h-1.5 bg-amber-400/80" />
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0.5 h-1.5 bg-amber-400/80" />
              <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-0.5 bg-amber-400/80" />
              <span className="absolute -right-1 top-1/2 -translate-y-1/2 w-1.5 h-0.5 bg-amber-400/80" />
            </>
          )}

          {/* Micro HUD Coordinate Stream when hovering */}
          {isHovering && (
            <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-widest text-amber-400 font-bold whitespace-nowrap bg-zinc-950/80 px-1 rounded border border-amber-400/40">
              TARGET LOCK
            </span>
          )}
        </div>
      </div>
    </>
  );
};
