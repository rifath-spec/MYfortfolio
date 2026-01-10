
export interface ContactInfo {
  phone: string;
  email: string;
  location: string;
  linkedin: string;
  linkedinUrl?: string;
  githubUrl?: string;
  twitterUrl?: string;
  instagramUrl?: string;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  details?: string[];
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  location?: string;
  description: string[];
}

export interface Project {
  title: string;
  technologies: string[];
  description: string[];
  demoUrl?: string;
  githubUrl?: string;
  image?: string;
}

export interface Document {
  id: string;
  title: string;
  category: 'Certification' | 'Transcript' | 'Award' | 'Other';
  issuer: string;
  date: string;
  url: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface ProfileData {
  name: string;
  title: string;
  summary: string;
  profileImage?: string;
  resumeUrl?: string;
  contact: ContactInfo;
  coreCompetencies: string[];
  education: Education[];
  experience: Experience[];
  projects: Project[];
  documents: Document[];
  skills: SkillCategory[];
  languages: string[];
}
