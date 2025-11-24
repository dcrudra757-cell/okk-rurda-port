import { Project, Service, SpecializedProject, WorkflowStep, Testimonial, CaseStudy, HeroModeContent, DataByMode, AboutContent, ShortFormVideo } from './types';
import { 
  Code, 
  ShoppingBag, 
  Search, 
  Smartphone, 
  Globe, 
  BarChart,
  Github,
  Linkedin,
  Twitter,
  Youtube,
  Instagram,
  Video,
  Film,
  Zap,
  Palette,
  Aperture,
  Music,
  Layout,
  TrendingUp,
  Camera
} from 'lucide-react';

export const NAV_LINKS: DataByMode<{ name: string; href: string }[]> = {
  dev: [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Solutions', href: '#shopify' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ],
  video: [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Solutions', href: '#shopify' },
    { name: 'Shorts', href: '#shorts' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ]
};

export const HERO_DATA: DataByMode<HeroModeContent> = {
  dev: {
    greeting: "HELLO! I'M",
    titleLine1: "RUDRA",
    titleLine2: "SAXENA",
    subtitle: "Full Stack Developer & ",
    subtitleHighlight: "Technical SEO Specialist",
    description: "Creating Cinematic, Clean & Conversion-Focused Digital Experiences. I transform complex problems into elegant solutions.",
    primaryButtonText: "View Code",
    secondaryButtonText: "View Github",
    badges: ["React.js", "Next.js", "Shopify Expert", "Technical SEO", "Full Stack"],
    stats: [
      { value: "15+", label: "Web Projects" },
      { value: "2+", label: "Years Exp" },
      { value: "100%", label: "Satisfaction" }
    ],
    profileImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop",
    socials: [
      { icon: Github, href: "#" },
      { icon: Linkedin, href: "#" },
      { icon: Twitter, href: "#" }
    ]
  },
  video: {
    greeting: "HI, I'M",
    titleLine1: "RUDRA",
    titleLine2: "SAXENA",
    subtitle: "Professional Video Editor & ",
    subtitleHighlight: "Cinematic Storyteller",
    description: "Creating Cinematic, Clean & Conversion-Focused Digital Experiences. I turn raw footage into powerful stories.",
    primaryButtonText: "Watch Reel",
    secondaryButtonText: "View Showreel",
    badges: ["Video Editing", "Cinematic Storytelling", "Color Grading", "Motion Graphics"],
    stats: [
      { value: "200+", label: "Videos Edited" },
      { value: "2+", label: "Years Exp" },
      { value: "50+", label: "Clients" }
    ],
    profileImage: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2825&auto=format&fit=crop",
    socials: [
      { icon: Instagram, href: "#" },
      { icon: Youtube, href: "#" },
      { icon: Aperture, href: "#" }
    ]
  }
};

export const ABOUT_DATA: DataByMode<AboutContent> = {
  dev: {
    heading: "Building Products",
    headingHighlight: "With Code & Strategy",
    description1: "My journey into development started with a passion for building products that solve real problems. I obsess over clean UI, speed, and brand understanding.",
    description2: "From Technical SEO to complex Shopify stores, I ensure every line of code adds value to the business logic.",
    timeline: [
      { year: "2022", title: "Started Coding", description: "Began journey with HTML, CSS, JS." },
      { year: "2023", title: "Full Stack Transition", description: "Mastered React, Node.js, MongoDB." },
      { year: "2024", title: "Pro Developer", description: "15+ Projects delivered, Specialized in Shopify." }
    ],
    skillsTitle: "Development Stack",
    skills: [
      { name: 'HTML/CSS/JS' }, { name: 'React.js' }, { name: 'Next.js' },
      { name: 'Node.js' }, { name: 'MongoDB' }, { name: 'Firebase' },
      { name: 'Shopify Dev' }, { name: 'Technical SEO' }
    ]
  },
  video: {
    heading: "Crafting Stories",
    headingHighlight: "Frame by Frame",
    description1: "I started video editing to tell stories that move people. What began as a hobby in 2022 quickly turned into a professional obsession with pacing, color, and sound.",
    description2: "I combine cinematic vision with technical precision to create content that retains attention and builds brands.",
    timeline: [
      { year: "2022", title: "Started Editing", description: "First dive into Premiere Pro & storytelling." },
      { year: "2023", title: "Freelance Growth", description: "Worked with 10+ influencers & brands." },
      { year: "2024", title: "Cinematic Mastery", description: "Edited 200+ videos, mastered Color & Sound." }
    ],
    skillsTitle: "Editing Arsenal",
    skills: [
      { name: 'Premiere Pro' }, { name: 'After Effects' }, { name: 'DaVinci Resolve' },
      { name: 'Sound Design' }, { name: 'Color Grading' }, { name: 'Motion Graphics' }
    ]
  }
};

export const SERVICES: DataByMode<Service[]> = {
  dev: [
    { id: '1', title: 'Full Stack Web Dev', description: 'End-to-end development using MERN stack or Next.js.', icon: Code },
    { id: '2', title: 'Shopify Store Creation', description: 'Custom themes, setup, and conversion optimization.', icon: ShoppingBag },
    { id: '3', title: 'Technical SEO', description: 'Audits, ranking boosts, and structured data implementation.', icon: Search },
    { id: '4', title: 'App Development', description: 'Scalable web and mobile applications.', icon: Smartphone },
    { id: '5', title: 'Performance Optimization', description: 'Speeding up websites for better UX and SEO.', icon: Zap },
    { id: '6', title: 'UI/UX Web Redesign', description: 'Modernizing legacy interfaces for better engagement.', icon: Layout },
    { id: '7', title: 'Analytics & Strategy', description: 'Data-driven growth planning.', icon: BarChart },
  ],
  video: [
    { id: 'v1', title: 'Short-Form Editing', description: 'Reels, TikToks, Shorts designed for virality.', icon: Smartphone },
    { id: 'v2', title: 'Long-Form Editing', description: 'YouTube videos, podcasts, and interviews.', icon: Video },
    { id: 'v3', title: 'Cinematic Travel Edits', description: 'High-end travel films with immersive sound design.', icon: Globe },
    { id: 'v4', title: 'Commercial Ads', description: 'Product videos and brand commercials.', icon: ShoppingBag },
    { id: 'v5', title: 'Music/Sound Design', description: 'Audio mixing, foley, and SFX.', icon: Music },
    { id: 'v6', title: 'Color Grading', description: 'Advanced color correction and grading.', icon: Palette },
    { id: 'v7', title: 'Motion Graphics', description: 'Titles, lower thirds, and animations.', icon: Zap },
  ]
};

export const SPECIALIZED_SOLUTIONS: DataByMode<{ title: string; subtitle: string; projects: SpecializedProject[] }> = {
  dev: {
    title: "Specialized Dev Solutions",
    subtitle: "Targeted frameworks to solve specific business problems.",
    projects: [
      {
        id: 's1',
        title: 'Shopify Conversions Optimization',
        description: 'Optimizing checkout flows and product pages.',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=1000&auto=format&fit=crop',
        technologies: ['CRO', 'Liquid', 'A/B Testing'],
        results: [{ metric: 'Sales', value: '+45%' }, { metric: 'Cart Add', value: '+60%' }]
      },
      {
        id: 's2',
        title: 'SEO Ranking Boost',
        description: 'Technical audits and content strategy.',
        image: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?q=80&w=1000&auto=format&fit=crop',
        technologies: ['Schema', 'Backlinks', 'Core Vitals'],
        results: [{ metric: 'Traffic', value: '+300%' }, { metric: 'Rank', value: 'Top 3' }]
      },
      {
        id: 's3',
        title: 'Brand Website Redesign',
        description: 'Modernizing outdated visuals for impact.',
        image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop',
        technologies: ['React', 'Framer Motion', 'Tailwind'],
        results: [{ metric: 'Bounce Rate', value: '-40%' }, { metric: 'Time on Site', value: '+2m' }]
      }
    ]
  },
  video: {
    title: "Specialized Video Solutions",
    subtitle: "Tailored editing styles for specific content niches.",
    projects: [
      {
        id: 'vs1',
        title: 'YT Documentary Editing',
        description: 'Long-form narrative structures with archival footage.',
        image: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?q=80&w=1000&auto=format&fit=crop',
        technologies: ['Storytelling', 'Pacing', 'Archival'],
        results: [{ metric: 'Retention', value: '+65%' }, { metric: 'Watch Time', value: '+80%' }]
      },
      {
        id: 'vs2',
        title: 'Travel Film Production',
        description: 'Cinematic grading and immersive soundscapes.',
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1000&auto=format&fit=crop',
        technologies: ['Sound Design', 'Color', 'Flow'],
        results: [{ metric: 'Engagement', value: '+90%' }, { metric: 'Shares', value: '+120%' }]
      },
      {
        id: 'vs3',
        title: 'Commercial Visual Strategy',
        description: 'High-energy ads for social media conversion.',
        image: 'https://images.unsplash.com/photo-1559070135-f259b369bf87?q=80&w=1000&auto=format&fit=crop',
        technologies: ['Fast Cuts', 'Motion', 'Hooks'],
        results: [{ metric: 'CTR', value: '+4%' }, { metric: 'ROAS', value: '3.5x' }]
      }
    ]
  }
};

export const WORKFLOW_PROCESS: DataByMode<{ title: string; subtitle: string; steps: WorkflowStep[] }> = {
  dev: {
    title: "Development Workflow",
    subtitle: "From analysis to deployment, a structured approach.",
    steps: [
      { id: 'seo1', step: 1, title: 'Discovery & Audit', description: 'Understanding requirements and auditing existing tech.', tools: ['Figma', 'Audit'] },
      { id: 'seo2', step: 2, title: 'Architecture & Design', description: 'Planning the database schema and UI/UX flow.', tools: ['System Design', 'Wireframe'] },
      { id: 'seo3', step: 3, title: 'Core Development', description: 'Writing clean, scalable code with modern frameworks.', tools: ['VS Code', 'React'] },
      { id: 'seo4', step: 4, title: 'Testing & SEO', description: 'Rigorous testing and technical SEO implementation.', tools: ['Jest', 'Lighthouse'] },
      { id: 'seo5', step: 5, title: 'Deploy & Scale', description: 'Launching to production and monitoring performance.', tools: ['Vercel', 'AWS'] }
    ]
  },
  video: {
    title: "Editing Workflow",
    subtitle: "Structured creativity for maximum impact.",
    steps: [
      { id: 'edit1', step: 1, title: 'Concept & Ingest', description: 'Organizing footage and aligning on the story arc.', tools: [] },
      { id: 'edit2', step: 2, title: 'Script & Assembly', description: 'Building the skeleton of the video on the timeline.', tools: [] },
      { id: 'edit3', step: 3, title: 'Rough Cut', description: 'Refining the flow, removing fluff, adding b-roll.', tools: [] },
      { id: 'edit4', step: 4, title: 'Fine Cut & Polish', description: 'Advanced transitions, VFX, and pacing adjustments.', tools: [] },
      { id: 'edit5', step: 5, title: 'Color & Sound', description: 'Final grade and immersive audio mixing.', tools: [] }
    ]
  }
};

export const PROJECTS: DataByMode<Project[]> = {
  dev: [
    {
      id: 'd1',
      title: 'N Plus Pro',
      category: 'B2B Platform',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop',
      description: 'A modern B2B platform for professional networking.',
      tech: ['React', 'Node.js', 'MongoDB'],
      link: '#',
      results: 'Increased user retention by 40%'
    },
    {
      id: 'd2',
      title: 'Platform One Inc',
      category: 'Enterprise',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop',
      description: 'Enterprise software solutions and digital transformation.',
      tech: ['Next.js', 'TypeScript', 'Tailwind'],
      link: '#',
      results: 'Streamlined ops by 25%'
    },
    {
      id: 'd3',
      title: 'Sports Mall of Joy',
      category: 'E-Commerce',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2632&auto=format&fit=crop',
      description: 'An interactive e-commerce platform for sports retail.',
      tech: ['React', 'Redux', 'Express'],
      link: '#',
      results: 'Boosted sales by 15%'
    },
    {
      id: 'd4',
      title: 'NLP AI Tool',
      category: 'AI Application',
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop',
      description: 'Natural Language Processing tool for text analysis.',
      tech: ['Python', 'React', 'OpenAI API'],
      link: '#',
      results: 'Automated 60% of manual tasks'
    }
  ],
  video: [
    {
      id: 'v1',
      title: 'Travel Film — Uttarakhand',
      category: 'Travel',
      image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1000&auto=format&fit=crop',
      description: 'Cinematic mountain storytelling with immersive sound.',
      tech: ['Storytelling', 'Grading'],
      link: '#',
      results: '1M+ Views on Instagram'
    },
    {
      id: 'v2',
      title: 'Commercial Café Ad',
      category: 'Commercial',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop',
      description: 'High-energy ad promoting a new coffee blend.',
      tech: ['Fast Cuts', 'Motion'],
      link: '#',
      results: 'Drive 20% footfall increase'
    },
    {
      id: 'v3',
      title: 'Fashion Film Edit',
      category: 'Fashion',
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1000&auto=format&fit=crop',
      description: 'Stylized edit for a clothing brand summer collection.',
      tech: ['Transitions', 'VFX'],
      link: '#',
      results: 'Used in National Campaign'
    },
    {
      id: 'v4',
      title: 'Documentary Style Edit',
      category: 'Documentary',
      image: 'https://images.unsplash.com/photo-1555679427-1f6dfcce943b?q=80&w=1000&auto=format&fit=crop',
      description: 'Long-form narrative about local artisans.',
      tech: ['Pacing', 'Interview'],
      link: '#',
      results: 'Award Winning Short'
    }
  ]
};

export const SHORT_FORM_VIDEOS: ShortFormVideo[] = [
  {
    id: 'sf1',
    title: 'Travel Vlog Highlight',
    category: 'Travel',
    views: '45K+ Views',
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop',
    videoUrl: 'https://drive.google.com/file/d/1vg4CVhCiHBgKyN6QIHgQCSmusuqB2Vfo/view?usp=sharing', 
  },
  {
    id: 'sf2',
    title: 'Product Unboxing',
    category: 'Commercial',
    views: '120K+ Views',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop',
    videoUrl: 'https://drive.google.com/file/d/1vg4CVhCiHBgKyN6QIHgQCSmusuqB2Vfo/view?usp=sharing', 
  },
  {
    id: 'sf3',
    title: 'Daily Vlog',
    category: 'Vlogs',
    views: '85K+ Views',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop',
    videoUrl: 'https://drive.google.com/file/d/1vg4CVhCiHBgKyN6QIHgQCSmusuqB2Vfo/view?usp=sharing', 
  },
  {
    id: 'sf4',
    title: 'Reel Transition Tutorial',
    category: 'Reels',
    views: '200K+ Views',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop',
    videoUrl: 'https://drive.google.com/file/d/1vg4CVhCiHBgKyN6QIHgQCSmusuqB2Vfo/view?usp=sharing', 
  }
];

export const TESTIMONIALS: DataByMode<Testimonial[]> = {
  dev: [
    {
      id: 't1',
      name: 'Sarah Jenkins',
      role: 'Marketing Director',
      company: 'LuxeApparel',
      content: 'Rudra transformed our online store. The new Shopify theme is blazing fast, and our mobile conversion rate doubled within two months.',
      image: 'https://picsum.photos/100/100?random=50'
    },
    {
      id: 't2',
      name: 'Michael Chen',
      role: 'Founder',
      company: 'DataFlow SaaS',
      content: 'The technical SEO expertise Rudra brings is unmatched. He cleaned up our site architecture and we saw a 300% increase in organic traffic.',
      image: 'https://picsum.photos/100/100?random=51'
    },
    {
      id: 't3',
      name: 'Elena Rodriguez',
      role: 'E-commerce Manager',
      company: 'PureGlow',
      content: 'Working with Rudra was seamless. He understood our vision for the subscription portal perfectly and executed it with precision code.',
      image: 'https://picsum.photos/100/100?random=52'
    }
  ],
  video: [
    {
      id: 'vt1',
      name: 'Alex Johnson',
      role: 'Marketing',
      company: 'TravelCo',
      content: 'Rudra gave our brand a professional editing style with perfect color and pacing.',
      image: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      id: 'vt2',
      name: 'Emily Davis',
      role: 'Influencer',
      company: 'StyleGram',
      content: 'Amazing reels! Engagement went up instantly. The transitions were smooth and on beat.',
      image: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      id: 'vt3',
      name: 'Mark Wilson',
      role: 'Founder',
      company: 'TechStart',
      content: 'Delivers fast, understands brand vibe, highly recommended for anyone needing high-end edits.',
      image: 'https://randomuser.me/api/portraits/men/86.jpg'
    }
  ]
};

export const CASE_STUDIES: DataByMode<CaseStudy[]> = {
  dev: [
    {
      id: 'cs1',
      title: 'Scaling Organic Traffic for B2B SaaS',
      client: 'CloudSync',
      category: 'Technical SEO',
      problem: 'Struggling to rank for industry terms.',
      solution: 'Technical overhaul & content strategy.',
      impact: '300% increase in organic traffic.'
    },
    {
      id: 'cs2',
      title: 'Revitalizing Fashion Checkout',
      client: 'UrbanThreads',
      category: 'Shopify Dev',
      problem: '75% cart abandonment rate.',
      solution: 'Redesigned checkout flow.',
      impact: 'Reduced abandonment to 55%.'
    }
  ],
  video: [
    {
      id: 'vcs1',
      title: 'Cinematic Travel Film',
      client: 'Wanderlust',
      category: 'Retention',
      problem: 'Low retention rates.',
      solution: 'Color rework + pacing edit.',
      impact: '+80% higher viewer retention.'
    },
    {
      id: 'vcs2',
      title: 'Brand Engagement Boost',
      client: 'VogueStreet',
      category: 'Social Growth',
      problem: 'Basic reels underperforming.',
      solution: 'Motion text & fast pacing.',
      impact: '+90% engagement increase.'
    }
  ]
};

export const TICKER_ITEMS: DataByMode<string[]> = {
  dev: ["Web Dev", "Shopify", "SEO", "React", "Next.js", "Node", "MongoDB", "UI/UX", "Analytics"],
  video: ["Video Editing", "Color Grading", "Motion Graphics", "Sound Design", "Premiere Pro", "After Effects", "Storytelling", "VFX"]
};