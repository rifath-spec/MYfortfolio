
import React from 'react';
import { Cpu, CheckCircle2, ShieldCheck, Zap, Globe } from 'lucide-react';
import { PROFILE_DATA } from '../constants';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4 flex items-center gap-4">
            <span className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><Cpu size={32} /></span>
            Expertise & Skills
          </h2>
          <p className="text-slate-500 max-w-2xl text-center">
            Combining technical proficiency in software development with advanced operational management capabilities to drive organizational success.
          </p>
        </div>

        {/* Core Competencies - Grid of Badges */}
        <div className="mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PROFILE_DATA.coreCompetencies.map((skill, index) => (
              <div 
                key={index} 
                className="group p-5 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:border-blue-200 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center"
              >
                <div className="w-10 h-10 mb-4 flex items-center justify-center bg-white rounded-xl text-blue-500 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <ShieldCheck size={20} />
                </div>
                <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900">{skill}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Skills Categories */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {PROFILE_DATA.skills.map((category, index) => (
            <div key={index} className="glass-card border border-slate-100 rounded-3xl p-8 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-slate-900">
                  {category.category}
                </h3>
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <Zap size={20} />
                </div>
              </div>
              <ul className="space-y-4">
                {category.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-slate-600 group">
                    <CheckCircle2 size={18} className="text-emerald-500 mt-1 shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Languages & Footnote */}
        <div className="p-8 md:p-12 bg-slate-900 rounded-[2.5rem] text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Globe className="text-blue-400" />
                Linguistic Proficiency
              </h3>
              <div className="flex flex-wrap gap-8">
                {PROFILE_DATA.languages.map((lang, index) => (
                  <div key={index} className="flex items-center gap-3 bg-white/5 px-5 py-2.5 rounded-xl border border-white/10">
                    <div className="w-2.5 h-2.5 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(96,165,250,0.5)]"></div>
                    <span className="font-semibold text-slate-200">{lang}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center md:text-right max-w-xs">
              <p className="text-slate-400 text-sm leading-relaxed">
                Always eager to expand my technical stack and learn emerging frameworks in the ever-evolving IT landscape.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
