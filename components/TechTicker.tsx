import React from 'react';
import { TICKER_ITEMS } from '../constants';
import { Zap } from 'lucide-react';
import { AppMode } from '../types';

interface TickerProps {
  mode: AppMode;
}

const TechTicker: React.FC<TickerProps> = ({ mode }) => {
  const items = TICKER_ITEMS[mode];
  const isVideo = mode === 'video';
  const iconColor = isVideo ? 'text-red-600' : 'text-blue-500';

  return (
    <div className="w-full bg-[#050505] py-6 md:py-8 border-y border-white/5 overflow-hidden relative z-20">
      <div className="flex w-max animate-marquee group hover:pause">
        {[...items, ...items, ...items].map((item, index) => (
          <div key={index} className="flex items-center gap-4 md:gap-6 mx-4 md:mx-8 shrink-0 opacity-50 hover:opacity-100 transition-opacity duration-300">
             <Zap size={14} className={`${iconColor} md:w-[18px] md:h-[18px]`} fill="currentColor" />
             <span className="text-lg md:text-xl font-heading font-black text-slate-200 uppercase tracking-widest whitespace-nowrap">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechTicker;