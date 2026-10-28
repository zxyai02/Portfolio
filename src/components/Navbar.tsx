import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { SmartProfileIcon } from './SmartProfileIcon';
import { Sparkles, Menu, X, Sun, Moon, Lock, ShieldCheck, User } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { data, theme, toggleTheme, isAdmin, lockAdmin, setIsProfileZoomOpen } = usePortfolio();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const elem = document.querySelector(href);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`sticky top-0 z-40 w-full backdrop-blur-md transition-colors border-b ${
      theme === 'dark'
        ? 'bg-zinc-950/85 border-zinc-800/80 text-zinc-100'
        : 'bg-white/90 border-zinc-200/90 text-zinc-900 shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#home"
          onClick={e => {
            e.preventDefault();
            handleNavClick('#home');
          }}
          className={`flex items-center gap-2.5 text-lg font-bold tracking-tight transition-colors whitespace-nowrap shrink-0 group ${
            theme === 'dark' ? 'text-zinc-100 hover:text-white' : 'text-zinc-900 hover:text-amber-600'
          }`}
        >
          <SmartProfileIcon size="sm" interactive={false} />
          <span>{data.profile.name}</span>
        </a>

        {/* Zone 2: Single-Line Nav Links */}
        <nav className={`hidden md:flex items-center gap-8 text-sm font-medium ${
          theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
        }`}>
          <a
            href="#work"
            onClick={e => {
              e.preventDefault();
              handleNavClick('#work');
            }}
            className={`transition-colors whitespace-nowrap shrink-0 ${
              theme === 'dark' ? 'hover:text-zinc-100' : 'hover:text-zinc-900'
            }`}
          >
            Selected Works
          </a>
          <a
            href="#about"
            onClick={e => {
              e.preventDefault();
              handleNavClick('#about');
            }}
            className={`transition-colors whitespace-nowrap shrink-0 ${
              theme === 'dark' ? 'hover:text-zinc-100' : 'hover:text-zinc-900'
            }`}
          >
            About & Stack
          </a>
          <a
            href="#journal"
            onClick={e => {
              e.preventDefault();
              handleNavClick('#journal');
            }}
            className={`transition-colors whitespace-nowrap shrink-0 ${
              theme === 'dark' ? 'hover:text-zinc-100' : 'hover:text-zinc-900'
            }`}
          >
            Journal
          </a>
          <a
            href="#contact"
            onClick={e => {
              e.preventDefault();
              handleNavClick('#contact');
            }}
            className={`transition-colors whitespace-nowrap shrink-0 ${
              theme === 'dark' ? 'hover:text-zinc-100' : 'hover:text-zinc-900'
            }`}
          >
            Contact
          </a>
        </nav>

        {/* Zone 3: Actions (Theme switcher, Profile inspection, Get in touch, and Logout if authenticated) */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          {/* Change Background Icon (Dark to White toggle) */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg border transition-all ${
              theme === 'dark'
                ? 'bg-zinc-900 text-amber-400 border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700'
                : 'bg-zinc-100 text-zinc-800 border-zinc-200 hover:bg-zinc-200 hover:border-zinc-300'
            }`}
            title={theme === 'dark' ? 'Switch to White Background' : 'Switch to Dark Background'}
            aria-label="Toggle dark/white theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Quick Profile Inspection Button */}
          <button
            onClick={() => setIsProfileZoomOpen(true)}
            className={`p-2 rounded-lg border transition-all flex items-center gap-1.5 text-xs ${
              theme === 'dark'
                ? 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:bg-zinc-800 hover:text-white'
                : 'bg-zinc-100 text-zinc-700 border-zinc-200 hover:bg-zinc-200'
            }`}
            title="Inspect Creator Profile"
          >
            <User className="w-4 h-4" />
          </button>

          {/* Only shown if user unlocked admin via /admin with password 00 */}
          {isAdmin && (
            <button
              onClick={lockAdmin}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-400 text-zinc-950 hover:bg-amber-300 transition-all flex items-center gap-1.5 shadow"
              title="Lock Admin Session"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Lock Admin</span>
            </button>
          )}

          <a
            href="#contact"
            onClick={e => {
              e.preventDefault();
              handleNavClick('#contact');
            }}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 shadow-sm ${
              theme === 'dark'
                ? 'bg-zinc-100 text-zinc-950 hover:bg-white hover:shadow-md'
                : 'bg-zinc-900 text-white hover:bg-zinc-800'
            }`}
          >
            Get In Touch
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg border ${
              theme === 'dark'
                ? 'bg-zinc-900 text-amber-400 border-zinc-800'
                : 'bg-zinc-100 text-zinc-800 border-zinc-200'
            }`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-lg border ${
              theme === 'dark'
                ? 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white'
                : 'bg-zinc-100 border-zinc-200 text-zinc-700 hover:text-zinc-900'
            }`}
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={`md:hidden px-4 py-4 flex flex-col gap-3 border-b animate-in fade-in slide-in-from-top-2 ${
          theme === 'dark' ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-200'
        }`}>
          <a
            href="#work"
            onClick={e => {
              e.preventDefault();
              handleNavClick('#work');
            }}
            className={`text-sm font-medium py-2 border-b ${
              theme === 'dark' ? 'text-zinc-300 hover:text-white border-zinc-900' : 'text-zinc-700 hover:text-zinc-900 border-zinc-100'
            }`}
          >
            Selected Works
          </a>
          <a
            href="#about"
            onClick={e => {
              e.preventDefault();
              handleNavClick('#about');
            }}
            className={`text-sm font-medium py-2 border-b ${
              theme === 'dark' ? 'text-zinc-300 hover:text-white border-zinc-900' : 'text-zinc-700 hover:text-zinc-900 border-zinc-100'
            }`}
          >
            About & Stack
          </a>
          <a
            href="#journal"
            onClick={e => {
              e.preventDefault();
              handleNavClick('#journal');
            }}
            className={`text-sm font-medium py-2 border-b ${
              theme === 'dark' ? 'text-zinc-300 hover:text-white border-zinc-900' : 'text-zinc-700 hover:text-zinc-900 border-zinc-100'
            }`}
          >
            Journal
          </a>
          <a
            href="#contact"
            onClick={e => {
              e.preventDefault();
              handleNavClick('#contact');
            }}
            className={`text-sm font-medium py-2 border-b ${
              theme === 'dark' ? 'text-zinc-300 hover:text-white border-zinc-900' : 'text-zinc-700 hover:text-zinc-900 border-zinc-100'
            }`}
          >
            Contact
          </a>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => {
                setIsProfileZoomOpen(true);
                setMobileMenuOpen(false);
              }}
              className={`flex-1 py-2 text-xs font-medium rounded-lg border text-center ${
                theme === 'dark' ? 'bg-zinc-900 border-zinc-800 text-zinc-200' : 'bg-zinc-100 border-zinc-200 text-zinc-800'
              }`}
            >
              Inspect Profile
            </button>
            <a
              href="#contact"
              onClick={e => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
              className="flex-1 py-2 text-xs font-semibold rounded-lg bg-amber-400 text-zinc-950 text-center"
            >
              Get In Touch
            </a>
          </div>

          {isAdmin && (
            <button
              onClick={() => {
                lockAdmin();
                setMobileMenuOpen(false);
              }}
              className="w-full mt-2 py-2 text-xs font-semibold rounded-lg bg-rose-900/60 text-rose-200 border border-rose-700 text-center"
            >
              Lock Admin Session
            </button>
          )}
        </div>
      )}
    </header>
  );
};
