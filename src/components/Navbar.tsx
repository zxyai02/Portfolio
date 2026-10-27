import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Settings, Sparkles, Menu, X, Mail } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { data, isAdmin, setIsAdmin, setAdminTab } = usePortfolio();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadMessagesCount = data.messages.filter(m => !m.isRead).length;

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const elem = document.querySelector(href);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAdminToggle = () => {
    setIsAdmin(!isAdmin);
    if (!isAdmin) {
      setAdminTab('projects');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-zinc-950/85 backdrop-blur-md border-b border-zinc-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#home"
          onClick={e => {
            e.preventDefault();
            handleNavClick('#home');
          }}
          className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-zinc-100 hover:text-white transition-colors whitespace-nowrap shrink-0 group"
        >
          <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-700/80 flex items-center justify-center text-amber-400 group-hover:border-amber-400/60 transition-colors shadow-inner">
            <Sparkles className="w-4 h-4" />
          </div>
          <span>{data.profile.name}</span>
        </a>

        {/* Zone 2: 4-5 Single-Line Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <a
            href="#work"
            onClick={e => {
              e.preventDefault();
              handleNavClick('#work');
            }}
            className="hover:text-zinc-100 transition-colors whitespace-nowrap shrink-0"
          >
            Selected Works
          </a>
          <a
            href="#about"
            onClick={e => {
              e.preventDefault();
              handleNavClick('#about');
            }}
            className="hover:text-zinc-100 transition-colors whitespace-nowrap shrink-0"
          >
            About & Stack
          </a>
          <a
            href="#journal"
            onClick={e => {
              e.preventDefault();
              handleNavClick('#journal');
            }}
            className="hover:text-zinc-100 transition-colors whitespace-nowrap shrink-0"
          >
            Journal
          </a>
          <a
            href="#contact"
            onClick={e => {
              e.preventDefault();
              handleNavClick('#contact');
            }}
            className="hover:text-zinc-100 transition-colors whitespace-nowrap shrink-0"
          >
            Contact
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action Area */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <button
            onClick={handleAdminToggle}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg border transition-all flex items-center gap-2 whitespace-nowrap shrink-0 ${
              isAdmin
                ? 'bg-amber-400 text-zinc-950 border-amber-400 shadow-sm shadow-amber-400/20 font-semibold'
                : 'bg-zinc-900 text-zinc-300 border-zinc-700/80 hover:bg-zinc-800 hover:text-zinc-100 hover:border-zinc-600'
            }`}
            title="Toggle Admin CMS"
          >
            <Settings className={`w-3.5 h-3.5 ${isAdmin ? 'animate-spin-slow' : ''}`} />
            <span>{isAdmin ? 'Admin Mode (Active)' : 'Admin CMS'}</span>
            {unreadMessagesCount > 0 && !isAdmin && (
              <span className="w-2 h-2 rounded-full bg-amber-400" />
            )}
          </button>

          <a
            href="#contact"
            onClick={e => {
              e.preventDefault();
              handleNavClick('#contact');
            }}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-zinc-100 text-zinc-950 hover:bg-white hover:shadow-md transition-all whitespace-nowrap shrink-0"
          >
            Get In Touch
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={handleAdminToggle}
            className={`p-2 rounded-lg border text-xs ${
              isAdmin
                ? 'bg-amber-400 text-zinc-950 border-amber-400 font-semibold'
                : 'bg-zinc-900 text-zinc-300 border-zinc-800'
            }`}
            title="Admin CMS"
          >
            <Settings className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-zinc-950 px-4 py-4 flex flex-col gap-3 animate-in fade-in slide-in-from-top-2">
          <a
            href="#work"
            onClick={e => {
              e.preventDefault();
              handleNavClick('#work');
            }}
            className="text-sm font-medium text-zinc-300 hover:text-white py-2 border-b border-zinc-900"
          >
            Selected Works
          </a>
          <a
            href="#about"
            onClick={e => {
              e.preventDefault();
              handleNavClick('#about');
            }}
            className="text-sm font-medium text-zinc-300 hover:text-white py-2 border-b border-zinc-900"
          >
            About & Stack
          </a>
          <a
            href="#journal"
            onClick={e => {
              e.preventDefault();
              handleNavClick('#journal');
            }}
            className="text-sm font-medium text-zinc-300 hover:text-white py-2 border-b border-zinc-900"
          >
            Journal
          </a>
          <a
            href="#contact"
            onClick={e => {
              e.preventDefault();
              handleNavClick('#contact');
            }}
            className="text-sm font-medium text-zinc-300 hover:text-white py-2 border-b border-zinc-900"
          >
            Contact
          </a>
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => {
                handleAdminToggle();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 text-xs font-medium rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-200 text-center"
            >
              {isAdmin ? 'Exit Admin Mode' : 'Open Admin CMS'}
            </button>
            <a
              href="#contact"
              onClick={e => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
              className="flex-1 py-2 text-xs font-semibold rounded-lg bg-zinc-100 text-zinc-950 text-center"
            >
              Get In Touch
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
