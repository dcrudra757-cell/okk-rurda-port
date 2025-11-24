import React, { useState, useEffect } from 'react';
import { Play, Eye } from 'lucide-react';
import { getShorts } from '../services/api';
import { SHORTS_GALLERY } from '../constants';

const ShortsPage: React.FC = () => {
  const [videos, setVideos] = useState(SHORTS_GALLERY);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await getShorts();
      setVideos(data);
      setLoading(false);
    };
    loadData();
  }, []);

  // Dynamically get categories
  const categories = ['All', ...Array.from(new Set(videos.map(v => v.category)))];
  
  const filteredVideos = filter === 'All' 
    ? videos 
    : videos.filter(v => v.category === filter);

  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-20">
      <div className="container mx-auto px-6">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-heading font-black text-white mb-6">
            Short Form <span className="text-cine-red">Gallery</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
             A collection of high-retention vertical videos optimized for Instagram Reels, TikTok, and YouTube Shorts.
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map(cat => (
             <button 
               key={cat}
               onClick={() => setFilter(cat)}
               className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all border ${
                 filter === cat 
                   ? 'bg-cine-red border-cine-red text-white shadow-[0_0_20px_rgba(255,74,25,0.3)]' 
                   : 'bg-white/5 border-white/5 text-slate-400 hover:text-white hover:bg-white/10'
               }`}
             >
               {cat}
             </button>
          ))}
        </div>

        {/* 3-Column Grid */}
        {loading ? (
           <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVideos.map((video) => (
                <div key={video.id} className="relative aspect-[9/16] rounded-[2rem] overflow-hidden group cursor-pointer border border-white/5 hover:border-cine-red/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl bg-[#0a0a0a]">
                  <img src={video.image} alt={video.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>

                  {/* Center Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-90 group-hover:scale-100">
                      <div className="w-20 h-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white shadow-xl">
                        <Play fill="white" size={32} className="ml-1" />
                      </div>
                  </div>

                  {/* Info Card */}
                  <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white bg-cine-red px-2 py-0.5 rounded shadow-lg">{video.category}</span>
                        <div className="flex items-center gap-1 text-slate-300 text-xs font-bold">
                            <Eye size={12} /> {video.views}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-white leading-tight group-hover:text-cine-red transition-colors">{video.title}</h3>
                  </div>
                </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default ShortsPage;
