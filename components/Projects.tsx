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
      const scrollAmount = isVideo ? 420 : 360; // Adjust scroll amount based on card size
      current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

   // Fisher-Yates shuffle
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
      // Try to fetch projects from backend; if it fails, fall back to constants
      fetch('/api/projects')
         .then(res => res.json())
         .then(data => {
            if (!mounted) return;
            // backend groups by mode: { video: [], dev: [] }
            const list = data && (data.video || data.dev) ? (mode === 'video' ? (data.video || []) : (data.dev || [])) : (Array.isArray(data) ? data : []);
            if (list && list.length > 0) {
               setProjects(shuffle(list));
               return;
            }
            // fallback: shuffle local constants
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
                   <button
                      onClick={reshuffle}
                      className="hidden md:inline-flex items-center justify-center h-10 px-4 rounded-full border border-white/10 hover:bg-white/5 text-white text-xs font-bold transition-all hover:border-white/30 ml-2"
                   >
                      Shuffle
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
          {projects.map((project, idx) => (
            mode === 'dev' ? (
              // ================= DEV MODE CARD DESIGN (Reference Style) =================
              <div key={project.id} className="min-w-[85vw] md:min-w-[360px] lg:min-w-[380px] snap-start shrink-0 h-full animate-scale-in" style={{ animationDelay: `${idx * 100}ms` }}>
                 <div className="group h-full bg-[#0F1115] border border-white/5 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:scale-105 active:scale-95 flex flex-col">
                    {/* Top Image Section */}
                    <div className="relative h-52 overflow-hidden">
                       <img 
                          src={project.image} 
                          alt={project.title} 
                          loading="lazy"
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
                      {/* Mobile full-width CTA */}
                      <a href={project.link} className="mt-4 md:hidden block w-full text-center py-3 rounded-xl bg-[#6b46c1] text-white font-bold text-sm">View Project</a>
                    </div>
                 </div>
              </div>
            ) : (
              // ================= VIDEO MODE CARD DESIGN (Cinematic Style) =================
              <div key={project.id} className="min-w-[85vw] md:min-w-[420px] snap-start shrink-0 group cursor-pointer animate-scale-in" style={{ animationDelay: `${idx * 100}ms` }}>
                {/* Image Container */}
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 bg-[#111] border border-white/5 group-hover:border-red-500/50 transition-all duration-300 shadow-lg group-hover:shadow-red-500/20">
                   <img 
                      src={project.image} 
                      alt={project.title} 
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-85 group-hover:opacity-100"
                   />
                   
                   <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent group-hover:from-black/20 transition-all duration-500"></div>
                   
                   {/* Play Button Overlay */}
                   <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-16 h-16 rounded-full bg-red-600/80 backdrop-blur-md border-2 border-white flex items-center justify-center transform scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 shadow-2xl shadow-red-600/50">
                         <Play fill="white" className="ml-1 text-white" size={24} />
                      </div>
                   </div>
                   
                   <div className="absolute top-4 left-4">
                      <span className="bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-red-500/50 shadow-lg">
                         {project.category}
                      </span>
                   </div>
                </div>

                {/* Text Content */}
                <div className="px-1">
                   <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-red-400 transition-colors duration-300 leading-tight">{project.title}</h3>
                      <a href={project.link} className="p-2 rounded-full hover:bg-red-600/20 transition-all duration-300 flex-shrink-0 group/link">
                        <ArrowUpRight size={18} className="text-gray-400 group-hover/link:text-red-500 transition-colors" />
                      </a>
                   </div>
                   <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2 group-hover:text-gray-300 transition-colors">{project.description}</p>
                   <div className="flex flex-wrap gap-2.5 mb-4">
                      {project.tech.map(t => (
                         <span key={t} className="text-[11px] text-red-400 font-semibold px-2.5 py-1 bg-red-500/10 rounded-md border border-red-500/30 hover:border-red-500/60 transition-all">#{t}</span>
                      ))}
                   </div>
                   {/* Mobile full-width View button */}
                   <div className="mt-4 md:hidden px-1">
                      <a href={project.link} className="block w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-center font-bold text-sm transition-all duration-300 shadow-lg shadow-red-600/30">View Project</a>
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
