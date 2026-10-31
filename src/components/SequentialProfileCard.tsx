import React, { useState, useEffect, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  ZoomIn,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  Briefcase,
  Laptop,
  Sparkles
} from 'lucide-react';

interface ProfileImageStage {
  id: 'suited' | 'reading';
  title: string;
  subtitle: string;
  roleTag: string;
  src: string;
  alt: string;
  icon: typeof Briefcase;
}

const PROFILE_STAGES: ProfileImageStage[] = [
  {
    id: 'suited',
    title: 'Executive Silhouette',
    subtitle: 'Industrial Systems Engineer & Tech Enthusiast',
    roleTag: 'First · Suited Image',
    src: '/assets/aistudio/Professional_Businessman_In_Suit_And_Tie_Silhouette_Vector_Illustration_Isolated_On_A_White_Background__Silhouette__Man_Silhouette__Businessman_Silhouette_PNG_and_Vector_with_Transparent_Background_for_Free_Download_e1b397e7.jpg',
    alt: 'Syed Amzad Hossain - Suited Businessman Silhouette Vector Profile',
    icon: Briefcase
  },
  {
    id: 'reading',
    title: 'Focus Workstation & Deep Research',
    subtitle: 'High-Density Operational Modeling & Software Telemetry',
    roleTag: 'Then · Reading & Desk Image',
    src: '/assets/aistudio/_____________________________10_____________________18________35___________________________________________________________________________________________________9_00_____________3_00__________________________4ca5321b.jpg',
    alt: 'Syed Amzad Hossain - Engineering Desk Reading & Deep Work',
    icon: Laptop
  }
];

const STAGE_DURATION_MS = 4500;

