import React from 'react';
import { Mail, Send, User, MessageSquare, DollarSign, Layers } from 'lucide-react';
import { AppMode } from '../types';

interface ContactProps {
  mode: AppMode;
}

const Contact: React.FC<ContactProps> = ({ mode }) => {
  const isVideo = mode === 'video';
  const accentBg = isVideo ? 'bg-cine-red' : 'bg-primary';
  const gradientBtn = isVideo 
    ? 'bg-gradient-to-r from-cine-red to-orange-600 shadow-cine-red/30' 
    : 'bg-gradient-to-r from-blue-600 to-cyan-600 shadow-blue-500/30';

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#050505] relative overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
           {/* Left Info */}
           <div>
              <h3 className={`${isVideo ? 'text-cine-red' : 'text-primary'} font-bold tracking-[0.2em] mb-4 uppercase text-sm`}>CONTACT</h3>
              <h2 className="text-5xl md:text-7xl font-heading font-black text-white mb-8 leading-tight">
                Let's Create <br /> Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">Iconic.</span>
              </h2>
              <p className="text-slate-400 text-lg mb-12 max-w-md">
                 Ready to elevate your digital presence? Fill out the form and I'll get back to you within 24 hours.
              </p>

              <div className="space-y-6">
                 <div className="flex items-center gap-4 text-white">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center"><Mail size={18} /></div>
                    <span className="font-medium">rudra@example.com</span>
                 </div>
                 <div className="flex items-center gap-4 text-white">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center"><MessageSquare size={18} /></div>
                    <span className="font-medium">+91 98765 43210</span>
                 </div>
              </div>
           </div>

           {/* Right Form */}
           <div className="bg-[#111] p-8 md:p-10 rounded-[2.5rem] border border-white/5 shadow-2xl relative">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Name</label>
                       <div className="relative">
                          <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                          <input type="text" placeholder="John Doe" className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-4 pl-10 text-white focus:outline-none focus:border-white/30 transition-colors text-sm" />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Email</label>
                       <div className="relative">
                          <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                          <input type="email" placeholder="john@company.com" className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-4 pl-10 text-white focus:outline-none focus:border-white/30 transition-colors text-sm" />
                       </div>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Project Type</label>
                       <div className="relative">
                          <Layers size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                          <select className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-4 pl-10 text-white focus:outline-none focus:border-white/30 transition-colors text-sm appearance-none cursor-pointer">
                             <option>Video Editing</option>
                             <option>Web Development</option>
                             <option>Shopify Store</option>
                             <option>Technical SEO</option>
                          </select>
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Budget Range</label>
                       <div className="relative">
                          <DollarSign size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                          <select className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-4 pl-10 text-white focus:outline-none focus:border-white/30 transition-colors text-sm appearance-none cursor-pointer">
                             <option>$500 - $1k</option>
                             <option>$1k - $3k</option>
                             <option>$3k - $5k</option>
                             <option>$5k+</option>
                          </select>
                       </div>
                    </div>
                 </div>
                 
                 <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Message</label>
                    <textarea rows={4} placeholder="Tell me about your project..." className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-white/30 transition-colors resize-none text-sm"></textarea>
                 </div>

                 <button className={`w-full py-4 rounded-xl text-white font-bold text-sm uppercase tracking-wider shadow-lg transform transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 ${gradientBtn}`}>
                    Send Message <Send size={18} />
                 </button>
              </form>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;