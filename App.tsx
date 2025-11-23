import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechTicker from './components/TechTicker';
import About from './components/About';
import Services from './components/Services';
import ShopifyShowcase from './components/ShopifyShowcase';
import ShortFormShowcase from './components/ShortFormShowcase';
import SEOProcess from './components/SEOProcess';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AIChat from './components/AIChat';
import { AppMode } from './types';

const App: React.FC = () => {
  // Default to video based on prompt request to "Create a Video Editor Portfolio"
  // But check local storage first to persist choice
  const [mode, setMode] = useState<AppMode>('video');

  useEffect(() => {
    const savedMode = localStorage.getItem('portfolioMode');
    if (savedMode === 'dev' || savedMode === 'video') {
      setMode(savedMode);
    }
  }, []);

  const handleModeChange = (newMode: AppMode) => {
    setMode(newMode);
    localStorage.setItem('portfolioMode', newMode);
  };

  return (
    <div className={`min-h-screen bg-darker text-slate-300 selection:text-white ${mode === 'dev' ? 'selection:bg-primary/30' : 'selection:bg-pink-500/30'}`}>
      <Navbar mode={mode} />
      <main>
        <Hero mode={mode} setMode={handleModeChange} />
        <TechTicker mode={mode} />
        <About mode={mode} />
        <Services mode={mode} />
        <ShopifyShowcase mode={mode} />
        {/* Short Form Showcase only for Video Mode */}
        {mode === 'video' && <ShortFormShowcase />}
        <SEOProcess mode={mode} />
        <Projects mode={mode} />
        <Testimonials mode={mode} />
        <Contact mode={mode} />
      </main>
      <Footer />
      <AIChat />
    </div>
  );
};

export default App;