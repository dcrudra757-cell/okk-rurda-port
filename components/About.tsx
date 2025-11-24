import React from 'react';
import { ABOUT_DATA, HERO_DATA } from '../constants';
import { AppMode } from '../types';
import { ArrowRight, Clock } from 'lucide-react';

interface AboutProps {
  mode: AppMode;
}

const About: React.FC<AboutProps> = ({ mode }) => {
  const content = ABOUT_DATA[mode];
  const profileImg = HERO_DATA[mode].profileImage;
  const isVideo = mode === 'video';
  
  const accentText = isVideo ? 'text-cine-red' : 'text-primary';
  const accentBg = isVideo ? 'bg-cine-red' : 'bg-primary';
  const gradientText = isVideo ? 'from-cine-red to-orange-500' : 'from-blue-500 to-cyan-400';

  return (
    <section id="about" className="py-24 md:py-32 bg-[#080808] relative">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Page Header */}
        <div className="text-center mb-20">
           <h3 className={`${accentText} font-bold tracking-[0.2em] mb-3 uppercase text-sm`}>MY JOURNEY</h3>
           <h2 className="text-4xl md:text-5xl font-heading font-black text-white">
             About <span className={`text-transparent bg-clip-text bg-gradient-to-r ${gradientText}`}>Rudra Saxena</span>
           </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
           
           {/* LEFT: Portrait & Skills */}
           <div className="lg:col-span-5 flex flex-col gap-10">
              <div className="relative rounded-[2rem] overflow-hidden aspect-[3/4] border border-white/5 shadow-2xl group">
                 <img src={profileImg} alt="Rudra Profile" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                 <div className={`absolute inset-0 bg-gradient-to-t ${isVideo ? 'from-red-900/50' : 'from-blue-900/50'} to-transparent opacity-60`}></div>
              </div>

              {/* Skills Grid */}
              <div className="bg-[#111] border border-white/10 rounded-3xl p-8">
                 <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${accentBg}`}></span>
                    {content.skillsTitle}
                 </h4>
                 <div className="flex flex-wrap gap-2">
                    {content.skills.map(skill => (
                       <span key={skill.name} className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:border-white/20 transition-all cursor-default">
                          {skill.name}
                       </span>
                    ))}
                 </div>
              </div>
           </div>

           {/* RIGHT: Story & Timeline */}
           <div className="lg:col-span-7">
              <h3 className="text-3xl font-heading font-bold text-white mb-6">
                 {content.heading} <span className={accentText}>{content.headingHighlight}</span>
              </h3>
              
              <div className="space-y-6 text-slate-400 text-lg leading-relaxed mb-12 border-b border-white/5 pb-12">
                 <p>{content.description1}</p>
                 <p>{content.description2}</p>
              </div>

              {/* Timeline */}
              <div>
                 <h4 className="text-white font-bold text-lg mb-8 flex items-center gap-2">
                    <Clock size={18} className={accentText} /> Career Timeline
                 </h4>
                 
                 <div className="space-y-8 relative pl-4 border-l border-white/10">
                    {content.timeline.map((item, idx) => (
                       <div key={idx} className="relative pl-8 group">
                          {/* Dot */}
                          <div className={`absolute -left-[21px] top-1.5 w-3 h-3 rounded-full border-2 border-[#080808] ${accentBg} transition-all group-hover:scale-125`}></div>
                          
                          <span className={`text-xs font-bold uppercase tracking-widest ${accentText} mb-1 block`}>{item.year}</span>
                          <h5 className="text-white font-bold text-xl mb-2">{item.title}</h5>
                          <p className="text-slate-500 text-sm">{item.description}</p>
                       </div>
                    ))}
                 </div>
              </div>

              <div className="mt-12">
                 <a href="#contact" className={`inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-bold uppercase text-xs tracking-wider transition-all hover:translate-x-1 ${accentBg}`}>
                    Let's Work Together <ArrowRight size={16} />
                 </a>
              </div>
           </div>

        </div>
      </div>
    </section>
  );
};

export default About;