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
  
  // Design System
  const linkHover = isVideo ? 'hover:text-red-500' : 'hover:text-blue-400';
  const btnColor = isVideo 
    ? 'bg-red-600 hover:bg-red-700 shadow-[0_0_15px_rgba(220,38,38,0.5)]' 
    : 'bg-blue-600 hover:bg-blue-700 shadow-[0_0_15px_rgba(59,130,246,0.5)]';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-darker/90 backdrop-blur-md border-b border-white/5 py-3 md:py-4' : 'bg-transparent py-4 md:py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="text-xl md:text-2xl font-heading font-bold text-white tracking-tighter group hover:opacity-90 transition-opacity">
          RUDRA
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`text-sm font-medium text-slate-400 transition-colors uppercase tracking-wider ${linkHover}`}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact" 
            className={`text-white px-6 py-2 rounded-full text-sm font-bold transition-all transform hover:scale-105 hover:shadow-lg ${btnColor}`}
          >
            {mode === 'dev' ? "Let's Talk" : "Start Project"}
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white transition-colors hover:text-slate-300"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-4 shadow-2xl h-screen">
          {links.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`text-slate-300 py-3 text-lg font-medium border-b border-white/5 ${linkHover}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact" 
            className={`text-center text-white px-6 py-4 rounded-lg mt-2 font-bold uppercase tracking-wide ${btnColor}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {mode === 'dev' ? "Let's Talk" : "Start Project"}
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;