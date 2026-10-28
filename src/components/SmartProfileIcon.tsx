import React from 'react';
import { Cpu, Cog, Compass, Shield, Terminal, Zap, Binary, Layers } from 'lucide-react';

interface SmartProfileIconProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero' | 'modal';
  className?: string;
  interactive?: boolean;
}

export const SmartProfileIcon: React.FC<SmartProfileIconProps> = ({
  size = 'md',
  className = '',
  interactive = true
}) => {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
    xl: 'w-32 h-32',
    hero: 'w-40 h-40 sm:w-48 sm:h-48',
    modal: 'w-64 h-64 sm:w-80 sm:h-80'
  };

  const ringSizes = {
    sm: 'p-0.5',
    md: 'p-1',
    lg: 'p-1.5',
    xl: 'p-2',
    hero: 'p-3',
    modal: 'p-4'
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none group ${sizeMap[size]} ${className}`}
    >
      {/* Outer ambient energy aura glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-500/30 via-rose-500/20 to-indigo-500/30 blur-md group-hover:blur-lg transition-all duration-500 animate-pulse-glow" />

      {/* Rotating Cybernetic & Industrial Caliper Ring */}
      <svg
        className={`absolute inset-0 w-full h-full ${interactive ? 'group-hover:rotate-45 transition-transform duration-700' : ''}`}
        viewBox="0 0 100 100"
        fill="none"
      >
        {/* Outer Orbit Segment Ring */}
        <circle
          cx="50"
          cy="50"
          r="47"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeDasharray="4 6 12 4"
          className="text-amber-400/40"
        />

        {/* Industrial Engineering Coordinate Marks */}
        <circle
          cx="50"
          cy="50"
          r="41"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeDasharray="1 8"
          className="text-cyan-400/50"
        />

        {/* 4 Cardinal Sensor Nodes */}
        <circle cx="50" cy="4" r="2" fill="#F59E0B" className="animate-pulse" />
        <circle cx="96" cy="50" r="2" fill="#06B6D4" />
        <circle cx="50" cy="96" r="2" fill="#F43F5E" />
        <circle cx="4" cy="50" r="2" fill="#6366F1" />

        {/* Optical Crosshair Ticks */}
        <line x1="50" y1="9" x2="50" y2="15" stroke="#F59E0B" strokeWidth="1.2" />
        <line x1="85" y1="50" x2="91" y2="50" stroke="#06B6D4" strokeWidth="1.2" />
        <line x1="50" y1="85" x2="50" y2="91" stroke="#F43F5E" strokeWidth="1.2" />
        <line x1="9" y1="50" x2="15" y2="50" stroke="#6366F1" strokeWidth="1.2" />
      </svg>

      {/* Inner Smart Icon Body Container */}
      <div
        className={`relative z-10 w-full h-full rounded-2xl bg-zinc-950/90 dark:bg-zinc-950 border border-zinc-800 shadow-2xl overflow-hidden flex flex-col items-center justify-center ${ringSizes[size]}`}
      >
        {/* Subtle grid pattern background */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(251, 191, 36, 0.4) 1px, transparent 0)',
            backgroundSize: '12px 12px'
          }}
        />

        {/* Center Smart Engineering Crest */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
          {/* Layered Industrial & Tech Glyphs */}
          <div className="relative flex items-center justify-center">
            {/* Geometric Rotating Tech Hexagon */}
            <div className="absolute w-full h-full border border-amber-500/20 rounded-xl rotate-12 transition-transform duration-500 group-hover:rotate-45" />

            {/* Core Icon Badge */}
            <div className="p-2 sm:p-3 rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-amber-400/40 shadow-inner flex items-center justify-center">
              <Cpu className="w-1/2 h-1/2 min-w-4 min-h-4 max-w-16 max-h-16 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)] animate-pulse" />
            </div>
          </div>

          {/* Micro Telemetry Tags for Larger Sizes */}
          {(size === 'lg' || size === 'xl' || size === 'hero' || size === 'modal') && (
            <div className="mt-2 flex items-center gap-1.5 font-mono text-[9px] tracking-widest text-amber-400/90 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>IE · TECH</span>
            </div>
          )}

          {/* Bottom Monogram for Modal Size */}
          {(size === 'hero' || size === 'modal') && (
            <div className="mt-1 text-[11px] font-mono text-zinc-400 tracking-wider">
              SYED AMZAD HOSSAIN
            </div>
          )}
        </div>

        {/* Diagonal Light Glare Flare */}
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-white/10 via-transparent to-transparent rotate-45 pointer-events-none" />
      </div>
    </div>
  );
};
