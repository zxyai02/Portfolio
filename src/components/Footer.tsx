import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ArrowUp, Sparkles, MapPin, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { data, theme } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`border-t py-12 backdrop-blur-md transition-colors ${
      theme === 'dark'
        ? 'bg-zinc-950/80 border-zinc-800/80 text-zinc-400'
        : 'bg-[#FAF8F5]/85 border-zinc-200/90 text-zinc-600'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Narrative */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className={`flex items-center gap-2 font-bold text-sm ${
            theme === 'dark' ? 'text-zinc-200' : 'text-zinc-900'
          }`}>
            <div className="w-6 h-6 rounded bg-zinc-900 border border-zinc-700 flex items-center justify-center text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span>{data.profile.name}</span>
          </div>
          <span className="hidden sm:inline text-zinc-400" aria-hidden="true">|</span>
          <p className="text-xs text-zinc-500 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
            <span>Senior UI/UX Designer & Systems Engineer · {data.profile.location}</span>
          </p>
        </div>

        {/* Links & Quick Actions */}
        <div className="flex items-center gap-6 text-xs">
          <a
            href={data.profile.socialLinks.find(s => s.platform === 'Behance')?.url || 'https://behance.net/majesticsoul1'}
            target="_blank"
            rel="noreferrer"
            className={`transition-colors ${
              theme === 'dark' ? 'hover:text-zinc-200' : 'hover:text-zinc-900'
            }`}
          >
            Behance
          </a>
          <a
            href={`mailto:${data.profile.email}`}
            className={`transition-colors ${
              theme === 'dark' ? 'hover:text-zinc-200' : 'hover:text-zinc-900'
            }`}
          >
            Direct Inquiries
          </a>
          <button
            onClick={scrollToTop}
            className={`p-2 rounded-lg border transition-colors ${
              theme === 'dark'
                ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                : 'bg-white border-zinc-300 text-zinc-600 hover:text-zinc-900 hover:border-zinc-400 shadow-sm'
            }`}
            title="Scroll to Top"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
