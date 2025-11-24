import React, { useRef, useState } from 'react';
import { SHORT_FORM_VIDEOS } from '../constants';
import { Play, Volume2, VolumeX, ExternalLink, Loader2 } from 'lucide-react';
import { ShortFormVideo } from '../types';

// Helper to extract Drive ID for Embed Player
const getDriveId = (url: string) => {
  if (!url) return null;
  const match = url.match(/\/d\/(.+?)(\/|$)|id=(.+?)&|id=(.+?)$/);
  return match ? (match[1] || match[3] || match[4]) : null;
};

const VideoCard: React.FC<{ video: ShortFormVideo }> = ({ video }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showDrivePlayer, setShowDrivePlayer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const driveId = getDriveId(video.videoUrl);

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (driveId) {
      setIsLoading(true);
      setShowDrivePlayer(true);
      return;
    }
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleMouseEnter = () => {
    if (videoRef.current && !driveId && !isPlaying) {
      videoRef.current.muted = true;
      setIsMuted(true);
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current && !driveId) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return (
    <div 
      className={`aspect-[9/16] relative rounded-[1.5rem] overflow-hidden group border transition-all duration-300 bg-[#0a0a0a] cursor-pointer
        ${showDrivePlayer ? 'border-white/20 z-50' : 'border-white/5 hover:border-white/20 hover:shadow-2xl hover:-translate-y-2'}
      `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handlePlayClick}
    >
      {showDrivePlayer && driveId ? (
        <div className="absolute inset-0 z-50 bg-black">
           {isLoading && (
             <div className="absolute inset-0 flex items-center justify-center">
               <Loader2 className="w-8 h-8 text-cine-red animate-spin" />
             </div>
           )}
           <iframe 
             src={`https://drive.google.com/file/d/${driveId}/preview`}
             className="w-full h-full border-0"
             allow="autoplay; encrypted-media"
             allowFullScreen
             onLoad={() => setIsLoading(false)}
           ></iframe>
           <button 
             onClick={(e) => { e.stopPropagation(); setShowDrivePlayer(false); }}
             className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-red-600 text-white rounded-full backdrop-blur-md transition-colors border border-white/10"
           >
             <ExternalLink size={16} />
           </button>
        </div>
      ) : (
        <>
          <div className="w-full h-full relative">
            <img 
              src={video.image} 
              alt={video.title} 
              className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0 absolute inset-0 z-10 ${isPlaying && !driveId ? 'opacity-0' : 'opacity-100'}`}
            />
            {!driveId && video.videoUrl && (
              <video
                ref={videoRef}
                src={video.videoUrl}
                className="w-full h-full object-cover absolute inset-0 z-0"
                muted={isMuted}
                loop
                playsInline
                preload="metadata"
              />
            )}
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-90 z-20 pointer-events-none"></div>
          
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 z-30 pointer-events-none ${(isPlaying || showDrivePlayer) ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}`}>
             <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 shadow-xl group-hover:bg-cine-red group-hover:border-cine-red transition-all">
                <Play fill="white" className="ml-1 text-white" size={24} />
             </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full p-5 z-30 pointer-events-none">
            <span className="text-[9px] font-bold uppercase tracking-widest text-cine-red bg-cine-red/10 px-2 py-0.5 rounded mb-2 inline-block">
               {video.category}
            </span>
            <h3 className="text-lg font-bold text-white mb-1 leading-snug">{video.title}</h3>
            <p className="text-[10px] text-slate-400 font-medium">{video.views}</p>
          </div>
        </>
      )}
    </div>
  );
};

const ShortFormShowcase: React.FC = () => {
  return (
    <section id="shorts" className="py-24 bg-[#050505] relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h3 className="text-cine-red font-bold tracking-[0.2em] mb-4 uppercase text-sm">SHORTS GALLERY</h3>
          <h2 className="text-4xl md:text-5xl font-heading font-black text-white">Short Form Mastery</h2>
          
          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
             {['Travel', 'Vlogs', 'Commercial', 'Reels'].map(cat => (
                <span key={cat} className="px-4 py-1.5 rounded-full border border-white/10 text-xs font-bold text-slate-400 hover:text-white hover:border-white/30 cursor-pointer transition-all">
                   {cat}
                </span>
             ))}
          </div>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {SHORT_FORM_VIDEOS.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShortFormShowcase;