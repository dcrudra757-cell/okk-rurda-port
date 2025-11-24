import React from 'react';
import { Mail, Send, User, MessageSquare, Clock } from 'lucide-react';
import { AppMode } from '../types';

interface ContactProps {
  mode: AppMode;
}

const Contact: React.FC<ContactProps> = ({ mode }) => {
  const isVideo = mode === 'video';
  const btnGradient = isVideo 
    ? 'bg-gradient-to-r from-cine-red to-orange-600 hover:shadow-[0_0_30px_rgba(255,74,25,0.4)]' 
    : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]';

  return (
    <section id="contact" className="py-24 md:py-36 bg-[#050505] relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-7xl font-heading font-black text-white mb-6">
            Let's Create <br />
            <span className={isVideo ? 'text-cine-red' : 'text-blue-500'}>Something Iconic.</span>
          </h2>
          <p className="text-text-muted text-lg md:text-xl">
             Available for freelance projects and collaborations.
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-[#111] p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl relative">
           <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${isVideo ? 'from-cine-red to-orange-500' : 'from-blue-600 to-cyan-500'}`}></div>
           
           <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="relative group">
                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-white transition-colors" />
                    <input type="text" placeholder="Name" className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-4 pl-12 text-white focus:outline-none focus:border-white/30 transition-colors" />
                 </div>
                 <div className="relative group">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-white transition-colors" />
                    <input type="email" placeholder="Email" className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-4 pl-12 text-white focus:outline-none focus:border-white/30 transition-colors" />
                 </div>
              </div>
              
              <div className="relative group">
                 <MessageSquare size={18} className="absolute left-4 top-6 text-slate-500 group-focus-within:text-white transition-colors" />
                 <textarea rows={4} placeholder="Tell me about your project..." className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-4 pl-12 text-white focus:outline-none focus:border-white/30 transition-colors resize-none"></textarea>
              </div>

              <button className={`w-full py-5 rounded-xl text-white font-bold text-lg tracking-wide shadow-xl transform transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 ${btnGradient} cta-full`}>
                 Send Message <Send size={20} />
              </button>
           </form>

           <div className="mt-8 flex items-center justify-center gap-2 text-text-muted text-sm">
              <Clock size={14} />
              <span>Typical response time: Within 2 hours</span>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;