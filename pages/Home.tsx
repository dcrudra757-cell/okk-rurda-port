import React from 'react';
import HeroIntroUI from '../components/HeroIntroUI';
import TechTicker from '../components/TechTicker';
import About from '../components/About';
import Services from '../components/Services';
import ShopifyShowcase from '../components/ShopifyShowcase';
import ShortFormShowcase from '../components/ShortFormShowcase';
import SEOProcess from '../components/SEOProcess';
import Projects from '../components/Projects';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import { AppMode } from '../types';

interface HomeProps {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
}

const Home: React.FC<HomeProps> = ({ mode, setMode }) => {
  return (
    <>
      <HeroIntroUI mode={mode} setMode={setMode} />
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
    </>
  );
};

export default Home;