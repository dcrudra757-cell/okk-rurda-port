import React from 'react';
import { TESTIMONIALS, CASE_STUDIES } from '../constants';
import { Star, TrendingUp } from 'lucide-react';
import { AppMode } from '../types';

interface TestimonialsProps {
  mode: AppMode;
}

const Testimonials: React.FC<TestimonialsProps> = ({ mode }) => {
  const testimonials = TESTIMONIALS[mode];
  const caseStudies = CASE_STUDIES[mode];
  const isVideo = mode === 'video';
  const accentText = isVideo ? 'text-cine-red' : 'text-blue-500';

  return (
    <section data-section className="bg-surface-highlight border-t border-white/5">
      <div className="section-shell">
        
        {/* Header */}
        <div className="section-heading center">
          <h3 className={`section-kicker ${accentText}`}>TESTIMONIALS</h3>
          <h2 className="section-title text-white text-center">Trusted by Creators & Brands</h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 xs:gap-3.5 sm:gap-4 md:gap-6 mb-10 xs:mb-12 sm:mb-16 md:mb-24">
          {testimonials.map((t) => (
             <div key={t.id} className="bg-[#0f0f0f] border border-white/5 border-l-2 border-l-white/10 p-3 xs:p-4 sm:p-5 md:p-8 rounded-lg xs:rounded-xl sm:rounded-2xl md:rounded-3xl hover:border-white/10 transition-colors">
                <div className="flex gap-0.5 text-yellow-500 mb-3 xs:mb-3.5 sm:mb-4 md:mb-6">
                   {[1,2,3,4,5].map(s => <Star key={s} size={10} className="xs:size-3" fill="currentColor" />)}
                </div>
                <p className="text-slate-300 text-[11px] xs:text-xs sm:text-xs md:text-sm leading-relaxed md:leading-relaxed mb-4 xs:mb-5 sm:mb-6 md:mb-8 italic">"{t.content}"</p>
                <div className="flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-4">
                   <img src={t.image} alt={t.name} loading="lazy" className="w-8 xs:w-9 sm:w-10 md:w-11 h-8 xs:h-9 sm:h-10 md:h-11 rounded-full object-cover grayscale flex-shrink-0" />
                   <div className="min-w-0">
                      <h4 className="text-white font-bold text-xs md:text-sm leading-tight truncate">{t.name}</h4>
                      <div className="text-[9px] xs:text-[10px] md:text-xs text-text-muted truncate">{t.company}</div>
                   </div>
                </div>
             </div>
          ))}
        </div>

        {/* Impact Section */}
        <div className="bg-gradient-to-r from-[#111] to-[#0a0a0a] rounded-lg xs:rounded-xl sm:rounded-2xl md:rounded-[2.5rem] border border-white/5 p-4 xs:p-5 sm:p-6 md:p-8 lg:p-16 relative overflow-hidden">
           <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-[100px] opacity-10 ${isVideo ? 'bg-cine-red' : 'bg-blue-600'}`}></div>
           
           <div className="relative z-10 flex flex-col md:flex-row gap-6 xs:gap-7 sm:gap-8 md:gap-12 lg:gap-24">
              <div className="md:w-1/3">
                 <h3 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 xs:mb-3.5 sm:mb-4 md:mb-6 leading-tight">Measurable Impact</h3>
                 <p className="text-text-muted text-xs xs:text-xs sm:text-sm md:text-base leading-relaxed mb-4 xs:mb-5 sm:mb-6 md:mb-8">
                    My work doesn't just look good—it performs. We track engagement, retention, and conversion to ensure ROI.
                 </p>
                 <button className="text-white font-bold border-b border-white pb-1 hover:text-text-muted transition-colors text-xs xs:text-xs sm:text-sm md:text-base">
                    See Full Case Studies
                 </button>
              </div>

              <div className="md:w-2/3 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-2.5 xs:gap-3 sm:gap-4 md:gap-6">
                 {caseStudies.map((study) => (
                    <div key={study.id} className="bg-white/5 rounded-lg xs:rounded-lg sm:rounded-lg md:rounded-2xl p-3 xs:p-3.5 sm:p-4 md:p-6 border border-white/5 hover:bg-white/10 transition-colors">
                       <div className="flex items-center justify-between mb-2 xs:mb-2.5 sm:mb-3 md:mb-4 gap-2">
                          <span className="text-[8px] xs:text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-text-muted line-clamp-1">{study.client}</span>
                          <TrendingUp size={14} className={`xs:size-4 ${isVideo ? 'text-green-500' : 'text-blue-400'}`} />
                       </div>
                       <h4 className="text-base xs:text-lg sm:text-lg md:text-xl font-bold text-white mb-0.5 xs:mb-1 sm:mb-1">{study.impact}</h4>
                       <p className="text-[8px] xs:text-[9px] sm:text-[10px] md:text-xs text-text-muted">{study.category} Improvement</p>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;