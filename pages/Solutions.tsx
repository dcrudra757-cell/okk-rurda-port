import React, { useState, useEffect } from 'react';
import { AppMode } from '../types';
import { Check, ArrowRight, TrendingUp, Layout } from 'lucide-react';
import { getSolutions } from '../services/api';
import { ALL_SOLUTIONS } from '../constants';

interface SolutionsPageProps {
  mode: AppMode;
}

const SolutionsPage: React.FC<SolutionsPageProps> = ({ mode }) => {
  const [solutions, setSolutions] = useState(ALL_SOLUTIONS[mode]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await getSolutions(mode);
      setSolutions(data);
      setLoading(false);
    };
    loadData();
  }, [mode]);

  const isVideo = mode === 'video';
  const accentText = isVideo ? 'text-cine-red' : 'text-blue-500';
  const accentBg = isVideo ? 'bg-cine-red' : 'bg-blue-600';

  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-20">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="mb-24 text-center md:text-left">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 bg-white/5 border border-white/10 ${accentText}`}>
             <Layout size={12} />
             <span>High-Impact Strategies</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-heading font-black text-white mb-6">
            Specialized <br className="hidden md:block" /> Solutions.
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl">
            Proven frameworks designed to solve specific business problems—whether it's retention drop-off or low conversion rates.
          </p>
        </div>

        {/* Solutions Stack */}
        {loading ? (
           <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div></div>
        ) : (
          <div className="space-y-32">
            {solutions.map((solution: any, idx: number) => (
              <div key={solution.id} className={`flex flex-col lg:flex-row gap-16 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                
                {/* Visual Side */}
                <div className="w-full lg:w-1/2 relative group">
                  {/* Decor */}
                  <div className={`absolute -inset-4 bg-gradient-to-r ${isVideo ? 'from-cine-red/20 to-orange-600/20' : 'from-blue-600/20 to-cyan-500/20'} rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
                  
                  <div className="relative rounded-[2rem] overflow-hidden aspect-[4/3] border border-white/10 bg-[#111]">
                      <img src={solution.image} alt={solution.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
                      
                      {/* Floating Comparison Card */}
                      <div className="absolute bottom-6 left-6 right-6 bg-[#0a0a0a]/90 backdrop-blur-xl p-6 rounded-xl border border-white/10 shadow-2xl">
                        <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-3 text-slate-500">
                            <span>Before</span>
                            <span>After</span>
                        </div>
                        <div className="flex justify-between text-sm font-medium text-white gap-4">
                            <div className="flex-1 opacity-60">{solution.comparison.before}</div>
                            <div className="w-px bg-white/10"></div>
                            <div className={`flex-1 ${accentText}`}>{solution.comparison.after}</div>
                        </div>
                      </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="w-full lg:w-1/2 space-y-8">
                  <div className="flex items-center gap-3">
                      <span className={`h-px w-12 ${accentBg}`}></span>
                      <span className={`text-sm font-bold uppercase tracking-widest ${accentText}`}>SOLUTION {idx + 1}</span>
                  </div>
                  
                  <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">{solution.title}</h2>
                  <p className="text-lg text-slate-400 leading-relaxed">{solution.description}</p>
                  
                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 gap-4 py-6">
                      {solution.metrics.map((metric: any, i: number) => (
                        <div key={i} className="bg-white/5 rounded-2xl p-5 border border-white/5">
                            <div className="flex items-center gap-2 mb-2 text-slate-400 text-xs uppercase font-bold tracking-wider">
                              <TrendingUp size={14} /> {metric.label}
                            </div>
                            <div className="text-3xl font-black text-white">{metric.value}</div>
                        </div>
                      ))}
                  </div>

                  {/* Features List */}
                  <div className="space-y-3">
                      {solution.features.map((feature: string, i: number) => (
                        <div key={i} className="flex items-center gap-3 text-slate-300">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center bg-white/5 ${accentText}`}>
                              <Check size={12} />
                            </div>
                            <span>{feature}</span>
                        </div>
                      ))}
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SolutionsPage;
