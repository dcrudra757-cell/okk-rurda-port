import React from 'react';
import { HERO_DATA } from '../constants';
import { AppMode } from '../types';

interface SocialSidebarProps {
  mode: AppMode;
}

const SocialSidebar: React.FC<SocialSidebarProps> = ({ mode }) => {
  const socials = HERO_DATA[mode].socials;
  const isVideo = mode === 'video';

  const bgClass = isVideo ? 'bg-cine-red hover:bg-red-600' : 'bg-blue-600 hover:bg-blue-700';

  return (
    <>
      {/* Desktop Sidebar - Hidden on Mobile */}
      <div className="hidden lg:flex fixed right-0 top-1/2 -translate-y-1/2 z-50 flex-col gap-3 md:gap-4">
        {socials.map((social, index) => (
          <a
            key={index}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${bgClass} text-white p-3 pr-4 pl-4 rounded-l-full shadow-lg transform translate-x-2 hover:translate-x-0 transition-transform duration-300 flex items-center justify-center min-h-[48px] min-w-[48px]`}
            aria-label={`Visit ${social.href}`}
          >
            <social.icon size={20} />
          </a>
        ))}
      </div>

      {/* Mobile Bottom Tab Bar - Visible only on Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#050505]/95 backdrop-blur-lg border-t border-white/[0.08]">
        <div className="flex justify-around items-stretch px-2 py-2">
          {socials.slice(0, 3).map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${bgClass} text-white flex-1 max-w-[60px] h-12 rounded-lg shadow-lg transform transition-all duration-300 flex items-center justify-center min-h-[44px] active:scale-95 hover:scale-105 mx-1`}
              aria-label={`Visit ${social.href}`}
            >
              <social.icon size={20} />
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default SocialSidebar;