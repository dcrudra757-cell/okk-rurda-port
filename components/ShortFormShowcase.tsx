import React, { useRef, useState } from 'react';
import { SHORT_FORM_VIDEOS } from '../constants';
import { Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight, ExternalLink, Loader2 } from 'lucide-react';
import { ShortFormVideo } from '../types';

// Helper to extract Drive ID for Embed Player
const getDriveId = (url: string) => {
  if (!url) return null;
  if (url.includes('drive.google.com')) {
    const match = url.match(/\/d\/(.+?)(\/|$)|id=(.+?)&|id=(.+?)$/);
    return match ? (match[1] || match[3] || match[4]) : null;
  }
  return null;
};

const VideoCard: React.FC<{ video: ShortFormVideo }> = ({ video }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(1);
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
    
    // Native Video Logic
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
    // Auto-play preview for native videos only if not drive
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

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const newMuted = !videoRef.current.muted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (videoRef.current) {
      videoRef.current.volume = newVol;
      setIsMuted(newVol === 0);
      videoRef.current.muted = newVol === 0;
    }
  };

  const togglePlay = (e: React.MouseEvent) => {
     e.stopPropagation();
     handlePlayClick(e);
  };

  return (
    <div 
      className={`w-full md:min-w-[300px] aspect-[9/16] relative rounded-2xl md:rounded-3xl overflow-hidden group border transition-all duration-300 snap-center bg-black cursor-pointer animate-scale-in
        ${showDrivePlayer 
          ? 'border-white/20 z-50 scale-100' 
          : 'border-white/10 md:hover:border-white/30 md:hover:shadow-2xl md:hover:scale-[1.02] md:hover:z-40'
        }
      `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handlePlayClick}
    >
      {/* Drive Embed Player */}
      {showDrivePlayer && driveId ? (
        <div className="absolute inset-0 z-50 bg-black">
           {isLoading && (
             <div className="absolute inset-0 flex items-center justify-center">
               <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
             </div>
           )}
           <iframe 
             src={`https://drive.google.com/file/d/${driveId}/preview`}
             className="w-full h-full border-0"
             allow="autoplay; encrypted-media"
             allowFullScreen
             onLoad={() => setIsLoading(false)}
           ></iframe>
           {/* Close Overlay Button */}
           <button 
             onClick={(e) => { e.stopPropagation(); setShowDrivePlayer(false); }}
             className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-red-600 text-white rounded-full backdrop-blur-md transition-colors border border-white/10"
           >
             <ExternalLink size={16} />
           </button>
        </div>
      ) : (
        /* Native / Preview Layer */
        <>
          <div className="w-full h-full relative">
            <img 
              src={video.image} 
              alt={video.title} 
              loading="lazy"
              className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0 absolute inset-0 z-10 ${isPlaying && !driveId ? 'opacity-0' : 'opacity-100'}`}
            />
            
            {/* Native Video Element */}
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
          
          {/* Subtle Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-80 z-20 pointer-events-none"></div>
          
          {/* Play Button */}
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 z-30 pointer-events-none ${(isPlaying || showDrivePlayer) ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}`}>
             <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 shadow-xl group-hover:bg-white/20 transition-all animate-bounce-3d">
                <Play fill="white" className="ml-1 text-white" size={28} />
             </div>
          </div>

          {/* Controls for Native Video */}
          {!driveId && (
            <div className={`absolute top-4 right-4 z-40 transition-all duration-300 ${isPlaying ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
               <div className="flex items-center gap-3 p-1.5 pl-4 pr-1.5 bg-black/60 backdrop-blur-md rounded-full border border-white/10 shadow-lg">
                   {/* Volume */}
                   <div className="flex items-center gap-2 group/vol">
                       <button onClick={toggleMute} className="text-white hover:text-red-400 transition-colors">
                          {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                       </button>
                       <div className="w-0 overflow-hidden group-hover/vol:w-16 transition-all duration-300">
                          <input 
                            type="range" min="0" max="1" step="0.1" value={isMuted ? 0 : volume} 
                            onChange={handleVolumeChange}
                            className="w-16 h-1 accent-red-500 bg-white/30 rounded-lg cursor-pointer"
                          />
                       </div>
                   </div>
               </div>
            </div>
          )}

          {/* Info Section - Mobile Optimized Full Screen */}
          <div className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-between p-4 md:p-5">
            {/* Top Section */}
            <div className="flex justify-between items-start">
               <div>
                  <span className="inline-block text-[6px] md:text-[7px] font-bold uppercase tracking-wider text-red-400 bg-red-500/40 px-2 py-1 rounded-md whitespace-nowrap">
                     {video.category}
                  </span>
               </div>
               <div className="text-right">
                  <p className="text-[10px] md:text-xs text-slate-300 font-medium">{video.views}</p>
               </div>
            </div>

            {/* Center Title */}
            <div className="text-center">
               <h3 className="text-sm md:text-base font-bold text-white leading-tight">{video.title}</h3>
            </div>

            {/* Bottom Gradient */}
            <div className="h-16 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
          </div>
        </>
      )}
    </div>
  );
};

const ShortFormShowcase: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = 300;
      current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="shorts" className="py-24 bg-[#050505] relative overflow-hidden border-b border-white/5">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h3 className="text-red-600 font-bold tracking-[0.2em] mb-4 uppercase text-xs md:text-sm">VIRAL CONTENT</h3>
            <h2 className="text-4xl md:text-5xl font-heading font-black text-white tracking-tight">
              Short Form Mastery
            </h2>
            <p className="text-slate-400 mt-4 max-w-xl text-base">
              Vertical content engineered for maximum retention and engagement.
            </p>
          </div>
          
          <div className="hidden md:flex gap-4 mt-6 md:mt-0">
             <button onClick={() => scroll('left')} className="w-12 h-12 rounded-full border border-white/10 hover:bg-white/5 text-white flex items-center justify-center transition-colors">
               <ChevronLeft size={24} />
             </button>
             <button onClick={() => scroll('right')} className="w-12 h-12 rounded-full border border-white/10 hover:bg-white/5 text-white flex items-center justify-center transition-colors">
               <ChevronRight size={24} />
             </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-4 md:gap-6 overflow-x-auto pb-8 snap-x snap-mandatory -mx-6 px-6 md:mx-0 md:px-0 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {SHORT_FORM_VIDEOS.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShortFormShowcase;