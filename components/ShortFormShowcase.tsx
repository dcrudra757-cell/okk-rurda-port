import React, { useRef, useState } from 'react';
import { SHORT_FORM_VIDEOS } from '../constants';
import { Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight } from 'lucide-react';
import { ShortFormVideo } from '../types';

// Helper to convert Google Drive share links to streamable direct links
const getPlayableUrl = (url: string) => {
  if (!url) return '';
  // Check if it's a google drive share link
  if (url.includes('drive.google.com')) {
    // Extract ID (matches both /d/ID/ and id=ID formats)
    const match = url.match(/\/d\/(.+?)\/|id=(.+?)&|id=(.+?)$/);
    const id = match ? (match[1] || match[2] || match[3]) : null;
    if (id) {
      return `https://drive.google.com/uc?export=download&id=${id}`;
    }
  }
  return url;
};

const VideoCard: React.FC<{ video: ShortFormVideo }> = ({ video }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      // Always start muted for browser policy compliance on autoplay
      videoRef.current.muted = true;
      setIsMuted(true);
      
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(e => {
            console.log('Autoplay prevented', e);
            setIsPlaying(false);
          });
      }
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
      setIsMuted(true); // Reset mute on exit
    }
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
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

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div 
      className="min-w-[240px] md:min-w-[280px] aspect-[9/16] relative rounded-2xl overflow-hidden group border border-white/10 shadow-2xl snap-center bg-card cursor-pointer hover:z-50 transition-all duration-300"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Media Layer */}
      <div className="w-full h-full relative">
        <img 
          src={video.image} 
          alt={video.title} 
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 absolute inset-0 z-10 ${isPlaying && video.videoUrl ? 'opacity-0' : 'opacity-100'}`}
        />
        
        {video.videoUrl && (
          <video
            ref={videoRef}
            src={getPlayableUrl(video.videoUrl)}
            className="w-full h-full object-cover absolute inset-0 z-0"
            muted={isMuted}
            loop
            playsInline
            preload="metadata"
          />
        )}
      </div>
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 z-20 pointer-events-none"></div>
      
      {/* Big Play Button (Initial State) */}
      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 transform ${isPlaying ? 'scale-150 opacity-0' : 'scale-100 opacity-100'} z-30 pointer-events-none`}>
         <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.6)]">
            <Play fill="white" className="ml-1 text-white" size={24} />
         </div>
      </div>

      {/* Custom Controls Overlay (Visible on hover/play) */}
      <div className={`absolute top-4 right-4 z-40 flex flex-col gap-3 transition-all duration-300 ${isPlaying ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}`}>
         <button 
           onClick={toggleMute}
           className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-red-600 hover:border-red-600 transition-all shadow-lg group/btn"
           aria-label={isMuted ? "Unmute" : "Mute"}
           title={isMuted ? "Unmute" : "Mute"}
         >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
         </button>
         <button 
           onClick={togglePlay}
           className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-red-600 hover:border-red-600 transition-all shadow-lg"
           aria-label={isPlaying ? "Pause" : "Play"}
           title={isPlaying ? "Pause" : "Play"}
         >
            {isPlaying ? <Pause size={18} /> : <Play size={18} fill="currentColor" />}
         </button>
      </div>

      {/* Stats & Title Bottom */}
      <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 z-30 pointer-events-none">
        <span className="inline-block px-2.5 py-0.5 bg-red-600/20 border border-red-600/30 text-red-500 text-[9px] font-bold uppercase tracking-wider rounded-full mb-2 backdrop-blur-md">
           {video.category}
        </span>
        <h3 className="text-lg font-bold text-white mb-1 leading-tight">{video.title}</h3>
        <p className="text-xs text-slate-300 flex items-center gap-2">
           <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
           {video.views}
        </p>
      </div>
    </div>
  );
};

const ShortFormShowcase: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = 300;
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="shorts" className="py-20 md:py-32 bg-gradient-to-b from-card to-darker overflow-hidden relative">
      {/* Background Gradient to match screenshot vibe */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-black/50 to-transparent opacity-50 z-0"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 relative">
          <div>
            {/* Background Text - Fixed positioning to not be cut off */}
            <h2 className="text-3xl md:text-6xl font-heading font-black text-white/5 absolute top-0 left-0 select-none pointer-events-none scale-150 origin-top-left -translate-y-4 md:-translate-y-8 z-0">
              SHORT FORM
            </h2>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white relative z-10">
              Short Form <span className="text-red-600">Edits</span>
            </h2>
            <p className="text-slate-400 mt-4 max-w-lg relative z-10 text-sm md:text-base">
              High-retention vertical content optimized for Reels, TikTok, and Shorts.
            </p>
          </div>
          
          <div className="hidden md:flex gap-4 relative z-10">
             <button onClick={() => scroll('left')} className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-red-600 hover:border-red-600 transition-all text-white">
               <ChevronLeft size={24} />
             </button>
             <button onClick={() => scroll('right')} className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-red-600 hover:border-red-600 transition-all text-white">
               <ChevronRight size={24} />
             </button>
          </div>
        </div>

        {/* Carousel */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-5 md:gap-8 overflow-x-auto pb-12 snap-x snap-mandatory -mx-6 px-6 md:mx-0 md:px-0"
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