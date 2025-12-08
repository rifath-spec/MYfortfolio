import React from 'react';
import { Cpu, CheckCircle2 } from 'lucide-react';
import { PROFILE_DATA } from '../constants';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-20 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-12 flex items-center gap-3">
          <Cpu className="text-blue-600" />
          Skills & Competencies
        </h2>

        {/* Core Competencies */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-slate-800 mb-6">Core Competencies</h3>
          <div className="flex flex-wrap gap-3">
            {PROFILE_DATA.coreCompetencies.map((skill, index) => (
              <span key={index} className="px-4 py-2 bg-blue-50 text-blue-800 rounded-lg text-sm font-medium border border-blue-100">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Detailed Skills Categories */}
        <div className="grid md:grid-cols-3 gap-8">
          {PROFILE_DATA.skills.map((category, index) => (
            <div key={index} className="border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
                {category.category}
              </h3>
              <ul className="space-y-3">
                {category.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700">
                    <CheckCircle2 size={18} className="text-green-500 mt-0.5 shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Languages */}
        <div className="mt-12 p-6 bg-slate-900 rounded-2xl text-white">
          <h3 className="text-lg font-bold mb-4">Languages</h3>
          <div className="flex flex-wrap gap-8">
            {PROFILE_DATA.languages.map((lang, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                <span>{lang}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;