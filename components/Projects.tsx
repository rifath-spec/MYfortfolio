
import React from 'react';
/* Added ChevronRight to the imports from lucide-react */
import { Code2, ArrowUpRight, Github, ExternalLink, Image as ImageIcon, Layers, ChevronRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const Projects: React.FC = () => {
  const { profileData } = usePortfolio();

  return (
    <section id="projects" className="py-24 bg-[#f8fafc]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4 flex items-center gap-4">
              <span className="p-3 bg-white text-blue-600 rounded-2xl shadow-sm"><Code2 size={32} /></span>
              Strategic Projects
            </h2>
            <p className="text-slate-500 max-w-xl">
              Showcasing my ability to develop full-scale web applications and management information systems from concept to deployment.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-sm font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
            <Layers size={16} />
            {profileData.projects.length} PROJECTS COMPLETED
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {profileData.projects.map((project, index) => (
            <div key={index} className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col lg:flex-row h-auto lg:h-80">
              
              {/* Image Section */}
              <div className="relative w-full lg:w-2/5 h-48 lg:h-full overflow-hidden bg-slate-200">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const placeholder = document.getElementById(`placeholder-${index}`);
                    if (placeholder) {
                      placeholder.classList.remove('hidden');
                      placeholder.classList.add('flex');
                    }
                  }}
                />
                
                {/* Fallback Placeholder */}
                <div 
                  id={`placeholder-${index}`}
                  className="absolute inset-0 hidden items-center justify-center bg-slate-100 text-slate-300"
                >
                  <ImageIcon size={64} className="opacity-20" />
                </div>

                {/* Overlay on hover for mobile/desktop touch */}
                <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              <div className="p-8 lg:w-3/5 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>
                    <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
                        <ArrowUpRight size={20} />
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="px-2.5 py-1 bg-blue-50/50 text-blue-700 text-[10px] font-extrabold rounded-md uppercase tracking-wider">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-2 mb-6">
                      {project.description.slice(0, 2).map((desc, i) => (
                          <p key={i} className="text-slate-600 text-sm leading-relaxed line-clamp-2">
                              {desc}
                          </p>
                      ))}
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  {project.demoUrl && project.demoUrl !== '#' && (
                    <a 
                      href={project.demoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <ExternalLink size={16} />
                      Live Preview
                    </a>
                  )}
                  {project.githubUrl && project.githubUrl !== '#' && (
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors"
                    >
                      <Github size={16} />
                      Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Contact CTA */}
        <div className="mt-20 text-center">
            <p className="text-slate-500 mb-6">Have a complex technical requirement or an operational challenge?</p>
            <a 
              href="#contact" 
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('contact');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 font-bold text-slate-900 border-b-2 border-blue-500 pb-1 hover:text-blue-600 transition-colors"
            >
              Let's build something together
              <ChevronRight size={18} />
            </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
