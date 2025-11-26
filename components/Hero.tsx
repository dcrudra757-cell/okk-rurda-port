import React, { useState, MouseEvent } from 'react';
import { ArrowRight, Code, Film, Star, CheckCircle, Award, Play } from 'lucide-react';
import { HERO_DATA, PROFILE_IMAGES } from '../constants';
import { AppMode } from '../types';

interface HeroProps {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
}

const Hero: React.FC<HeroProps> = ({ mode, setMode }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const isVideo = mode === 'video';

  const handleToggle = (newMode: AppMode) => {
    if (mode === newMode) return;
    setIsAnimating(true);
    setMode(newMode);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    const centerX = box.width / 2;
    const centerY = box.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    setRotate({ x: rotateX, y: rotateY });
  };

  const onMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  const content = HERO_DATA[mode];

   // Randomize profile image on mount / mode change so a different photo shows each visit
   const [profileSrc, setProfileSrc] = React.useState<string>(content.profileImage || PROFILE_IMAGES[0]);
   React.useEffect(() => {
      const imgs = PROFILE_IMAGES && PROFILE_IMAGES.length ? PROFILE_IMAGES : [content.profileImage];
      const pick = imgs[Math.floor(Math.random() * imgs.length)];
      setProfileSrc(pick);
   }, [mode]);

  // Cinematic Theme Styles
  const primaryText = isVideo ? 'text-cine-red' : 'text-blue-500';
  const primaryBg = isVideo ? 'bg-cine-red' : 'bg-blue-600';
  const glowColor = isVideo ? 'shadow-cine-red/40' : 'shadow-blue-500/40';
  const gradientText = isVideo 
    ? 'from-cine-red via-orange-500 to-yellow-500' 
    : 'from-blue-500 via-blue-400 to-cyan-400';

  return (
    <section id="home" className="relative pt-16 xs:pt-18 sm:pt-20 md:pt-28 lg:pt-32 pb-6 xs:pb-7 sm:pb-8 md:pb-12 lg:pb-16 overflow-hidden min-h-screen flex items-center bg-[#050505]">
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full blur-[80px] sm:blur-[120px] opacity-10 transition-colors duration-1000 ${isVideo ? 'bg-cine-red' : 'bg-blue-900'}`}></div>
        <div className={`absolute bottom-0 left-0 w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] rounded-full blur-[80px] sm:blur-[120px] opacity-5 transition-colors duration-1000 ${isVideo ? 'bg-orange-900' : 'bg-cyan-900'}`}></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay"></div>
      </div>

      <div className="container mx-auto px-3 xs:px-3 sm:px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-6 xs:gap-7 sm:gap-8 md:gap-10 lg:gap-16">
          
          {/* Content Side */}
          <div className="flex-1 w-full flex flex-col items-center lg:items-start text-center lg:text-left z-20 animate-fade-in-up">
            
            {/* Mode Switcher */}
            <div className="inline-flex items-center bg-surface-highlight border border-white/[0.08] rounded-full p-0.5 sm:p-1 mb-3 xs:mb-4 sm:mb-5 md:mb-6 shadow-inner relative overflow-hidden min-h-[40px] xs:min-h-[42px] sm:min-h-[44px]">
              <div className={`absolute top-0.5 bottom-0.5 w-[calc(50%-3px)] rounded-full transition-all duration-500 ease-out shadow-lg ${mode === 'dev' ? 'left-0.5 bg-blue-600' : 'left-[calc(50%+1px)] bg-cine-red'}`}></div>
              <button 
                onClick={() => handleToggle('dev')} 
                className={`relative z-10 flex items-center justify-center gap-1 px-2.5 xs:px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[8px] xs:text-[9px] sm:text-[10px] font-bold transition-colors min-h-[36px] min-w-[36px] ${mode === 'dev' ? 'text-white' : 'text-text-muted hover:text-white'}`}
              >
                <Code size={12} className="xs:size-3.5 sm:size-4" /> 
                <span className="hidden xs:inline">Dev</span>
              </button>
              <button 
                onClick={() => handleToggle('video')} 
                className={`relative z-10 flex items-center justify-center gap-1 px-2.5 xs:px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[8px] xs:text-[9px] sm:text-[10px] font-bold transition-colors min-h-[36px] min-w-[36px] ${mode === 'video' ? 'text-white' : 'text-text-muted hover:text-white'}`}
              >
                <Film size={12} className="xs:size-3.5 sm:size-4" /> 
                <span className="hidden xs:inline">Video</span>
              </button>
            </div>

            {/* Typography */}
            <div className={`transition-all duration-500 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
              <h2 className={`font-bold tracking-[0.3em] text-[8px] xs:text-[9px] sm:text-xs uppercase mb-2 xs:mb-2.5 sm:mb-3 flex items-center gap-2 ${primaryText} justify-center lg:justify-start animate-slide-in-down`}>
                 <span className="w-4 xs:w-5 sm:w-6 h-[1.5px] xs:h-[1.5px] sm:h-[2px] bg-current animate-scale-in"></span>
                 {content.greeting}
              </h2>
              
              <h1 className="hero-h1 text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black text-white tracking-tighter leading-[1.3] sm:leading-[1.25] md:leading-[1.2] lg:leading-[1.05] mb-3 xs:mb-4 sm:mb-5 md:mb-6 lg:mb-8 animate-fade-in-up">
                {content.titleLine1} <br />
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${gradientText} animate-gradient-shift`}>
                  {content.titleLine2}
                </span>
              </h1>              
              <h3 className="text-[13px] xs:text-sm sm:text-base md:text-lg lg:text-xl text-text-muted font-light mb-3 xs:mb-4 sm:mb-5 md:mb-6 lg:mb-8 max-w-lg mx-auto lg:mx-0 leading-[1.5] sm:leading-relaxed animate-slide-in-right" style={{ animationDelay: '100ms' }}>
                {content.subtitle} <span className="text-white font-medium border-b border-white/20 pb-0.5">{content.subtitleHighlight}</span>
              </h3>

              <div className="flex flex-col xs:flex-row sm:flex-row items-center justify-center lg:justify-start gap-2 xs:gap-2.5 sm:gap-3 w-full sm:w-auto animate-slide-in-left" style={{ animationDelay: '200ms' }}>
                <a 
                  href="#projects" 
                  className={`cta-full w-full xs:flex-1 sm:w-auto text-white px-3 xs:px-4 sm:px-6 py-2.5 xs:py-2.75 sm:py-2.5 md:py-3 rounded-full font-bold text-xs xs:text-sm sm:text-sm md:text-base tracking-wide transition-all shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] hover:-translate-y-1 hover:shadow-2xl hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group min-h-[44px] sm:min-h-[48px] ${primaryBg} ${glowColor}`}
                >
                  {content.primaryButtonText}
                  <ArrowRight size={12} className="xs:size-3.5 sm:size-4 group-hover:translate-x-1 transition-transform" />
                </a>
                
                {isVideo && (
                  <button className="w-full xs:flex-1 sm:w-auto px-3 xs:px-4 sm:px-6 py-2.5 xs:py-2.75 sm:py-2.5 md:py-3 rounded-full border border-white/10 text-white font-bold text-xs xs:text-sm sm:text-sm md:text-base hover:bg-white/5 hover:border-white/30 transition-all flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95 min-h-[44px] sm:min-h-[48px]">
                    <Play size={10} className="xs:size-3 sm:size-3.5" fill="currentColor" /> <span className="hidden xs:inline">Showreel</span>
                  </button>
                )}
              </div>              {/* Social Proof Bar */}
              <div className="mt-3 xs:mt-3.5 sm:mt-4 md:mt-6 lg:mt-8 pt-2.5 xs:pt-3 sm:pt-3.5 md:pt-5 lg:pt-6 border-t border-white/5 w-full flex flex-col xs:flex-col sm:flex-row sm:flex-wrap justify-center lg:justify-start gap-2.5 xs:gap-3 sm:gap-3.5 md:gap-5 lg:gap-8 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                 <div className="flex flex-col items-center sm:items-start">
                    <div className="flex items-center gap-0.5 text-yellow-500 mb-0.5 xs:mb-1 justify-center sm:justify-start">
                       <Star size={8} className="xs:size-2.5 sm:size-3" fill="currentColor" />
                       <Star size={8} className="xs:size-2.5 sm:size-3" fill="currentColor" />
                       <Star size={8} className="xs:size-2.5 sm:size-3" fill="currentColor" />
                       <Star size={8} className="xs:size-2.5 sm:size-3" fill="currentColor" />
                       <Star size={8} className="xs:size-2.5 sm:size-3" fill="currentColor" />
                    </div>
                    <span className="text-[7px] xs:text-[8px] sm:text-[9px] md:text-xs text-text-muted font-medium">100% Client Satisfaction</span>
                 </div>
                 
                 <div className="flex items-center justify-center sm:justify-start gap-1.5 xs:gap-2 sm:gap-2.5">
                    <div className="w-5 xs:w-5.5 sm:w-6 h-5 xs:h-5.5 sm:h-6 rounded-full bg-white/5 flex items-center justify-center text-white flex-shrink-0">
                       <CheckCircle size={10} className={`xs:size-3 sm:size-3.5 ${isVideo ? 'text-cine-red' : 'text-blue-500'}`} />
                    </div>
                    <div className="flex flex-col">
                       <span className="text-white font-bold text-[9px] xs:text-xs sm:text-sm md:text-base leading-none">200+</span>
                       <span className="text-[7px] xs:text-[8px] sm:text-[9px] text-text-muted uppercase tracking-widest">Projects</span>
                    </div>
                 </div>

                 <div className="flex items-center justify-center sm:justify-start gap-1.5 xs:gap-2 sm:gap-2.5">
                    <div className="w-5 xs:w-5.5 sm:w-6 h-5 xs:h-5.5 sm:h-6 rounded-full bg-white/5 flex items-center justify-center text-white flex-shrink-0">
                       <Award size={10} className={`xs:size-3 sm:size-3.5 ${isVideo ? 'text-cine-red' : 'text-blue-500'}`} />
                    </div>
                    <div className="flex flex-col">
                       <span className="text-white font-bold text-[9px] xs:text-xs sm:text-sm md:text-base leading-none">5+</span>
                       <span className="text-[7px] xs:text-[8px] sm:text-[9px] text-text-muted uppercase tracking-widest">Years</span>
                    </div>
                 </div>
              </div>
            </div>
          </div>

          {/* Visual Side with 3D Tilt */}
          <div className="flex-1 w-full flex justify-center lg:justify-end relative mt-4 xs:mt-5 sm:mt-6 md:mt-8 lg:mt-0 z-10 animate-slide-in-right px-2 xs:px-3 sm:px-0" style={{ perspective: '1000px' }}>
             <div 
                className="relative w-full max-w-[200px] xs:max-w-[230px] sm:max-w-[280px] md:max-w-[320px] lg:max-w-sm aspect-[4/5] group transition-all duration-200 ease-out hover:scale-105 active:scale-95"
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                style={{
                   transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1, 1, 1)`
                }}
             >
                {/* Glow Behind */}
                <div className={`absolute inset-0 bg-gradient-to-tr ${isVideo ? 'from-cine-red to-orange-600' : 'from-blue-600 to-cyan-500'} rounded-2xl sm:rounded-[2rem] blur-xl sm:blur-2xl opacity-15 sm:opacity-20 group-hover:opacity-35 sm:group-hover:opacity-40 transition-opacity duration-700`}></div>
                
                {/* Main Card */}
                <div className="relative w-full h-full rounded-2xl sm:rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-[#0a0a0a]">
                   <img 
                      src={profileSrc} 
                      alt="Profile" 
                      loading="lazy"
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                   />
                   
                   {/* Vignette Overlay */}
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20 opacity-80 pointer-events-none"></div>
                   
                   {/* Rec Overlay for Video */}
                   {isVideo && (
                     <div className="absolute top-3 sm:top-5 left-3 sm:left-5 right-3 sm:right-5 flex justify-between items-center pointer-events-none">
                        <div className="flex items-center gap-1.5 sm:gap-2">
                           <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 bg-red-600 rounded-full animate-pulse"></div>
                           <span className="text-white font-mono text-[8px] sm:text-[10px] font-bold tracking-widest">REC</span>
                        </div>
                        <div className="text-white/80 font-mono text-[8px] sm:text-[10px]">4K • 60FPS</div>
                     </div>
                   )}

                   {/* Floating Stats Card */}
                   <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 bg-white/5 backdrop-blur-xl border border-white/10 p-2.5 xs:p-3 sm:p-4 rounded-lg sm:rounded-xl transform transition-transform duration-300 group-hover:translate-z-10" style={{ transform: 'translateZ(20px)' }}>
                      <div className="flex items-center justify-between gap-2 sm:gap-3">
                         <div className="flex-1">
                            <p className="text-[7px] xs:text-[8px] sm:text-[10px] text-text-muted uppercase tracking-wider mb-0.5 xs:mb-1">Current Status</p>
                            <div className="flex items-center gap-1.5 sm:gap-2">
                               <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 bg-green-500 rounded-full animate-pulse flex-shrink-0"></span>
                               <span className="text-white font-bold text-[8px] xs:text-[9px] sm:text-xs truncate">Accepting New Projects</span>
                            </div>
                         </div>
                         <div className={`w-6 xs:w-6.5 sm:w-8 h-6 xs:h-6.5 sm:h-8 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0 ${primaryBg}`}>
                            {isVideo ? <Film size={12} className="xs:size-3 sm:size-4" /> : <Code size={12} className="xs:size-3 sm:size-4" />}
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;