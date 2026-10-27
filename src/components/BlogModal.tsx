import React, { useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { X, Clock, Calendar, Tag, ArrowLeft, Edit3, Share2 } from 'lucide-react';

export const BlogModal: React.FC = () => {
  const { selectedBlog, setSelectedBlog, isAdmin, setEditingBlog, showToast } = usePortfolio();

  useEffect(() => {
    if (selectedBlog) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedBlog]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedBlog(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSelectedBlog]);

  if (!selectedBlog) return null;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Article link copied to clipboard.');
    }
  };

  // Simple markdown renderer for clean editorial presentation
  const renderMarkdown = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      // H3
      if (line.startsWith('### ')) {
        return (
          <h3 key={idx} className="text-xl font-bold text-white mt-8 mb-3 tracking-tight">
            {line.replace('### ', '')}
          </h3>
        );
      }
      // H2
      if (line.startsWith('## ')) {
        return (
          <h2 key={idx} className="text-2xl font-extrabold text-white mt-10 mb-4 tracking-tight border-b border-zinc-800 pb-2">
            {line.replace('## ', '')}
          </h2>
        );
      }
      // Bullet list item
      if (line.startsWith('- ')) {
        return (
          <li key={idx} className="ml-5 list-disc text-zinc-300 leading-relaxed my-1 pl-1">
            {line.replace('- ', '')}
          </li>
        );
      }
      // Numbered list item
      if (/^\d+\.\s/.test(line)) {
        return (
          <li key={idx} className="ml-5 list-decimal text-zinc-300 leading-relaxed my-1 pl-1">
            {line.replace(/^\d+\.\s/, '')}
          </li>
        );
      }
      // Empty line
      if (!line.trim()) {
        return <div key={idx} className="h-4" />;
      }
      // Regular paragraph
      return (
        <p key={idx} className="text-zinc-300 leading-relaxed my-2 text-base">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-zinc-950/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      {/* Click outside backdrop */}
      <div
        className="fixed inset-0"
        onClick={() => setSelectedBlog(null)}
      />

      {/* Reader Container */}
      <div className="relative w-full max-w-4xl my-auto bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]">
        {/* Header bar */}
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between gap-4 bg-zinc-950/70 shrink-0">
          <button
            onClick={() => setSelectedBlog(null)}
            className="flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Journal</span>
          </button>

          <div className="flex items-center gap-2">
            {isAdmin && (
              <button
                onClick={() => {
                  setEditingBlog(selectedBlog);
                  setSelectedBlog(null);
                }}
                className="px-3 py-1 rounded bg-zinc-800 hover:bg-amber-400 hover:text-zinc-950 text-xs font-medium text-zinc-200 border border-zinc-700 transition-colors flex items-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Post</span>
              </button>
            )}
            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
              title="Share article"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSelectedBlog(null)}
              className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
              aria-label="Close article"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Article Body */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-6">
          {/* Metadata */}
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <span className="text-amber-400 uppercase tracking-wider">{selectedBlog.category}</span>
            <span aria-hidden="true">·</span>
            <span>{selectedBlog.publishedAt}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-zinc-500" />
              <span>{selectedBlog.readTime}</span>
            </span>
          </div>

          {/* Article Title */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {selectedBlog.title}
          </h1>

          {/* Cover Image if present */}
          {selectedBlog.coverImage && (
            <div className="rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 aspect-16/9 my-6">
              <img
                src={selectedBlog.coverImage}
                alt={selectedBlog.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
            </div>
          )}

          {/* Excerpt Lead */}
          <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800 text-sm sm:text-base text-zinc-200 italic font-serif">
            {selectedBlog.excerpt}
          </div>

          {/* Main Markdown Body */}
          <div className="prose prose-invert max-w-none pt-2">
            {renderMarkdown(selectedBlog.content)}
          </div>

          {/* Tags */}
          <div className="pt-8 border-t border-zinc-800 flex flex-wrap gap-2">
            {selectedBlog.tags.map((tag, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded bg-zinc-800 border border-zinc-700 text-xs font-mono text-zinc-400"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-zinc-800 bg-zinc-950/80 flex items-center justify-between text-xs text-zinc-500 font-mono shrink-0">
          <span>Author: Majestic Soul</span>
          <button
            onClick={() => setSelectedBlog(null)}
            className="hover:text-zinc-200 transition-colors"
          >
            Close Reader
          </button>
        </div>
      </div>
    </div>
  );
};
