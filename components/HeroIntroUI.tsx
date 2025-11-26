import React, { useState, MouseEvent } from 'react';
import { ArrowRight, Code, Film, Star, CheckCircle, Award, Play, Code2, Briefcase } from 'lucide-react';
import { HERO_DATA, PROFILE_IMAGES } from '../constants';
import { AppMode } from '../types';

interface HeroIntroUIProps {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
}

const HeroIntroUI: React.FC<HeroIntroUIProps> = ({ mode, setMode }) => {
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
   const [profileSrc, setProfileSrc] = React.useState<string>('');
   
   React.useEffect(() => {
      const getRandomProfile = () => {
        if (PROFILE_IMAGES && PROFILE_IMAGES.length > 0) {
          return PROFILE_IMAGES[Math.floor(Math.random() * PROFILE_IMAGES.length)];
        }
        return content?.profileImage || '/images/dev-profile.jpg';
      };
      
      setProfileSrc(getRandomProfile());
   }, [mode, content?.profileImage]);

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
            
            {/* Mode Switcher - Desktop Horizontal */}
            <div className="hidden sm:inline-flex items-center bg-white/5 backdrop-blur-lg border border-white/10 rounded-full p-1 mb-3 xs:mb-4 sm:mb-5 md:mb-6 shadow-lg relative overflow-hidden min-h-[44px] hover:border-white/20 transition-all">
              <div className={`absolute inset-y-1 w-1/2 rounded-full transition-all duration-500 ease-out ${mode === 'dev' ? 'left-1 bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-500/50' : 'left-1/2 bg-gradient-to-r from-orange-600 to-red-500 shadow-lg shadow-orange-500/50'}`}></div>
              <button 
                onClick={() => handleToggle('dev')} 
                className={`relative z-10 flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-300 flex-1 ${mode === 'dev' ? 'text-white' : 'text-slate-400 hover:text-white'}`}
              >
                <Code size={14} className="sm:size-4" /> 
                <span>Dev</span>
              </button>
              <button 
                onClick={() => handleToggle('video')} 
                className={`relative z-10 flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-300 flex-1 ${mode === 'video' ? 'text-white' : 'text-slate-400 hover:text-white'}`}
              >
                <Film size={14} className="sm:size-4" /> 
                <span>Video</span>
              </button>
            </div>

            {/* Mode Switcher - Mobile Vertical Stack */}
            <div className="sm:hidden flex flex-col gap-2.5 w-full max-w-sm mb-4 xs:mb-5 sm:mb-6">
              {/* Dev Button */}
              <button
                onClick={() => handleToggle('dev')}
                className={`relative flex items-center justify-center gap-3 px-6 py-3.5 rounded-lg font-semibold transition-all duration-300 text-sm group/btn w-full ${
                  mode === 'dev'
                    ? 'text-white border-2 border-blue-500 bg-blue-600/10'
                    : 'text-slate-300 border-2 border-slate-600 bg-white/5 hover:border-slate-500 hover:bg-white/10'
                }`}
              >
                {mode === 'dev' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-blue-500/20 rounded-lg -z-10"></div>
                )}
                <Code2 size={18} />
                <span>Full-Stack Dev</span>
              </button>

              {/* Video Button */}
              <button
                onClick={() => handleToggle('video')}
                className={`relative flex items-center justify-center gap-3 px-6 py-3.5 rounded-lg font-semibold transition-all duration-300 text-sm group/btn w-full ${
                  mode === 'video'
                    ? 'text-white border-2 border-orange-500 bg-orange-600/10'
                    : 'text-slate-300 border-2 border-slate-600 bg-white/5 hover:border-slate-500 hover:bg-white/10'
                }`}
              >
                {mode === 'video' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600/30 to-red-500/20 rounded-lg -z-10"></div>
                )}
                <Briefcase size={18} />
                <span>Video Editor</span>
              </button>
            </div>

            {/* Typography */}
            <div className={`transition-all duration-500 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
              <h2 className={`font-bold tracking-[0.3em] text-[8px] xs:text-[9px] sm:text-xs uppercase mb-3 xs:mb-3.5 sm:mb-4 flex items-center gap-2 ${primaryText} justify-center lg:justify-start animate-slide-in-down`}>
                 <span className="w-3 xs:w-4 sm:w-5 h-px xs:h-px sm:h-[1.5px] bg-current"></span>
                 {content.greeting}
                 <span className="w-3 xs:w-4 sm:w-5 h-px xs:h-px sm:h-[1.5px] bg-current"></span>
              </h2>
              
              <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.2] sm:leading-[1.15] md:leading-[1.1] mb-4 xs:mb-5 sm:mb-6 md:mb-8 animate-fade-in-up">
                <span className="block mb-1 sm:mb-2">{content.titleLine1}</span>
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${gradientText} block`}>
                  {content.titleLine2}
                </span>
              </h1>              
              <h3 className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-slate-300 font-light mb-4 xs:mb-5 sm:mb-6 md:mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed animate-slide-in-right" style={{ animationDelay: '100ms' }}>
                {content.subtitle} <span className="text-white font-semibold">{content.subtitleHighlight}</span>
              </h3>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 w-full sm:w-auto animate-slide-in-left" style={{ animationDelay: '200ms' }}>
                <a 
                  href="#projects" 
                  className={`w-full sm:w-auto text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg font-bold text-sm sm:text-base transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2 group ${primaryBg}`}
                >
                  {content.primaryButtonText}
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
                
                {isVideo && (
                  <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg border-2 border-white/20 text-white font-bold text-sm sm:text-base hover:border-white/40 hover:bg-white/5 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-1 active:translate-y-0">
                    <Play size={16} fill="currentColor" /> 
                    <span>Showreel</span>
                  </button>
                )}
              </div>              {/* Social Proof Bar */}
              <div className="mt-6 xs:mt-7 sm:mt-8 md:mt-10 pt-4 xs:pt-5 sm:pt-6 border-t border-white/10 w-full flex flex-col xs:flex-row gap-4 xs:gap-5 sm:gap-6 justify-center lg:justify-start animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                 <div className="flex items-center justify-center sm:justify-start gap-2">
                    <div className="flex items-center gap-0.5 text-yellow-400">
                       <Star size={12} className="xs:size-3.5 sm:size-4" fill="currentColor" />
                       <Star size={12} className="xs:size-3.5 sm:size-4" fill="currentColor" />
                       <Star size={12} className="xs:size-3.5 sm:size-4" fill="currentColor" />
                       <Star size={12} className="xs:size-3.5 sm:size-4" fill="currentColor" />
                       <Star size={12} className="xs:size-3.5 sm:size-4" fill="currentColor" />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-400 font-medium">100% Satisfied</span>
                 </div>
                 
                 <div className="flex items-center justify-center sm:justify-start gap-2">
                    <div className={`w-6 sm:w-7 h-6 sm:h-7 rounded-full ${primaryBg} flex items-center justify-center`}>
                       <CheckCircle size={14} className="text-white" />
                    </div>
                    <div>
                       <span className="text-white font-bold text-sm sm:text-base">200+</span>
                       <span className="text-slate-400 text-xs sm:text-sm ml-1">Projects</span>
                    </div>
                 </div>

                 <div className="flex items-center justify-center sm:justify-start gap-2">
                    <div className={`w-6 sm:w-7 h-6 sm:h-7 rounded-full ${primaryBg} flex items-center justify-center`}>
                       <Award size={14} className="text-white" />
                    </div>
                    <div>
                       <span className="text-white font-bold text-sm sm:text-base">5+</span>
                       <span className="text-slate-400 text-xs sm:text-sm ml-1">Years</span>
                    </div>
                 </div>
              </div>
            </div>
          </div>

          {/* Visual Side with 3D Tilt */}
          <div className="flex-1 w-full flex justify-center lg:justify-end relative mt-6 xs:mt-7 sm:mt-8 md:mt-10 lg:mt-0 z-10 animate-slide-in-right px-3 sm:px-0" style={{ perspective: '1000px' }}>
             <div 
                className="relative w-full max-w-[220px] xs:max-w-[260px] sm:max-w-[300px] md:max-w-[360px] lg:max-w-sm aspect-[4/5] group transition-all duration-200 ease-out hover:scale-105 active:scale-95"
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                style={{
                   transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1, 1, 1)`,
                   willChange: 'transform'
                }}
             >
                {/* Glow Behind */}
                <div className={`absolute inset-0 bg-gradient-to-tr ${isVideo ? 'from-orange-600 to-orange-500' : 'from-blue-600 to-cyan-400'} rounded-3xl blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700`}></div>
                
                {/* Main Card */}
                <div className="relative w-full h-full rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-black">
                   <img 
                      src={profileSrc} 
                      alt="Profile" 
                      loading="lazy"
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                   />
                   
                   {/* Vignette Overlay */}
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 pointer-events-none"></div>
                   
                   {/* Rec Overlay for Video */}
                   {isVideo && (
                     <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex justify-between items-center pointer-events-none">
                        <div className="flex items-center gap-2">
                           <div className="w-2.5 h-2.5 bg-red-600 rounded-full animate-pulse shadow-lg shadow-red-600/50"></div>
                           <span className="text-white font-mono text-xs sm:text-sm font-bold tracking-widest">REC</span>
                        </div>
                        <div className="text-white/80 font-mono text-xs sm:text-sm">4K • 60FPS</div>
                     </div>
                   )}

                   {/* Floating Stats Card */}
                   <div className="absolute bottom-3 sm:bottom-5 left-3 sm:left-5 right-3 sm:right-5 bg-black/50 backdrop-blur-xl border border-white/40 p-3.5 sm:p-4 rounded-2xl transform transition-transform duration-300 shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
                      <div className="flex items-center justify-between gap-3">
                         <div className="flex-1 min-w-0">
                            <p className="text-xs sm:text-sm text-slate-300 uppercase tracking-widest mb-1.5 font-bold">Status</p>
                            <div className="flex items-center gap-2">
                               <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0 shadow-lg shadow-green-500/60"></span>
                               <span className="text-white font-semibold text-xs sm:text-sm whitespace-nowrap">Accepting Projects</span>
                            </div>
                         </div>
                         <div className={`w-11 h-11 rounded-full ${primaryBg} flex items-center justify-center flex-shrink-0 shadow-xl`}>
                            {isVideo ? <Film size={20} className="text-white" /> : <Code size={20} className="text-white" />}
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

export default HeroIntroUI;
