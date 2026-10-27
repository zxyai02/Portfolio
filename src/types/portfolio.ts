export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'UI/UX Systems' | 'Enterprise SaaS' | 'Interactive & Games' | 'Digital Art & Graphics' | 'Workflow Automation';
  client: string;
  year: string;
  image: string;
  secondaryImages?: string[];
  liveUrl?: string;
  figmaUrl?: string;
  githubUrl?: string;
  summary: string;
  challenge: string;
  solution: string;
  tags: string[];
  metrics: ProjectMetric[];
  featured: boolean;
  isPublished: boolean;
  order: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  publishedAt: string;
  coverImage?: string;
  tags: string[];
  isPublished: boolean;
}

export interface SocialLink {
  platform: string;
  label: string;
  url: string;
  icon: 'behance' | 'github' | 'linkedin' | 'twitter' | 'stock' | 'mail' | 'globe';
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface StatItem {
  value: string;
  label: string;
  subtext?: string;
}

export interface Profile {
  name: string;
  handle: string;
  role: string;
  tagline: string;
  bioHeadline: string;
  bioParagraphs: string[];
  location: string;
  timezone: string;
  email: string;
  availability: string;
  isAvailableForHire: boolean;
  avatarUrl: string;
  stats: StatItem[];
  skills: SkillCategory[];
  socialLinks: SocialLink[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  isRead: boolean;
}

export interface PortfolioData {
  profile: Profile;
  projects: Project[];
  blogPosts: BlogPost[];
  messages: ContactMessage[];
}
