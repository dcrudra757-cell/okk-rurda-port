import React, { useEffect, useState } from 'react';
import { AppMode } from '../types';
import { Film, Calendar, Users, Code, Award, CheckCircle, Briefcase } from 'lucide-react';
import { getAboutData, getTimeline, getSkills } from '../services/api';
import { ABOUT_DATA, FULL_TIMELINE, SKILLS_MATRIX, PROFILE_IMAGES } from '../constants';

interface AboutPageProps {
  mode: AppMode;
}

const AboutPage: React.FC<AboutPageProps> = ({ mode }) => {
  const [content, setContent] = useState(ABOUT_DATA[mode]);
  const [timeline, setTimeline] = useState(FULL_TIMELINE);
  const [skills, setSkills] = useState(SKILLS_MATRIX[mode]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const [aboutRes, timelineRes, skillsRes] = await Promise.all([
        getAboutData(mode),
        getTimeline(),
        getSkills(mode)
      ]);
      
      // In a real scenario, you'd replace state entirely. 
      // Here we rely on the service fallback logic mostly.
      if (aboutRes) setContent(aboutRes);
      if (timelineRes) {
        // API previously returned the full about doc by mistake (object). Coerce to array shape.
        if (Array.isArray(timelineRes)) {
          setTimeline(timelineRes);
        } else if (timelineRes && Array.isArray((timelineRes).timeline)) {
          setTimeline((timelineRes).timeline);
        } else {
          // fallback to default constant
          setTimeline(FULL_TIMELINE);
        }
      }
      if (skillsRes) {
        // Skills can be returned as array or embedded in an about doc
        if (Array.isArray(skillsRes)) setSkills(skillsRes);
        else if (skillsRes && Array.isArray((skillsRes).skills)) setSkills((skillsRes).skills);
        else setSkills(SKILLS_MATRIX[mode]);
      }
      
      setLoading(false);
    };
    loadData();
  }, [mode]);

  const isVideo = mode === 'video';
  const accentText = isVideo ? 'text-cine-red' : 'text-blue-500';
  const accentBg = isVideo ? 'bg-cine-red' : 'bg-blue-600';
  const gradientText = isVideo ? 'from-cine-red to-orange-500' : 'from-blue-500 to-cyan-400';

  // Randomize profile image on mount / mode change
  const [profileSrc, setProfileSrc] = useState<string>(() => {
    const imgs = PROFILE_IMAGES && PROFILE_IMAGES.length ? PROFILE_IMAGES : [(ABOUT_DATA[mode] as any).profileImage || '/images/dev-profile.jpg'];
    return imgs[Math.floor(Math.random() * imgs.length)];
  });
  useEffect(() => {
    const imgs = PROFILE_IMAGES && PROFILE_IMAGES.length ? PROFILE_IMAGES : [(content as any).profileImage || '/images/dev-profile.jpg'];
    setProfileSrc(imgs[Math.floor(Math.random() * imgs.length)]);
  }, [mode, content]);

  if (loading) return <div className="min-h-screen bg-[#050505] pt-32 flex justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div></div>;

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Header Section */}
      <section className="relative pt-32 pb-20 bg-[#080808] overflow-hidden">
        <div className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 pointer-events-none ${isVideo ? 'bg-red-600' : 'bg-blue-600'}`}></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-black text-white mb-6">
            About <span className={`text-transparent bg-clip-text bg-gradient-to-r ${gradientText}`}>Rudra Saxena</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Combining creative storytelling with technical precision.
          </p>
        </div>
      </section>

      {/* Main Profile Content */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left: Bio & Timeline (8 cols) */}
            <div className="lg:col-span-8 space-y-16">
              
              {/* Bio Section */}
              <div className="space-y-6">
                <h3 className={`text-sm font-bold tracking-[0.2em] uppercase mb-4 ${accentText}`}>THE STORY</h3>
                <div className="prose prose-invert prose-lg text-slate-400 leading-relaxed">
                  <p className="mb-4 text-xl text-white font-medium">{content.description1}</p>
                  <p>{content.description2}</p>
                  <p>
                    My mission is simple: to bridge the gap between raw ideas and polished digital reality. Whether it's cutting a high-pace retention reel or architecting a scalable React application, I bring the same level of obsession to detail and quality.
                  </p>
                </div>
              </div>

              {/* Mission & Vision */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-3xl hover:border-white/10 transition-colors">
                    <Award size={32} className={`mb-4 ${accentText}`} />
                    <h4 className="text-white font-bold text-lg mb-2">My Vision</h4>
                    <p className="text-slate-400 text-sm">To create digital experiences that don't just look good, but perform—driving real emotion and real metrics.</p>
                 </div>
                 <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-3xl hover:border-white/10 transition-colors">
                    <Users size={32} className={`mb-4 ${accentText}`} />
                    <h4 className="text-white font-bold text-lg mb-2">My Values</h4>
                    <p className="text-slate-400 text-sm">Consistency, communication, and a relentless pursuit of "better than yesterday."</p>
                 </div>
              </div>

              {/* Journey Timeline */}
              <div>
                <h3 className={`text-sm font-bold tracking-[0.2em] uppercase mb-8 ${accentText}`}>JOURNEY</h3>
                <div className="space-y-12 border-l border-white/10 ml-3 pl-10 relative">
                  {timeline.map((item, index) => (
                    <div key={index} className="relative group">
                      <div className={`absolute -left-[49px] w-7 h-7 rounded-full border-4 border-[#050505] ${accentBg} flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)]`}></div>
                      {/* display year if present, fall back to parsing a date field */}
                      <span className={`block text-xs font-bold mb-2 px-3 py-1 rounded-full bg-white/5 w-max text-white`}>{item.year ?? (item.date ? String(new Date(item.date).getFullYear()) : '')}</span>
                      <h4 className="text-white font-bold text-xl mb-2 group-hover:text-slate-200 transition-colors">{item.title}</h4>
                      <p className="text-base text-slate-400 leading-relaxed max-w-2xl">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Skills & Stats (4 cols) */}
            <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-32">
               
               {/* Photo Card */}
               <div className="relative rounded-3xl overflow-hidden aspect-[4/5] mb-8 group">
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10`}></div>
                  <img src={profileSrc} alt="Rudra" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute bottom-6 left-6 z-20">
                     <h3 className="text-white font-bold text-2xl">Rudra Saxena</h3>
                     <p className={`text-sm font-medium ${accentText}`}>{content.subtitle || (isVideo ? "Video Editor" : "Full Stack Dev")}</p>
                  </div>
               </div>

               {/* Skills Matrix */}
               <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 relative overflow-hidden">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    {isVideo ? <Film size={20} className={accentText} /> : <Code size={20} className={accentText} />}
                    Skills Matrix
                  </h3>
                  
                  <div className="space-y-6">
                    {skills.map((cat: any, idx: number) => (
                       <div key={idx}>
                          <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">{cat.category}</h5>
                          <div className="flex flex-wrap gap-2">
                             {cat.items.map((skill: string) => (
                                <span key={skill} className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-md text-xs text-slate-300 font-medium hover:bg-white/10 transition-colors cursor-default">
                                   {skill}
                                </span>
                             ))}
                          </div>
                       </div>
                    ))}
                  </div>
               </div>

               {/* Key Stats (guarded) */}
               {Array.isArray(content.stats) && content.stats.length > 0 && (
                 <div className="grid grid-cols-2 gap-4">
                   {content.stats.map((stat, idx) => (
                     <div key={idx} className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl text-center hover:bg-white/5 transition-colors">
                       <div className={`text-3xl font-heading font-black mb-1 ${accentText}`}>{stat.value}</div>
                       <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">{stat.label}</div>
                     </div>
                   ))}
                 </div>
               )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
