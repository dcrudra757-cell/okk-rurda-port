import React, { useRef } from 'react';
import { PROJECTS } from '../constants';
import { Play, ArrowUpRight, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { AppMode } from '../types';

interface ProjectsProps {
  mode: AppMode;
}

const Projects: React.FC<ProjectsProps> = ({ mode }) => {
  const projects = PROJECTS[mode];
  const isVideo = mode === 'video';
  const accentText = isVideo ? 'text-cine-red' : 'text-blue-500';
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = isVideo ? 420 : 360; // Adjust scroll amount based on card size
      current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="projects" className="py-16 md:py-24 bg-darker overflow-hidden border-t border-white/5">
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
           className="flex gap-4 md:gap-6 overflow-x-auto pb-8 snap-x snap-mandatory -mx-6 px-6 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden"
           style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projects.map((project) => (
            mode === 'dev' ? (
              // ================= DEV MODE CARD DESIGN (Reference Style) =================
              <div key={project.id} className="min-w-[85vw] md:min-w-[360px] lg:min-w-[380px] snap-start shrink-0 h-full">
                 <div className="group h-full bg-[#0F1115] border border-white/5 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col">
                    {/* Top Image Section */}
                    <div className="relative h-52 overflow-hidden">
                       <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                       />
                       <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay"></div>
                       {project.category && (
                          <span className="absolute top-4 right-4 bg-pink-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                             {project.category}
                          </span>
                       )}
                    </div>
                    
                    {/* Content Section */}
                    <div className="p-6 flex flex-col flex-1 bg-[#0b0c10]">
                       <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                       <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">{project.description}</p>
                       
                       {/* Tags Pills */}
                       <div className="flex flex-wrap gap-2 mb-6">
                          {project.tech.map(t => (
                             <span key={t} className="px-3 py-1.5 bg-[#1A2333] text-blue-400 border border-blue-500/10 text-[10px] font-bold rounded-full">
                                {t}
                             </span>
                          ))}
                       </div>
                       
                       {/* Footer Link */}
                       <a href={project.link} className="inline-flex items-center text-sm font-bold text-[#A78BFA] hover:text-white transition-colors mt-auto group/link">
                          View Case Study <ArrowRight size={16} className="ml-1 transition-transform group-hover/link:translate-x-1" />
                       </a>
                    </div>
                 </div>
              </div>
            ) : (
              // ================= VIDEO MODE CARD DESIGN (Cinematic Style) =================
              <div key={project.id} className="min-w-[85vw] md:min-w-[420px] snap-start shrink-0 group cursor-pointer">
                {/* Image Container */}
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 bg-[#111] border border-white/5">
                   <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
                   />
                   
                   <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                   
                   {/* Play Button Overlay */}
                   <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transform scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 shadow-2xl">
                         <Play fill="white" className="ml-1 text-white" size={20} />
                      </div>
                   </div>
                   
                   <div className="absolute top-4 left-4">
                      <span className="bg-black/60 backdrop-blur-md text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-white/10">
                         {project.category}
                      </span>
                   </div>
                </div>

                {/* Text Content */}
                <div className="px-1">
                   <div className="flex justify-between items-start mb-1.5">
                      <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-cine-red transition-colors">{project.title}</h3>
                      <a href={project.link} className="p-1.5 rounded-full hover:bg-white/5 transition-colors group/link">
                        <ArrowUpRight size={16} className="text-text-muted group-hover/link:text-white transition-colors" />
                      </a>
                   </div>
                   <p className="text-text-muted text-xs leading-relaxed mb-3 max-w-sm line-clamp-2">{project.description}</p>
                   <div className="flex flex-wrap gap-2">
                      {project.tech.map(t => (
                         <span key={t} className="text-[10px] text-text-muted font-medium px-2 py-0.5 bg-white/5 rounded-md border border-white/5">#{t}</span>
                      ))}
                   </div>
                </div>
              </div>
            )
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
