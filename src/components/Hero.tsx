import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ArrowUpRight, ShieldCheck, Layers, Terminal, Sparkles, ExternalLink } from 'lucide-react';

export const Hero: React.FC = () => {
  const { data, setSelectedProject } = usePortfolio();
  const featuredProject = data.projects.find(p => p.featured) || data.projects[0];

  return (
    <section id="home" className="pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-zinc-800/60 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split-Screen Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Typographic Narrative */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Unboxed Kicker Metadata */}
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400/90 mb-5">
              <span>{data.profile.role}</span>
              <span aria-hidden="true">·</span>
              <span>{data.profile.location}</span>
              <span aria-hidden="true">·</span>
              <span className="text-zinc-400">{data.profile.timezone}</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] mb-6 [text-wrap:balance]">
              {data.profile.tagline}
            </h1>

            {/* Lead Narrative */}
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-2xl mb-8">
              {data.profile.bioParagraphs[0]}
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#work"
                className="px-6 py-3 rounded-lg bg-amber-400 text-zinc-950 font-semibold text-sm hover:bg-amber-300 hover:shadow-lg hover:shadow-amber-400/20 transition-all flex items-center gap-2"
              >
                <span>View Portfolio Gallery</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href="#about"
                className="px-6 py-3 rounded-lg bg-zinc-900 border border-zinc-700/80 text-zinc-200 font-medium text-sm hover:bg-zinc-800 hover:text-white hover:border-zinc-600 transition-all"
              >
                Engineering & Design Approach
              </a>
            </div>

            {/* Status indicator */}
            <div className="mt-8 flex items-center gap-2.5 text-xs text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>{data.profile.availability}</span>
            </div>
          </div>

          {/* Right Column: Featured Flagship Artifact Frame */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl border border-zinc-800 bg-zinc-900/60 p-2 shadow-2xl backdrop-blur-sm group transition-all duration-300 hover:border-zinc-700">
              {/* Card visual frame */}
              <div className="relative rounded-xl overflow-hidden aspect-4/3 bg-zinc-950 border border-zinc-800/80">
                <img
                  src={featuredProject.image}
                  alt={featuredProject.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-102"
                />
                
                {/* Clean scrim for contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent pointer-events-none" />

                {/* Overlaid details */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
                  <div>
                    <div className="text-xs text-amber-400 font-mono mb-1">
                      Featured Case Study · {featuredProject.category}
                    </div>
                    <h3 className="text-base font-bold text-white leading-tight">
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

              {/* Quick Spec Ribbon below image */}
              <div className="pt-3 px-2 pb-1 flex items-center justify-between text-xs text-zinc-400">
                <span className="truncate max-w-[200px]">{featuredProject.client}</span>
                <span className="font-mono text-zinc-500">{featuredProject.year}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width Quantitative KPI Strip Below Hero Split */}
        <div className="mt-16 pt-10 border-t border-zinc-800/60 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {data.profile.stats.map((stat, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-3xl sm:text-4xl font-extrabold font-mono tabular-nums text-white tracking-tight">
                {stat.value}
              </span>
              <span className="text-sm font-semibold text-zinc-200 mt-1">
                {stat.label}
              </span>
              {stat.subtext && (
                <span className="text-xs text-zinc-400 mt-0.5">
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
