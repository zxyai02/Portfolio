import React, { useEffect, useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { X, ExternalLink, Github, Figma, Calendar, Building, Sparkles, ZoomIn, ArrowRight } from 'lucide-react';

export const ProjectModal: React.FC = () => {
  const { selectedProject, setSelectedProject, isAdmin, setEditingProject } = usePortfolio();
  const [activeImage, setActiveImage] = useState<string>('');
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  useEffect(() => {
    if (selectedProject) {
      setActiveImage(selectedProject.image);
      setIsZoomed(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSelectedProject]);

  if (!selectedProject) return null;

  const allImages = [selectedProject.image, ...(selectedProject.secondaryImages || [])];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-zinc-950/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      {/* Click outside backdrop */}
      <div
        className="fixed inset-0"
        onClick={() => setSelectedProject(null)}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-5xl my-auto bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between gap-4 bg-zinc-950/60 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">
              {selectedProject.category}
            </span>
            <span className="text-zinc-600 font-mono" aria-hidden="true">/</span>
            <span className="text-xs font-mono text-zinc-400">
              {selectedProject.year}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {isAdmin && (
              <button
                onClick={() => {
                  setEditingProject(selectedProject);
                  setSelectedProject(null);
                }}
                className="px-3 py-1 rounded bg-zinc-800 hover:bg-amber-400 hover:text-zinc-950 text-xs font-medium text-zinc-200 border border-zinc-700 transition-colors"
              >
                Edit in CMS
              </button>
            )}
            <button
              onClick={() => setSelectedProject(null)}
              className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Main Screenshot Showcase */}
          <div className="space-y-3">
            <div
              className={`relative rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 transition-all ${
                isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <img
                src={activeImage}
                alt={selectedProject.title}
                referrerPolicy="no-referrer"
                className={`w-full transition-all duration-300 ${
                  isZoomed ? 'scale-125 object-contain py-4' : 'max-h-[520px] object-cover object-top'
                }`}
              />
              <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-zinc-900/80 backdrop-blur border border-zinc-700 text-[11px] font-mono text-zinc-300 flex items-center gap-1.5 pointer-events-none">
                <ZoomIn className="w-3.5 h-3.5" />
                <span>{isZoomed ? 'Click to minimize' : 'Click to zoom'}</span>
              </div>
            </div>

            {/* Thumbnail switcher if multiple images exist */}
            {allImages.length > 1 && (
              <div className="flex items-center gap-3 pt-1">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-20 h-14 rounded-lg overflow-hidden border transition-all ${
                      activeImage === img
                        ? 'border-amber-400 ring-2 ring-amber-400/20'
                        : 'border-zinc-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt="Thumbnail view"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title & Metadata Header */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {selectedProject.title}
            </h2>
            <p className="text-base text-amber-400/90 font-medium mt-1">
              {selectedProject.subtitle}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-zinc-400 font-mono py-3 border-y border-zinc-800/80">
              <div className="flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-zinc-500" />
                <span>Client: <strong className="text-zinc-200 font-normal">{selectedProject.client}</strong></span>
              </div>
              <span aria-hidden="true">·</span>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                <span>Timeline: <strong className="text-zinc-200 font-normal">{selectedProject.year}</strong></span>
              </div>
            </div>
          </div>

          {/* Action Links Bar */}
          <div className="flex flex-wrap items-center gap-3">
            {selectedProject.liveUrl && (
              <a
                href={selectedProject.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-lg bg-amber-400 text-zinc-950 font-bold text-xs hover:bg-amber-300 transition-colors flex items-center gap-2 shadow-md"
              >
                <span>Launch Live System</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {selectedProject.figmaUrl && (
              <a
                href={selectedProject.figmaUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200 font-medium text-xs hover:bg-zinc-700 hover:text-white transition-colors flex items-center gap-2"
              >
                <Figma className="w-3.5 h-3.5" />
                <span>Inspect Figma Prototype</span>
              </a>
            )}
            {selectedProject.githubUrl && (
              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200 font-medium text-xs hover:bg-zinc-700 hover:text-white transition-colors flex items-center gap-2"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Repository</span>
              </a>
            )}
          </div>

          {/* Performance & Scale Metrics */}
          {selectedProject.metrics && selectedProject.metrics.length > 0 && (
            <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-5">
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">
                Key Performance Indicators & Verified Metrics
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {selectedProject.metrics.map((m, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-white">
                      {m.value}
                    </span>
                    <span className="text-xs text-zinc-400 mt-0.5">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Detailed Narrative Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-5">
              <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>The Problem & Domain Context</span>
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {selectedProject.challenge}
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-5">
              <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>The Engineering & UX Solution</span>
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {selectedProject.solution}
              </p>
            </div>
          </div>

          {/* Full Summary */}
          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-5">
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
              System Architecture & Workflow Overview
            </h4>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {selectedProject.summary}
            </p>
          </div>

          {/* Tech Stack Chips */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">
              Technologies & Methodologies Deployed
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedProject.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-md bg-zinc-800 border border-zinc-700 text-xs font-mono text-zinc-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-zinc-800 bg-zinc-950/80 flex items-center justify-between text-xs text-zinc-500 font-mono shrink-0">
          <span>Majestic Soul Design Archive · {selectedProject.slug}</span>
          <button
            onClick={() => setSelectedProject(null)}
            className="hover:text-zinc-200 transition-colors"
          >
            Press ESC or click to close
          </button>
        </div>
      </div>
    </div>
  );
};
