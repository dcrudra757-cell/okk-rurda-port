import React, { useState, useEffect } from 'react';
import { NAV_LINKS } from '../constants';
import { Menu, X } from 'lucide-react';
import { AppMode } from '../types';

interface NavbarProps {
  mode: AppMode;
}

const Navbar: React.FC<NavbarProps> = ({ mode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const links = NAV_LINKS[mode];
  const isVideo = mode === 'video';
  
  const linkHover = isVideo ? 'hover:text-cine-red' : 'hover:text-primary';
  const btnColor = isVideo 
    ? 'bg-cine-red hover:bg-red-600 shadow-[0_0_20px_rgba(255,74,25,0.4)]' 
    : 'bg-primary hover:bg-blue-700 shadow-[0_0_20px_rgba(59,130,246,0.4)]';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 border-b ${
          isScrolled 
            ? 'bg-[#050505]/90 backdrop-blur-xl border-white/[0.05] py-4 shadow-lg' 
            : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="#" className="text-2xl font-heading font-black text-white tracking-tighter group flex items-center gap-1 relative z-[101]">
            RUDRA<span className={isVideo ? 'text-cine-red' : 'text-primary'}>.</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
            <div className="flex items-center gap-8">
              {links.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className={`text-[11px] font-bold text-slate-400 transition-all duration-300 uppercase tracking-[0.15em] hover:text-white ${linkHover}`}
                >
                  {link.name}
                </a>
              ))}
            </div>
            <a 
              href="#contact" 
              className={`text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all transform hover:-translate-y-0.5 active:scale-95 ${btnColor}`}
            >
              {mode === 'dev' ? "Let's Talk" : "Start Project"}
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className={`md:hidden text-white transition-colors hover:text-slate-300 relative z-[101] ${isMobileMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            <Menu size={28} strokeWidth={1.5} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-[#050505] z-[200] flex flex-col items-center justify-center transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
      >
        <button 
          className="absolute top-6 right-6 p-2 text-white/50 hover:text-white border border-white/10 rounded-full transition-colors hover:bg-white/5"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Close Menu"
        >
          <X size={32} strokeWidth={1.5} />
        </button>

        <div className="flex flex-col items-center gap-8 w-full max-w-sm px-6">
          {links.map((link, index) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`text-3xl font-heading font-black text-white transition-all duration-300 transform hover:scale-105 tracking-tight ${linkHover}`}
              style={{ transitionDelay: `${index * 50}ms`, opacity: isMobileMenuOpen ? 1 : 0, transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)' }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          
          <div 
            className="w-full pt-8 flex justify-center"
            style={{ transitionDelay: `${links.length * 50}ms`, opacity: isMobileMenuOpen ? 1 : 0, transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)' }}
          >
            <a 
              href="#contact" 
              className={`w-full max-w-[200px] text-center text-white px-8 py-4 rounded-full font-bold uppercase tracking-wide text-sm shadow-xl transition-transform active:scale-95 ${btnColor}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {mode === 'dev' ? "Let's Talk" : "Start Project"}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;