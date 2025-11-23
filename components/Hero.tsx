import React, { useState } from 'react';
import { ArrowRight, Terminal, Video, Code, Film, Figma, LayoutTemplate, FileText } from 'lucide-react';
import { HERO_DATA } from '../constants';
import { AppMode } from '../types';

interface HeroProps {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
}

const Hero: React.FC<HeroProps> = ({ mode, setMode }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const isVideo = mode === 'video';

  // Handle mode toggle with animation
  const handleToggle = (newMode: AppMode) => {
    if (mode === newMode) return;
    setIsAnimating(true);
    setMode(newMode);
    setTimeout(() => setIsAnimating(false), 300);
  };

  // Select content based on current mode
  const content = HERO_DATA[mode];

  // Theme Styles
  const primaryText = isVideo ? 'text-red-600' : 'text-blue-500';
  const primaryBg = isVideo ? 'bg-red-600' : 'bg-blue-600';
  const glowColor = isVideo ? 'shadow-red-600/25' : 'shadow-blue-500/25';
  const gradientText = isVideo 
    ? 'from-red-500 via-red-400 to-orange-500' 
    : 'from-blue-500 via-blue-400 to-cyan-400';
  const frameBorder = isVideo ? 'border-red-500/20' : 'border-blue-500/20';

  return (
    <section id="home" className="relative pt-28 pb-12 md:pt-48 md:pb-32 overflow-hidden min-h-screen flex items-center transition-colors duration-700 bg-darker">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
         {/* Dynamic Orbs */}
         <div className={`absolute top-[5%] -right-[10%] md:top-[10%] md:right-[5%] w-64 h-64 md:w-96 md:h-96 rounded-full border border-white/5 animate-[spin_20s_linear_infinite] transition-all duration-1000 opacity-30 ${isVideo ? 'border-red-500/20' : 'border-blue-500/20'}`}></div>
         <div className="absolute top-[10%] right-[0%] md:top-[15%] md:right-[10%] w-48 h-48 md:w-72 md:h-72 rounded-full border border-white/5 animate-[spin_25s_linear_infinite_reverse] opacity-30"></div>
         
         {/* Color Glows */}
         <div className={`absolute top-0 left-0 md:left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full blur-[80px] md:blur-[120px] transition-colors duration-1000 opacity-20 ${isVideo ? 'bg-red-900' : 'bg-blue-900'}`}></div>
         <div className={`absolute bottom-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full blur-[80px] md:blur-[120px] transition-colors duration-1000 opacity-10 ${isVideo ? 'bg-orange-900' : 'bg-cyan-900'}`}></div>
         
         {/* Grid Pattern */}
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="flex-1 space-y-6 md:space-y-8 z-10 w-full">
            
            {/* Toggle Switch */}
            <div className="inline-flex items-center bg-black/50 backdrop-blur-sm border border-white/10 rounded-full p-1.5 relative shadow-lg">
              {/* Sliding Background */}
              <div 
                className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] rounded-full transition-all duration-300 ease-out ${mode === 'dev' ? 'left-1.5 bg-blue-500/20' : 'left-[calc(50%+3px)] bg-red-500/20'}`}
              ></div>

              <button 
                onClick={() => handleToggle('dev')}
                className={`relative z-10 flex items-center gap-2 px-4 md:px-5 py-2 rounded-full text-xs md:text-sm font-bold transition-colors duration-300 ${mode === 'dev' ? 'text-blue-400' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <Code size={14} className="md:w-4 md:h-4" />
                Dev
              </button>
              <button 
                onClick={() => handleToggle('video')}
                className={`relative z-10 flex items-center gap-2 px-4 md:px-5 py-2 rounded-full text-xs md:text-sm font-bold transition-colors duration-300 ${mode === 'video' ? 'text-red-500' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <Film size={14} className="md:w-4 md:h-4" />
                Video
              </button>
            </div>

            {/* Status Badge */}
            <div>
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] md:text-xs font-bold tracking-widest uppercase transition-colors duration-500 ${primaryText} shadow-sm`}>
                <span className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full animate-pulse ${isVideo ? 'bg-red-500' : 'bg-green-500'}`}></span>
                Available for projects
              </div>
            </div>
            
            {/* Text Content */}
            <div className={`space-y-2 md:space-y-4 transition-opacity duration-500 ${isAnimating ? 'opacity-50' : 'opacity-100'}`}>
              <h2 className={`font-bold tracking-[0.2em] text-sm md:text-lg transition-colors duration-500 ${primaryText}`}>
                {content.greeting}
              </h2>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-heading font-black text-white tracking-tighter leading-[0.95] md:leading-[0.9]">
                {content.titleLine1} <br />
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${gradientText} transition-all duration-1000 drop-shadow-sm`}>
                  {content.titleLine2}
                </span>
              </h1>
            </div>

            <h3 className={`text-xl md:text-3xl text-slate-400 font-light transition-opacity duration-500 ${isAnimating ? 'opacity-50' : 'opacity-100'}`}>
              {content.subtitle} <br className="hidden md:block" /> 
              <span className="text-white font-medium block md:inline mt-1 md:mt-0">{content.subtitleHighlight}</span>
            </h3>
            
            <p className={`text-slate-400 text-base md:text-lg max-w-xl leading-relaxed border-l-2 pl-4 md:pl-6 transition-all duration-500 ${isAnimating ? 'opacity-50 translate-x-2' : 'opacity-100 translate-x-0'} ${isVideo ? 'border-red-600/50' : 'border-blue-500/50'}`}>
              {content.description}
            </p>
            
            {/* Buttons & Socials */}
            <div className="flex flex-wrap gap-4 md:gap-5 pt-2 md:pt-4">
              <a 
                href="#contact" 
                className={`text-white px-6 py-3 md:px-8 md:py-4 text-sm md:text-base rounded-full font-bold transition-all flex items-center gap-2 group shadow-lg hover:-translate-y-1 ${primaryBg} hover:brightness-110 ${glowColor}`}
              >
                {content.primaryButtonText}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform md:w-5 md:h-5" />
              </a>
              
              <div className="flex items-center gap-2 md:gap-3">
                {content.socials.map((social, idx) => (
                  <a 
                    key={idx}
                    href={social.href} 
                    className="p-3 md:p-4 bg-card hover:bg-white/10 border border-white/5 rounded-full text-slate-400 hover:text-white transition-all hover:-translate-y-1 hover:border-white/20"
                  >
                    <social.icon size={18} className="md:w-[22px] md:h-[22px]" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Visual/Image Side */}
          <div className="flex-1 w-full flex justify-center lg:justify-end relative mt-8 lg:mt-0">
             {/* Profile Card / Illustration */}
             <div className={`relative w-full max-w-sm lg:max-w-lg aspect-[4/5] bg-card border rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-700 group ${isVideo ? 'rotate-2 hover:rotate-0 shadow-red-900/10' : '-rotate-2 hover:rotate-0 shadow-blue-900/10'} ${frameBorder}`}>
                
                {/* Image with blending and grayscale animation */}
                <div className="absolute inset-0 z-0 bg-black">
                  <img 
                    src={content.profileImage} 
                    alt="Profile" 
                    key={mode} 
                    className={`w-full h-full object-cover transition-all duration-1000 scale-105 group-hover:scale-100 opacity-90 group-hover:opacity-100 grayscale group-hover:grayscale-0`}
                  />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 z-10"></div>

                {/* Overlay Scanline for Video Mode */}
                {isVideo && <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none z-20 opacity-20"></div>}
                
                {/* Floating Info Card */}
                <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-6 md:right-6 bg-black/60 backdrop-blur-xl border border-white/10 p-4 md:p-5 rounded-xl md:rounded-2xl z-30 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100 shadow-2xl">
                   {content.floatingCard.type === 'code' ? (
                     <>
                       <div className="flex items-center gap-2 text-[10px] md:text-xs text-slate-400 mb-2 md:mb-3 border-b border-white/5 pb-2">
                          <Terminal size={12} className="text-blue-400 md:w-[14px] md:h-[14px]" />
                          <span className="uppercase tracking-wider font-bold">{content.floatingCard.title}</span>
                       </div>
                       <div className="text-[10px] md:text-xs font-mono text-slate-300 space-y-1 md:space-y-1.5">
                          <p><span className="text-purple-400">const</span> <span className="text-yellow-300">developer</span> = <span className="text-purple-400">{`{`}</span></p>
                          <p className="pl-4">name: <span className="text-green-400">'Rudra'</span>,</p>
                          <p className="pl-4">skills: [<span className="text-green-400">'React'</span>, <span className="text-green-400">'Next.js'</span>],</p>
                          <p><span className="text-purple-400">{`}`}</span>;</p>
                       </div>
                     </>
                   ) : (
                     <div className="flex flex-col items-center gap-3">
                        {/* Badge */}
                        <div className="px-3 py-1 rounded-full bg-black/80 border border-white/10 flex items-center gap-2 shadow-lg mb-1">
                           <Video size={12} className="text-purple-500 fill-purple-500" />
                           <span className="text-[10px] font-bold text-white tracking-wide">Video Editor</span>
                        </div>
                        
                        {/* Dock */}
                        <div className="flex items-center gap-2 md:gap-3 p-2 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-md">
                           {/* Premiere */}
                           <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-[#00005c] border border-white/10 flex items-center justify-center text-[#d29bf8] font-bold text-[10px] md:text-xs shadow-lg hover:scale-110 transition-transform cursor-default" title="Premiere Pro">Pr</div>
                           {/* Photoshop */}
                           <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-[#001e36] border border-white/10 flex items-center justify-center text-[#31a8ff] font-bold text-[10px] md:text-xs shadow-lg hover:scale-110 transition-transform cursor-default" title="Photoshop">Ps</div>
                           {/* Media Encoder */}
                           <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-[#00005c] border border-white/10 flex items-center justify-center text-[#d29bf8] font-bold text-[10px] md:text-xs shadow-lg hover:scale-110 transition-transform cursor-default" title="Media Encoder">Me</div>
                           
                           {/* Divider */}
                           <div className="w-px h-5 bg-white/10 mx-0.5"></div>
                           
                           {/* Figma */}
                           <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-black/50 border border-white/10 flex items-center justify-center hover:scale-110 transition-transform cursor-default group/icon" title="Figma">
                              <Figma size={14} className="text-white opacity-80 group-hover/icon:opacity-100 md:w-[18px] md:h-[18px]" />
                           </div>
                           {/* Framer */}
                           <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-black/50 border border-white/10 flex items-center justify-center hover:scale-110 transition-transform cursor-default group/icon" title="Framer">
                              <LayoutTemplate size={14} className="text-white opacity-80 group-hover/icon:opacity-100 md:w-[18px] md:h-[18px]" />
                           </div>
                           {/* Notion */}
                           <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-black/50 border border-white/10 flex items-center justify-center hover:scale-110 transition-transform cursor-default group/icon" title="Notion">
                              <FileText size={14} className="text-white opacity-80 group-hover/icon:opacity-100 md:w-[18px] md:h-[18px]" />
                           </div>
                        </div>
                     </div>
                   )}
                </div>
             </div>
             
             {/* Abstract shapes behind */}
             <div className={`absolute -top-6 -right-6 md:-top-10 md:-right-10 w-24 h-24 md:w-32 md:h-32 rounded-full blur-[40px] md:blur-[60px] opacity-40 transition-colors duration-1000 ${isVideo ? 'bg-red-600' : 'bg-blue-600'}`}></div>
             <div className={`absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 w-24 h-24 md:w-32 md:h-32 rounded-full blur-[40px] md:blur-[60px] opacity-40 transition-colors duration-1000 ${isVideo ? 'bg-orange-600' : 'bg-cyan-600'}`}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;