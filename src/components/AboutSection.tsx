import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { SmartProfileIcon } from './SmartProfileIcon';
import {
  MapPin,
  Mail,
  Award,
  CheckCircle2,
  Terminal,
  Cpu,
  Layout,
  Code2,
  Edit3,
  ZoomIn,
  Sparkles,
  ShieldCheck,
  UserCheck,
  Compass,
  Briefcase
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { data, isAdmin, setAdminTab, setIsProfileZoomOpen, theme } = usePortfolio();

  return (
    <section
      id="about"
      className={`py-20 border-b transition-colors scroll-mt-12 ${
        theme === 'dark'
          ? 'bg-zinc-950 border-zinc-800/60 text-zinc-100'
          : 'bg-white border-zinc-200/80 text-zinc-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-amber-500 mb-2 flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-amber-500" />
              <span>Identity & Architectural Philosophy</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Creator Identity & Bio */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className={`text-xl sm:text-2xl font-bold leading-snug ${
              theme === 'dark' ? 'text-zinc-100' : 'text-zinc-900'
            }`}>
              {data.profile.bioHeadline}
            </h3>

            <div className={`space-y-4 text-sm sm:text-base leading-relaxed ${
              theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'
            }`}>
              {data.profile.bioParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Core Design Principles */}
            <div className={`pt-6 space-y-4 border-t ${
              theme === 'dark' ? 'border-zinc-800' : 'border-zinc-200'
            }`}>
              <h4 className={`text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 ${
                theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'
              }`}>
                <Compass className="w-3.5 h-3.5 text-amber-500" />
                <span>Guiding Architectural Principles</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className={`p-4 rounded-xl border ${
                  theme === 'dark'
                    ? 'bg-zinc-900/50 border-zinc-800'
                    : 'bg-zinc-50 border-zinc-200 shadow-sm'
                }`}>
                  <span className="text-xs font-mono text-amber-500 font-bold block mb-1">
                    01. Cognitive Calm
                  </span>
                  <p className={`text-xs leading-normal ${
                    theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
                  }`}>
                    Complex multi-variable dashboards must never feel chaotic. Clear visual hierarchies let operators act under pressure.
                  </p>
                </div>

                <div className={`p-4 rounded-xl border ${
                  theme === 'dark'
                    ? 'bg-zinc-900/50 border-zinc-800'
                    : 'bg-zinc-50 border-zinc-200 shadow-sm'
                }`}>
                  <span className="text-xs font-mono text-emerald-500 font-bold block mb-1">
                    02. Deterministic Speed
                  </span>
                  <p className={`text-xs leading-normal ${
                    theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
                  }`}>
                    Sub-50ms latency is a user right. We optimize state updates, canvas loops, and edge caching for instant feedback.
                  </p>
                </div>

                <div className={`p-4 rounded-xl border ${
                  theme === 'dark'
                    ? 'bg-zinc-900/50 border-zinc-800'
                    : 'bg-zinc-50 border-zinc-200 shadow-sm'
                }`}>
                  <span className="text-xs font-mono text-sky-500 font-bold block mb-1">
                    03. Full-Spectrum Craft
                  </span>
                  <p className={`text-xs leading-normal ${
                    theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
                  }`}>
                    Figma design systems connected seamlessly to production React, Canvas, and serverless TypeScript backends.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Dedicated Profile Image Section with Zoom Option */}
          <div className="lg:col-span-5 space-y-6">
            {/* Dedicated Profile Image & Zoom Card */}
            <div className={`rounded-2xl border p-6 shadow-xl backdrop-blur-sm transition-all ${
              theme === 'dark'
                ? 'bg-zinc-900/60 border-zinc-800'
                : 'bg-white border-zinc-200 shadow-md'
            }`}>
              <div className="text-xs font-mono uppercase tracking-wider text-amber-500 mb-3 flex items-center justify-between">
                <span>Verified Creator Monograph</span>
                <span className="text-[11px] font-mono text-emerald-500 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Profile</span>
                </span>
              </div>

              {/* Profile Image Viewport with Smart Icon & Hover Zoom Prompt */}
              <div
                onClick={() => setIsProfileZoomOpen(true)}
                className="relative rounded-xl overflow-hidden bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-700/80 aspect-4/3 cursor-pointer group shadow-inner mb-4 flex items-center justify-center p-6"
              >
                <SmartProfileIcon size="hero" />

                {/* Scrim with zoom prompt */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent flex items-end justify-between p-4 opacity-90 group-hover:opacity-100 transition-opacity">
                  <div>
                    <h4 className="text-base font-bold text-white leading-none">
                      {data.profile.name}
                    </h4>
                    <p className="text-xs text-amber-400 font-mono mt-1">
                      {data.profile.role}
                    </p>
                  </div>

                  <span className="px-3 py-1.5 rounded-lg bg-amber-400 text-zinc-950 text-xs font-bold flex items-center gap-1.5 shadow-lg group-hover:bg-amber-300 transition-colors">
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>Zoom Smart Icon</span>
                  </span>
                </div>
              </div>

              {/* Profile Coordinates Details */}
              <div className={`space-y-2.5 text-xs pt-1 ${
                theme === 'dark' ? 'text-zinc-300' : 'text-zinc-600'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-zinc-400">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    <span>Location:</span>
                  </span>
                  <strong className={theme === 'dark' ? 'text-zinc-100 font-semibold' : 'text-zinc-900 font-semibold'}>
                    {data.profile.location}
                  </strong>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-zinc-400">
                    <Mail className="w-3.5 h-3.5 text-amber-500" />
                    <span>Email:</span>
                  </span>
                  <a href={`mailto:${data.profile.email}`} className="text-amber-500 hover:underline font-mono">
                    {data.profile.email}
                  </a>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-zinc-400">
                    <Briefcase className="w-3.5 h-3.5 text-cyan-500" />
                    <span>Role:</span>
                  </span>
                  <span className={theme === 'dark' ? 'text-zinc-200' : 'text-zinc-800'}>
                    {data.profile.role}
                  </span>
                </div>
              </div>

              {/* Explicit Zoom Button */}
              <button
                onClick={() => setIsProfileZoomOpen(true)}
                className={`w-full mt-4 py-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                  theme === 'dark'
                    ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-zinc-700'
                    : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border-zinc-300 shadow-sm'
                }`}
              >
                <ZoomIn className="w-4 h-4 text-amber-500" />
                <span>Open Full Profile Lightbox & Monograph</span>
              </button>
            </div>

            {/* Skills & Stack Groups */}
            <div className={`rounded-2xl border p-6 space-y-5 ${
              theme === 'dark' ? 'bg-zinc-900/40 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
            }`}>
              <h4 className={`text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 ${
                theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'
              }`}>
                <Terminal className="w-3.5 h-3.5 text-emerald-500" />
                <span>Technical Mastery & Disciplines</span>
              </h4>

              <div className="space-y-4">
                {data.profile.skills.map((skillGroup, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <span className={`text-xs font-semibold block ${
                      theme === 'dark' ? 'text-zinc-300' : 'text-zinc-800'
                    }`}>
                      {skillGroup.category}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {skillGroup.items.map((item, i) => (
                        <span
                          key={i}
                          className={`px-2.5 py-1 rounded text-[11px] font-mono border ${
                            theme === 'dark'
                              ? 'bg-zinc-800/80 border-zinc-700/60 text-zinc-300'
                              : 'bg-zinc-100 border-zinc-200 text-zinc-700'
                          }`}
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
