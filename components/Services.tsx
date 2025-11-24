import React from 'react';
import { SERVICES } from '../constants';
import { AppMode } from '../types';
import { ArrowRight } from 'lucide-react';

interface ServicesProps {
  mode: AppMode;
}

const Services: React.FC<ServicesProps> = ({ mode }) => {
  const services = SERVICES[mode];
  const isVideo = mode === 'video';
  const accentText = isVideo ? 'text-cine-red' : 'text-primary';
  const accentBg = isVideo ? 'bg-cine-red' : 'bg-primary';

  return (
    <section id="services" className="py-24 md:py-32 bg-[#050505] relative border-t border-white/5">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h3 className={`${accentText} font-bold tracking-[0.2em] mb-4 uppercase text-xs md:text-sm`}>EXPERTISE</h3>
          <h2 className="text-3xl md:text-5xl font-heading font-black text-white">
            {isVideo ? 'Video Editing' : 'Development'} Services
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service) => (
            <div key={service.id} className="group bg-[#111] border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col h-full">
               <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors ${isVideo ? 'bg-white/5 text-white group-hover:bg-cine-red' : 'bg-white/5 text-white group-hover:bg-blue-600'}`}>
                  <service.icon size={24} strokeWidth={1.5} />
               </div>
               
               <h4 className="text-lg font-bold text-white mb-3">{service.title}</h4>
               <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-1">
                 {service.description}
               </p>

               <button className="w-full py-3 rounded-lg border border-white/10 text-white text-xs font-bold uppercase tracking-wider hover:bg-white/5 transition-colors flex items-center justify-center gap-2 group/btn">
                 Start Project <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
               </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;