export interface WorkExperience {
  company: string;
  role: string;
  period: string;
  description: string[];
}

export interface Education {
  school: string;
  degree: string;
  year: string;
}

export interface Project {
  name: string;
  role?: string;
  description: string;
  technologies?: string[];
  link?: string;
}

export interface ResumeData {
  fullName: string;
  title: string;
  email: string;
  phone?: string;
  location?: string;
  summary: string;
  skills: string[];
  experience: WorkExperience[];
  education: Education[];
  projects: Project[];
  socialLinks?: {
    github?: string;
    linkedin?: string;
    portfolio?: string;
  };
}

export enum AppStep {
  LANDING,
  UPLOADING,
  PROCESSING,
  PREVIEW_EDIT,
  DEPLOYING,
  DEPLOYED
}