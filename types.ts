import React from 'react';
import { LucideIcon } from 'lucide-react';

export type AppMode = 'dev' | 'video';

export interface DataByMode<T> {
  dev: T;
  video: T;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  tech: string[]; // Used for both Tech stack and Editing tools
  link: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Skill {
  name: string;
  level?: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

// Renamed from ShopifyProject to encompass both types
export interface SpecializedProject {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[]; // or Tags
  results: {
    metric: string;
    value: string;
  }[];
  link?: string;
}

// Renamed from SEOStep
export interface WorkflowStep {
  id: string;
  step: number;
  title: string;
  description: string;
  tools?: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  company?: string;
  content: string;
  image: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  client?: string;
  category: string;
  problem: string; // Used as "Before" for video
  solution: string; // Used as "After" for video
  impact: string; // Used as "Result" for video
}

export interface SocialLink {
  icon: LucideIcon;
  href: string;
}

export interface HeroModeContent {
  greeting: string;
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  subtitleHighlight: string;
  description: string;
  primaryButtonText: string;
  socials: SocialLink[];
  profileImage: string;
  floatingCard: {
    type: 'code' | 'video';
    title: string;
    line1: string;
    line2: string;
    line3: string;
    line4?: string;
  };
}

export interface AboutContent {
  heading: string;
  headingHighlight: string;
  description1: string;
  description2: string;
  stats: {
    value: string;
    label: string;
  }[];
  skillsTitle: string;
  skills: Skill[];
  quote: string;
  quoteAuthor: string;
  quoteRole: string;
}

export interface ShortFormVideo {
  id: string;
  title: string;
  image: string;
  videoUrl: string;
  views: string;
  category: string;
}