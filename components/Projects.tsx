import React, { useRef } from 'react';
import { PROJECTS } from '../constants';
import { Play, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { AppMode } from '../types';

interface ProjectsProps {
  mode: AppMode;
}

const Projects: React.FC<ProjectsProps> = ({ mode }) => {
  const projects = PROJECTS[mode];
  const isVideo = mode === 'video';
  const accentText = isVideo ? 'text-cine-red' : 'text-blue-500';
  const hoverText = isVideo ? 'group-hover:text-cine-red' : 'group-hover:text-blue-500';
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = current.clientWidth * 0.7; // Scroll 70% of view
      current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="projects" className="py-20 md:py-28 bg-darker overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
          <div>
            <h3 className={`${accentText} font-bold tracking-[0.2em] mb-3 uppercase text-xs md:text-sm`}>PORTFOLIO</h3>
            <h2 className="text-3xl md:text-5xl font-heading font-black text-white tracking-tight">
              Featured {isVideo ? 'Edits' : 'Work'}
            </h2>
          </div>
          
          <div className="flex items-center gap-3">
             <button 
               onClick={() => scroll('left')} 
               className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 text-white transition-colors hover:border-white/30 active:scale-95"
               aria-label="Scroll left"
             >
               <ChevronLeft size={20} />
             </button>
             <button 
               onClick={() => scroll('right')} 
               className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 text-white transition-colors hover:border-white/30 active:scale-95"
               aria-label="Scroll right"
             >
               <ChevronRight size={20} />
             </button>
             <a 
               href="#" 
               className="hidden md:flex items-center justify-center h-10 px-5 rounded-full border border-white/10 hover:bg-white/5 text-white text-xs font-bold transition-all hover:border-white/30 ml-2"
             >
                View All Projects
             </a>
          </div>
        </div>

        <div 
           ref={scrollContainerRef}
           className="flex gap-5 md:gap-6 overflow-x-auto pb-10 snap-x snap-mandatory -mx-6 px-6 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden"
           style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projects.map((project) => (
            <div key={project.id} className="min-w-[85vw] md:min-w-[350px] lg:min-w-[400px] snap-start shrink-0 group cursor-pointer">
              {/* Image Container */}
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 bg-[#111] border border-white/5">
                 <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
                 />
                 
                 <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                 
                 {/* Play Button Overlay */}
                 {isVideo && (
                   <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transform scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 shadow-2xl">
                         <Play fill="white" className="ml-1 text-white" size={24} />
                      </div>
                   </div>
                 )}
                 
                 <div className="absolute top-4 left-4">
                    <span className="bg-black/60 backdrop-blur-md text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-white/10">
                       {project.category}
                    </span>
                 </div>
              </div>

              {/* Text Content */}
              <div className="px-1">
                 <div className="flex justify-between items-start mb-1.5">
                    <h3 className={`text-xl font-bold text-white ${hoverText} transition-colors`}>{project.title}</h3>
                    <a href={project.link} className="p-1.5 rounded-full hover:bg-white/5 transition-colors group/link">
                      <ArrowUpRight size={18} className="text-text-muted group-hover/link:text-white transition-colors" />
                    </a>
                 </div>
                 <p className="text-text-muted text-xs leading-relaxed mb-3 max-w-sm">{project.description}</p>
                 <div className="flex flex-wrap gap-2">
                    {project.tech.map(t => (
                       <span key={t} className="text-[10px] text-text-muted font-medium px-2 py-0.5 bg-white/5 rounded-md border border-white/5">#{t}</span>
                    ))}
                 </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Mobile Swipe Hint */}
        <div className="md:hidden flex justify-center mt-[-10px] opacity-40">
           <div className="flex items-center gap-2 text-[10px] text-slate-500 font-medium uppercase tracking-widest">
              Swipe to explore
           </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;