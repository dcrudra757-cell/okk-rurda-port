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
  const [volume, setVolume] = useState(1);

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
      if (newVol > 0 && isMuted) {
        videoRef.current.muted = false;
        setIsMuted(false);
      } else if (newVol === 0 && !isMuted) {
        videoRef.current.muted = true;
        setIsMuted(true);
      }
    }
  };

  return (
    <div 
      className="min-w-[240px] md:min-w-[280px] aspect-[9/16] relative rounded-3xl overflow-hidden group border border-white/[0.08] shadow-2xl snap-center bg-card cursor-pointer hover:z-50 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:border-white/20"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Media Layer */}
      <div className="w-full h-full relative">
        <img 
          src={video.image} 
          alt={video.title} 
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0 absolute inset-0 z-10 ${isPlaying && video.videoUrl ? 'opacity-0' : 'opacity-100'}`}
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 z-20 pointer-events-none"></div>
      
      {/* Big Play Button (Initial State) */}
      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 transform ${isPlaying ? 'scale-150 opacity-0' : 'scale-100 opacity-100'} z-30 pointer-events-none`}>
         <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 shadow-xl group-hover:scale-110 transition-transform duration-500">
            <Play fill="white" className="ml-1 text-white" size={28} />
         </div>
      </div>

      {/* Custom Controls Overlay (Visible on hover/play) */}
      <div className={`absolute top-4 right-4 z-40 flex flex-col items-end gap-3 transition-all duration-300 ${isPlaying ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}`}>
         
         {/* Volume Controls */}
         <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10 p-1 pr-3 transition-all hover:bg-black/60">
             <button 
               onClick={toggleMute}
               className="w-8 h-8 rounded-full flex items-center justify-center text-white hover:text-red-400 transition-colors"
               aria-label={isMuted ? "Unmute" : "Mute"}
               title={isMuted ? "Unmute" : "Mute"}
             >
                {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
             </button>
             <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.05" 
                value={isMuted ? 0 : volume} 
                onChange={handleVolumeChange}
                className="w-16 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer focus:outline-none 
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:hover:bg-red-500 [&::-webkit-slider-thumb]:transition-colors"
             />
         </div>

         {/* Play Toggle */}
         <button 
           onClick={togglePlay}
           className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all shadow-lg"
           aria-label={isPlaying ? "Pause" : "Play"}
           title={isPlaying ? "Pause" : "Play"}
         >
            {isPlaying ? <Pause size={18} /> : <Play size={18} fill="currentColor" />}
         </button>
      </div>

      {/* Stats & Title Bottom */}
      <div className="absolute bottom-0 left-0 w-full p-5 md:p-6 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300 z-30 pointer-events-none">
        <span className="inline-block px-3 py-1 bg-red-600/90 text-white text-[10px] font-bold uppercase tracking-widest rounded-full mb-3 backdrop-blur-md shadow-lg">
           {video.category}
        </span>
        <h3 className="text-lg font-heading font-bold text-white mb-1.5 leading-tight">{video.title}</h3>
        <p className="text-xs text-slate-300 flex items-center gap-2 font-medium">
           <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_5px_rgba(34,197,94,0.6)]"></span>
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
            <h2 className="text-3xl md:text-[8rem] font-heading font-black text-white/[0.02] absolute top-0 left-0 select-none pointer-events-none leading-none -translate-y-16 z-0">
              SHORT FORM
            </h2>
            <h2 className="text-3xl md:text-5xl font-heading font-black text-white relative z-10 tracking-tight">
              Short Form <span className="text-red-600">Edits</span>
            </h2>
            <p className="text-slate-400 mt-4 max-w-lg relative z-10 text-sm md:text-base font-light">
              High-retention vertical content optimized for Reels, TikTok, and Shorts.
            </p>
          </div>
          
          <div className="hidden md:flex gap-4 relative z-10">
             <button onClick={() => scroll('left')} className="p-4 rounded-full bg-white/[0.03] border border-white/10 hover:bg-red-600 hover:border-red-600 transition-all text-white hover:scale-110">
               <ChevronLeft size={24} />
             </button>
             <button onClick={() => scroll('right')} className="p-4 rounded-full bg-white/[0.03] border border-white/10 hover:bg-red-600 hover:border-red-600 transition-all text-white hover:scale-110">
               <ChevronRight size={24} />
             </button>
          </div>
        </div>

        {/* Carousel */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-4 md:gap-8 overflow-x-auto pb-16 snap-x snap-mandatory -mx-6 px-6 md:mx-0 md:px-0 pt-4"
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