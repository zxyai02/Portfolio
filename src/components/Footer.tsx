import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ArrowUp, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const { data, setIsAdmin, isAdmin, setAdminTab } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 text-zinc-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Narrative */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2 text-zinc-200 font-bold text-sm">
            <div className="w-6 h-6 rounded bg-zinc-900 border border-zinc-700 flex items-center justify-center text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span>{data.profile.name}</span>
          </div>
          <span className="hidden sm:inline text-zinc-700" aria-hidden="true">|</span>
          <p className="text-xs text-zinc-500">
            Senior UI/UX Designer & Systems Engineer · {data.profile.location}
          </p>
        </div>

        {/* Links & Quick Actions */}
        <div className="flex items-center gap-6 text-xs">
          <button
            onClick={() => {
              setIsAdmin(!isAdmin);
              if (!isAdmin) setAdminTab('projects');
              scrollToTop();
            }}
            className="hover:text-amber-400 transition-colors"
          >
            {isAdmin ? 'Exit Studio CMS' : 'Admin CMS Portal'}
          </button>
          <a
            href={data.profile.socialLinks.find(s => s.platform === 'Behance')?.url || 'https://behance.net/majesticsoul1'}
            target="_blank"
            rel="noreferrer"
            className="hover:text-zinc-200 transition-colors"
          >
            Behance
          </a>
          <a
            href={`mailto:${data.profile.email}`}
            className="hover:text-zinc-200 transition-colors"
          >
            Email
          </a>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition-colors"
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
