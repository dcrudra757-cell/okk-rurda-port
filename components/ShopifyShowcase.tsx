import React from 'react';
import { SPECIALIZED_SOLUTIONS } from '../constants';
import { AppMode } from '../types';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface SolutionsProps {
  mode: AppMode;
}

const ShopifyShowcase: React.FC<SolutionsProps> = ({ mode }) => {
  const data = SPECIALIZED_SOLUTIONS[mode];
  const isVideo = mode === 'video';
  const accentText = isVideo ? 'text-cine-red' : 'text-primary';

  return (
    <section id="shopify" className="py-24 md:py-32 bg-[#080808] border-y border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-12 lg:items-end mb-20">
          <div className="flex-1">
            <h3 className={`${accentText} font-bold tracking-[0.2em] mb-4 uppercase text-xs md:text-sm`}>SOLUTIONS</h3>
            <h2 className="text-4xl md:text-6xl font-heading font-black text-white leading-tight">
               {data.title}
            </h2>
          </div>
          <div className="lg:w-1/3">
             <p className="text-slate-400 text-lg">{data.subtitle}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {data.projects.map((project) => (
              <div key={project.id} className="group bg-[#050505] rounded-[2rem] overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-500 hover:shadow-2xl">
                 {/* Thumbnail */}
                 <div className="relative h-56 overflow-hidden">
                    <img 
                       src={project.image} 
                       alt={project.title} 
                       className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent"></div>
                    <div className="absolute bottom-4 left-6">
                       <h3 className="text-xl font-bold text-white">{project.title}</h3>
                    </div>
                 </div>

                 <div className="p-6 md:p-8 flex flex-col">
                    <p className="text-slate-400 text-sm leading-relaxed mb-6">{project.description}</p>
                    
                    <div className="space-y-3 mb-8">
                       {project.results.map((res, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                             <CheckCircle2 size={16} className={accentText} />
                             <span className="text-sm text-slate-300">
                               <strong className="text-white">{res.value}</strong> {res.metric}
                             </span>
                          </div>
                       ))}
                    </div>
                    
                    <button className={`mt-auto text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${accentText} hover:text-white transition-colors`}>
                       Learn More <ArrowRight size={14} />
                    </button>
                 </div>
              </div>
           ))}
        </div>
      </div>
    </section>
  );
};

export default ShopifyShowcase;