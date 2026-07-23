export type TemplateId = 
  | 'minimal' 
  | 'corporate' 
  | 'creative' 
  | 'modern' 
  | 'executive' 
  | 'ats' 
  | 'student' 
  | 'developer';

export type PhotoShape = 'circular' | 'square' | 'rounded' | 'none';

export type FontOption = 'Poppins' | 'Inter' | 'Plus Jakarta Sans' | 'Playfair Display' | 'Fira Code' | 'Outfit';

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  address: string;
  linkedin: string;
  github: string;
  portfolio: string;
  summary: string;
  photoUrl: string;
  photoShape: PhotoShape;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  location?: string;
  description?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'technical' | 'soft' | 'language';
  level: string; // e.g., Expert, Advanced, Intermediate
}

export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  link?: string;
  startDate?: string;
  endDate?: string;
  description: string;
  technologies: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link?: string;
}

export interface Award {
  id: string;
  name: string;
  issuer: string;
  date: string;
  description?: string;
}

export interface Volunteer {
  id: string;
  organization: string;
  role: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export interface Reference {
  id: string;
  name: string;
  position: string;
  company: string;
  phone?: string;
  email?: string;
}

export interface CustomSectionItem {
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  description?: string;
}

export interface CustomSection {
  id: string;
  title: string;
  items: CustomSectionItem[];
}

export interface CustomizationSettings {
  templateId: TemplateId;
  primaryColor: string;
  accentColor: string;
  fontFamily: FontOption;
  fontSize: 'sm' | 'md' | 'lg';
  sectionSpacing: 'compact' | 'normal' | 'spacious';
  photoShape: PhotoShape;
  hiddenSections: Record<string, boolean>;
  showIcons: boolean;
}

export interface ResumeData {
  id: string;
  title: string;
  updatedAt: string;
  personal: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  awards: Award[];
  volunteer: Volunteer[];
  references: Reference[];
  customSections: CustomSection[];
  sectionOrder: string[];
  customization: CustomizationSettings;
}

export interface ResumeScore {
  totalScore: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'Needs Improvement';
  breakdown: {
    personal: number;
    summary: number;
    experience: number;
    education: number;
    skills: number;
    formatting: number;
  };
  suggestions: {
    type: 'warning' | 'tip' | 'success';
    message: string;
    section?: string;
  }[];
}

export const DEFAULT_RESUME: ResumeData = {
  id: 'default-resume-1',
  title: 'Senior Product Designer & Engineer',
  updatedAt: new Date().toISOString(),
  personal: {
    fullName: 'Alexander Sterling',
    jobTitle: 'Senior Product Designer & Engineer',
    email: 'alex@sterling.design',
    phone: '+1 (555) 000-9872',
    address: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/alexandersterling',
    github: 'github.com/alexsterling',
    portfolio: 'sterling.design',
    summary: 'Senior Product Designer and Engineer with 10+ years of experience crafting award-winning SaaS platforms and AI-driven interfaces. Proven track record of leading cross-functional teams to increase user retention by 28% while standardizing modern design systems.',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    photoShape: 'rounded'
  },
  education: [
    {
      id: 'edu-1',
      institution: 'Rhode Island School of Design',
      degree: 'Bachelor of Fine Arts (BFA)',
      fieldOfStudy: 'Visual Design & Human-Computer Interaction',
      startDate: '2012',
      endDate: '2016',
      gpa: '3.9 / 4.0',
      location: 'Providence, RI',
      description: 'Graduated with Magna Cum Laude honors. President of Design Systems Guild.'
    }
  ],
  experience: [
    {
      id: 'exp-1',
      company: 'Meta Flow Systems',
      position: 'Lead UX/UI Engineer',
      location: 'San Francisco, CA',
      startDate: '2021',
      endDate: 'Present',
      current: true,
      description: 'Pioneered the core component framework used by 50M+ active users daily.\n• Architected design-to-code pipelines resulting in 35% faster developer handoffs.\n• Mentored a multidisciplinary group of 14 designers and frontend engineers.'
    },
    {
      id: 'exp-2',
      company: 'Creative Pulse Inc.',
      position: 'Senior Product Designer',
      location: 'New York, NY',
      startDate: '2017',
      endDate: '2021',
      current: false,
      description: 'Delivered mobile-first SaaS solutions for international retail clients.\n• Reduced churn rate by 14% through iterative usability testing and data analytics.\n• Awarded Best B2B Application Interface at SXSW 2019.'
    }
  ],
  skills: [
    { id: 'sk-1', name: 'Design Systems & Figma', category: 'technical', level: 'Expert' },
    { id: 'sk-2', name: 'TypeScript & React 19', category: 'technical', level: 'Expert' },
    { id: 'sk-3', name: 'Tailwind CSS & Motion', category: 'technical', level: 'Expert' },
    { id: 'sk-4', name: 'AI Interface Design', category: 'technical', level: 'Advanced' },
    { id: 'sk-5', name: 'Cross-functional Leadership', category: 'soft', level: 'Expert' },
    { id: 'sk-6', name: 'Product Strategy & Metrics', category: 'soft', level: 'Advanced' },
    { id: 'sk-7', name: 'English (Native)', category: 'language', level: 'Native' },
    { id: 'sk-8', name: 'German (Conversational)', category: 'language', level: 'Intermediate' }
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'Aura AI - Design System Synthesizer',
      subtitle: 'Generative Token Engine',
      link: 'https://aura.design',
      startDate: '2024',
      endDate: '2025',
      technologies: 'React, TypeScript, WebGL, Gemini API',
      description: 'Built an open-source tool that translates Figma tokens into production-ready Tailwind utilities automatically.'
    }
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'Google UX Design Professional Certificate',
      issuer: 'Google & Coursera',
      date: '2020',
      link: 'coursera.org/verify/google-ux'
    }
  ],
  awards: [
    {
      id: 'award-1',
      name: 'Best Design System Interface',
      issuer: 'Awwwards / SXSW',
      date: '2023',
      description: 'Honored for exceptional clarity, accessibility standards, and micro-interactions.'
    }
  ],
  volunteer: [
    {
      id: 'vol-1',
      organization: 'Code for America',
      role: 'UX Mentor & Educator',
      startDate: '2022',
      endDate: 'Present',
      description: 'Conduct bi-weekly workshops teaching digital accessibility and clean UI design.'
    }
  ],
  references: [
    {
      id: 'ref-1',
      name: 'Sarah Jenkins',
      position: 'VP of Product',
      company: 'Meta Flow Systems',
      phone: '+1 (555) 341-9081',
      email: 's.jenkins@metaflow.io'
    }
  ],
  customSections: [
    {
      id: 'cust-1',
      title: 'Publications & Speaking',
      items: [
        {
          id: 'cust-item-1',
          title: 'Designing for Next-Gen Generative Interfaces',
          subtitle: 'Keynote Speaker at Design Matters 2025',
          date: 'Oct 2025',
          description: 'Presented architectural patterns for seamlessly embedding real-time AI suggestions into workspace applications.'
        }
      ]
    }
  ],
  sectionOrder: [
    'personal',
    'summary',
    'experience',
    'education',
    'skills',
    'projects',
    'certifications',
    'awards',
    'volunteer',
    'references',
    'custom'
  ],
  customization: {
    templateId: 'corporate',
    primaryColor: '#6366f1',
    accentColor: '#d946ef',
    fontFamily: 'Poppins',
    fontSize: 'md',
    sectionSpacing: 'normal',
    photoShape: 'rounded',
    hiddenSections: {},
    showIcons: true
  }
};
