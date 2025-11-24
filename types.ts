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
  results?: string; // Result metrics
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

export interface SpecializedProject {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[]; 
  results: {
    metric: string;
    value: string;
  }[];
  link?: string;
}

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
  problem: string; 
  solution: string; 
  impact: string; 
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
  secondaryButtonText: string;
  badges: string[];
  stats: { value: string; label: string }[];
  socials: SocialLink[];
  profileImage: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface AboutContent {
  heading: string;
  headingHighlight: string;
  description1: string;
  description2: string;
  timeline: TimelineItem[];
  skillsTitle: string;
  skills: Skill[];
}

export interface ShortFormVideo {
  id: string;
  title: string;
  image: string;
  videoUrl: string;
  views: string;
  category: string;
}