import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Download, Camera } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const { profileData } = usePortfolio();
  const { name, title, summary, contact, profileImage, resumeUrl } = profileData;
  const navigate = useNavigate();

  // Note: Upload logic is now handled in the Admin Dashboard for persistence via Supabase
  // We keep a simple link to admin here for convenience if the user clicks the image
  
  return (
    <section id="home" className="pt-24 pb-12 md:pt-32 md:pb-20 bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center gap-12 animate-fade-in">
          
          {/* Text Content */}
          <div className="flex-1 order-2 md:order-1 text-center md:text-left">
            <div className="inline-block px-3 py-1 mb-4 text-sm font-semibold tracking-wider text-blue-600 uppercase bg-blue-100 rounded-full">
              Available for Hire
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-blue-800 to-blue-600">
                {name}
              </span>
            </h1>
            <h2 className="text-xl md:text-2xl font-medium text-slate-600 mb-6">
              {title}
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-8 max-w-2xl mx-auto md:mx-0">
              {summary}
            </p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-8">
              <a 
                href={`mailto:${contact.email}`} 
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all hover:shadow-lg font-medium"
              >
                <Mail size={20} />
                Contact Me
              </a>
              
              <div className="flex gap-2">
                <a 
                  href={resumeUrl}
                  download="Rifath_Ahamed_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 hover:border-blue-200 transition-all font-medium shadow-sm"
                >
                  <Download size={20} />
                  Download CV
                </a>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 text-slate-600 text-sm justify-center md:justify-start">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <MapPin size={16} className="text-blue-500" />
                {contact.location}
              </div>
              <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 justify-center md:justify-start hover:text-blue-600 transition-colors">
                <Phone size={16} className="text-blue-500" />
                {contact.phone}
              </a>
              {contact.linkedinUrl && (
                <a href={contact.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 justify-center md:justify-start hover:text-blue-600 transition-colors">
                  <Linkedin size={16} className="text-blue-500" />
                  {contact.linkedin}
                </a>
              )}
            </div>
          </div>

          {/* Image */}
          <div className="flex-1 order-1 md:order-2 flex justify-center md:justify-end">
            <div className="relative group cursor-pointer w-64 h-64 md:w-96 md:h-96" onClick={() => navigate('/admin')}>
              <div className="absolute inset-0 bg-blue-600 rounded-2xl rotate-6 opacity-10 group-hover:rotate-3 transition-transform duration-300"></div>
              
              <div className="block relative w-full h-full">
                <img 
                  src={profileImage} 
                  alt={name}
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0f172a&color=fff&size=512`;
                  }}
                  className="w-full h-full object-cover rounded-2xl shadow-xl border-4 border-white transition-transform duration-300 group-hover:-translate-y-2 bg-white"
                />
                
                {/* Admin Hint Overlay */}
                <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                  <div className="bg-white/90 p-3 rounded-full text-slate-900 shadow-lg">
                    <Camera size={24} />
                  </div>
                  <span className="absolute bottom-8 text-white font-medium text-sm bg-black/50 px-3 py-1 rounded-full">Admin Edit</span>
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