export const SequentialProfileCard: React.FC = () => {
  const { theme, setIsProfileZoomOpen, data } = usePortfolio();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [progressPercent, setProgressPercent] = useState<number>(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  const currentStage = PROFILE_STAGES[currentIndex];
  const ActiveIcon = currentStage.icon;

  const nextStage = () => {
    setCurrentIndex(prev => (prev + 1) % PROFILE_STAGES.length);
    setProgressPercent(0);
    startTimeRef.current = Date.now();
  };

  const prevStage = () => {
    setCurrentIndex(prev => (prev - 1 + PROFILE_STAGES.length) % PROFILE_STAGES.length);
    setProgressPercent(0);
    startTimeRef.current = Date.now();
  };

  const goToStage = (index: number) => {
    setCurrentIndex(index);
    setProgressPercent(0);
    startTimeRef.current = Date.now();
  };

  // Auto-progression effect: First suited image, then reading image sequentially
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    startTimeRef.current = Date.now();
    setProgressPercent(0);

    // Progress bar tick
    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min(100, (elapsed / STAGE_DURATION_MS) * 100);
      setProgressPercent(pct);
    }, 50);

    // Transition trigger
    timerRef.current = setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % PROFILE_STAGES.length);
    }, STAGE_DURATION_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [currentIndex, isPlaying]);

  return (
    <div
      className={`relative rounded-2xl border p-3 sm:p-3.5 shadow-2xl backdrop-blur-md transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-zinc-900/80 border-zinc-800'
          : 'bg-white border-zinc-200/90 shadow-xl'
      }`}
    >
      {/* Top Controls & Sequential Indicators */}
      <div className="flex items-center justify-between gap-2 mb-2.5 px-1 text-xs">
        {/* Step Tabs: 1. Suited -> 2. Reading */}
        <div className="flex items-center gap-1.5">
          {PROFILE_STAGES.map((stage, idx) => {
            const isCurrent = currentIndex === idx;
            const Icon = stage.icon;
            return (
              <button
                key={stage.id}
                onClick={() => goToStage(idx)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                  isCurrent
                    ? 'bg-amber-400 text-zinc-950 shadow-xs'
                    : theme === 'dark'
                    ? 'bg-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700'
                    : 'bg-zinc-100 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200'
                }`}
                title={`Switch to ${stage.title}`}
              >
                <Icon className="w-3 h-3" />
                <span className="hidden xs:inline sm:inline">
                  {idx === 0 ? '1. Suited Profile' : '2. Reading & Work'}
                </span>
                <span className="xs:hidden sm:hidden">{idx + 1}</span>
              </button>
            );
          })}
        </div>

        {/* Sequential Controls: Play/Pause, Prev, Next, Zoom */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`p-1.5 rounded-lg border transition-colors ${
              theme === 'dark'
                ? 'bg-zinc-800/80 border-zinc-700 text-zinc-300 hover:text-white'
                : 'bg-zinc-100 border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200'
            }`}
            title={isPlaying ? 'Pause Auto-Sequence' : 'Resume Auto-Sequence'}
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          </button>

          <button
            onClick={prevStage}
            className={`p-1.5 rounded-lg border transition-colors ${
              theme === 'dark'
                ? 'bg-zinc-800/80 border-zinc-700 text-zinc-300 hover:text-white'
                : 'bg-zinc-100 border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200'
            }`}
            title="Previous Image"
          >
            <ChevronLeft className="w-3 h-3" />
          </button>

          <button
            onClick={nextStage}
            className={`p-1.5 rounded-lg border transition-colors ${
              theme === 'dark'
                ? 'bg-zinc-800/80 border-zinc-700 text-zinc-300 hover:text-white'
                : 'bg-zinc-100 border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200'
            }`}
            title="Next Image"
          >
            <ChevronRight className="w-3 h-3" />
          </button>

          <button
            onClick={() => setIsProfileZoomOpen(true)}
            className="p-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-zinc-950 font-semibold transition-colors shadow-xs ml-0.5"
            title="Zoom Profile Image"
          >
            <ZoomIn className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Main Image Frame (White Background, Clean Display of Silhouette Artwork) */}
      <div
        onClick={nextStage}
        className="relative rounded-xl overflow-hidden aspect-4/3 sm:aspect-5/4 bg-white border border-zinc-200/90 flex items-center justify-center cursor-pointer group shadow-inner"
        title="Click to alternate to next sequential image"
      >
        {/* Layer 0: Suited Image */}
        <div
          className={`absolute inset-0 flex items-center justify-center p-3 transition-opacity duration-700 ease-in-out ${
            currentIndex === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          <img
            src={PROFILE_STAGES[0].src}
            alt={PROFILE_STAGES[0].alt}
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-102"
          />
        </div>

        {/* Layer 1: Reading / Desk Work Image */}
        <div
          className={`absolute inset-0 flex items-center justify-center p-3 transition-opacity duration-700 ease-in-out ${
            currentIndex === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          <img
            src={PROFILE_STAGES[1].src}
            alt={PROFILE_STAGES[1].alt}
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-102"
          />
        </div>

        {/* Top-Right Badge: Active Role Tag */}
        <div className="absolute top-3 right-3 z-20">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-zinc-200 text-zinc-900 text-[10px] font-mono font-bold uppercase tracking-wide shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span>{currentStage.roleTag}</span>
          </span>
        </div>

        {/* Bottom Shroud & Caption */}
        <div className="absolute bottom-0 inset-x-0 z-20 p-3 bg-gradient-to-t from-white via-white/90 to-transparent pt-8 flex items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-amber-700 font-mono font-semibold">
              <ActiveIcon className="w-3.5 h-3.5 text-amber-600" />
              <span>{currentStage.title}</span>
            </div>
            <p className="text-[11px] text-zinc-600 line-clamp-1 mt-0.5">
              {currentStage.subtitle}
            </p>
          </div>

          <span className="text-[10px] font-mono text-zinc-500 shrink-0 bg-white/90 px-2 py-0.5 rounded border border-zinc-200">
            {currentIndex + 1} / {PROFILE_STAGES.length}
          </span>
        </div>
      </div>

      {/* Auto-Sequence Progress Bar */}
      {isPlaying && (
        <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-1 rounded-full mt-2.5 overflow-hidden">
          <div
            className="bg-amber-400 h-full transition-[width] duration-75 ease-linear rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}

      {/* Spec Ribbon below image */}
      <div
        className={`pt-2.5 px-1 flex items-center justify-between text-xs font-mono ${
          theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
        }`}
      >
        <span className="flex items-center gap-1.5 truncate">
          <UserCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <strong className="font-semibold text-zinc-800 dark:text-zinc-200">
            {data.profile.name}
          </strong>
        </span>
        <span className="text-zinc-500 text-[11px]">
          {currentIndex === 0 ? 'First: Suited' : 'Then: Reading'}
        </span>
      </div>
    </div>
  );
};
