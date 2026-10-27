import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Project, BlogPost, Profile, SocialLink, ProjectMetric, SkillCategory } from '../types/portfolio';
import {
  FolderKanban,
  FileText,
  User,
  Share2,
  Mail,
  Database,
  Plus,
  Trash2,
  Edit,
  ArrowUp,
  ArrowDown,
  Check,
  X,
  ExternalLink,
  Eye,
  EyeOff,
  Sparkles,
  Download,
  Upload,
  RotateCcw,
  Image as ImageIcon
} from 'lucide-react';

const SCREENSHOT_ASSETS = [
  { path: '/assets/aistudio/image_1843ce9d.png', label: 'Atmosphere Weather Hub (Figma)' },
  { path: '/assets/aistudio/image_8b9fbbe7.png', label: 'Atmosphere Stitch Tokens (Dual Mode)' },
  { path: '/assets/aistudio/image_e6739381.png', label: 'Panacea Pharmacy ERP (Workers)' },
  { path: '/assets/aistudio/image_c8662f29.png', label: 'Urmi RMG Supply Chain (LEED)' },
  { path: '/assets/aistudio/image_0a9f355d.png', label: 'Cosmic Odyssey Game (Dhaka Canvas)' },
  { path: '/assets/aistudio/image_8b9b29a2.png', label: 'Insight Institute Portal (EdTech)' },
  { path: '/assets/aistudio/image_90af126e.png', label: 'Google Sheets Admission Sync' },
  { path: '/assets/aistudio/image_dbcfa868.png', label: 'Rainbow Abstract Waves (Adobe Stock)' },
  { path: '/assets/aistudio/image_261590ae.png', label: 'Behance Profile & Brand Monograph' }
];

