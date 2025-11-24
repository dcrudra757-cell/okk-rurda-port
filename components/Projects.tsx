import React from 'react';
import { PROJECTS } from '../constants';
import { AppMode } from '../types';
import { ArrowUpRight, Play } from 'lucide-react';

interface ProjectsProps {
  mode: AppMode;
}

const Projects: React.FC<ProjectsProps> = ({ mode }) => {
  const projects = PROJECTS[mode];
  const isVideo = mode === 'video';
  const accentText = isVideo ? 'text-cine-red' : 'text-primary';

  return (
    <section id="projects" className="py-24 md:py-32 bg-[#080808] border-t border-white/5">
      <div className="container mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h3 className={`${accentText} font-bold tracking-[0.2em] mb-3 uppercase text-xs md:text-sm`}>PORTFOLIO</h3>
            <h2 className="text-3xl md:text-5xl font-heading font-black text-white">
              Featured {isVideo ? 'Edits' : 'Work'}
            </h2>
          </div>
          <a href="#" className="px-6 py-3 rounded-full border border-white/10 text-white text-xs font-bold uppercase tracking-wider hover:bg-white/5 transition-all">
             View All Projects
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {projects.map((project) => (
            <div key={project.id} className="group cursor-pointer">
               {/* Thumbnail */}
               <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 bg-[#111] border border-white/5">
                  <img 
                     src={project.image} 
                     alt={project.title} 
                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                  
                  {isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                       <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                          <Play fill="white" className="ml-1 text-white" />
                       </div>
                    </div>
                  )}

                  <span className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/10">
                     {project.category}
                  </span>
               </div>

               {/* Info */}
               <div>
                  <div className="flex justify-between items-start mb-3">
                     <h3 className="text-2xl font-bold text-white group-hover:underline decoration-white/20 underline-offset-4">{project.title}</h3>
                     <ArrowUpRight className="text-slate-500 group-hover:text-white transition-colors" />
                  </div>
                  
                  <p className="text-slate-400 text-sm mb-4 leading-relaxed max-w-md">{project.description}</p>
                  
                  {project.results && (
                     <div className="mb-4 text-sm font-medium text-white/90">
                        Result: <span className={accentText}>{project.results}</span>
                     </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                     {project.tech.map(t => (
                        <span key={t} className="text-[10px] text-slate-500 font-medium px-2 py-1 bg-white/5 rounded border border-white/5">
                           {t}
                        </span>
                     ))}
                  </div>
               </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;