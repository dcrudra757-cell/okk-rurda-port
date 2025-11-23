import React from 'react';
import { SERVICES } from '../constants';
import { AppMode } from '../types';

interface ServicesProps {
  mode: AppMode;
}

const Services: React.FC<ServicesProps> = ({ mode }) => {
  const services = SERVICES[mode];
  const isVideo = mode === 'video';
  
  const accentText = isVideo ? 'text-red-600' : 'text-blue-500';
  const hoverBorder = isVideo ? 'hover:border-red-600/30' : 'hover:border-blue-500/30';
  const iconBg = isVideo ? 'group-hover:bg-red-600' : 'group-hover:bg-blue-600';
  const iconText = isVideo ? 'text-red-500' : 'text-blue-500';
  const cardShadow = isVideo ? 'hover:shadow-[0_0_30px_rgba(220,38,38,0.15)]' : 'hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]';
  const bgHover = isVideo ? 'group-hover:from-red-600/10 group-hover:to-transparent' : 'group-hover:from-blue-600/10 group-hover:to-transparent';

  return (
    <section id="services" className="py-20 md:py-32 bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-20">
          <h3 className={`${accentText} font-bold tracking-[0.2em] mb-4 uppercase text-sm`}>SERVICES</h3>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-heading font-black text-white tracking-tighter">
            {mode === 'dev' ? 'Development' : 'Editing'} <span className={accentText}>Services</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service) => (
            <div 
              key={service.id}
              className={`bg-[#111] p-8 md:p-10 rounded-3xl border border-white/[0.05] transition-all duration-500 hover:-translate-y-2 group relative overflow-hidden ${hoverBorder} ${cardShadow}`}
            >
              {/* Gradient BG on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${bgHover} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

              <div className="relative z-10">
                <div className={`w-14 h-14 md:w-16 md:h-16 bg-white/[0.03] rounded-2xl flex items-center justify-center mb-6 md:mb-8 transition-all duration-500 ${iconText} ${iconBg} group-hover:text-white group-hover:scale-110 shadow-inner border border-white/5`}>
                  <service.icon size={28} className="md:w-8 md:h-8" strokeWidth={1.5} />
                </div>
                <h4 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 group-hover:text-white transition-colors">{service.title}</h4>
                <p className="text-sm md:text-base text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;