import React, { useRef, useState } from 'react';
import { SHORT_FORM_VIDEOS } from '../constants';
import { Play, Volume2, VolumeX, ChevronLeft, ChevronRight } from 'lucide-react';
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

  const driveId = getDriveId(video.videoUrl || '');
  const isDriveVideo = Boolean(driveId);
  const drivePreviewUrl = driveId ? `https://drive.google.com/file/d/${driveId}/preview` : null;
  const nativeVideoUrl = !isDriveVideo ? video.videoUrl : null;
  const hasAnyVideo = Boolean(nativeVideoUrl || drivePreviewUrl);

  const handlePlayClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDriveVideo) {
      setIsLoading(true);
      setShowDrivePlayer(true);
      return;
    }

    if (!videoRef.current || !nativeVideoUrl) return;

    if (videoRef.current.paused) {
      try {
        await videoRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.warn('Unable to start playback', error);
      }
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleMouseEnter = () => {
    // Auto-play preview for native videos only
    if (videoRef.current && nativeVideoUrl && !isPlaying) {
      videoRef.current.muted = true;
      setIsMuted(true);
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current && nativeVideoUrl) {
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

  return (
    <div 
      className={`w-full md:flex-none md:min-w-[240px] lg:min-w-[300px] aspect-[9/16] relative rounded-[2rem] overflow-hidden group border transition-all duration-300 bg-[#0a0a0a] ${hasAnyVideo ? 'cursor-pointer' : 'cursor-default'} animate-scale-in
        border-white/5 hover:border-white/20 hover:shadow-2xl hover:scale-[1.02] hover:z-40 md:snap-center
      `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={hasAnyVideo ? handlePlayClick : undefined}
    >
      <div className="w-full h-full relative">
        <img 
          src={video.image} 
          alt={video.title} 
          loading="lazy"
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0 absolute inset-0 z-10 ${
            (nativeVideoUrl && isPlaying) || (isDriveVideo && showDrivePlayer) ? 'opacity-0' : 'opacity-100'
          }`}
        />
        
        {/* Native Video */}
        {nativeVideoUrl && (
          <video
            ref={videoRef}
            src={nativeVideoUrl}
            className="w-full h-full object-cover absolute inset-0 z-0"
            muted={isMuted}
            loop
            playsInline
            preload="metadata"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        )}

        {/* Drive Embed */}
        {isDriveVideo && showDrivePlayer && drivePreviewUrl && (
            <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center z-40 bg-black/50">
                  <div className="w-12 h-12 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                </div>
              )}

              <div className="w-full max-w-[900px] h-[84vh] bg-black rounded-xl overflow-hidden z-30 shadow-2xl">
                <iframe
                  src={drivePreviewUrl}
                  className="w-full h-full border-0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  onLoad={() => setIsLoading(false)}
                />
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDrivePlayer(false);
                  setIsLoading(false);
                }}
                className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center bg-black/60 hover:bg-red-600 text-white rounded-full border border-white/10 transition-colors z-50"
                aria-label="Close video"
              >
                ✕
              </button>
            </div>
        )}

      </div>
      
      {/* Subtle Gradient + Vignette Overlay to focus center */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-95"></div>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 45%, rgba(0,0,0,0.55) 100%)' }} />
      </div>

      {/* Play Button (larger, more visible) */}
      {hasAnyVideo && (
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 z-30 pointer-events-none ${
          (nativeVideoUrl && isPlaying) || (isDriveVideo && showDrivePlayer) ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
        }`}>
          <div className="w-18 h-18 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-white/12 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 shadow-2xl group-hover:bg-white/20 transition-all">
            <Play fill="white" className="text-white" size={28} />
          </div>
        </div>
      )}

      {/* Controls for Video */}
      {nativeVideoUrl && (
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

      {/* Info Section - Cleaner Layout */}
      <div className="absolute bottom-0 left-0 w-full p-6 z-30 pointer-events-none">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-red-500">
            {video.category}
          </span>
        </div>
        <h3 className="text-xl font-bold text-white mb-1 leading-tight">{video.title}</h3>
        <p className="text-xs text-slate-400 font-medium">{video.views}</p>
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
      current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="shorts" data-section className="bg-[#050505] relative overflow-hidden border-b border-white/5">
      <div className="section-shell relative z-10">
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
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:flex md:grid-cols-none md:gap-6 md:overflow-x-auto md:pb-8 md:snap-x md:snap-mandatory md:-mx-6 md:px-6 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', paddingLeft: 'calc(1.25rem + env(safe-area-inset-left))', paddingRight: 'calc(1.25rem + env(safe-area-inset-right))', scrollPaddingInline: 'calc(1.25rem + env(safe-area-inset-left))' }}
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