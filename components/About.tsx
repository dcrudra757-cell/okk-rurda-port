import React from 'react';
import { ABOUT_DATA } from '../constants';
import { AppMode } from '../types';
import { Film, Calendar, Users, Play, Quote, CheckCircle2, ArrowRight } from 'lucide-react';

interface AboutProps {
  mode: AppMode;
}

const About: React.FC<AboutProps> = ({ mode }) => {
  const content = ABOUT_DATA[mode];
  const isVideo = mode === 'video';
  
  // Dynamic Color System
  const accentText = isVideo ? 'text-cine-red' : 'text-blue-500';
  const accentBg = isVideo ? 'bg-cine-red' : 'bg-blue-600';
  const gradientText = isVideo ? 'from-cine-red to-orange-500' : 'from-blue-500 to-cyan-400';
  const glowShadow = isVideo ? 'shadow-cine-red/20' : 'shadow-blue-500/20';
  const borderColor = isVideo ? 'group-hover:border-cine-red/50' : 'group-hover:border-blue-500/50';

  // Icon mapping for stats
  const getStatIcon = (index: number) => {
    if (index === 0) return isVideo ? <Film size={20} /> : <CheckCircle2 size={20} />;
    if (index === 1) return <Calendar size={20} />;
    return <Users size={20} />;
  };

  return (
    <section id="about" className="py-24 md:py-36 bg-[#080808] relative overflow-hidden">
      {/* Ambient Lighting */}
      <div className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 pointer-events-none ${isVideo ? 'bg-red-600' : 'bg-blue-600'}`}></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* LEFT COLUMN: Bio, Stats, CTA */}
          <div className="flex flex-col justify-center">
            {/* Header Group */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                 <span className={`h-[2px] w-10 ${accentBg}`}></span>
                 <h3 className="text-white font-bold tracking-[0.2em] uppercase text-sm">ABOUT ME</h3>
              </div>
              
              <h2 className="hero-h2 text-4xl sm:text-5xl md:text-6xl font-heading font-black text-white mb-4 leading-[1.1] tracking-tight">
                {content.heading} <br />
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${gradientText} animate-gradient`}>
                  {content.headingHighlight}
                </span>
              </h2>
            </div>

            {/* Description */}
            <div className="space-y-6 text-slate-400 text-lg leading-relaxed mb-10">
              <p>{content.description1}</p>
              <p>{content.description2}</p>
            </div>

            {/* Mobile divider between bio and stats */}
            <hr className="block lg:hidden border-white/5 my-6" />

            {/* Premium Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
              {content.stats.map((stat, idx) => (
                <div key={idx} className={`group bg-white/[0.03] border border-white/5 p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.05] ${borderColor}`}>
                  <div className={`w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-3 text-slate-300 transition-colors ${isVideo ? 'group-hover:text-cine-red group-hover:bg-cine-red/10' : 'group-hover:text-blue-500 group-hover:bg-blue-500/10'}`}>
                    {getStatIcon(idx)}
                  </div>
                  <span className="block text-3xl font-heading font-bold text-white mb-1 group-hover:scale-105 transition-transform origin-left">{stat.value}</span>
                  <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold">{stat.label}</span>
                </div>
              ))}
            </div>
            
            {/* CTA Button */}
            <div>
              <a href="#projects" className={`cta-full md:inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-bold text-sm uppercase tracking-wider transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${accentBg} ${glowShadow}`}>
                 <Play size={16} fill="currentColor" /> 
                 <span>View My Work</span>
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: Tools & Testimonial */}
          <div className="flex flex-col gap-8 lg:mt-8">
            
            {/* Glassmorphism Tools Card */}
            <div className="bg-[#111]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden group">
               {/* Shine Effect */}
               <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
               
               <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                 <span className={`w-2 h-2 rounded-full ${accentBg} animate-pulse`}></span>
                 {content.skillsTitle}
               </h4>
               
               <div className="flex flex-wrap gap-3">
                 {content.skills.map((skill) => (
                   <span 
                    key={skill.name}
                    className={`px-4 py-2.5 rounded-lg bg-black/40 border border-white/5 text-slate-300 text-sm font-medium transition-all duration-300 hover:border-white/20 hover:text-white hover:shadow-lg flex items-center gap-2 cursor-default`}
                   >
                     <span className={`w-1 h-1 rounded-full bg-white/20`}></span>
                     {skill.name}
                   </span>
                 ))}
               </div>
            </div>

            {/* Cinematic Testimonial Card */}
            <div className={`relative bg-gradient-to-r from-[#111] to-[#0a0a0a] border-y border-r border-white/5 rounded-3xl p-8 overflow-hidden border-l-4 ${isVideo ? 'border-l-cine-red' : 'border-l-blue-500'}`}>
               <Quote className={`absolute top-6 right-6 opacity-10 ${accentText}`} size={64} />
               
               <p className="text-lg md:text-xl text-slate-200 font-medium leading-relaxed italic mb-8 relative z-10">
                 "{content.quote}"
               </p>
               
               <div className="flex items-center gap-4 relative z-10 border-t border-white/5 pt-6">
                 <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl text-white ${accentBg}`}>
                    {content.quoteAuthor.charAt(0)}
                 </div>
                 <div>
                   <div className="text-white font-bold">{content.quoteAuthor}</div>
                   <div className={`text-xs font-medium uppercase tracking-wide ${accentText}`}>{content.quoteRole}</div>
                 </div>
               </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
