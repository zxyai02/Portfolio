import React, { useState, useMemo } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Project } from '../types/portfolio';
import { Search, ExternalLink, ArrowRight, Edit3, Plus, Sparkles, Filter } from 'lucide-react';

const CATEGORIES = [
  'All',
  'UI/UX Systems',
  'Enterprise SaaS',
  'Interactive & Games',
  'Digital Art & Graphics',
  'Workflow Automation'
] as const;

export const Gallery: React.FC = () => {
  const { data, setSelectedProject, isAdmin, setEditingProject, setIsCreatingProject } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

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
    <section id="work" className="py-20 border-b border-zinc-800/60 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-2">
              Curated Portfolio · {data.projects.length} Case Studies
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Selected Works & Systems
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-2xl">
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
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 pb-6 border-b border-zinc-800/60">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors ${
                  selectedCategory === category
                    ? 'bg-zinc-100 text-zinc-950 font-semibold shadow-sm'
                    : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 border border-zinc-800'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px] max-w-sm">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by name, tag, stack..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-4 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-400/80 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-zinc-300"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="py-20 text-center rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/30 p-8">
            <p className="text-zinc-400 text-sm">No matching projects found for the current query.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-medium text-amber-400 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map(project => (
              <div
                key={project.id}
                className="group flex flex-col rounded-xl border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900/80 transition-all duration-300 hover:border-zinc-700 hover:shadow-xl overflow-hidden"
              >
                {/* Media Image Frame */}
                <div
                  onClick={() => setSelectedProject(project)}
                  className="relative aspect-16/10 bg-zinc-950 overflow-hidden cursor-pointer border-b border-zinc-800/80"
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
                  {/* Unboxed Metadata (NO PILLS) */}
                  <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2 font-mono">
                    <span className="text-amber-400/90">{project.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.year}</span>
                    <span aria-hidden="true">·</span>
                    <span className="truncate max-w-[120px]">{project.client}</span>
                  </div>

                  {/* Title */}
                  <h3
                    onClick={() => setSelectedProject(project)}
                    className="text-base font-bold text-white group-hover:text-amber-300 transition-colors cursor-pointer leading-snug mb-2"
                  >
                    {project.title}
                  </h3>

                  {/* Subtitle / Teaser */}
                  <p className="text-xs text-zinc-300 leading-relaxed line-clamp-2 mb-4">
                    {project.subtitle}
                  </p>

                  {/* Key Metrics Strip if available */}
                  {project.metrics && project.metrics.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 py-2 px-3 mb-4 rounded-lg bg-zinc-950/60 border border-zinc-800/80">
                      {project.metrics.slice(0, 2).map((m, i) => (
                        <div key={i} className="flex flex-col">
                          <span className="text-[11px] font-mono text-zinc-400 truncate">{m.label}</span>
                          <span className="text-xs font-mono font-bold text-zinc-100">{m.value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-1.5 mt-auto pt-3 border-t border-zinc-800/60">
                    {project.tags.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className="text-[11px] text-zinc-400 font-mono"
                      >
                        #{tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-[11px] text-zinc-500 font-mono">
                        +{project.tags.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Admin Toolbar if logged in */}
                  {isAdmin && (
                    <div className="mt-4 pt-3 border-t border-dashed border-amber-500/30 flex items-center justify-between text-xs">
                      <span className="text-amber-400/80 font-mono text-[11px]">Admin Control</span>
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
