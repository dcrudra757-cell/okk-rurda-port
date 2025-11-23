import React, { useRef } from 'react';
import { SHORT_FORM_VIDEOS } from '../constants';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';

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
    <section id="shorts" className="py-20 md:py-32 bg-darker overflow-hidden relative">
      {/* Background Gradient to match screenshot vibe */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-black to-darker opacity-80 z-0"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl md:text-6xl font-heading font-black text-white/10 absolute -top-10 left-6 md:left-0 select-none pointer-events-none scale-150 origin-top-left">
              SHORT FORM
            </h2>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white relative z-10">
              Short Form <span className="text-red-600">Edits</span>
            </h2>
            <p className="text-slate-400 mt-4 max-w-lg">
              High-retention vertical content optimized for Reels, TikTok, and Shorts.
            </p>
          </div>
          
          <div className="hidden md:flex gap-4">
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
          className="flex gap-6 md:gap-8 overflow-x-auto pb-12 snap-x snap-mandatory -mx-6 px-6 md:mx-0 md:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {SHORT_FORM_VIDEOS.map((video) => (
            <div 
              key={video.id} 
              className="min-w-[280px] md:min-w-[320px] aspect-[9/16] relative rounded-2xl overflow-hidden group border border-white/10 shadow-2xl snap-center bg-card"
            >
              {/* Image */}
              <img 
                src={video.image} 
                alt={video.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80"></div>
              
              {/* Play Button Center */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-50 group-hover:scale-100">
                 <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.6)]">
                    <Play fill="white" className="ml-1 text-white" />
                 </div>
              </div>

              {/* Stats & Title Bottom */}
              <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <span className="inline-block px-3 py-1 bg-red-600/20 border border-red-600/30 text-red-500 text-[10px] font-bold uppercase tracking-wider rounded-full mb-2 backdrop-blur-md">
                   {video.category}
                </span>
                <h3 className="text-xl font-bold text-white mb-1">{video.title}</h3>
                <p className="text-sm text-slate-300 flex items-center gap-2">
                   <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                   {video.views}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShortFormShowcase;