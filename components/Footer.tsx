import React from 'react';
import { Github, Linkedin, Twitter, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-darker py-12 border-t border-white/5">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <a href="#" className="text-2xl font-heading font-bold text-white tracking-tighter block mb-2 hover:opacity-80 transition-opacity">
            RUDRA
          </a>
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} Rudra Saxena. All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-2 text-slate-500 text-sm">
          Made with <Heart size={14} className="text-red-500 fill-red-500" /> using React & Tailwind
        </div>

        <div className="flex items-center gap-4">
          <a href="#" className="text-slate-400 hover:text-white transition-colors"><Github size={20} /></a>
          <a href="#" className="text-slate-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
          <a href="#" className="text-slate-400 hover:text-white transition-colors"><Twitter size={20} /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;