export interface Project {
  id: string;
  title: string;
  status: 'Production' | 'In Development' | 'Academic Project';
  year: string;
  description: string;
  stack: string[];
  highlights: string[];
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  type: 'Full Time' | 'Freelance' | 'Internship' | 'Volunteer';
  context: string;
  highlights: string[];
  stack?: string[];
}

export interface NavItem {
  label: string;
  path: string;
}
