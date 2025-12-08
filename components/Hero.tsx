
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Download, Camera, Upload } from 'lucide-react';
import { PROFILE_DATA } from '../constants';

const Hero: React.FC = () => {
  const { name, title, summary, contact, profileImage, resumeUrl } = PROFILE_DATA;
  
  // Use localStorage to persist the image and CV across reloads
  // Fallback to constants if nothing is saved
  const [currentImage, setCurrentImage] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio_profile_image');
      return saved || profileImage || "./images/profile.jpg";
    } catch (e) {
      return profileImage || "./images/profile.jpg";
    }
  });

  const [cvUrl, setCvUrl] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio_resume_cv');
      return saved || resumeUrl || "/cv.pdf";
    } catch (e) {
      return resumeUrl || "/cv.pdf";
    }
  });

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const base64 = await convertToBase64(file);
        setCurrentImage(base64);
        try {
          localStorage.setItem('portfolio_profile_image', base64);
        } catch (e) {
          alert("Image is too large to save permanently. It will be visible for this session only.");
        }
      } catch (error) {
        console.error("Error processing image file", error);
      }
    }
  };

  const handleCvUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const base64 = await convertToBase64(file);
        setCvUrl(base64);
        try {
          localStorage.setItem('portfolio_resume_cv', base64);
        } catch (e) {
          alert("PDF is too large to save permanently. It will be available for this session only.");
        }
      } catch (error) {
        console.error("Error processing CV file", error);
      }
    }
  };

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
                  href={cvUrl}
                  download="Rifath_Ahamed_CV.pdf"
                  className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 hover:border-blue-200 transition-all font-medium shadow-sm"
                >
                  <Download size={20} />
                  Download CV
                </a>
                
                <label className="flex items-center justify-center w-12 bg-white border border-slate-200 text-slate-500 rounded-lg hover:bg-slate-50 hover:text-blue-600 hover:border-blue-200 transition-all cursor-pointer" title="Upload CV (PDF) to save">
                  <Upload size={20} />
                  <input 
                    type="file" 
                    className="hidden" 
                    accept=".pdf"
                    onChange={handleCvUpload}
                  />
                </label>
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
            <div className="relative group cursor-pointer w-64 h-64 md:w-96 md:h-96">
              <div className="absolute inset-0 bg-blue-600 rounded-2xl rotate-6 opacity-10 group-hover:rotate-3 transition-transform duration-300"></div>
              
              <label htmlFor="profile-upload" className="block relative w-full h-full cursor-pointer">
                <img 
                  src={currentImage} 
                  alt={name}
                  onError={(e) => {
                    // Fallback if image not found
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0f172a&color=fff&size=512`;
                  }}
                  className="w-full h-full object-cover rounded-2xl shadow-xl border-4 border-white transition-transform duration-300 group-hover:-translate-y-2 bg-white"
                />
                
                {/* Upload Overlay */}
                <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                  <div className="bg-white/90 p-3 rounded-full text-slate-900 shadow-lg">
                    <Camera size={24} />
                  </div>
                  <span className="absolute bottom-8 text-white font-medium text-sm bg-black/50 px-3 py-1 rounded-full">Change Photo</span>
                </div>
              </label>

              <input 
                type="file" 
                id="profile-upload" 
                className="hidden" 
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
