import React, { useState, useEffect } from 'react';
import { AppMode } from '../types';
import { ArrowUpRight, Calendar, User } from 'lucide-react';
import { getProjects } from '../services/api';
import { EXTENDED_PROJECTS } from '../constants';

interface ProjectsPageProps {
  mode: AppMode;
}

const ProjectsPage: React.FC<ProjectsPageProps> = ({ mode }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [projectsData, setProjectsData] = useState(EXTENDED_PROJECTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await getProjects();
      setProjectsData(data);
      setLoading(false);
    };
    loadData();
  }, []);

  const allProjects = [...projectsData.video, ...projectsData.dev];
  
  const isVideo = mode === 'video';
  const accentText = isVideo ? 'text-cine-red' : 'text-blue-500';

  const categories = ['All', 'Video', 'Development'];

  const filteredProjects = activeCategory === 'All' 
    ? allProjects 
    : activeCategory === 'Video' 
      ? projectsData.video 
      : projectsData.dev;

  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-20">
      <div className="container mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
             <h1 className="text-4xl md:text-6xl font-heading font-black text-white mb-4">
               Selected <span className={accentText}>Works</span>
             </h1>
             <p className="text-slate-400 text-lg max-w-xl">
               A curated selection of projects demonstrating technical expertise and creative vision.
             </p>
          </div>

          {/* Filters */}
          <div className="flex bg-white/5 p-1 rounded-full border border-white/5">
             {categories.map(cat => (
                <button
                   key={cat}
                   onClick={() => setActiveCategory(cat)}
                   className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                      activeCategory === cat 
                        ? 'bg-white text-black shadow-lg' 
                        : 'text-slate-400 hover:text-white'
                   }`}
                >
                   {cat}
                </button>
             ))}
          </div>
        </div>

        {/* Grid Layout */}
        {loading ? (
           <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {filteredProjects.map((project: any, idx: number) => (
                <div key={project.id} className="group cursor-pointer animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
                  {/* Thumbnail */}
                  <div className="relative aspect-video rounded-[2rem] overflow-hidden mb-6 border border-white/5 bg-[#111]">
                      <img src={project.image} alt={project.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
                      
                      {/* Dark Overlay on Hover */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-[2px]"></div>
                      
                      {/* Metadata Overlay */}
                      <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 p-8 text-center">
                          <div className="flex flex-wrap justify-center gap-2 mb-6">
                            {project.tech.map((t: string) => (
                                <span key={t} className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-white border border-white/10">
                                  {t}
                                </span>
                            ))}
                          </div>
                          <button className="px-8 py-3 bg-white text-black rounded-full font-bold text-sm uppercase tracking-wider flex items-center gap-2 hover:bg-slate-200 transition-colors">
                            View Details <ArrowUpRight size={16} />
                          </button>
                      </div>

                      {/* Floating Badges */}
                      <div className="absolute top-6 left-6 flex gap-2">
                        <span className={`px-3 py-1 rounded-full text-white text-[10px] font-bold uppercase tracking-wider border border-white/10 bg-black/60 backdrop-blur-md`}>
                            {project.category}
                        </span>
                      </div>
                  </div>

                  {/* Info */}
                  <div className="px-2">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-2xl font-bold text-white group-hover:text-slate-300 transition-colors">{project.title}</h3>
                        <div className="flex gap-4 text-slate-500 text-xs font-bold uppercase tracking-wider">
                            <span className="flex items-center gap-1"><User size={12} /> {project.role}</span>
                            <span className="flex items-center gap-1"><Calendar size={12} /> {project.year}</span>
                        </div>
                      </div>
                      <p className="text-slate-400 text-sm line-clamp-2">{project.description}</p>
                  </div>
                </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default ProjectsPage;
