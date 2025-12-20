
import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Download, Camera, ChevronRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const { profileData } = usePortfolio();
  const { name, title, summary, contact, profileImage, resumeUrl } = profileData;
  const navigate = useNavigate();

  return (
    <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
      {/* Background blobs for visual flair */}
      <div className="blob -top-24 -left-24 opacity-60"></div>
      <div className="blob top-1/2 -right-24 opacity-40"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-blue-700 uppercase bg-blue-50 border border-blue-100 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Available for immediate opportunities
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 leading-[1.1]">
              I'm <span className="text-gradient">{name.split(' ')[0]}</span> <br />
              <span className="text-slate-800">{name.split(' ').slice(1).join(' ')}</span>
            </h1>
            
            <h2 className="text-xl md:text-2xl font-semibold text-blue-600 mb-8 max-w-2xl">
              {title}
            </h2>
            
            <p className="text-slate-600 text-lg leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
              {summary}
            </p>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-5 mb-12">
              <a 
                href={`mailto:${contact.email}`} 
                className="group flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all hover:scale-[1.02] active:scale-[0.98] font-bold shadow-xl shadow-slate-200"
              >
                Let's Talk
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              
              <a 
                href={resumeUrl}
                download="Rifath_Ahamed_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-4 bg-white border-2 border-slate-200 text-slate-700 rounded-xl hover:border-blue-500 hover:text-blue-600 transition-all font-bold shadow-sm"
              >
                <Download size={20} />
                Download CV
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-500 font-medium">
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <div className="p-2 bg-slate-50 rounded-lg text-blue-500"><MapPin size={18} /></div>
                {contact.location}
              </div>
              <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="flex items-center gap-3 justify-center lg:justify-start hover:text-blue-600 transition-colors">
                <div className="p-2 bg-slate-50 rounded-lg text-blue-500"><Phone size={18} /></div>
                {contact.phone}
              </a>
              {contact.linkedinUrl && (
                <a href={contact.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 justify-center lg:justify-start hover:text-blue-600 transition-colors sm:col-span-2">
                  <div className="p-2 bg-slate-50 rounded-lg text-blue-500"><Linkedin size={18} /></div>
                  Connect on LinkedIn
                </a>
              )}
            </div>
          </div>

          {/* Image Column */}
          <div className="flex-1 flex justify-center lg:justify-end animate-fade-in">
            <div className="relative w-72 h-72 md:w-[450px] md:h-[450px]">
              {/* Geometric accents */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-100 rounded-3xl -rotate-12 -z-10"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-slate-100 rounded-full -z-10"></div>
              
              <div 
                className="relative w-full h-full group cursor-pointer"
                onClick={() => navigate('/admin')}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-[2.5rem] rotate-3 opacity-20 group-hover:rotate-6 transition-transform duration-500"></div>
                
                <div className="relative w-full h-full overflow-hidden rounded-[2.5rem] border-8 border-white shadow-2xl bg-slate-100 transition-transform duration-500 group-hover:-translate-y-4">
                  <img 
                    src={profileImage} 
                    alt={name}
                    className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500"
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0f172a&color=fff&size=512&bold=true`;
                    }}
                  />
                  
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center backdrop-blur-sm">
                    <div className="p-4 bg-white rounded-full text-slate-900 shadow-xl scale-90 group-hover:scale-100 transition-transform duration-500">
                      <Camera size={32} />
                    </div>
                    <p className="mt-4 text-white font-bold tracking-wider text-sm">ADMIN DASHBOARD</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
