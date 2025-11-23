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
  Scissors,
  Music,
  Zap,
  Palette,
  MonitorPlay,
  Clapperboard,
  Aperture
} from 'lucide-react';

export const NAV_LINKS: DataByMode<{ name: string; href: string }[]> = {
  dev: [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Shopify', href: '#shopify' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ],
  video: [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Solutions', href: '#shopify' }, // Using same ID anchor for layout consistency
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
    description: "Passionate about technology and software development. I transform complex problems into elegant solutions with clean, efficient code.",
    primaryButtonText: "View Code",
    profileImage: "https://picsum.photos/800/1000?random=10",
    socials: [
      { icon: Github, href: "#" },
      { icon: Linkedin, href: "#" },
      { icon: Twitter, href: "#" }
    ],
    floatingCard: {
      type: 'code',
      title: 'developer.tsx',
      line1: "const developer = {",
      line2: "  name: 'Rudra',",
      line3: "  skills: ['React', 'Next.js'],",
      line4: "};"
    }
  },
  video: {
    greeting: "HI, I'M",
    titleLine1: "RUDRA",
    titleLine2: "SAXENA",
    subtitle: "Professional Video Editor & ",
    subtitleHighlight: "Cinematic Storyteller",
    description: "I craft powerful visual stories through advanced editing, color grading, sound design, and motion graphics. With 200+ edited videos across brands, influencers, and YouTube creators, I help transform concepts into engaging cinematic experiences.\n\nSpecialized in: Cinematic Editing • Reels/Shorts • YouTube Long-Form • Color Grading • Motion Graphics",
    primaryButtonText: "Watch Reel",
    profileImage: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2825&auto=format&fit=crop",
    socials: [
      { icon: Instagram, href: "#" },
      { icon: Youtube, href: "#" },
      { icon: Aperture, href: "#" } // Behance equivalent
    ],
    floatingCard: {
      type: 'video',
      title: 'Video Editor', // Title used for badge
      line1: "", // Unused in new component
      line2: "",
      line3: "",
      line4: ""
    }
  }
};

export const ABOUT_DATA: DataByMode<AboutContent> = {
  dev: {
    heading: "I am a",
    headingHighlight: "Full Stack Developer",
    description1: "Hello! I'm Rudra, a full-stack developer with over 5 years of experience crafting modern web applications. I transform complex problems into elegant solutions with clean, efficient code. My journey in web development started with a fascination for creating interactive experiences.",
    description2: "Today, I specialize in building responsive, user-centered applications that deliver exceptional performance across all devices. Whether it's a custom Shopify store or a complex React dashboard, I deliver quality.",
    stats: [
      { value: "50+", label: "Projects Completed" },
      { value: "5+", label: "Years Experience" },
      { value: "15+", label: "Technologies Learned" }
    ],
    skillsTitle: "Tech Stack & Skills",
    skills: [
      { name: 'React.js' }, { name: 'TypeScript' }, { name: 'Shopify Liquid' },
      { name: 'Node.js' }, { name: 'Next.js' }, { name: 'Tailwind CSS' },
      { name: 'Technical SEO' }, { name: 'Google Analytics' }, { name: 'MongoDB' }, { name: 'AWS' }
    ],
    quote: "Rudra is an exceptional developer who delivers not just code, but business solutions. His SEO expertise helped us double our organic traffic.",
    quoteAuthor: "John Doe",
    quoteRole: "CEO, TechStart Inc."
  },
  video: {
    heading: "I am a Professional Video Editor",
    headingHighlight: "Available for Projects",
    description1: "I create high-quality, emotionally engaging videos that help brands communicate visually. My editing style focuses on pacing, transitions, music sync, color tones, and storytelling.",
    description2: "I’ve worked with influencers, brands, restaurants, and YouTubers, delivering premium edits with fast turnaround.",
    stats: [
      { value: "200+", label: "Videos Edited" },
      { value: "3+", label: "Years Experience" },
      { value: "15+", label: "Clients Across Industries" }
    ],
    skillsTitle: "Editing Tools I Use",
    skills: [
      { name: 'Adobe Premiere Pro' }, { name: 'After Effects' }, { name: 'DaVinci Resolve' },
      { name: 'Photoshop' }, { name: 'CapCut Pro' }, { name: 'Motion Graphics' },
      { name: 'Color Grading' }, { name: 'Sound Design' }, { name: 'B-roll Storytelling' }
    ],
    quote: "Rudra gave our brand a professional editing style with perfect color and pacing. Our engagement skyrocketed.",
    quoteAuthor: "Sarah Miller",
    quoteRole: "Content Director, TravelCo"
  }
};

export const SERVICES: DataByMode<Service[]> = {
  dev: [
    { id: '1', title: 'Web Development', description: 'Building responsive, high-performance web applications using modern technologies like React, Next.js, and Node.js.', icon: Globe },
    { id: '2', title: 'Shopify Development', description: 'Custom Shopify themes, app integrations, and store optimization to boost your e-commerce sales.', icon: ShoppingBag },
    { id: '3', title: 'SEO Optimization', description: 'Improving your website visibility on search engines through technical SEO, keyword research, and content strategy.', icon: Search },
    { id: '4', title: 'App Development', description: 'Cross-platform mobile application development ensuring a seamless experience on both iOS and Android.', icon: Smartphone },
    { id: '5', title: 'Performance Tuning', description: 'Optimizing website speed and core web vitals for better user experience and improved search engine rankings.', icon: Code },
    { id: '6', title: 'Analytics & Strategy', description: 'Data-driven insights and strategy planning to grow your digital presence effectively.', icon: BarChart },
  ],
  video: [
    { id: 'v1', title: 'YouTube Video Editing', description: 'Full storytelling-driven videos with jumpcuts, b-roll, pacing, music sync.', icon: Youtube },
    { id: 'v2', title: 'Reels/Shorts Editing', description: 'Fast-paced, high-retention edits with motion text & dynamic transitions.', icon: Smartphone },
    { id: 'v3', title: 'Cinematic Travel Films', description: 'Emotion-based storytelling with color grading & atmospheric sound design.', icon: Film },
    { id: 'v4', title: 'Brand Commercial Editing', description: 'Product promos, clothing brand videos, restaurant ads.', icon: ShoppingBag },
    { id: 'v5', title: 'Motion Graphics & Title Design', description: 'Lower thirds, animated text, clean title cards.', icon: Zap },
    { id: 'v6', title: 'Color Grading', description: 'Cinematic LUTs, mood-based tones, brand-consistent color styling.', icon: Palette },
  ]
};

export const SPECIALIZED_SOLUTIONS: DataByMode<{ title: string; subtitle: string; projects: SpecializedProject[] }> = {
  dev: {
    title: "Specialized Shopify Solutions",
    subtitle: "Scaling e-commerce brands through custom theme development, headless architectures, and conversion-focused optimization.",
    projects: [
      {
        id: 's1',
        title: 'Velvet & Vine Boutique',
        description: 'Developed a custom Shopify 2.0 theme focusing on mobile-first UX. Implemented advanced filtering and a streamlined checkout flow.',
        image: 'https://picsum.photos/800/600?random=20',
        technologies: ['Shopify Liquid', 'Theme Kit', 'jQuery', 'Klaviyo'],
        results: [
          { metric: 'Conversion Rate', value: '+45%' },
          { metric: 'Mobile Sales', value: '+60%' },
          { metric: 'Page Speed', value: '92/100' }
        ]
      },
      {
        id: 's2',
        title: 'PureGlow Skincare',
        description: 'Migrated a high-volume store from WooCommerce to Shopify Plus. Built a custom subscription portal using Recharge API.',
        image: 'https://picsum.photos/800/600?random=21',
        technologies: ['Shopify Plus', 'Recharge API', 'React', 'Node.js'],
        results: [
          { metric: 'Recurring Rev', value: '+30%' },
          { metric: 'Load Time', value: '-2.5s' },
          { metric: 'Admin Eff.', value: '+50%' }
        ]
      },
      {
        id: 's3',
        title: 'TechGear Global',
        description: 'Created a headless commerce solution for an international electronics retailer using Shopify Storefront API.',
        image: 'https://picsum.photos/800/600?random=22',
        technologies: ['Shopify API', 'Next.js', 'Sanity', 'Tailwind'],
        results: [
          { metric: 'Intl. Traffic', value: '+120%' },
          { metric: 'SEO Rankings', value: 'Top 3' },
          { metric: 'Bounce Rate', value: '-25%' }
        ]
      }
    ]
  },
  video: {
    title: "Specialized Video Editing Solutions",
    subtitle: "Tailored editing frameworks designed for maximum audience retention and brand identity.",
    projects: [
      {
        id: 'vs1',
        title: 'Travel Film Cinematic Rework',
        description: 'Improved color grading + pacing led to massive retention boosts.',
        image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop',
        technologies: ['Color Grading', 'Pacing', 'Storytelling'],
        results: [
          { metric: 'Retention', value: '+65%' },
          { metric: 'Watch Time', value: '+80%' }
        ]
      },
      {
        id: 'vs2',
        title: 'Fashion Brand Reels Transformation',
        description: 'Adding motion text, cuts & style for high-impact social content.',
        image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop',
        technologies: ['Motion Text', 'Transitions', 'Hooks'],
        results: [
          { metric: 'Engagement', value: '+90%' },
          { metric: 'Reach', value: '+120%' }
        ]
      },
      {
        id: 'vs3',
        title: 'YouTube Channel Improvement',
        description: 'Complete structural overhaul including thumbnails, pacing, and hooks.',
        image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop',
        technologies: ['Thumbnails', 'Structure', 'Pacing'],
        results: [
          { metric: 'Subs Growth', value: '+120%' },
          { metric: 'Retention', value: '+110%' }
        ]
      }
    ]
  }
};

export const WORKFLOW_PROCESS: DataByMode<{ title: string; subtitle: string; steps: WorkflowStep[] }> = {
  dev: {
    title: "My SEO Optimization Process",
    subtitle: "A data-driven approach to climbing search rankings. I don't guess; I analyze, implement, and optimize.",
    steps: [
      { id: 'seo1', step: 1, title: 'Audit & Analysis', description: 'Comprehensive site audit to identify technical issues, crawl errors, and existing keyword performance.', tools: ['Screaming Frog', 'GSC'] },
      { id: 'seo2', step: 2, title: 'Strategy & Keywords', description: 'Developing a tailored strategy based on competitor gap analysis and high-intent keyword research.', tools: ['Ahrefs', 'Semrush'] },
      { id: 'seo3', step: 3, title: 'Technical Implementation', description: 'Fixing Core Web Vitals, broken links, schema markup, and ensuring mobile responsiveness.', tools: ['Lighthouse', 'Schema'] },
      { id: 'seo4', step: 4, title: 'Content & Authority', description: 'Creating high-quality, SEO-optimized content briefs and building domain authority through outreach.', tools: ['Jasper', 'HARO'] },
      { id: 'seo5', step: 5, title: 'Monitoring & Reporting', description: 'Continuous tracking of rankings and traffic with transparent monthly reports detailing ROI.', tools: ['GA4', 'Looker'] }
    ]
  },
  video: {
    title: "My Editing Workflow",
    subtitle: "A structured creative process ensuring high-quality delivery, from concept to final render.",
    steps: [
      { id: 'edit1', step: 1, title: 'Concept & Briefing', description: 'Understanding your brand, story, style & required mood. We align on vision.', tools: [] },
      { id: 'edit2', step: 2, title: 'Script & Timeline Design', description: 'Building structure, scenes, effects, hooks, and organizing assets.', tools: [] },
      { id: 'edit3', step: 3, title: 'Rough Cut Assembly', description: 'Arranging clips, selecting the best b-roll, and forming the core narrative.', tools: [] },
      { id: 'edit4', step: 4, title: 'Fine Cut, Color & Sound', description: 'Transitions, color grading, sound design, motion graphics, and polish.', tools: [] },
      { id: 'edit5', step: 5, title: 'Final Delivery', description: 'Exporting in multiple formats (4K, Reels, Shorts, YouTube) with thumbnail guidance.', tools: [] }
    ]
  }
};

export const PROJECTS: DataByMode<Project[]> = {
  dev: [
    {
      id: 'd1',
      title: 'N Plus Pro',
      category: 'B2B Platform',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2670&auto=format&fit=crop', // Networking/Business
      description: 'A modern B2B platform for professional networking and business solutions.',
      tech: ['React', 'Node.js', 'MongoDB'],
      link: '#',
    },
    {
      id: 'd2',
      title: 'Platform One Inc',
      category: 'Enterprise',
      image: 'https://images.unsplash.com/photo-1558494949-ef526b0042a0?q=80&w=2668&auto=format&fit=crop', // Server/Tech
      description: 'Enterprise software solutions and digital transformation services.',
      tech: ['Next.js', 'TypeScript', 'Tailwind'],
      link: '#',
    },
    {
      id: 'd3',
      title: 'Spotlite Mall of Joy',
      category: 'E-Commerce',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2670&auto=format&fit=crop', // Mall/Shopping
      description: 'An interactive e-commerce platform for retail shopping experiences.',
      tech: ['React', 'Redux', 'Express'],
      link: '#',
    },
  ],
  video: [
    {
      id: 'v1',
      title: 'Travel Film — Uttarakhand',
      category: 'Travel',
      image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1000&auto=format&fit=crop',
      description: 'Cinematic mountain storytelling focusing on atmospheric immersion and sound design.',
      tech: ['Storytelling', 'Grading'],
      link: '#',
    },
    {
      id: 'v2',
      title: 'Restaurant Promo — Chill Bill UAE',
      category: 'Commercial',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop',
      description: 'Fast-paced motion & food highlights designed to drive foot traffic and social engagement.',
      tech: ['Fast Cuts', 'Motion'],
      link: '#',
    },
    {
      id: 'v3',
      title: 'Brand Reel — Velnyy Clothing',
      category: 'Fashion',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop',
      description: 'High-fashion transitions & text animations synced to trending audio for maximum reach.',
      tech: ['Transitions', 'Animation'],
      link: '#',
    },
    {
      id: 'v4',
      title: 'YouTube Long Form — Interview Edit',
      category: 'YouTube',
      image: 'https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a?q=80&w=1000&auto=format&fit=crop',
      description: 'Clean pacing, noise reduction, and b-roll overlays for a polished, professional interview.',
      tech: ['Pacing', 'B-Roll'],
      link: '#',
    }
  ]
};

export const SHORT_FORM_VIDEOS: ShortFormVideo[] = [
  {
    id: 'sf1',
    title: 'Typographic Promo',
    category: 'Motion Graphics',
    views: '45K+ Views',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
    videoUrl: 'https://drive.google.com/file/d/1vg4CVhCiHBgKyN6QIHgQCSmusuqB2Vfo/view?usp=sharing', // User provided link
  },
  {
    id: 'sf2',
    title: 'Software Tutorial',
    category: 'Educational',
    views: '120K+ Views',
    image: 'https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=1000&auto=format&fit=crop',
    videoUrl: 'https://drive.google.com/file/d/1vg4CVhCiHBgKyN6QIHgQCSmusuqB2Vfo/view?usp=sharing', // User provided link
  },
  {
    id: 'sf3',
    title: 'Before & After Color',
    category: 'Color Grading',
    views: '85K+ Views',
    image: 'https://images.unsplash.com/photo-1535451801241-b5395e1d4a1b?q=80&w=1000&auto=format&fit=crop',
    videoUrl: 'https://drive.google.com/file/d/1vg4CVhCiHBgKyN6QIHgQCSmusuqB2Vfo/view?usp=sharing', // User provided link
  },
  {
    id: 'sf4',
    title: 'Financial VSL',
    category: 'Commercial',
    views: '200K+ Views',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=1000&auto=format&fit=crop',
    videoUrl: 'https://drive.google.com/file/d/1vg4CVhCiHBgKyN6QIHgQCSmusuqB2Vfo/view?usp=sharing', // User provided link
  }
];

export const TESTIMONIALS: DataByMode<Testimonial[]> = {
  dev: [
    {
      id: 't1',
      name: 'Sarah Jenkins',
      role: 'Marketing Director',
      company: 'LuxeApparel',
      content: 'Rudra transformed our online store. The new Shopify theme is blazing fast, and our mobile conversion rate doubled within two months. Highly recommended!',
      image: 'https://picsum.photos/100/100?random=50'
    },
    {
      id: 't2',
      name: 'Michael Chen',
      role: 'Founder',
      company: 'DataFlow SaaS',
      content: 'The technical SEO expertise Rudra brings is unmatched. He cleaned up our site architecture and we saw a 300% increase in organic traffic in just 6 months.',
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
      client: 'CloudSync Solutions',
      category: 'Technical SEO',
      problem: 'CloudSync was struggling to rank for industry terms despite having a good product. Their website had severe technical debt.',
      solution: 'Executed a complete technical overhaul. Fixed 400+ crawl errors and created a topic-cluster content strategy.',
      impact: 'Achieved a 300% increase in organic traffic over 6 months. Domain Authority increased by 12 points.'
    },
    {
      id: 'cs2',
      title: 'Revitalizing a Fashion Brand Checkout',
      client: 'UrbanThreads',
      category: 'Shopify Development',
      problem: 'UrbanThreads was experiencing a 75% cart abandonment rate. The checkout process was clunky and non-intuitive.',
      solution: 'Redesigned the cart drawer and checkout flow. Implemented a one-page checkout modification and trust badges.',
      impact: 'Reduced cart abandonment rate to 55%. Recovered approximately $150k in annual revenue.'
    }
  ],
  video: [
    {
      id: 'vcs1',
      title: 'Cinematic Travel Film Growth',
      client: 'Wanderlust Co',
      category: 'Retention',
      problem: 'Low retention rates and weak color grading were causing viewers to drop off early.',
      solution: 'Full color rework + pacing edit. Added sound design to immerse the viewer.',
      impact: '+80% higher viewer retention and +65% more engagement.'
    },
    {
      id: 'vcs2',
      title: 'Fashion Brand Engagement Boost',
      client: 'VogueStreet',
      category: 'Social Growth',
      problem: 'Basic reels were not performing well on the algorithm, lacking dynamic elements.',
      solution: 'Implemented motion text, fast pacing, and trending audio synchronization.',
      impact: '+90% engagement increase and +120% reach.'
    }
  ]
};

export const TICKER_ITEMS: DataByMode<string[]> = {
  dev: [
    "Web Development", "Shopify Expert", "Technical SEO", "React.js",
    "Next.js", "E-commerce Strategy", "Performance Optimization", "UI/UX Design", "Full Stack Engineering"
  ],
  video: [
    "Video Editing", "Cinematic Storytelling", "Color Grading", "Motion Graphics",
    "Sound Design", "Premiere Pro", "After Effects", "DaVinci Resolve", "Visual Effects", "Visual Storytelling"
  ]
};