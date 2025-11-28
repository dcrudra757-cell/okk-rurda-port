import React from 'react';
import { WORKFLOW_PROCESS } from '../constants';
import { AppMode } from '../types';

interface ProcessProps {
  mode: AppMode;
}

const SEOProcess: React.FC<ProcessProps> = ({ mode }) => {
  const data = WORKFLOW_PROCESS[mode];
  const isVideo = mode === 'video';

  const accentColor = isVideo ? 'text-cine-red' : 'text-blue-500';
  const glowColor = isVideo 
    ? 'shadow-[0_0_20px_rgba(255,74,25,0.5)] bg-cine-red' 
    : 'shadow-[0_0_20px_rgba(59,130,246,0.5)] bg-blue-500';
    
  const numberGradient = isVideo 
    ? 'from-cine-red/20 to-transparent' 
    : 'from-blue-600/20 to-transparent';

  return (
    <section data-section className="bg-[#050505] relative overflow-hidden border-t border-white/5">
      <div className="section-shell relative z-10">
        
        {/* Section Header */}
        <div className="section-heading center">
          <h3 className={`section-kicker ${accentColor}`}>
            {isVideo ? 'WORKFLOW' : 'METHODOLOGY'}
          </h3>
          <h2 className="section-title text-white text-center">
            {data.title}
          </h2>
          <p className="section-lead text-center mx-auto">
            {data.subtitle}
          </p>
        </div>

        <div className="max-w-5xl mx-auto relative">
          {/* Central Connecting Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2"></div>

          <div className="flex flex-col gap-12 md:gap-0">
            {data.steps.map((step, index) => {
              const isEven = index % 2 !== 0;
              const stepNumber = `0${step.step}`;

              return (
                <div key={step.id} className={`flex flex-col md:flex-row items-start md:items-center relative ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Timeline Dot */}
                  <div className={`absolute left-4 md:left-1/2 w-3 h-3 md:w-4 md:h-4 rounded-full border-2 border-[#050505] z-10 -translate-x-1.5 md:-translate-x-1/2 mt-2 md:mt-0 ${glowColor}`}></div>

                  {/* Content Card */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-20 md:text-right' : 'md:pl-20 md:text-left'}`}>
                     <div className="relative group">
                        {/* Big Watermark Number */}
                        <div className={`absolute -top-6 md:-top-8 ${isEven ? 'right-0 md:right-auto md:left-0' : 'left-0'} text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b ${numberGradient} opacity-20 select-none pointer-events-none z-0`}>
                           {stepNumber}
                        </div>
                        
                        {/* Text Content */}
                        <div className="relative z-10 pt-4">
                           <h3 className={`text-xl md:text-2xl font-bold text-white mb-3 group-hover:${accentColor} transition-colors duration-300`}>
                              {step.title}
                           </h3>
                           <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                              {step.description}
                           </p>
                           
                           {/* Tools Tags (Optional, small) */}
                           {step.tools && step.tools.length > 0 && (
                             <div className={`flex flex-wrap gap-2 mt-4 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                               {step.tools.map(tool => (
                                 <span key={tool} className="text-[10px] uppercase tracking-wider font-bold text-white/20 border border-white/5 px-2 py-1 rounded">
                                   {tool}
                                 </span>
                               ))}
                             </div>
                           )}
                        </div>
                     </div>
                  </div>

                  {/* Spacer for 50% width on opposite side */}
                  <div className="hidden md:block w-1/2"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SEOProcess;