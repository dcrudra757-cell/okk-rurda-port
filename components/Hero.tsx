import React, { useState, MouseEvent } from 'react';
import { ArrowRight, Code, Film, Star, CheckCircle, Award, Play, Camera, Monitor } from 'lucide-react';
import { HERO_DATA } from '../constants';
import { AppMode } from '../types';

interface HeroProps {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
}

const Hero: React.FC<HeroProps> = ({ mode, setMode }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const isVideo = mode === 'video';
  const content = HERO_DATA[mode];

  // Theme Constants
  const accentText = isVideo ? 'text-cine-red' : 'text-primary';
  const accentBg = isVideo ? 'bg-cine-red' : 'bg-primary';
  const gradientText = isVideo 
    ? 'from-cine-red via-orange-500 to-yellow-500' 
    : 'from-blue-500 via-blue-400 to-cyan-400';
  const glowShadow = isVideo 
    ? 'shadow-[0_0_40px_rgba(255,74,25,0.4)]' 
    : 'shadow-[0_0_40px_rgba(59,130,246,0.4)]';

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    const centerX = box.width / 2;
    const centerY = box.height / 2;
    setRotate({ x: (y - centerY) / 25, y: (centerX - x) / 25 });
  };

  const handleToggle = (newMode: AppMode) => {
    if (mode !== newMode) setMode(newMode);
  };

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden min-h-screen flex items-center bg-[#050505]">
      
      {/* Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
         <div className={`absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-[150px] opacity-10 transition-colors duration-1000 ${isVideo ? 'bg-orange-600' : 'bg-blue-800'}`}></div>
         <div className={`absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[150px] opacity-5 transition-colors duration-1000 ${isVideo ? 'bg-red-900' : 'bg-cyan-900'}`}></div>
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Content Side */}
          <div className="flex-1 w-full flex flex-col items-center lg:items-start text-center lg:text-left">
            
            {/* Toggle Switch */}
            <div className="inline-flex items-center bg-white/[0.03] border border-white/[0.08] rounded-full p-1.5 mb-8 relative">
               <div className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] rounded-full transition-all duration-500 shadow-lg ${mode === 'dev' ? 'left-1.5 bg-blue-600' : 'left-[calc(50%+3px)] bg-cine-red'}`}></div>
               <button onClick={() => handleToggle('dev')} className={`relative z-10 px-6 py-2 rounded-full text-xs font-bold transition-colors flex items-center gap-2 ${mode === 'dev' ? 'text-white' : 'text-slate-400'}`}>
                 <Code size={14} /> Dev
               </button>
               <button onClick={() => handleToggle('video')} className={`relative z-10 px-6 py-2 rounded-full text-xs font-bold transition-colors flex items-center gap-2 ${mode === 'video' ? 'text-white' : 'text-slate-400'}`}>
                 <Film size={14} /> Video
               </button>
            </div>

            <h2 className={`font-bold tracking-[0.3em] text-xs uppercase mb-4 flex items-center gap-3 ${accentText}`}>
               <span className="w-8 h-[2px] bg-current"></span>
               {content.greeting}
            </h2>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-black text-white tracking-tighter leading-[0.9] mb-6">
              {content.titleLine1} <br />
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${gradientText}`}>
                {content.titleLine2}
              </span>
            </h1>
            
            <p className="text-lg text-slate-300 font-light mb-8 max-w-xl leading-relaxed">
              {content.subtitle} <span className="text-white font-medium border-b border-white/20">{content.subtitleHighlight}</span>. <br/>
              {content.description}
            </p>

            {/* Badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-10">
              {content.badges.map((badge, i) => (
                <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] uppercase font-bold text-slate-300 tracking-wider">
                  {badge}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5">
              <a href="#projects" className={`text-white px-8 py-4 rounded-full font-bold text-sm tracking-wide transition-all hover:-translate-y-1 flex items-center gap-2 group ${accentBg} ${glowShadow}`}>
                {content.primaryButtonText}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              
              <button className="px-8 py-4 rounded-full border border-white/10 text-white font-bold text-sm hover:bg-white/5 transition-all flex items-center gap-2">
                <Play size={16} fill="currentColor" /> {content.secondaryButtonText}
              </button>
            </div>

            {/* Stats */}
            <div className="mt-12 pt-8 border-t border-white/5 w-full flex flex-wrap justify-center lg:justify-start gap-8 md:gap-12">
               {content.stats.map((stat, i) => (
                 <div key={i} className="flex flex-col">
                    <span className="text-3xl font-heading font-black text-white">{stat.value}</span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">{stat.label}</span>
                 </div>
               ))}
            </div>
          </div>

          {/* Visual Side */}
          <div className="flex-1 w-full flex justify-center lg:justify-end relative mt-12 lg:mt-0 z-10" style={{ perspective: '1000px' }}>
             <div 
                className="relative w-full max-w-[400px] aspect-[4/5] group"
                onMouseMove={onMouseMove}
                onMouseLeave={() => setRotate({ x: 0, y: 0 })}
                style={{ transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)` }}
             >
                {/* Glow */}
                <div className={`absolute inset-0 bg-gradient-to-tr ${isVideo ? 'from-orange-600 to-red-600' : 'from-blue-600 to-cyan-600'} rounded-[2.5rem] blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-700`}></div>
                
                {/* Card */}
                <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-[#0a0a0a]">
                   <img src={content.profileImage} alt="Rudra Saxena" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                   
                   {/* Floating Icons */}
                   <div className={`absolute top-6 right-6 w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-lg ${isVideo ? 'text-cine-red' : 'text-blue-500'}`}>
                      {isVideo ? <Camera size={24} /> : <Code size={24} />}
                   </div>

                   <div className="absolute bottom-6 left-6 right-6">
                      <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-4 rounded-2xl">
                         <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${accentBg} text-white`}>
                               {isVideo ? <Film size={20} /> : <Monitor size={20} />}
                            </div>
                            <div>
                               <p className="text-[10px] text-slate-300 uppercase tracking-widest">Current Focus</p>
                               <p className="text-white font-bold text-sm">{isVideo ? 'Cinematic Storytelling' : 'High-Perf Web Apps'}</p>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>
      
      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg className="relative block w-[calc(100%+1.3px)] h-[50px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-[#080808]"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;