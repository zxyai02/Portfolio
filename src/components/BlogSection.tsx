import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { BlogPost } from '../types/portfolio';
import { BookOpen, ArrowRight, Plus, Edit3, Clock } from 'lucide-react';

export const BlogSection: React.FC = () => {
  const { data, setSelectedBlog, isAdmin, setEditingBlog, setIsCreatingBlog } = usePortfolio();

  const publishedPosts = data.blogPosts.filter(p => p.isPublished || isAdmin);

  return (
    <section id="journal" className="py-20 border-b border-zinc-800/60 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-2">
              Writing & Field Notes
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Design Systems & Systems Journal
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-2xl">
              Reflections on high-density data visualizations, edge infrastructure, and canvas micro-optimizations.
            </p>
          </div>

          {isAdmin && (
            <button
              onClick={() => {
                setIsCreatingBlog(true);
                setEditingBlog(null);
              }}
              className="px-4 py-2 rounded-lg bg-amber-400 text-zinc-950 text-xs font-bold hover:bg-amber-300 transition-all flex items-center gap-2 self-start md:self-auto shrink-0 shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Write New Journal Post</span>
            </button>
          )}
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {publishedPosts.map((post, idx) => (
            <article
              key={post.id}
              onClick={() => setSelectedBlog(post)}
              className="group flex flex-col p-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900/80 hover:border-zinc-700 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-xl"
            >
              {/* Cover thumbnail if present */}
              {post.coverImage && (
                <div className="relative aspect-16/9 rounded-xl overflow-hidden bg-zinc-950 mb-5 border border-zinc-800">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-102"
                  />
                  {!post.isPublished && (
                    <div className="absolute top-3 left-3 px-2 py-1 bg-rose-500 text-white font-mono text-[10px] uppercase rounded">
                      Draft Post
                    </div>
                  )}
                </div>
              )}

              {/* Unboxed Metadata (NO PILLS) */}
              <div className="flex items-center gap-2 text-xs text-zinc-400 mb-3 font-mono">
                <span className="text-amber-400/90">{post.category}</span>
                <span aria-hidden="true">·</span>
                <span>{post.publishedAt}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1 text-zinc-400">
                  <Clock className="w-3 h-3 text-zinc-500" />
                  <span>{post.readTime}</span>
                </span>
              </div>

              {/* Post Title */}
              <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-amber-300 transition-colors leading-snug mb-3">
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed line-clamp-3 mb-6">
                {post.excerpt}
              </p>

              {/* Bottom Row */}
              <div className="mt-auto pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {post.tags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="text-[11px] font-mono text-zinc-500">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform">
                  <span>Read Essay</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Admin Quick Edit */}
              {isAdmin && (
                <div
                  className="mt-3 pt-3 border-t border-dashed border-amber-500/30 flex justify-end"
                  onClick={e => e.stopPropagation()}
                >
                  <button
                    onClick={() => {
                      setEditingBlog(post);
                      setIsCreatingBlog(false);
                    }}
                    className="px-2.5 py-1 rounded bg-zinc-800 text-zinc-200 hover:bg-amber-400 hover:text-zinc-950 border border-zinc-700 text-xs font-medium flex items-center gap-1.5"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Edit Article</span>
                  </button>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
