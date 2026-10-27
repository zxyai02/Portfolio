import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { MapPin, Mail, Award, CheckCircle2, Terminal, Cpu, Layout, Code2, Edit3 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { data, isAdmin, setAdminTab } = usePortfolio();

  return (
    <section id="about" className="py-20 border-b border-zinc-800/60 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-2">
              Identity & Philosophy
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              About Majestic Soul
            </h2>
          </div>

          {isAdmin && (
            <button
              onClick={() => setAdminTab('profile')}
              className="px-3.5 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-xs font-medium text-amber-400 hover:bg-zinc-700 transition-colors flex items-center gap-1.5 self-start md:self-auto"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Bio & Skills in CMS</span>
            </button>
          )}
        </div>

        {/* Narrative Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Creator Identity & Bio */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 leading-snug">
              {data.profile.bioHeadline}
            </h3>

            <div className="space-y-4 text-sm sm:text-base text-zinc-300 leading-relaxed">
              {data.profile.bioParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Core Design Principles */}
            <div className="pt-6 space-y-4 border-t border-zinc-800">
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                Guiding Architectural Principles
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
                  <span className="text-xs font-mono text-amber-400 font-bold block mb-1">01. Cognitive Calm</span>
                  <p className="text-xs text-zinc-400 leading-normal">
                    Complex multi-variable dashboards must never feel chaotic. Clear visual hierarchies let operators act under pressure.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
                  <span className="text-xs font-mono text-emerald-400 font-bold block mb-1">02. Deterministic Speed</span>
                  <p className="text-xs text-zinc-400 leading-normal">
                    Sub-50ms latency is a user right. We optimize state updates, canvas loops, and edge caching for instant feedback.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
                  <span className="text-xs font-mono text-sky-400 font-bold block mb-1">03. Full-Spectrum Craft</span>
                  <p className="text-xs text-zinc-400 leading-normal">
                    Figma design systems connected seamlessly to production React, Canvas, and serverless TypeScript backends.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Profile Card & Skills Matrix */}
          <div className="lg:col-span-5 space-y-6">
            {/* Identity Card */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 shadow-xl backdrop-blur-sm">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-16 h-16 rounded-xl overflow-hidden border border-zinc-700 bg-zinc-950 shrink-0">
                  <img
                    src={data.profile.avatarUrl}
                    alt={data.profile.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white leading-tight">
                    {data.profile.name}
                  </h4>
                  <p className="text-xs text-amber-400 font-mono mt-0.5">
                    @{data.profile.handle}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-400 mt-1">
                    <MapPin className="w-3 h-3 text-zinc-500" />
                    <span>{data.profile.location}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-800 space-y-2 text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>Specialization:</span>
                  <strong className="text-zinc-200 font-normal">UI/UX Systems & High-Density SaaS</strong>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Contact:</span>
                  <a href={`mailto:${data.profile.email}`} className="text-amber-400 hover:underline">
                    {data.profile.email}
                  </a>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Status:</span>
                  <span className="text-emerald-400 font-medium">Available for Select Projects</span>
                </div>
              </div>
            </div>

            {/* Skills & Stack Groups */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 space-y-5">
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                Technical Mastery & Disciplines
              </h4>

              <div className="space-y-4">
                {data.profile.skills.map((skillGroup, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <span className="text-xs font-semibold text-zinc-300 block">
                      {skillGroup.category}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {skillGroup.items.map((item, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded bg-zinc-800/80 border border-zinc-700/60 text-[11px] font-mono text-zinc-300"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
