import React from 'react';
import { GraduationCap } from 'lucide-react';
import { PROFILE_DATA } from '../constants';

const Education: React.FC = () => {
  return (
    <section id="education" className="py-20 bg-slate-50">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-12 flex items-center gap-3">
          <GraduationCap className="text-blue-600" />
          Education
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {PROFILE_DATA.education.map((edu, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-2">{edu.degree}</h3>
              <div className="text-blue-600 font-medium mb-4">{edu.institution}</div>
              <div className="inline-block px-3 py-1 bg-slate-100 text-slate-600 text-sm rounded-full mb-4">
                {edu.period}
              </div>
              {edu.details && (
                <ul className="space-y-2 mt-2">
                  {edu.details.map((detail, i) => (
                    <li key={i} className="text-slate-600 text-sm">{detail}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;