import React, { useRef, useEffect, useState } from 'react';
import { PROJECTS } from '../constants';
import { Play, ArrowUpRight, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { AppMode } from '../types';

interface ProjectsProps {
  mode: AppMode;
}

const Projects: React.FC<ProjectsProps> = ({ mode }) => {
  const [projects, setProjects] = useState<any[]>(PROJECTS[mode] || []);
  const isVideo = mode === 'video';
  const accentText = isVideo ? 'text-cine-red' : 'text-blue-500';
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = isVideo ? 520 : 460;
      current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const shuffle = (arr: any[]) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  useEffect(() => {
    let mounted = true;
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        if (!mounted) return;
        const list = data && (data.video || data.dev) ? (mode === 'video' ? (data.video || []) : (data.dev || [])) : (Array.isArray(data) ? data : []);
        if (list && list.length > 0) {
          setProjects(shuffle(list));
          return;
        }
        setProjects(shuffle(PROJECTS[mode] || []));
      })
      .catch(() => {
        if (!mounted) return;
        setProjects(shuffle(PROJECTS[mode] || []));
      });

    return () => { mounted = false; };
  }, [mode]);

  const reshuffle = () => setProjects(prev => shuffle(prev || []));

  return (
    <section id="projects" data-section className="bg-darker overflow-hidden border-t border-white/5">
      <div className="section-shell">
        {/* Header Section - Mobile Optimized */}
        <div className="flex flex-col gap-3 xs:gap-3.5 sm:gap-4 md:gap-5 mb-5 xs:mb-5.5 sm:mb-6 md:mb-8 lg:mb-12">
          <div className="flex-1 min-w-0">
            <h3 className={`${accentText} font-bold tracking-[0.2em] mb-1 xs:mb-1.5 sm:mb-2 md:mb-3 uppercase text-[8px] xs:text-[9px] sm:text-xs`}>
              PORTFOLIO
            </h3>
            <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-heading font-black text-white tracking-tight leading-tight">
              Featured {isVideo ? 'Edits' : 'Work'}
            </h2>
          </div>

          {/* Controls - Mobile Optimized */}
          <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-2 md:gap-2.5 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0 -mx-3 sm:mx-0 px-3 sm:px-0">
            <button 
              onClick={() => scroll('left')} 
              className="w-9 xs:w-9.5 sm:w-10 h-9 xs:h-9.5 sm:h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 text-white transition-colors hover:border-white/30 active:scale-95 flex-shrink-0 min-h-[44px] min-w-[44px]"
              aria-label="Scroll left"
            >
              <ChevronLeft size={16} className="xs:size-4.5 sm:size-5" />
            </button>
            
            <button 
              onClick={() => scroll('right')} 
              className="w-9 xs:w-9.5 sm:w-10 h-9 xs:h-9.5 sm:h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 text-white transition-colors hover:border-white/30 active:scale-95 flex-shrink-0 min-h-[44px] min-w-[44px]"
              aria-label="Scroll right"
            >
              <ChevronRight size={16} className="xs:size-4.5 sm:size-5" />
            </button>

            <button
              onClick={reshuffle}
              className="hidden sm:inline-flex items-center justify-center h-9 xs:h-9.5 sm:h-10 px-3 sm:px-4 rounded-full border border-white/10 hover:bg-white/5 text-white text-[9px] xs:text-[10px] sm:text-xs font-bold transition-all hover:border-white/30 ml-1 sm:ml-2 flex-shrink-0 min-h-[44px]"
            >
              Shuffle
            </button>

            <a 
              href="#" 
              className="hidden md:flex items-center justify-center h-9 xs:h-9.5 sm:h-10 px-3 sm:px-4 lg:px-5 rounded-full border border-white/10 hover:bg-white/5 text-white text-[9px] xs:text-[10px] sm:text-xs font-bold transition-all hover:border-white/30 ml-1 sm:ml-2 flex-shrink-0 min-h-[44px]"
            >
              View All
            </a>
          </div>
        </div>

        {/* Projects Scroll Container - Mobile Optimized */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-2 xs:gap-2.5 sm:gap-3 md:gap-4 lg:gap-6 overflow-x-auto pb-3 xs:pb-4 sm:pb-5 md:pb-6 lg:pb-8 snap-x snap-mandatory -mx-3 sm:-mx-6 px-3 sm:px-6 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projects.map((project, idx) => (
            mode === 'dev' ? (
              // DEV MODE CARD - Mobile Optimized
              <div key={project.id} className="min-w-[90vw] xs:min-w-[300px] sm:min-w-[340px] md:min-w-[400px] lg:min-w-[440px] snap-start shrink-0 h-full animate-scale-in" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="group h-full bg-[#0F1115] border border-white/5 rounded-lg xs:rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:scale-105 active:scale-95 flex flex-col">
                  {/* Image Section - Mobile Responsive */}
                  <div className="relative h-28 xs:h-32 sm:h-40 md:h-48 lg:h-52 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay"></div>
                    {project.category && (
                      <span className="absolute top-1.5 xs:top-2 sm:top-3 md:top-4 right-1.5 xs:right-2 sm:right-3 md:right-4 bg-pink-600 text-white text-[7px] xs:text-[8px] sm:text-[9px] md:text-xs font-bold px-1.5 xs:px-2 sm:px-3 py-0.5 sm:py-1 rounded-full uppercase tracking-wider shadow-lg">
                        {project.category}
                      </span>
                    )}
                  </div>

                  {/* Content Section - Mobile Optimized Spacing */}
                  <div className="p-2.5 xs:p-3 sm:p-4 md:p-5 lg:p-6 flex flex-col flex-1 bg-[#0b0c10]">
                    <h3 className="text-sm xs:text-base sm:text-lg md:text-xl font-bold text-white mb-1 xs:mb-1.5 sm:mb-2 line-clamp-1">{project.title}</h3>
                    <p className="text-slate-400 text-[10px] xs:text-xs sm:text-sm leading-[1.4] mb-2.5 xs:mb-3 sm:mb-4 md:mb-5 line-clamp-2 flex-1">{project.description}</p>

                    {/* Tags - Mobile Responsive */}
                    <div className="flex flex-wrap gap-0.5 xs:gap-1 sm:gap-1.5 md:gap-2 mb-2.5 xs:mb-3 sm:mb-4 md:mb-5">
                      {project.tech.slice(0, 3).map(t => (
                        <span key={t} className="px-1.5 xs:px-2 sm:px-3 py-0.5 sm:py-1 md:py-1.5 bg-[#1A2333] text-blue-400 border border-blue-500/10 text-[7px] xs:text-[8px] sm:text-[9px] md:text-[10px] font-bold rounded-full whitespace-nowrap">
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Desktop Link */}
                    <a href={project.link} className="hidden sm:inline-flex items-center text-[9px] xs:text-[10px] sm:text-xs md:text-sm font-bold text-[#A78BFA] hover:text-white transition-colors mt-auto group/link mb-0">
                      View Case Study <ArrowRight size={12} className="xs:size-3 sm:size-3.5 ml-1 transition-transform group-hover/link:translate-x-1" />
                    </a>

                    {/* Mobile Full-Width CTA */}
                    <a href={project.link} className="sm:hidden mt-1.5 block w-full py-2 rounded-lg bg-[#6b46c1] hover:bg-[#7c3aed] text-white font-bold text-[8px] xs:text-[9px] text-center transition-all active:scale-95 min-h-[36px] flex items-center justify-center">
                      View
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              // VIDEO MODE CARD - Mobile Optimized
              <div key={project.id} className="min-w-[90vw] xs:min-w-[290px] sm:min-w-[340px] md:min-w-[450px] lg:min-w-[500px] snap-start shrink-0 group cursor-pointer animate-scale-in" style={{ animationDelay: `${idx * 100}ms` }}>
                {/* Image Container - Mobile Responsive Aspect */}
                <div className="relative aspect-video rounded-lg xs:rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden mb-1.5 xs:mb-2 sm:mb-3 md:mb-4 bg-[#111] border border-white/5 group-hover:border-red-500/50 transition-all duration-300 shadow-lg group-hover:shadow-red-500/20">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-85 group-hover:opacity-100"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent group-hover:from-black/20 transition-all duration-500"></div>

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-10 xs:w-12 sm:w-14 md:w-16 h-10 xs:h-12 sm:h-14 md:h-16 rounded-full bg-red-600/80 backdrop-blur-md border-2 border-white flex items-center justify-center transform scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 shadow-2xl shadow-red-600/50">
                      <Play fill="white" className="ml-1 text-white xs:size-5 sm:size-6" size={16} />
                    </div>
                  </div>

                  <div className="absolute top-1.5 xs:top-2 sm:top-3 md:top-4 left-1.5 xs:left-2 sm:left-3 md:left-4">
                    <span className="bg-red-600 text-white text-[7px] xs:text-[8px] sm:text-[9px] md:text-[10px] font-bold uppercase tracking-widest px-1.5 xs:px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 md:py-1.5 rounded-full border border-red-500/50 shadow-lg">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Text Content - Mobile Optimized */}
                <div className="px-0">
                  <div className="flex justify-between items-start mb-0.5 xs:mb-1 sm:mb-1.5 md:mb-2 gap-1.5 sm:gap-2">
                    <h3 className="text-[10px] xs:text-xs sm:text-base md:text-lg lg:text-xl font-bold text-white group-hover:text-red-400 transition-colors duration-300 leading-tight line-clamp-1 flex-1">
                      {project.title}
                    </h3>
                    <a href={project.link} className="p-1 xs:p-1.5 sm:p-2 rounded-full hover:bg-red-600/20 transition-all duration-300 flex-shrink-0 group/link min-h-[44px] min-w-[44px] flex items-center justify-center">
                      <ArrowUpRight size={12} className="xs:size-3.5 sm:size-4 md:size-5 text-gray-400 group-hover/link:text-red-500 transition-colors" />
                    </a>
                  </div>

                  <p className="text-gray-400 text-[9px] xs:text-xs sm:text-xs md:text-sm leading-[1.4] mb-1.5 xs:mb-2 sm:mb-2.5 md:mb-3 line-clamp-2 group-hover:text-gray-300 transition-colors">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-0.5 xs:gap-1 sm:gap-1.5 md:gap-2 mb-2 xs:mb-2.5 sm:mb-3 md:mb-4">
                    {project.tech.slice(0, 3).map(t => (
                      <span key={t} className="text-[8px] xs:text-[9px] sm:text-[10px] md:text-[11px] text-red-400 font-semibold px-1 xs:px-1.5 sm:px-2 md:px-2.5 py-0.5 sm:py-1 md:py-1.5 bg-red-500/10 rounded-md border border-red-500/30 hover:border-red-500/60 transition-all whitespace-nowrap">
                        #{t}
                      </span>
                    ))}
                  </div>

                  {/* Mobile Full-Width View Button */}
                  <div className="mt-1.5 xs:mt-2 sm:hidden">
                    <a href={project.link} className="block w-full py-2 xs:py-2.5 rounded-lg bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-center font-bold text-[8px] xs:text-[9px] transition-all duration-300 shadow-lg shadow-red-600/30 active:scale-95 min-h-[36px] flex items-center justify-center">
                      View
                    </a>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>

        {/* Mobile Swipe Hint */}
        <div className="md:hidden flex justify-center mt-2 opacity-40">
          <div className="flex items-center gap-2 text-[10px] xs:text-xs text-slate-500 font-medium uppercase tracking-widest">
            Swipe to explore
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
