import React from 'react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { PROFILE_DATA } from '../constants';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-12 flex items-center gap-3">
          <Briefcase className="text-blue-600" />
          Professional Experience
        </h2>
        
        <div className="space-y-12">
          {PROFILE_DATA.experience.map((job, index) => (
            <div key={index} className="relative pl-8 md:pl-0">
              {/* Timeline line for mobile */}
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-slate-200 md:hidden"></div>
              <div className="absolute left-[-5px] top-2 w-3 h-3 rounded-full bg-blue-600 md:hidden"></div>

              <div className="md:flex gap-8 group">
                <div className="md:w-1/3 mb-4 md:mb-0">
                  <h3 className="text-xl font-bold text-slate-900">{job.role}</h3>
                  <div className="text-blue-600 font-medium mb-2">{job.company}</div>
                  <div className="flex items-center gap-2 text-slate-500 text-sm mb-1">
                    <Calendar size={14} />
                    {job.period}
                  </div>
                  {job.location && (
                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                      <MapPin size={14} />
                      {job.location}
                    </div>
                  )}
                </div>
                
                <div className="md:w-2/3 bg-slate-50 p-6 rounded-xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all">
                  <ul className="space-y-3">
                    {job.description.map((desc, i) => (
                      <li key={i} className="flex gap-3 text-slate-700">
                        <span className="text-blue-400 mt-1.5">•</span>
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;