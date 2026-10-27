import React, { useState, useMemo } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Project } from '../types/portfolio';
import { Search, ExternalLink, ArrowRight, Edit3, Plus, Sparkles, Filter, Lock, ShieldCheck } from 'lucide-react';

const CATEGORIES = [
  'All',
  'UI/UX Systems',
  'Enterprise SaaS',
  'Interactive & Games',
  'Digital Art & Graphics',
  'Workflow Automation'
] as const;

export const Gallery: React.FC = () => {
  const {
    data,
    setSelectedProject,
    isAdmin,
    setEditingProject,
    setIsCreatingProject,
    setAdminLoginModalOpen,
    triggerAdminCheck,
    theme
  } = usePortfolio();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const isAdminQuery = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return (
      q === 'https://portfolio.serviceforeuphoria.workers.dev/admin' ||
      q === 'portfolio.serviceforeuphoria.workers.dev/admin' ||
      q.includes('serviceforeuphoria.workers.dev/admin') ||
      q === '/admin' ||
      q === 'admin'
    );
  }, [searchQuery]);

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    const trimmed = val.trim().toLowerCase();
    if (
      trimmed === 'https://portfolio.serviceforeuphoria.workers.dev/admin' ||
      trimmed === 'portfolio.serviceforeuphoria.workers.dev/admin' ||
      trimmed === '/admin'
    ) {
      setAdminLoginModalOpen(true);
    }
  };

  const filteredProjects = useMemo(() => {
    return data.projects
      .filter(p => p.isPublished || isAdmin)
      .filter(p => {
        if (selectedCategory !== 'All' && p.category !== selectedCategory) {
          return false;
        }
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = p.title.toLowerCase().includes(q);
          const matchSubtitle = p.subtitle.toLowerCase().includes(q);
          const matchClient = p.client.toLowerCase().includes(q);
          const matchTags = p.tags.some(t => t.toLowerCase().includes(q));
          return matchTitle || matchSubtitle || matchClient || matchTags;
        }
        return true;
      });
  }, [data.projects, selectedCategory, searchQuery, isAdmin]);

  return (
    <section
      id="work"
      className={`py-20 border-b transition-colors scroll-mt-12 ${
        theme === 'dark'
          ? 'bg-zinc-950 border-zinc-800/60 text-zinc-100'
          : 'bg-zinc-50 border-zinc-200/80 text-zinc-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-amber-500 mb-2">
              Curated Portfolio · {data.projects.length} Case Studies
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Selected Works & Systems
            </h2>
            <p className={`text-sm sm:text-base mt-2 max-w-2xl ${
              theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
            }`}>
              High-consequence user interfaces, real-time telemetry platforms, and digital products engineered for operational clarity.
            </p>
          </div>

          {isAdmin && (
            <button
              onClick={() => {
                setIsCreatingProject(true);
                setEditingProject(null);
              }}
              className="px-4 py-2.5 rounded-lg bg-amber-400 text-zinc-950 text-xs font-bold hover:bg-amber-300 transition-all flex items-center gap-2 self-start md:self-auto shrink-0 shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Project</span>
            </button>
          )}
        </div>

        {/* Filter Controls Bar (Interactive Segmented Buttons) */}
        <div className={`flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8 pb-6 border-b ${
          theme === 'dark' ? 'border-zinc-800/60' : 'border-zinc-200'
        }`}>
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors ${
                  selectedCategory === category
                    ? theme === 'dark'
                      ? 'bg-zinc-100 text-zinc-950 font-semibold shadow-sm'
                      : 'bg-zinc-900 text-white font-semibold shadow-sm'
                    : theme === 'dark'
                    ? 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 border border-zinc-800'
                    : 'bg-white text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 border border-zinc-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Box with Admin Search Trigger */}
          <div className="relative min-w-[260px] max-w-md w-full">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => handleSearchChange(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  triggerAdminCheck(searchQuery);
                }
              }}
              placeholder="Search or enter https://portfolio.serviceforeuphoria.workers.dev/admin..."
              className={`w-full rounded-lg pl-9 pr-8 py-2 text-xs transition-colors focus:outline-none ${
                theme === 'dark'
                  ? 'bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-500 focus:border-amber-400'
                  : 'bg-white border border-zinc-300 text-zinc-900 placeholder-zinc-400 focus:border-amber-500 shadow-sm'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Special Admin Endpoint Detection Banner when searching for admin URL */}
        {isAdminQuery && (
          <div
            onClick={() => setAdminLoginModalOpen(true)}
            className="mb-8 p-4 rounded-xl border border-amber-500/60 bg-amber-500/10 hover:bg-amber-500/15 transition-all cursor-pointer flex items-center justify-between gap-4 animate-in fade-in"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-400 text-zinc-950 flex items-center justify-center font-bold shrink-0">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-amber-500 uppercase tracking-wider">
                  Administrative Access Detected
                </div>
                <div className="text-sm font-semibold text-zinc-100 dark:text-zinc-100 font-mono">
                  https://portfolio.serviceforeuphoria.workers.dev/admin
                </div>
              </div>
            </div>
            <button
              onClick={() => setAdminLoginModalOpen(true)}
              className="px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-colors shrink-0 flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Enter Passcode (00)</span>
            </button>
          </div>
        )}

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className={`py-20 text-center rounded-2xl border border-dashed p-8 ${
            theme === 'dark' ? 'border-zinc-800 bg-zinc-900/30 text-zinc-400' : 'border-zinc-300 bg-white text-zinc-600'
          }`}>
            <p className="text-sm">No matching projects found for the current query.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-medium text-amber-500 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map(project => (
              <div
                key={project.id}
                className={`group flex flex-col rounded-xl border transition-all duration-300 hover:shadow-xl overflow-hidden ${
                  theme === 'dark'
                    ? 'border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900/80 hover:border-zinc-700'
                    : 'border-zinc-200/90 bg-white hover:border-zinc-300 shadow-sm'
                }`}
              >
                {/* Media Image Frame */}
                <div
                  onClick={() => setSelectedProject(project)}
                  className="relative aspect-16/10 bg-zinc-950 overflow-hidden cursor-pointer border-b border-zinc-800/60"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-103"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-xs font-semibold text-white flex items-center gap-1.5 bg-zinc-900/90 backdrop-blur-md px-3 py-1.5 rounded-md border border-zinc-700">
                      <span>View Full Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  {!project.isPublished && (
                    <div className="absolute top-3 left-3 px-2 py-1 bg-rose-500/90 text-white font-mono text-[10px] uppercase rounded">
                      Draft Mode
                    </div>
                  )}

                  {project.featured && (
                    <div className="absolute top-3 right-3 px-2 py-1 bg-amber-400 text-zinc-950 font-mono text-[10px] font-bold uppercase rounded shadow">
                      Featured
                    </div>
                  )}
                </div>

                {/* Content Area */}
                <div className="p-5 flex-1 flex flex-col">
                  {/* Unboxed Metadata */}
                  <div className={`flex items-center gap-2 text-xs mb-2 font-mono ${
                    theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'
                  }`}>
                    <span className="text-amber-500 font-semibold">{project.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.year}</span>
                    <span aria-hidden="true">·</span>
                    <span className="truncate max-w-[120px]">{project.client}</span>
                  </div>

                  {/* Title */}
                  <h3
                    onClick={() => setSelectedProject(project)}
                    className={`text-base font-bold transition-colors cursor-pointer leading-snug mb-2 ${
                      theme === 'dark'
                        ? 'text-white group-hover:text-amber-300'
                        : 'text-zinc-900 group-hover:text-amber-600'
                    }`}
                  >
                    {project.title}
                  </h3>

                  {/* Subtitle / Teaser */}
                  <p className={`text-xs leading-relaxed line-clamp-2 mb-4 ${
                    theme === 'dark' ? 'text-zinc-300' : 'text-zinc-600'
                  }`}>
                    {project.subtitle}
                  </p>

                  {/* Key Metrics Strip if available */}
                  {project.metrics && project.metrics.length > 0 && (
                    <div className={`grid grid-cols-2 gap-2 py-2 px-3 mb-4 rounded-lg border ${
                      theme === 'dark'
                        ? 'bg-zinc-950/60 border-zinc-800/80'
                        : 'bg-zinc-50 border-zinc-200'
                    }`}>
                      {project.metrics.slice(0, 2).map((m, i) => (
                        <div key={i} className="flex flex-col">
                          <span className="text-[11px] font-mono text-zinc-400 truncate">{m.label}</span>
                          <span className={`text-xs font-mono font-bold ${
                            theme === 'dark' ? 'text-zinc-100' : 'text-zinc-900'
                          }`}>{m.value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tags */}
                  <div className={`flex flex-wrap items-center gap-1.5 mt-auto pt-3 border-t ${
                    theme === 'dark' ? 'border-zinc-800/60' : 'border-zinc-100'
                  }`}>
                    {project.tags.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className={`text-[11px] font-mono ${
                          theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'
                        }`}
                      >
                        #{tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-[11px] text-zinc-400 font-mono">
                        +{project.tags.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Admin Toolbar if unlocked with 00 */}
                  {isAdmin && (
                    <div className="mt-4 pt-3 border-t border-dashed border-amber-500/40 flex items-center justify-between text-xs">
                      <span className="text-amber-500 font-mono text-[11px]">Admin Control</span>
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          setEditingProject(project);
                          setIsCreatingProject(false);
                        }}
                        className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-amber-400 hover:text-zinc-950 text-zinc-200 border border-zinc-700 transition-colors flex items-center gap-1.5 text-xs font-medium"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Edit Project</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
