export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  image: string;
  githubUrl?: string;
  demoUrl?: string;
  featured?: boolean;
}

export interface NavItem {
  label: string;
  path: string;
}
