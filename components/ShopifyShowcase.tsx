import React, { useEffect, useState } from 'react';
import { SPECIALIZED_SOLUTIONS } from '../constants';
import { ShoppingBag, Film, ArrowRight, Layers } from 'lucide-react';
import { AppMode } from '../types';

interface SpecializedProps {
  mode: AppMode;
}

const ShopifyShowcase: React.FC<SpecializedProps> = ({ mode }) => {
   const data = SPECIALIZED_SOLUTIONS[mode];
   const [projects, setProjects] = useState(data.projects || []);

   // Simple Fisher-Yates shuffle
   const shuffle = (arr: any[]) => {
      const a = arr.slice();
      for (let i = a.length - 1; i > 0; i--) {
         const j = Math.floor(Math.random() * (i + 1));
         [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
   };

   useEffect(() => {
      // shuffle on mount
      setProjects(shuffle(data.projects || []));
   }, [mode]);
  const isVideo = mode === 'video';
  
  const accentText = isVideo ? 'text-cine-red' : 'text-blue-500';
  const badgeBg = isVideo ? 'bg-cine-red/10' : 'bg-blue-500/10';

  return (
    <section id="shopify" className="py-24 md:py-36 bg-[#050505] border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:items-end mb-20">
          <div className="flex-1">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest mb-6 ${badgeBg} ${accentText}`}>
               {isVideo ? <Film size={12} /> : <ShoppingBag size={12} />}
               <span>Specialized Solutions</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-heading font-black text-white leading-tight">
               {data.title}
            </h2>
          </div>
          <div className="lg:w-1/3">
             <p className="text-text-muted text-lg">{data.subtitle}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {projects.map((project, i) => (
              <div key={project.id} className="group bg-[#0a0a0a] rounded-3xl overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-500 hover:shadow-2xl">
                 {/* Thumbnail Area */}
                 <div className="relative h-64 overflow-hidden">
                    <img 
                       src={project.image} 
                       alt={project.title} 
                       loading="lazy"
                       className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent"></div>
                    
                    <div className="absolute bottom-6 left-6 right-6">
                       <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                       <div className="flex flex-wrap gap-2">
                          {project.technologies.map(tech => (
                             <span key={tech} className="text-[10px] bg-white/10 backdrop-blur-md px-2 py-1 rounded-md text-white font-medium">
                                {tech}
                             </span>
                          ))}
                       </div>
                    </div>
                 </div>

                 {/* Stats Area */}
                 <div className="p-6 md:p-8 space-y-6">
                    <p className="text-text-muted text-sm leading-relaxed">{project.description}</p>
                    
                    <div className="space-y-4">
                       {project.results.map((res, idx) => (
                          <div key={idx} className="flex items-center justify-between border-b border-white/5 pb-3 last:border-0 last:pb-0">
                             <span className="text-sm text-text-muted font-medium">{res.metric}</span>
                             <span className={`text-xl font-bold ${accentText}`}>{res.value}</span>
                          </div>
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

export default ShopifyShowcase;