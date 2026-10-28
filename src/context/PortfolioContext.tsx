import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PortfolioData, Project, BlogPost, Profile, ContactMessage } from '../types/portfolio';
import { INITIAL_PORTFOLIO_DATA } from '../data/initialData';

const STORAGE_KEY = 'majestic_portfolio_data_v5';
const THEME_KEY = 'majestic_theme_mode';
const ADMIN_AUTH_KEY = 'majestic_admin_auth_00';

interface ToastInfo {
  message: string;
  type: 'success' | 'info' | 'error';
  id: number;
}

interface PortfolioContextType {
  data: PortfolioData;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
  adminTab: 'projects' | 'blog' | 'profile' | 'socials' | 'messages' | 'backup';
  setAdminTab: (tab: 'projects' | 'blog' | 'profile' | 'socials' | 'messages' | 'backup') => void;
  adminLoginModalOpen: boolean;
  setAdminLoginModalOpen: (val: boolean) => void;
  unlockAdminWithPassword: (pass: string) => boolean;
  lockAdmin: () => void;
  triggerAdminCheck: (input: string) => boolean;
  
  // Profile zoom modal
  isProfileZoomOpen: boolean;
  setIsProfileZoomOpen: (val: boolean) => void;

  // Selected modals
  selectedProject: Project | null;
  setSelectedProject: (p: Project | null) => void;
  selectedBlog: BlogPost | null;
  setSelectedBlog: (b: BlogPost | null) => void;
  editingProject: Project | null;
  setEditingProject: (p: Project | null) => void;
  isCreatingProject: boolean;
  setIsCreatingProject: (val: boolean) => void;
  editingBlog: BlogPost | null;
  setEditingBlog: (b: BlogPost | null) => void;
  isCreatingBlog: boolean;
  setIsCreatingBlog: (val: boolean) => void;
  
  // Mutations
  updateProfile: (profile: Profile) => void;
  saveProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  reorderProject: (id: string, direction: 'up' | 'down') => void;
  saveBlogPost: (post: BlogPost) => void;
  deleteBlogPost: (id: string) => void;
  submitMessage: (name: string, email: string, subject: string, message: string) => void;
  markMessageRead: (id: string) => void;
  deleteMessage: (id: string) => void;
  
  // Data management
  resetToDefaults: () => void;
  exportDataJSON: () => void;
  importDataJSON: (jsonStr: string) => boolean;

