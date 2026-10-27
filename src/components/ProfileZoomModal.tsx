import React, { useEffect, useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { X, ZoomIn, ZoomOut, RotateCcw, MapPin, Mail, Award, CheckCircle2, ShieldCheck, Sparkles, ExternalLink } from 'lucide-react';

export const ProfileZoomModal: React.FC = () => {
  const { isProfileZoomOpen, setIsProfileZoomOpen, data, theme } = usePortfolio();
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  useEffect(() => {
    if (isProfileZoomOpen) {
      document.body.style.overflow = 'hidden';
      setZoomLevel(1);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isProfileZoomOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsProfileZoomOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsProfileZoomOpen]);

  if (!isProfileZoomOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-zinc-950/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      {/* Click outside backdrop */}
      <div
        className="fixed inset-0"
        onClick={() => setIsProfileZoomOpen(false)}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl my-auto bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[92vh]">
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between gap-4 bg-zinc-950/70 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-amber-400 text-zinc-950 flex items-center justify-center font-bold text-xs shadow-sm">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white leading-none">
                Creator Profile Showcase
              </h3>
              <p className="text-[11px] font-mono text-zinc-400 mt-1">
                Verified Identity Inspection
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Zoom Controls */}
            <div className="flex items-center bg-zinc-800/80 rounded-lg p-1 border border-zinc-700">
              <button
                onClick={() => setZoomLevel(prev => Math.max(0.8, prev - 0.25))}
                className="p-1 rounded text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors"
                title="Zoom Out"
                disabled={zoomLevel <= 0.8}
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="px-2 text-xs font-mono text-zinc-300 tabular-nums">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={() => setZoomLevel(prev => Math.min(2.5, prev + 0.25))}
                className="p-1 rounded text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors"
                title="Zoom In"
                disabled={zoomLevel >= 2.5}
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoomLevel(1)}
                className="p-1 rounded text-zinc-400 hover:text-amber-400 hover:bg-zinc-700 transition-colors ml-1"
                title="Reset Zoom"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={() => setIsProfileZoomOpen(false)}
              className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Main Zoomable Image Frame */}
          <div className="relative rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 flex items-center justify-center min-h-[340px] max-h-[500px] p-4">
            <div
              className="transition-transform duration-200 ease-out flex items-center justify-center max-w-full"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <img
                src={data.profile.avatarUrl}
                alt={`${data.profile.name} - Profile Monograph`}
                referrerPolicy="no-referrer"
                className="max-h-[440px] w-auto object-contain rounded-xl shadow-2xl"
              />
            </div>

            <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg bg-zinc-950/80 backdrop-blur border border-zinc-800 text-xs font-mono text-zinc-300 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Authentic Behance Archive & Profile Screenshot</span>
            </div>
          </div>

          {/* Detailed Profile Data Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-950/60 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <span>{data.profile.name}</span>
                    <Award className="w-4 h-4 text-amber-400" />
                  </h4>
                  <p className="text-xs text-zinc-400 font-mono">@{data.profile.handle}</p>
                </div>
              </div>

              <div className="pt-2 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-zinc-300">
                  <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span>{data.profile.location} ({data.profile.timezone})</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-300">
                  <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <a href={`mailto:${data.profile.email}`} className="text-amber-400 hover:underline">
                    {data.profile.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{data.profile.availability}</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-950/60 space-y-3">
              <h5 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                Core Design Specializations
              </h5>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Planetary Data Telemetry',
                  'Healthcare Clinical ERPs',
                  'DGDA Regulatory Price Systems',
                  'RMG Supply Chain Traceability',
                  'HTML5 Canvas Physics Engines',
                  'Figma Thematic Design Systems'
                ].map((spec, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300"
                  >
                    {spec}
                  </span>
                ))}
              </div>

              <div className="pt-2">
                <a
                  href="https://behance.net/majesticsoul1"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
                >
                  <span>Visit Verified Behance Profile</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-zinc-800 bg-zinc-950/80 flex items-center justify-between text-xs text-zinc-500 font-mono shrink-0">
          <span>High-Resolution Visual Monograph Inspection</span>
          <button
            onClick={() => setIsProfileZoomOpen(false)}
            className="hover:text-zinc-200 transition-colors"
          >
            Press ESC or click outside to dismiss
          </button>
        </div>
      </div>
    </div>
  );
};
