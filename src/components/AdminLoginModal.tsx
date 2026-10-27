import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Lock, ShieldCheck, KeyRound, X, Eye, EyeOff, AlertCircle, Sparkles } from 'lucide-react';

export const AdminLoginModal: React.FC = () => {
  const { adminLoginModalOpen, setAdminLoginModalOpen, unlockAdminWithPassword } = usePortfolio();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  if (!adminLoginModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = unlockAdminWithPassword(password);
    if (!success) {
      setError(true);
      setTimeout(() => setError(false), 2500);
    } else {
      setPassword('');
      setError(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/85 backdrop-blur-md animate-in fade-in duration-200">
      {/* Click outside backdrop */}
      <div
        className="fixed inset-0"
        onClick={() => setAdminLoginModalOpen(false)}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md my-auto bg-zinc-900 border border-zinc-700/80 rounded-2xl shadow-2xl overflow-hidden z-10 p-6 sm:p-8 animate-in zoom-in-95 duration-200">
        <button
          onClick={() => setAdminLoginModalOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 mb-4 shadow-inner">
            <Lock className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Admin Studio Security Gate
          </h3>
          <div className="px-3 py-1 rounded bg-zinc-950 border border-zinc-800 text-[11px] font-mono text-amber-400 mt-2 select-all break-all">
            https://portfolio.serviceforeuphoria.workers.dev/admin
          </div>
          <p className="text-xs text-zinc-300 mt-2">
            Protected management console. Enter password to unlock CMS controls.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500">
              <KeyRound className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              autoFocus
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter passcode (e.g. 00)"
              className={`w-full bg-zinc-950 border ${
                error ? 'border-rose-500 ring-2 ring-rose-500/20' : 'border-zinc-700 focus:border-amber-400'
              } rounded-xl pl-10 pr-10 py-3 text-sm text-white placeholder-zinc-500 font-mono tracking-widest text-center focus:outline-none transition-all`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {error && (
            <div className="flex items-center justify-center gap-1.5 text-xs text-rose-400 font-medium animate-bounce">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Access Denied. Passcode is &quot;00&quot;.</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-amber-400/20 flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Unlock Admin Panel</span>
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-zinc-800 text-center flex items-center justify-center gap-2 text-[11px] text-zinc-500 font-mono">
          <Sparkles className="w-3.5 h-3.5 text-amber-500/70" />
          <span>Security Passcode: &quot;00&quot;</span>
        </div>
      </div>
    </div>
  );
};
