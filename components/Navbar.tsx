import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import { Menu, X } from 'lucide-react';
import { AppMode } from '../types';

interface NavbarProps {
  mode: AppMode;
}

const Navbar: React.FC<NavbarProps> = ({ mode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const links = NAV_LINKS[mode];
  const isVideo = mode === 'video';
  
  const linkHover = isVideo ? 'hover:text-cine-red' : 'hover:text-blue-400';
  const activeLink = isVideo ? 'text-cine-red' : 'text-blue-500';
  const btnColor = isVideo 
    ? 'bg-gradient-to-r from-cine-red to-red-600 hover:from-red-500 hover:to-orange-500 shadow-[0_0_20px_rgba(255,74,25,0.4)]' 
    : 'bg-blue-600 hover:bg-blue-700 shadow-[0_0_20px_rgba(59,130,246,0.4)]';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 border-b ${
          isScrolled 
            ? 'bg-[#050505]/80 backdrop-blur-2xl border-white/[0.1] py-2 xs:py-2.5 sm:py-3 shadow-[0_0_30px_rgba(0,0,0,0.4)] animate-slide-in-down' 
            : 'bg-transparent border-transparent py-2 xs:py-2.5 sm:py-3 md:py-6'
        }`}
      >
        <div className="container mx-auto px-3 sm:px-6 flex justify-between items-center min-h-[56px] xs:min-h-[60px] sm:h-auto">
          {/* Logo - Mobile Optimized */}
          <NavLink 
            to="/" 
            className="text-base xs:text-lg sm:text-xl md:text-2xl font-heading font-black text-white tracking-tighter group flex items-center gap-1 relative z-[101] min-h-[44px] flex items-center flex-shrink-0"
          >
            RUDRA<span className={isVideo ? 'text-cine-red' : 'text-blue-500'}>.</span>
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            <div className="flex items-center gap-6 lg:gap-8">
              {links.map((link) => (
                <NavLink 
                  key={link.name} 
                  to={link.href} 
                  className={({ isActive }) => `text-[11px] font-bold transition-all duration-300 uppercase tracking-[0.15em] hover:text-white relative group ${isActive ? activeLink : 'text-text-muted'} ${linkHover} ${isActive ? 'after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-transparent after:via-white after:to-transparent after:animate-pulse-slow' : ''}`}
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
            <NavLink 
              to="/contact" 
              className={`text-white px-5 lg:px-6 py-2 lg:py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all transform hover:-translate-y-0.5 active:scale-95 min-h-[44px] flex items-center justify-center ${btnColor}`}
            >
              {mode === 'dev' ? "Let's Talk" : "Start Project"}
            </NavLink>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className={`md:hidden text-white transition-colors hover:text-text-muted relative z-[101] min-h-[44px] min-w-[44px] p-2 rounded-md flex items-center justify-center ${isMobileMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            <Menu size={24} strokeWidth={1.5} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[200] pointer-events-none md:hidden transition-all ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} 
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Slide-in Panel */}
        <aside className={`absolute top-0 right-0 h-full w-3/4 max-w-xs glass-card shadow-xl pointer-events-auto transition-all duration-300 ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
          <div className="h-full flex flex-col justify-start items-stretch px-4 sm:px-5 py-4 sm:py-5">
            {/* Menu Header */}
            <div className="flex items-center justify-between mb-5 sm:mb-6 pb-4 sm:pb-5 border-b border-white/10">
              <NavLink 
                to="/" 
                className="text-sm xs:text-base sm:text-lg font-heading font-black text-white tracking-tighter flex items-center gap-1 min-h-[44px] flex items-center"
              >
                RUDRA<span className={isVideo ? 'text-cine-red' : 'text-blue-500'}>.</span>
              </NavLink>
              <button 
                className="p-2 rounded-md text-white/70 hover:text-white hover:bg-white/5 min-h-[44px] min-w-[44px] flex items-center justify-center" 
                onClick={() => setIsMobileMenuOpen(false)} 
                aria-label="Close Menu"
              >
                <X size={22} />
              </button>
            </div>

            {/* Menu Links */}
            <nav className="flex-1 overflow-y-auto scrollbar-hide">
              <div className="flex flex-col gap-3 sm:gap-3.5">
                {links.map((link) => (
                  <NavLink 
                    key={link.name}
                    to={link.href}
                    className={({ isActive }) => `text-sm xs:text-base sm:text-lg font-heading font-black transition-all duration-300 tracking-tight py-3 px-3 rounded-lg min-h-[48px] flex items-center ${isActive ? 'text-white bg-white/5' : 'text-white/70'} ${linkHover}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </NavLink>
                ))}
              </div>
            </nav>

            {/* CTA Button */}
            <div className="mt-auto pt-4 sm:pt-5 border-t border-white/10">
              <NavLink 
                to="/contact" 
                className={`text-center text-white px-4 py-3 sm:py-3.5 rounded-full font-bold uppercase tracking-wide text-xs xs:text-sm sm:text-base min-h-[48px] flex items-center justify-center w-full transition-all transform hover:scale-105 active:scale-95 ${btnColor}`} 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {mode === 'dev' ? "Let's Talk" : "Start Project"}
              </NavLink>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
};

export default Navbar;