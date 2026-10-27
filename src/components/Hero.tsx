import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  ArrowUpRight,
  ShieldCheck,
  Layers,
  Terminal,
  Sparkles,
  ExternalLink,
  MapPin,
  Clock,
  Compass,
  User,
  ZoomIn,
  Briefcase,
  TrendingUp,
  Activity,
  Award
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { data, setSelectedProject, setIsProfileZoomOpen, theme } = usePortfolio();
  const featuredProject = data.projects.find(p => p.featured) || data.projects[0];

  return (
    <section
      id="home"
      className={`relative pt-12 pb-16 lg:pt-20 lg:pb-24 border-b transition-colors overflow-hidden ${
        theme === 'dark'
          ? 'bg-zinc-950 border-zinc-800/60 text-zinc-100'
          : 'bg-gradient-to-b from-white via-zinc-50 to-zinc-100 border-zinc-200/80 text-zinc-900'
      }`}
    >
      {/* Dynamic Animated Gradient Meshes / Auroras */}
      <div className="absolute top-0 right-1/4 w-[420px] h-[420px] bg-gradient-to-tr from-amber-500/15 via-rose-500/10 to-indigo-500/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute -bottom-10 left-10 w-[380px] h-[380px] bg-gradient-to-br from-cyan-500/15 via-sky-500/10 to-emerald-500/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Split-Screen Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Typographic Narrative & Creator Badge */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Interactive Profile & Location Kicker Bar */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono mb-5">
              <button
                onClick={() => setIsProfileZoomOpen(true)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full border transition-all ${
                  theme === 'dark'
                    ? 'bg-zinc-900/90 border-amber-500/40 text-amber-400 hover:border-amber-400 hover:bg-zinc-800'
                    : 'bg-amber-50 border-amber-300 text-amber-700 hover:bg-amber-100'
                }`}
                title="Click to zoom profile image"
              >
                <div className="w-4 h-4 rounded-full overflow-hidden border border-amber-400/60 shrink-0">
                  <img
                    src={data.profile.avatarUrl}
                    alt={data.profile.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-semibold">{data.profile.name}</span>
                <ZoomIn className="w-3 h-3 ml-0.5 opacity-70" />
              </button>

              <span className="text-zinc-400 hidden sm:inline" aria-hidden="true">·</span>

              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${
                theme === 'dark'
                  ? 'bg-zinc-900/60 border-zinc-800 text-zinc-300'
                  : 'bg-white border-zinc-200 text-zinc-700'
              }`}>
                <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span>{data.profile.location}</span>
              </div>

              <span className="text-zinc-400 hidden sm:inline" aria-hidden="true">·</span>

              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${
                theme === 'dark'
                  ? 'bg-zinc-900/60 border-zinc-800 text-zinc-400'
                  : 'bg-white border-zinc-200 text-zinc-600'
              }`}>
                <Clock className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>{data.profile.timezone}</span>
              </div>
            </div>

            {/* Display Headline with Animated Gradient Highlight */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] mb-6 [text-wrap:balance]">
              <span>Architecting high-density </span>
              <span className="bg-gradient-to-r from-amber-400 via-rose-400 to-indigo-400 bg-clip-text text-transparent font-black animate-aurora">
                operational software
              </span>
              <span>, scientific telemetry, and immersive systems.</span>
            </h1>

            {/* Lead Narrative */}
            <p className={`text-base sm:text-lg leading-relaxed max-w-2xl mb-8 ${
              theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700 font-normal'
            }`}>
              {data.profile.bioParagraphs[0]}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <a
                href="#work"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-amber-400 text-zinc-950 font-bold text-sm hover:bg-amber-300 hover:shadow-lg hover:shadow-amber-400/20 transition-all flex items-center justify-center gap-2"
              >
                <Briefcase className="w-4 h-4" />
                <span>Explore Selected Works</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => setIsProfileZoomOpen(true)}
                className={`w-full sm:w-auto px-5 py-3.5 rounded-xl border text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                  theme === 'dark'
                    ? 'bg-zinc-900 border-zinc-700/80 text-zinc-200 hover:bg-zinc-800 hover:text-white'
                    : 'bg-white border-zinc-300 text-zinc-800 hover:bg-zinc-100 shadow-sm'
                }`}
              >
                <User className="w-4 h-4 text-amber-500" />
                <span>View Creator Profile</span>
                <ZoomIn className="w-3.5 h-3.5 opacity-60" />
              </button>
            </div>

            {/* Availability Indicator */}
            <div className="mt-8 flex items-center gap-2.5 text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className={theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}>
                {data.profile.availability}
              </span>
            </div>
          </div>

          {/* Right Column: Featured Flagship Artifact Frame */}
          <div className="lg:col-span-5">
            <div className={`relative rounded-2xl border p-2.5 shadow-2xl backdrop-blur-md group transition-all duration-300 hover:border-amber-400/50 ${
              theme === 'dark'
                ? 'bg-zinc-900/60 border-zinc-800'
                : 'bg-white border-zinc-200 shadow-xl'
            }`}>
              {/* Card visual frame */}
              <div className="relative rounded-xl overflow-hidden aspect-4/3 bg-zinc-950 border border-zinc-800/80">
                <img
                  src={featuredProject.image}
                  alt={featuredProject.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-103"
                />

                {/* Scrim for high-contrast legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/95 via-zinc-950/30 to-transparent pointer-events-none" />

                {/* Overlaid details */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
                  <div>
                    <div className="text-xs text-amber-400 font-mono mb-1 flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-amber-400" />
                      <span>Featured System · {featuredProject.category}</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                      {featuredProject.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => setSelectedProject(featuredProject)}
                    className="p-2.5 rounded-lg bg-zinc-900/90 border border-zinc-700 text-zinc-200 hover:text-white hover:border-amber-400 transition-all shrink-0 shadow-lg"
                    title="Inspect Case Study"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Spec Ribbon below image */}
              <div className={`pt-3 px-2 pb-1 flex items-center justify-between text-xs ${
                theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
              }`}>
                <span className="truncate max-w-[200px] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{featuredProject.client}</span>
                </span>
                <span className="font-mono text-zinc-500">{featuredProject.year}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width Quantitative KPI Strip with Modern Icons */}
        <div className={`mt-14 pt-8 border-t grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 ${
          theme === 'dark' ? 'border-zinc-800/60' : 'border-zinc-200'
        }`}>
          {data.profile.stats.map((stat, i) => (
            <div
              key={i}
              className={`flex flex-col p-4 rounded-xl border transition-all ${
                theme === 'dark'
                  ? 'bg-zinc-900/30 border-zinc-800/80 hover:border-zinc-700'
                  : 'bg-white border-zinc-200/90 hover:border-zinc-300 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-amber-500 tracking-tight">
                  {stat.value}
                </span>
                {i === 0 && <Award className="w-4 h-4 text-amber-400 opacity-80" />}
                {i === 1 && <Layers className="w-4 h-4 text-cyan-400 opacity-80" />}
                {i === 2 && <TrendingUp className="w-4 h-4 text-emerald-400 opacity-80" />}
                {i === 3 && <ShieldCheck className="w-4 h-4 text-violet-400 opacity-80" />}
              </div>
              <span className={`text-xs sm:text-sm font-semibold mt-0.5 ${
                theme === 'dark' ? 'text-zinc-200' : 'text-zinc-800'
              }`}>
                {stat.label}
              </span>
              {stat.subtext && (
                <span className={`text-[11px] mt-0.5 ${
                  theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'
                }`}>
                  {stat.subtext}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
