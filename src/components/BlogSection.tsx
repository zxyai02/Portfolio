import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { BlogPost } from '../types/portfolio';
import { BookOpen, ArrowRight, Plus, Edit3, Clock, Sparkles, Tag, FileText } from 'lucide-react';

export const BlogSection: React.FC = () => {
  const { data, setSelectedBlog, isAdmin, setEditingBlog, setIsCreatingBlog, theme } = usePortfolio();

  const publishedPosts = data.blogPosts.filter(p => p.isPublished || isAdmin);

  return (
    <section
      id="journal"
      className={`py-20 border-b transition-colors scroll-mt-12 ${
        theme === 'dark'
          ? 'bg-transparent border-zinc-800/60 text-zinc-100'
          : 'bg-transparent border-zinc-200/80 text-zinc-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-amber-500 mb-2 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-amber-500" />
              <span>Writing & Field Notes</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Design Systems & Systems Journal
            </h2>
            <p className={`text-sm sm:text-base mt-2 max-w-2xl ${
              theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
            }`}>
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
          {publishedPosts.map(post => (
            <article
              key={post.id}
              onClick={() => setSelectedBlog(post)}
              className={`group flex flex-col p-6 rounded-2xl border backdrop-blur-md transition-all duration-300 cursor-pointer shadow-sm hover:shadow-xl ${
                theme === 'dark'
                  ? 'bg-zinc-900/60 border-zinc-800 hover:bg-zinc-900/85 hover:border-zinc-700'
                  : 'bg-white/85 border-zinc-200 hover:bg-white/95 hover:border-zinc-300 shadow-sm'
              }`}
            >
              {/* Cover thumbnail if present */}
              {post.coverImage && (
                <div className="relative aspect-16/9 rounded-xl overflow-hidden bg-zinc-950 mb-5 border border-zinc-800/80">
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

              {/* Unboxed Metadata */}
              <div className={`flex items-center gap-2 text-xs mb-3 font-mono ${
                theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'
              }`}>
                <span className="text-amber-500 font-semibold">{post.category}</span>
                <span aria-hidden="true">·</span>
                <span>{post.publishedAt}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-zinc-400" />
                  <span>{post.readTime}</span>
                </span>
              </div>

              {/* Post Title */}
              <h3 className={`text-lg sm:text-xl font-bold transition-colors leading-snug mb-3 ${
                theme === 'dark'
                  ? 'text-white group-hover:text-amber-300'
                  : 'text-zinc-900 group-hover:text-amber-600'
              }`}>
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className={`text-xs sm:text-sm leading-relaxed line-clamp-3 mb-6 ${
                theme === 'dark' ? 'text-zinc-300' : 'text-zinc-600'
              }`}>
                {post.excerpt}
              </p>

              {/* Bottom Row */}
              <div className={`mt-auto pt-4 border-t flex items-center justify-between ${
                theme === 'dark' ? 'border-zinc-800/80' : 'border-zinc-100'
              }`}>
                <div className="flex items-center gap-2">
                  {post.tags.slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className={`text-[11px] font-mono ${
                        theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
                      }`}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-500 group-hover:translate-x-1 transition-transform">
                  <span>Read Essay</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Admin Quick Edit if unlocked with 00 */}
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