export const AdminPanel: React.FC = () => {
  const {
    data,
    isAdmin,
    setIsAdmin,
    adminTab,
    setAdminTab,
    saveProject,
    deleteProject,
    reorderProject,
    editingProject,
    setEditingProject,
    isCreatingProject,
    setIsCreatingProject,
    saveBlogPost,
    deleteBlogPost,
    editingBlog,
    setEditingBlog,
    isCreatingBlog,
    setIsCreatingBlog,
    updateProfile,
    markMessageRead,
    deleteMessage,
    resetToDefaults,
    exportDataJSON,
    importDataJSON,
    showToast
  } = usePortfolio();

  // Local form states
  const [projectForm, setProjectForm] = useState<Partial<Project> | null>(null);
  const [blogForm, setBlogForm] = useState<Partial<BlogPost> | null>(null);
  const [profileForm, setProfileForm] = useState<Profile>(data.profile);
  const [newTagInput, setNewTagInput] = useState<string>('');
  const [jsonInput, setJsonInput] = useState<string>('');
  const [previewMarkdown, setPreviewMarkdown] = useState<boolean>(false);

  // Sync project form when editing opens
  React.useEffect(() => {
    if (editingProject) {
      setProjectForm({ ...editingProject });
    } else if (isCreatingProject) {
      setProjectForm({
        id: `proj-${Date.now()}`,
        slug: `new-project-${Date.now()}`,
        title: '',
        subtitle: '',
        category: 'UI/UX Systems',
        client: '',
        year: '2026',
        image: SCREENSHOT_ASSETS[0].path,
        summary: '',
        challenge: '',
        solution: '',
        tags: ['UI/UX', 'Design Systems'],
        metrics: [{ label: 'Performance', value: '100%' }],
        featured: false,
        isPublished: true,
        order: data.projects.length + 1
      });
    } else {
      setProjectForm(null);
    }
  }, [editingProject, isCreatingProject, data.projects.length]);

  // Sync blog form when editing opens
  React.useEffect(() => {
    if (editingBlog) {
      setBlogForm({ ...editingBlog });
    } else if (isCreatingBlog) {
      setBlogForm({
        id: `post-${Date.now()}`,
        slug: `new-post-${Date.now()}`,
        title: '',
        excerpt: '',
        content: '',
        category: 'Design Systems',
        readTime: '5 min read',
        publishedAt: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        coverImage: SCREENSHOT_ASSETS[0].path,
        tags: ['Design', 'Engineering'],
        isPublished: true
      });
    } else {
      setBlogForm(null);
    }
  }, [editingBlog, isCreatingBlog]);

  // Sync profile form when profile changes
  React.useEffect(() => {
    setProfileForm(data.profile);
  }, [data.profile]);

  if (!isAdmin) return null;

  return (
    <div className="bg-zinc-950 border-b border-amber-500/30 text-zinc-100 shadow-2xl relative z-30">
      {/* Admin Top Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-400 text-zinc-950 flex items-center justify-center font-bold text-xs shadow-md">
            CMS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white tracking-wide">
                Majestic Soul · Studio Administration
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950/80 border border-emerald-500/40 text-emerald-400">
                Live Edit Mode
              </span>
            </div>
            <p className="text-[11px] text-zinc-400">
              Changes reflect immediately on the site and persist in local storage.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={exportDataJSON}
            className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 hover:border-zinc-500 text-xs text-zinc-300 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export Backup</span>
          </button>
          <button
            onClick={() => setIsAdmin(false)}
            className="px-3.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-zinc-950 font-semibold text-xs transition-colors flex items-center gap-1.5 shadow"
          >
            <span>Exit Admin Panel</span>
          </button>
        </div>
      </div>

      {/* Admin Tabs Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto border-b border-zinc-800 py-2 scrollbar-none">
        <button
          onClick={() => setAdminTab('projects')}
          className={`px-3.5 py-2 rounded-lg text-xs font-medium flex items-center gap-2 whitespace-nowrap transition-colors ${
            adminTab === 'projects'
              ? 'bg-zinc-800 text-amber-400 border border-zinc-700'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
          }`}
        >
          <FolderKanban className="w-3.5 h-3.5" />
          <span>Projects ({data.projects.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('blog')}
          className={`px-3.5 py-2 rounded-lg text-xs font-medium flex items-center gap-2 whitespace-nowrap transition-colors ${
            adminTab === 'blog'
              ? 'bg-zinc-800 text-amber-400 border border-zinc-700'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Journal / Articles ({data.blogPosts.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('profile')}
          className={`px-3.5 py-2 rounded-lg text-xs font-medium flex items-center gap-2 whitespace-nowrap transition-colors ${
            adminTab === 'profile'
              ? 'bg-zinc-800 text-amber-400 border border-zinc-700'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>About & Bio</span>
        </button>

        <button
          onClick={() => setAdminTab('socials')}
          className={`px-3.5 py-2 rounded-lg text-xs font-medium flex items-center gap-2 whitespace-nowrap transition-colors ${
            adminTab === 'socials'
              ? 'bg-zinc-800 text-amber-400 border border-zinc-700'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
          }`}
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Social Media Links</span>
        </button>

        <button
          onClick={() => setAdminTab('messages')}
          className={`px-3.5 py-2 rounded-lg text-xs font-medium flex items-center gap-2 whitespace-nowrap transition-colors ${
            adminTab === 'messages'
              ? 'bg-zinc-800 text-amber-400 border border-zinc-700'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
          }`}
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Inquiries Inbox ({data.messages.length})</span>
          {data.messages.some(m => !m.isRead) && (
            <span className="w-2 h-2 rounded-full bg-amber-400" />
          )}
        </button>

        <button
          onClick={() => setAdminTab('backup')}
          className={`px-3.5 py-2 rounded-lg text-xs font-medium flex items-center gap-2 whitespace-nowrap transition-colors ${
            adminTab === 'backup'
              ? 'bg-zinc-800 text-amber-400 border border-zinc-700'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          <span>Backup & Reset</span>
        </button>
      </div>

      {/* Main Admin Tab Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ======================= TAB: PROJECTS ======================= */}
        {adminTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Project Catalog</h3>
                <p className="text-xs text-zinc-400">
                  Manage screenshots, technical summaries, metrics, and live prototype URLs.
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingProject(null);
                  setIsCreatingProject(true);
                }}
                className="px-4 py-2 rounded-lg bg-amber-400 text-zinc-950 font-bold text-xs hover:bg-amber-300 transition-colors flex items-center gap-1.5 shadow"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create New Project</span>
              </button>
            </div>

            {/* Projects Table List */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-zinc-300">
                  <thead className="bg-zinc-950 text-zinc-400 font-mono text-[11px] uppercase border-b border-zinc-800">
                    <tr>
                      <th className="py-3 px-4 w-12 text-center">Order</th>
                      <th className="py-3 px-4 w-20">Media</th>
                      <th className="py-3 px-4">Title & Client</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/80">
                    {data.projects.map((proj, idx) => (
                      <tr key={proj.id} className="hover:bg-zinc-800/40 transition-colors">
                        <td className="py-3 px-4 text-center">
                          <div className="flex flex-col items-center gap-1">
                            <button
                              disabled={idx === 0}
                              onClick={() => reorderProject(proj.id, 'up')}
                              className="text-zinc-500 hover:text-white disabled:opacity-20"
                              title="Move Up"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <span className="font-mono text-[11px] text-zinc-400">{idx + 1}</span>
                            <button
                              disabled={idx === data.projects.length - 1}
                              onClick={() => reorderProject(proj.id, 'down')}
                              className="text-zinc-500 hover:text-white disabled:opacity-20"
                              title="Move Down"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="w-16 h-11 rounded-lg overflow-hidden bg-zinc-950 border border-zinc-800">
                            <img
                              src={proj.image}
                              alt={proj.title}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover object-top"
                            />
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-bold text-white text-sm leading-tight">
                            {proj.title}
                          </div>
                          <div className="text-zinc-400 text-[11px] mt-0.5">
                            Client: {proj.client} ({proj.year})
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-mono text-amber-400/90 text-[11px]">
                            {proj.category}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex flex-col gap-1 items-start">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                                proj.isPublished
                                  ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/40'
                                  : 'bg-zinc-800 text-zinc-400'
                              }`}
                            >
                              {proj.isPublished ? 'Published' : 'Draft'}
                            </span>
                            {proj.featured && (
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-400/20 text-amber-300 border border-amber-400/30">
                                Featured
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right space-x-2">
                          <button
                            onClick={() => {
                              setIsCreatingProject(false);
                              setEditingProject(proj);
                            }}
                            className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-amber-400 hover:text-zinc-950 text-zinc-200 border border-zinc-700 text-xs font-medium transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete project "${proj.title}"?`)) {
                                deleteProject(proj.id);
                              }
                            }}
                            className="p-1 rounded hover:bg-rose-900/60 text-zinc-400 hover:text-rose-300 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======================= TAB: JOURNAL / BLOG ======================= */}
        {adminTab === 'blog' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Journal Articles & Notes</h3>
                <p className="text-xs text-zinc-400">
                  Write, edit, and publish markdown essays and design systems monographs.
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingBlog(null);
                  setIsCreatingBlog(true);
                }}
                className="px-4 py-2 rounded-lg bg-amber-400 text-zinc-950 font-bold text-xs hover:bg-amber-300 transition-colors flex items-center gap-1.5 shadow"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Write New Article</span>
              </button>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 divide-y divide-zinc-800">
              {data.blogPosts.map(post => (
                <div key={post.id} className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-zinc-800/40 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                      <span className="text-amber-400">{post.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{post.publishedAt}</span>
                      <span aria-hidden="true">·</span>
                      <span>{post.readTime}</span>
                      <span
                        className={`ml-2 px-2 py-0.5 rounded text-[10px] ${
                          post.isPublished ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' : 'bg-zinc-800 text-zinc-400'
                        }`}
                      >
                        {post.isPublished ? 'Live' : 'Draft'}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white">{post.title}</h4>
                    <p className="text-xs text-zinc-400 line-clamp-1">{post.excerpt}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                    <button
                      onClick={() => {
                        setIsCreatingBlog(false);
                        setEditingBlog(post);
                      }}
                      className="px-3 py-1.5 rounded bg-zinc-800 hover:bg-amber-400 hover:text-zinc-950 text-zinc-200 border border-zinc-700 text-xs font-medium transition-colors"
                    >
                      Edit Post
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete article "${post.title}"?`)) {
                          deleteBlogPost(post.id);
                        }
                      }}
                      className="p-1.5 rounded hover:bg-rose-900/60 text-zinc-400 hover:text-rose-300 transition-colors"
                      title="Delete Article"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================= TAB: ABOUT & PROFILE ======================= */}
        {adminTab === 'profile' && (
          <div className="space-y-8">
            <div>
              <h3 className="text-base font-bold text-white">Creator Profile & Narrative</h3>
              <p className="text-xs text-zinc-400">
                Update your professional title, story, guiding philosophy, and skills stack.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Details */}
              <div className="space-y-4 p-5 rounded-xl border border-zinc-800 bg-zinc-900/40">
                <h4 className="text-xs font-mono uppercase text-amber-400 tracking-wider">
                  Basic Identity
                </h4>

                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Display Name</label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Professional Role</label>
                  <input
                    type="text"
                    value={profileForm.role}
                    onChange={e => setProfileForm({ ...profileForm, role: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Direct Contact Email</label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={e => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">Location</label>
                    <input
                      type="text"
                      value={profileForm.location}
                      onChange={e => setProfileForm({ ...profileForm, location: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">Timezone</label>
                    <input
                      type="text"
                      value={profileForm.timezone}
                      onChange={e => setProfileForm({ ...profileForm, timezone: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Availability Statement</label>
                  <input
                    type="text"
                    value={profileForm.availability}
                    onChange={e => setProfileForm({ ...profileForm, availability: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white"
                  />
                </div>
              </div>

              {/* Tagline & Story */}
              <div className="space-y-4 p-5 rounded-xl border border-zinc-800 bg-zinc-900/40">
                <h4 className="text-xs font-mono uppercase text-amber-400 tracking-wider">
                  Story & Tagline
                </h4>

                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Hero Main Tagline</label>
                  <textarea
                    rows={2}
                    value={profileForm.tagline}
                    onChange={e => setProfileForm({ ...profileForm, tagline: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Bio Headline</label>
                  <input
                    type="text"
                    value={profileForm.bioHeadline}
                    onChange={e => setProfileForm({ ...profileForm, bioHeadline: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Bio Paragraph 1</label>
                  <textarea
                    rows={3}
                    value={profileForm.bioParagraphs[0] || ''}
                    onChange={e => {
                      const newP = [...profileForm.bioParagraphs];
                      newP[0] = e.target.value;
                      setProfileForm({ ...profileForm, bioParagraphs: newP });
                    }}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Bio Paragraph 2</label>
                  <textarea
                    rows={3}
                    value={profileForm.bioParagraphs[1] || ''}
                    onChange={e => {
                      const newP = [...profileForm.bioParagraphs];
                      newP[1] = e.target.value;
                      setProfileForm({ ...profileForm, bioParagraphs: newP });
                    }}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-xs text-white"
                  />
                </div>
              </div>
            </div>

            {/* Stats Editor */}
            <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/40 space-y-4">
              <h4 className="text-xs font-mono uppercase text-amber-400 tracking-wider">
                Hero KPI Stats Strip
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                {profileForm.stats.map((stat, idx) => (
                  <div key={idx} className="p-3 bg-zinc-950 rounded-lg border border-zinc-800 space-y-2">
                    <input
                      type="text"
                      value={stat.value}
                      placeholder="e.g. 8+"
                      onChange={e => {
                        const newStats = [...profileForm.stats];
                        newStats[idx] = { ...newStats[idx], value: e.target.value };
                        setProfileForm({ ...profileForm, stats: newStats });
                      }}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-sm font-bold font-mono text-white"
                    />
                    <input
                      type="text"
                      value={stat.label}
                      placeholder="e.g. Years Experience"
                      onChange={e => {
                        const newStats = [...profileForm.stats];
                        newStats[idx] = { ...newStats[idx], label: e.target.value };
                        setProfileForm({ ...profileForm, stats: newStats });
                      }}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-xs text-zinc-200"
                    />
                    <input
                      type="text"
                      value={stat.subtext || ''}
                      placeholder="e.g. Full-Stack UX"
                      onChange={e => {
                        const newStats = [...profileForm.stats];
                        newStats[idx] = { ...newStats[idx], subtext: e.target.value };
                        setProfileForm({ ...profileForm, stats: newStats });
                      }}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-[11px] text-zinc-400"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Save Profile Button */}
            <div className="flex justify-end">
              <button
                onClick={() => updateProfile(profileForm)}
                className="px-6 py-2.5 rounded-lg bg-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-wider hover:bg-amber-300 transition-colors shadow-md flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </div>
        )}

        {/* ======================= TAB: SOCIALS ======================= */}
        {adminTab === 'socials' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-bold text-white">Social Media & Portfolios</h3>
              <p className="text-xs text-zinc-400">
                Configure verified links to Behance, Adobe Stock, GitHub, LinkedIn, and Email.
              </p>
            </div>

            <div className="space-y-3">
              {profileForm.socialLinks.map((link, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/60 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                  <div className="sm:col-span-3">
                    <label className="block text-[11px] font-mono text-zinc-400">Platform</label>
                    <input
                      type="text"
                      value={link.platform}
                      onChange={e => {
                        const newLinks = [...profileForm.socialLinks];
                        newLinks[idx] = { ...newLinks[idx], platform: e.target.value };
                        setProfileForm({ ...profileForm, socialLinks: newLinks });
                      }}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-1.5 text-xs text-white"
                    />
                  </div>

                  <div className="sm:col-span-4">
                    <label className="block text-[11px] font-mono text-zinc-400">Display Label</label>
                    <input
                      type="text"
                      value={link.label}
                      onChange={e => {
                        const newLinks = [...profileForm.socialLinks];
                        newLinks[idx] = { ...newLinks[idx], label: e.target.value };
                        setProfileForm({ ...profileForm, socialLinks: newLinks });
                      }}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-1.5 text-xs text-white"
                    />
                  </div>

                  <div className="sm:col-span-4">
                    <label className="block text-[11px] font-mono text-zinc-400">Destination URL</label>
                    <input
                      type="text"
                      value={link.url}
                      onChange={e => {
                        const newLinks = [...profileForm.socialLinks];
                        newLinks[idx] = { ...newLinks[idx], url: e.target.value };
                        setProfileForm({ ...profileForm, socialLinks: newLinks });
                      }}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-1.5 text-xs text-white"
                    />
                  </div>

                  <div className="sm:col-span-1 flex justify-end">
                    <button
                      onClick={() => {
                        const newLinks = profileForm.socialLinks.filter((_, i) => i !== idx);
                        setProfileForm({ ...profileForm, socialLinks: newLinks });
                      }}
                      className="p-2 text-zinc-500 hover:text-rose-400"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="flex items-center justify-between pt-4">
                <button
                  onClick={() => {
                    setProfileForm({
                      ...profileForm,
                      socialLinks: [
                        ...profileForm.socialLinks,
                        { platform: 'Platform', label: '@handle', url: 'https://', icon: 'globe' }
                      ]
                    });
                  }}
                  className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-200 border border-zinc-700 flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Social Link</span>
                </button>

                <button
                  onClick={() => updateProfile(profileForm)}
                  className="px-6 py-2 rounded-lg bg-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-wider hover:bg-amber-300 transition-colors shadow"
                >
                  Save Links
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ======================= TAB: INQUIRIES INBOX ======================= */}
        {adminTab === 'messages' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Contact Form Inquiries</h3>
                <p className="text-xs text-zinc-400">
                  Transmissions received from visitors via the Contact page.
                </p>
              </div>
            </div>

            {data.messages.length === 0 ? (
              <div className="p-12 text-center rounded-xl border border-dashed border-zinc-800 bg-zinc-900/30">
                <Mail className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
                <p className="text-xs text-zinc-400">No inquiry messages in inbox yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {data.messages.map(msg => (
                  <div
                    key={msg.id}
                    className={`p-5 rounded-xl border transition-all ${
                      msg.isRead
                        ? 'border-zinc-800 bg-zinc-900/40 text-zinc-300'
                        : 'border-amber-500/40 bg-zinc-900/90 text-white shadow-lg'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 pb-2 border-b border-zinc-800/60">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white">{msg.name}</h4>
                          <span className="text-xs text-zinc-400 font-mono">({msg.email})</span>
                          {!msg.isRead && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-400 text-zinc-950 font-bold">
                              NEW
                            </span>
                          )}
                        </div>
                        <div className="text-xs font-semibold text-amber-400/90 mt-0.5">
                          {msg.subject}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-zinc-500">{msg.date}</span>
                        <a
                          href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                          onClick={() => markMessageRead(msg.id)}
                          className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-amber-400 hover:text-zinc-950 text-zinc-200 border border-zinc-700 text-xs font-medium transition-colors"
                        >
                          Reply Email
                        </a>
                        {!msg.isRead && (
                          <button
                            onClick={() => markMessageRead(msg.id)}
                            className="p-1 rounded text-zinc-400 hover:text-emerald-400"
                            title="Mark as Read"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteMessage(msg.id)}
                          className="p-1 rounded text-zinc-500 hover:text-rose-400"
                          title="Delete message"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">
                      {msg.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ======================= TAB: BACKUP & RESTORE ======================= */}
        {adminTab === 'backup' && (
          <div className="space-y-8 max-w-2xl">
            <div>
              <h3 className="text-base font-bold text-white">Backup, Restore & Reset</h3>
              <p className="text-xs text-zinc-400">
                Safeguard all edited projects and articles as portable JSON, or restore the original showcase.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/40 space-y-3">
              <h4 className="text-xs font-mono uppercase text-zinc-300 tracking-wider">
                1. Download JSON Archive
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Exports all your current projects, articles, profile details, and messages into a clean JSON file.
              </p>
              <button
                onClick={exportDataJSON}
                className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 text-xs font-semibold border border-zinc-700 flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Full Portfolio Backup</span>
              </button>
            </div>

            <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/40 space-y-3">
              <h4 className="text-xs font-mono uppercase text-zinc-300 tracking-wider">
                2. Restore from JSON
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Paste JSON content below or upload a previously exported backup file to restore.
              </p>
              <textarea
                rows={4}
                value={jsonInput}
                onChange={e => setJsonInput(e.target.value)}
                placeholder='Paste exported JSON here: {"profile": {...}, "projects": [...]}'
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-xs font-mono text-zinc-300"
              />
              <button
                onClick={() => {
                  if (!jsonInput.trim()) {
                    showToast('Please paste valid JSON first', 'error');
                    return;
                  }
                  const ok = importDataJSON(jsonInput);
                  if (ok) setJsonInput('');
                }}
                className="px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-zinc-950 text-xs font-bold flex items-center gap-2"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Restore From JSON</span>
              </button>
            </div>

            <div className="p-5 rounded-xl border border-rose-900/40 bg-rose-950/20 space-y-3">
              <h4 className="text-xs font-mono uppercase text-rose-400 tracking-wider">
                3. Factory Reset Showcase
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Clears all custom local storage edits and restores the original 8 curated showcase projects and articles.
              </p>
              <button
                onClick={() => {
                  if (window.confirm('Reset all portfolio data to default showcase projects?')) {
                    resetToDefaults();
                  }
                }}
                className="px-4 py-2 rounded-lg bg-rose-900/60 hover:bg-rose-800 text-rose-100 text-xs font-semibold border border-rose-700/60 flex items-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Default Showcase</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ======================= PROJECT EDIT MODAL ======================= */}
      {projectForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-zinc-950/90 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-4xl my-auto bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/80">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>{isCreatingProject ? 'Create New Project' : `Edit: ${projectForm.title}`}</span>
              </h3>
              <button
                onClick={() => {
                  setProjectForm(null);
                  setEditingProject(null);
                  setIsCreatingProject(false);
                }}
                className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
              {/* Image Asset Selector */}
              <div className="space-y-3">
                <label className="block text-xs font-mono uppercase text-amber-400 tracking-wider">
                  Select Project Cover Screenshot (or custom URL)
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                  {SCREENSHOT_ASSETS.map((asset, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setProjectForm({ ...projectForm, image: asset.path })}
                      className={`relative aspect-4/3 rounded-lg overflow-hidden border transition-all text-left group ${
                        projectForm.image === asset.path
                          ? 'border-amber-400 ring-2 ring-amber-400/40'
                          : 'border-zinc-800 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={asset.path}
                        alt={asset.label}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors" />
                      <span className="absolute bottom-1 left-1 right-1 text-[9px] font-mono text-white bg-black/70 px-1 py-0.5 rounded truncate">
                        {asset.label}
                      </span>
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={projectForm.image || ''}
                  onChange={e => setProjectForm({ ...projectForm, image: e.target.value })}
                  placeholder="Or enter custom image path or URL..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs font-mono text-zinc-300"
                />
              </div>

              {/* Title & Subtitle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={projectForm.title || ''}
                    onChange={e => setProjectForm({ ...projectForm, title: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Category *</label>
                  <select
                    value={projectForm.category}
                    onChange={e => setProjectForm({ ...projectForm, category: e.target.value as any })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white"
                  >
                    <option value="UI/UX Systems">UI/UX Systems</option>
                    <option value="Enterprise SaaS">Enterprise SaaS</option>
                    <option value="Interactive & Games">Interactive & Games</option>
                    <option value="Digital Art & Graphics">Digital Art & Graphics</option>
                    <option value="Workflow Automation">Workflow Automation</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1">Subtitle / Punchline</label>
                <input
                  type="text"
                  value={projectForm.subtitle || ''}
                  onChange={e => setProjectForm({ ...projectForm, subtitle: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Client / Organization</label>
                  <input
                    type="text"
                    value={projectForm.client || ''}
                    onChange={e => setProjectForm({ ...projectForm, client: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Timeline / Year</label>
                  <input
                    type="text"
                    value={projectForm.year || ''}
                    onChange={e => setProjectForm({ ...projectForm, year: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white"
                  />
                </div>
              </div>

              {/* URLs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Live App URL</label>
                  <input
                    type="text"
                    value={projectForm.liveUrl || ''}
                    placeholder="https://..."
                    onChange={e => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Figma Prototype URL</label>
                  <input
                    type="text"
                    value={projectForm.figmaUrl || ''}
                    placeholder="https://figma.com/..."
                    onChange={e => setProjectForm({ ...projectForm, figmaUrl: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">GitHub URL</label>
                  <input
                    type="text"
                    value={projectForm.githubUrl || ''}
                    placeholder="https://github.com/..."
                    onChange={e => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1.5 text-xs text-white"
                  />
                </div>
              </div>

              {/* Detailed Narrative */}
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Summary Overview</label>
                <textarea
                  rows={3}
                  value={projectForm.summary || ''}
                  onChange={e => setProjectForm({ ...projectForm, summary: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">The Challenge & Context</label>
                  <textarea
                    rows={3}
                    value={projectForm.challenge || ''}
                    onChange={e => setProjectForm({ ...projectForm, challenge: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">The Engineering Solution</label>
                  <textarea
                    rows={3}
                    value={projectForm.solution || ''}
                    onChange={e => setProjectForm({ ...projectForm, solution: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-xs text-white"
                  />
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-xs text-zinc-400 mb-1.5">Tech Stack & Tags</label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {(projectForm.tags || []).map((tag, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded bg-zinc-800 text-xs font-mono text-zinc-200 flex items-center gap-1.5"
                    >
                      <span>#{tag}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = projectForm.tags?.filter((_, idx) => idx !== i);
                          setProjectForm({ ...projectForm, tags: updated });
                        }}
                        className="text-zinc-400 hover:text-rose-400"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTagInput}
                    onChange={e => setNewTagInput(e.target.value)}
                    placeholder="Add tag (e.g. React 19)..."
                    className="bg-zinc-950 border border-zinc-800 rounded px-3 py-1 text-xs text-white"
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (newTagInput.trim()) {
                          setProjectForm({
                            ...projectForm,
                            tags: [...(projectForm.tags || []), newTagInput.trim()]
                          });
                          setNewTagInput('');
                        }
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newTagInput.trim()) {
                        setProjectForm({
                          ...projectForm,
                          tags: [...(projectForm.tags || []), newTagInput.trim()]
                        });
                        setNewTagInput('');
                      }
                    }}
                    className="px-3 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-200"
                  >
                    Add Tag
                  </button>
                </div>
              </div>

              {/* Metrics Editor */}
              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase text-zinc-400">
                  Key Metrics / Proof Points
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(projectForm.metrics || []).map((m, idx) => (
                    <div key={idx} className="p-2 bg-zinc-950 rounded border border-zinc-800 space-y-1">
                      <input
                        type="text"
                        value={m.value}
                        placeholder="Value (e.g. 100%)"
                        onChange={e => {
                          const next = [...(projectForm.metrics || [])];
                          next[idx] = { ...next[idx], value: e.target.value };
                          setProjectForm({ ...projectForm, metrics: next });
                        }}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-xs font-mono text-white"
                      />
                      <input
                        type="text"
                        value={m.label}
                        placeholder="Label"
                        onChange={e => {
                          const next = [...(projectForm.metrics || [])];
                          next[idx] = { ...next[idx], label: e.target.value };
                          setProjectForm({ ...projectForm, metrics: next });
                        }}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-[11px] text-zinc-300"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Toggles */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-300">
                  <input
                    type="checkbox"
                    checked={projectForm.isPublished ?? true}
                    onChange={e => setProjectForm({ ...projectForm, isPublished: e.target.checked })}
                    className="rounded bg-zinc-900 border-zinc-700 text-amber-400 focus:ring-0"
                  />
                  <span>Published (Visible publicly)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-300">
                  <input
                    type="checkbox"
                    checked={projectForm.featured ?? false}
                    onChange={e => setProjectForm({ ...projectForm, featured: e.target.checked })}
                    className="rounded bg-zinc-900 border-zinc-700 text-amber-400 focus:ring-0"
                  />
                  <span>Featured Case Study</span>
                </label>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="px-6 py-4 border-t border-zinc-800 bg-zinc-950/80 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setProjectForm(null);
                  setEditingProject(null);
                  setIsCreatingProject(false);
                }}
                className="px-4 py-2 text-xs font-medium text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!projectForm.title?.trim()) {
                    showToast('Project title is required.', 'error');
                    return;
                  }
                  saveProject(projectForm as Project);
                  setProjectForm(null);
                }}
                className="px-6 py-2 rounded-lg bg-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-wider hover:bg-amber-300 transition-colors shadow"
              >
                Save Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================= BLOG EDIT MODAL ======================= */}
      {blogForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-zinc-950/90 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-4xl my-auto bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/80">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>{isCreatingBlog ? 'Write New Journal Article' : `Edit: ${blogForm.title}`}</span>
              </h3>
              <button
                onClick={() => {
                  setBlogForm(null);
                  setEditingBlog(null);
                  setIsCreatingBlog(false);
                }}
                className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto p-6 sm:p-8 space-y-5">
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Article Title *</label>
                <input
                  type="text"
                  required
                  value={blogForm.title || ''}
                  onChange={e => setBlogForm({ ...blogForm, title: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white font-bold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Category</label>
                  <input
                    type="text"
                    value={blogForm.category || ''}
                    onChange={e => setBlogForm({ ...blogForm, category: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-1.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Estimated Read Time</label>
                  <input
                    type="text"
                    value={blogForm.readTime || ''}
                    onChange={e => setBlogForm({ ...blogForm, readTime: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-1.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Publish Date</label>
                  <input
                    type="text"
                    value={blogForm.publishedAt || ''}
                    onChange={e => setBlogForm({ ...blogForm, publishedAt: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-1.5 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1">Cover Image Screenshot</label>
                <select
                  value={blogForm.coverImage}
                  onChange={e => setBlogForm({ ...blogForm, coverImage: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white mb-2"
                >
                  {SCREENSHOT_ASSETS.map((asset, i) => (
                    <option key={i} value={asset.path}>
                      {asset.label} ({asset.path})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1">Lead Excerpt</label>
                <textarea
                  rows={2}
                  value={blogForm.excerpt || ''}
                  onChange={e => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-xs text-white"
                />
              </div>

              {/* Markdown Toolbar & Content */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-xs">
                    <span className="font-mono text-zinc-400 uppercase text-[10px]">Markdown Article Content</span>
                    <button
                      type="button"
                      onClick={() => {
                        setBlogForm({ ...blogForm, content: (blogForm.content || '') + '\n## Section Heading\n' });
                      }}
                      className="px-2 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-300 hover:text-white"
                    >
                      H2
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setBlogForm({ ...blogForm, content: (blogForm.content || '') + '\n### Sub-heading\n' });
                      }}
                      className="px-2 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-300 hover:text-white"
                    >
                      H3
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setBlogForm({ ...blogForm, content: (blogForm.content || '') + ' **bold text** ' });
                      }}
                      className="px-2 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-300 hover:text-white"
                    >
                      B
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setBlogForm({ ...blogForm, content: (blogForm.content || '') + '\n- Bullet point\n' });
                      }}
                      className="px-2 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-300 hover:text-white"
                    >
                      List
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setPreviewMarkdown(!previewMarkdown)}
                    className="text-xs text-amber-400 hover:underline"
                  >
                    {previewMarkdown ? 'Switch to Editor' : 'Live Preview'}
                  </button>
                </div>

                {previewMarkdown ? (
                  <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 min-h-[240px] text-xs text-zinc-200 prose prose-invert max-w-none">
                    {blogForm.content}
                  </div>
                ) : (
                  <textarea
                    rows={10}
                    value={blogForm.content || ''}
                    onChange={e => setBlogForm({ ...blogForm, content: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-4 text-xs font-mono text-white leading-relaxed"
                  />
                )}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="blogPub"
                  checked={blogForm.isPublished ?? true}
                  onChange={e => setBlogForm({ ...blogForm, isPublished: e.target.checked })}
                  className="rounded bg-zinc-900 border-zinc-700 text-amber-400"
                />
                <label htmlFor="blogPub" className="text-xs text-zinc-300 cursor-pointer">
                  Publish article publicly
                </label>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-zinc-800 bg-zinc-950/80 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setBlogForm(null);
                  setEditingBlog(null);
                  setIsCreatingBlog(false);
                }}
                className="px-4 py-2 text-xs font-medium text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!blogForm.title?.trim()) {
                    showToast('Article title is required.', 'error');
                    return;
                  }
                  saveBlogPost(blogForm as BlogPost);
                  setBlogForm(null);
                }}
                className="px-6 py-2 rounded-lg bg-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-wider hover:bg-amber-300 transition-colors shadow"
              >
                Save Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