  // Toast
  toasts: ToastInfo[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to parse saved portfolio data, resetting to initial', e);
    }
    return INITIAL_PORTFOLIO_DATA;
  });

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_KEY);
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }
    } catch (e) {
      // ignore
    }
    return 'dark';
  });

  // Admin session: strictly secured by password '00'
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(ADMIN_AUTH_KEY) === 'authenticated_00';
    } catch (e) {
      return false;
    }
  });

  const [adminLoginModalOpen, setAdminLoginModalOpen] = useState<boolean>(false);
  const [isProfileZoomOpen, setIsProfileZoomOpen] = useState<boolean>(false);
  const [adminTab, setAdminTab] = useState<'projects' | 'blog' | 'profile' | 'socials' | 'messages' | 'backup'>('projects');
  
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreatingProject, setIsCreatingProject] = useState<boolean>(false);
  
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [isCreatingBlog, setIsCreatingBlog] = useState<boolean>(false);

  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  // Apply theme class to document element
  useEffect(() => {
    try {
      localStorage.setItem(THEME_KEY, theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {
      console.error(e);
    }
  }, [theme]);

  // Check URL on load and changes for the admin endpoint
  useEffect(() => {
    const checkAdminRoute = () => {
      const href = window.location.href.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();
      const search = window.location.search.toLowerCase();
      
      if (
        href.includes('portfolio.serviceforeuphoria.workers.dev/admin') ||
        href.includes('/admin') ||
        hash === '#admin' ||
        hash.includes('/admin') ||
        path.endsWith('/admin') ||
        search.includes('admin')
      ) {
        if (!isAdmin) {
          setAdminLoginModalOpen(true);
        }
      }
    };

    checkAdminRoute();
    window.addEventListener('hashchange', checkAdminRoute);
    window.addEventListener('popstate', checkAdminRoute);
    return () => {
      window.removeEventListener('hashchange', checkAdminRoute);
      window.removeEventListener('popstate', checkAdminRoute);
    };
  }, [isAdmin]);

  // Global key combination to access admin: Ctrl + Shift + A
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setAdminLoginModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Helper to trigger admin modal when searching for admin URL
  const triggerAdminCheck = (input: string): boolean => {
    const trimmed = input.trim().toLowerCase();
    if (
      trimmed === 'https://portfolio.serviceforeuphoria.workers.dev/admin' ||
      trimmed === 'portfolio.serviceforeuphoria.workers.dev/admin' ||
      trimmed.includes('serviceforeuphoria.workers.dev/admin') ||
      trimmed === '/admin' ||
      trimmed === 'admin'
    ) {
      setAdminLoginModalOpen(true);
      return true;
    }
    return false;
  };

  // Auto-save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save portfolio state to localStorage', e);
    }
  }, [data]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { message, type, id }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // Password verification: strictly '00'
  const unlockAdminWithPassword = (password: string): boolean => {
    if (password.trim() === '00') {
      setIsAdmin(true);
      sessionStorage.setItem(ADMIN_AUTH_KEY, 'authenticated_00');
      setAdminLoginModalOpen(false);
      showToast('Admin panel unlocked with passcode 00. Welcome back!', 'success');
      return true;
    } else {
      showToast('Security Error: Invalid passcode. Please enter 00.', 'error');
      return false;
    }
  };

  const lockAdmin = () => {
    setIsAdmin(false);
    sessionStorage.removeItem(ADMIN_AUTH_KEY);
    showToast('Admin session locked and hidden.', 'info');
  };

  const updateProfile = (profile: Profile) => {
    setData(prev => ({ ...prev, profile }));
    showToast('Profile information successfully updated.');
  };

  const saveProject = (project: Project) => {
    setData(prev => {
      const exists = prev.projects.some(p => p.id === project.id);
      let updatedProjects: Project[];
      if (exists) {
        updatedProjects = prev.projects.map(p => (p.id === project.id ? project : p));
      } else {
        const nextOrder = prev.projects.length + 1;
        updatedProjects = [{ ...project, order: nextOrder }, ...prev.projects];
      }
      return { ...prev, projects: updatedProjects };
    });
    setEditingProject(null);
    setIsCreatingProject(false);
    showToast(
      data.projects.some(p => p.id === project.id)
        ? `Project "${project.title}" updated.`
        : `New project "${project.title}" created.`
    );
  };

  const deleteProject = (id: string) => {
    const target = data.projects.find(p => p.id === id);
    setData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
    if (selectedProject?.id === id) setSelectedProject(null);
    if (editingProject?.id === id) setEditingProject(null);
    showToast(`Project "${target?.title || 'item'}" deleted.`, 'info');
  };

  const reorderProject = (id: string, direction: 'up' | 'down') => {
    setData(prev => {
      const list = [...prev.projects];
      const index = list.findIndex(p => p.id === id);
      if (index === -1) return prev;
      
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= list.length) return prev;
      
      const temp = list[index];
      list[index] = list[targetIndex];
      list[targetIndex] = temp;
      
      const reindexed = list.map((item, idx) => ({ ...item, order: idx + 1 }));
      return { ...prev, projects: reindexed };
    });
    showToast('Project display order updated.');
  };

  const saveBlogPost = (post: BlogPost) => {
    setData(prev => {
      const exists = prev.blogPosts.some(b => b.id === post.id);
      let updatedPosts: BlogPost[];
      if (exists) {
        updatedPosts = prev.blogPosts.map(b => (b.id === post.id ? post : b));
      } else {
        updatedPosts = [post, ...prev.blogPosts];
      }
      return { ...prev, blogPosts: updatedPosts };
    });
    setEditingBlog(null);
    setIsCreatingBlog(false);
    showToast(`Blog post "${post.title}" saved.`);
  };

  const deleteBlogPost = (id: string) => {
    const target = data.blogPosts.find(b => b.id === id);
    setData(prev => ({
      ...prev,
      blogPosts: prev.blogPosts.filter(b => b.id !== id)
    }));
    if (selectedBlog?.id === id) setSelectedBlog(null);
    if (editingBlog?.id === id) setEditingBlog(null);
    showToast(`Post "${target?.title || 'item'}" removed.`, 'info');
  };

  const submitMessage = (name: string, email: string, subject: string, message: string) => {
    const newMsg: ContactMessage = {
      id: `msg-${Date.now()}`,
      name,
      email,
      subject: subject || 'General Inquiry',
      message,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      isRead: false
    };
    setData(prev => ({
      ...prev,
      messages: [newMsg, ...prev.messages]
    }));
    showToast('Your message has been sent successfully. Thank you!', 'success');
  };

  const markMessageRead = (id: string) => {
    setData(prev => ({
      ...prev,
      messages: prev.messages.map(m => (m.id === id ? { ...m, isRead: true } : m))
    }));
  };

  const deleteMessage = (id: string) => {
    setData(prev => ({
      ...prev,
      messages: prev.messages.filter(m => m.id !== id)
    }));
    showToast('Message removed from inbox.', 'info');
  };

  const resetToDefaults = () => {
    setData(INITIAL_PORTFOLIO_DATA);
    localStorage.removeItem(STORAGE_KEY);
    showToast('Portfolio reset to default showcase state.', 'info');
  };

  const exportDataJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `majestic-soul-portfolio-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Portfolio JSON exported successfully.');
  };

  const importDataJSON = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.profile && Array.isArray(parsed.projects) && Array.isArray(parsed.blogPosts)) {
        setData(parsed);
        showToast('Portfolio data restored successfully!');
        return true;
      } else {
        showToast('Invalid portfolio backup file structure.', 'error');
        return false;
      }
    } catch (e) {
      showToast('Could not parse JSON file. Check format.', 'error');
      return false;
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        theme,
        toggleTheme,
        isAdmin,
        setIsAdmin,
        adminTab,
        setAdminTab,
        adminLoginModalOpen,
        setAdminLoginModalOpen,
        unlockAdminWithPassword,
        lockAdmin,
        triggerAdminCheck,
        isProfileZoomOpen,
        setIsProfileZoomOpen,
        selectedProject,
        setSelectedProject,
        selectedBlog,
        setSelectedBlog,
        editingProject,
        setEditingProject,
        isCreatingProject,
        setIsCreatingProject,
        editingBlog,
        setEditingBlog,
        isCreatingBlog,
        setIsCreatingBlog,
        updateProfile,
        saveProject,
        deleteProject,
        reorderProject,
        saveBlogPost,
        deleteBlogPost,
        submitMessage,
        markMessageRead,
        deleteMessage,
        resetToDefaults,
        exportDataJSON,
        importDataJSON,
        toasts,
        showToast
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
