import React, { useRef } from 'react';
import { PROJECTS } from '../constants';
import { ArrowRight, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { AppMode } from '../types';

interface ProjectsProps {
  mode: AppMode;
}

const Projects: React.FC<ProjectsProps> = ({ mode }) => {
  const projects = PROJECTS[mode];
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isVideo = mode === 'video';
  
  const accentText = isVideo ? 'text-red-600' : 'text-blue-500';
  const hoverBorder = isVideo ? 'hover:border-red-600/30' : 'hover:border-blue-500/30';
  const hoverBtn = isVideo ? 'hover:bg-red-600 hover:border-red-600' : 'hover:bg-blue-600 hover:border-blue-600';
  const titleHover = isVideo ? 'group-hover:text-red-500' : 'group-hover:text-blue-400';

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = 400;
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="projects" className="py-20 md:py-32 bg-darker relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 md:mb-16">
          <div>
            <h3 className={`${accentText} font-bold tracking-[0.2em] mb-4 uppercase text-sm`}>PORTFOLIO</h3>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-heading font-bold text-white">
              Featured {isVideo ? 'Edits' : 'Works'}
            </h2>
            <p className="text-slate-400 mt-4 md:mt-6 max-w-lg text-base md:text-lg">
               A selection of projects that showcase my skills in {isVideo ? 'cinematic storytelling and pacing' : 'web development and software engineering'}.
            </p>
          </div>
          
          {/* Navigation Buttons */}
          <div className="hidden md:flex gap-4 mt-6 md:mt-0">
            <button 
              onClick={() => scroll('left')}
              className={`p-4 rounded-full border border-white/10 bg-card text-white transition-all ${hoverBtn}`}
              aria-label="Scroll left"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className={`p-4 rounded-full border border-white/10 bg-card text-white transition-all ${hoverBtn}`}
              aria-label="Scroll right"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 md:gap-8 overflow-x-auto pb-12 snap-x snap-mandatory -mx-6 px-6 md:mx-0 md:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <style>
            {`
              div::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>
          {projects.map((project) => (
            <div 
              key={project.id} 
              className={`min-w-[85vw] sm:min-w-[60vw] md:min-w-[480px] snap-center bg-card rounded-3xl overflow-hidden border border-white/5 group transition-all duration-500 flex flex-col h-full ${hoverBorder}`}
            >
              {/* Image Section */}
              <div className="relative h-60 md:h-72 overflow-hidden bg-black">
                <div className="absolute top-4 left-4 z-20">
                   <span className="bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10">
                      {project.category}
                   </span>
                </div>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-90"></div>
                
                {/* Play Button Overlay for Video Mode */}
                {isVideo && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-50 group-hover:scale-100">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-red-600/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl shadow-red-900/50">
                       <Play fill="white" className="ml-1 text-white md:w-8 md:h-8" size={28} />
                    </div>
                  </div>
                )}
              </div>
              
              {/* Content Section */}
              <div className="p-6 md:p-8 flex-1 flex flex-col">
                <h3 className={`text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 transition-colors ${titleHover}`}>
                  {project.title}
                </h3>
                <p className="text-slate-400 mb-6 md:mb-8 line-clamp-2 flex-1 text-sm md:text-lg">
                  {project.description}
                </p>
                
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
                   {project.tech.map(t => (
                      <span key={t} className="text-xs font-medium text-slate-500 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                        {t}
                      </span>
                   ))}
                </div>

                {/* Link */}
                <a 
                  href={project.link || '#'} 
                  className={`inline-flex items-center gap-2 font-bold uppercase tracking-wider text-xs md:text-sm group/link transition-colors ${isVideo ? 'text-red-500 hover:text-red-400' : 'text-blue-500 hover:text-blue-400'}`}
                >
                  View Project
                  <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform md:w-[18px] md:h-[18px]" />
                </a>
              </div>
            </div>
          ))}
        </div>
        
        {/* Mobile Swipe Hint */}
        <div className="md:hidden text-center mt-4">
          <p className="text-slate-600 text-[10px] uppercase tracking-widest flex items-center justify-center gap-2">
            <ArrowRight size={12} className="animate-pulse" /> Swipe to explore
          </p>
        </div>
      </div>
    </section>
  );
};

export default Projects;