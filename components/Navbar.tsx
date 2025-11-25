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
  
  // Design System
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
            ? 'bg-[#050505]/80 backdrop-blur-2xl border-white/[0.1] py-3 shadow-[0_0_30px_rgba(0,0,0,0.4)] animate-slide-in-down' 
            : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <NavLink to="/" className="text-2xl font-heading font-black text-white tracking-tighter group flex items-center gap-1 relative z-[101]">
            RUDRA<span className={isVideo ? 'text-cine-red' : 'text-blue-500'}>.</span>
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
            <div className="flex items-center gap-8">
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
              className={`text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all transform hover:-translate-y-0.5 active:scale-95 ${btnColor}`}
            >
              {mode === 'dev' ? "Let's Talk" : "Start Project"}
            </NavLink>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className={`md:hidden text-white transition-colors hover:text-text-muted relative z-[101] min-h-[48px] p-3 rounded-md ${isMobileMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay (backdrop + slide-in panel) */}
      <div className={`fixed inset-0 z-[200] pointer-events-none transition-all ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        {/* Backdrop */}
        <div className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMobileMenuOpen(false)}></div>

        {/* Slide-in panel */}
        <aside className={`absolute top-0 right-0 h-full mobile-menu-panel glass-card shadow-xl pointer-events-auto transition-all duration-300 ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
          <div className="h-full flex flex-col justify-start items-stretch px-6 py-8">
            <div className="flex items-center justify-between mb-8">
              <NavLink to="/" className="text-xl font-heading font-black text-white tracking-tighter flex items-center gap-1">
                RUDRA<span className={isVideo ? 'text-cine-red' : 'text-blue-500'}>.</span>
              </NavLink>
              <button className="p-2 rounded-md text-white/70 hover:text-white hover:bg-white/5" onClick={() => setIsMobileMenuOpen(false)} aria-label="Close Menu">
                <X size={20} />
              </button>
            </div>

            <nav className="flex-1 overflow-auto">
              <div className="flex flex-col gap-6">
                {links.map((link, index) => (
                  <NavLink 
                    key={link.name}
                    to={link.href}
                    className={({ isActive }) => `text-2xl font-heading font-black transition-all duration-300 tracking-tight animate-slide-in-left ${isActive ? 'text-white' : 'text-white/70'} ${linkHover}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </NavLink>
                ))}
              </div>
            </nav>

            <div className="mt-6">
              <NavLink to="/contact" className={`cta-full text-center text-white px-6 py-3 rounded-full font-bold uppercase tracking-wide text-sm ${btnColor}`} onClick={() => setIsMobileMenuOpen(false)}>
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