import React, { useState } from 'react';
import { Code2, ArrowUpRight, Github, ExternalLink, Image as ImageIcon, Upload } from 'lucide-react';
import { PROFILE_DATA } from '../constants';

const Projects: React.FC = () => {
  // Use local state to allow updating images for preview
  const [projects, setProjects] = useState(PROFILE_DATA.projects);

  const handleImageUpload = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const newProjects = [...projects];
      newProjects[index] = { ...newProjects[index], image: imageUrl };
      setProjects(newProjects);
    }
  };

  return (
    <section id="projects" className="py-20 bg-slate-50">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-12 flex items-center gap-3">
          <Code2 className="text-blue-600" />
          Key Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col">
              
              {/* Image Section with Upload Capability */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-100 border-b border-slate-50 group/image">
                <label htmlFor={`project-img-${index}`} className="block w-full h-full cursor-pointer relative">
                  
                  {/* Image Display */}
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${!project.image ? 'hidden' : 'block'}`}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      // Show placeholder sibling
                      const placeholder = document.getElementById(`placeholder-${index}`);
                      if (placeholder) placeholder.classList.remove('hidden');
                      if (placeholder) placeholder.classList.add('flex');
                    }}
                  />
                  
                  {/* Fallback Placeholder */}
                  <div 
                    id={`placeholder-${index}`}
                    className={`absolute inset-0 ${project.image ? 'hidden' : 'flex'} items-center justify-center bg-slate-100 text-slate-400`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <ImageIcon size={48} className="opacity-50" />
                      <span className="text-sm font-medium opacity-70">Add Project Image</span>
                    </div>
                  </div>

                  {/* Upload Overlay (Visible on Hover) */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <div className="bg-white p-3 rounded-full text-blue-600 shadow-lg transform scale-90 group-hover/image:scale-100 transition-transform">
                      <Upload size={20} />
                    </div>
                  </div>
                </label>

                {/* Hidden File Input */}
                <input 
                  type="file" 
                  id={`project-img-${index}`}
                  className="hidden" 
                  accept="image/*"
                  onChange={(e) => handleImageUpload(index, e)}
                />
              </div>

              <div className="p-8 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  <ArrowUpRight className="text-slate-300 group-hover:text-blue-600 transition-colors" />
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded uppercase tracking-wide">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="space-y-2 mb-6 flex-grow">
                    {project.description.map((desc, i) => (
                        <p key={i} className="text-slate-600 leading-relaxed">
                            {desc}
                        </p>
                    ))}
                </div>

                <div className="pt-6 mt-auto border-t border-slate-100 flex gap-4">
                  {project.githubUrl && project.githubUrl !== '#' && (
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium transition-colors text-sm"
                    >
                      <Github size={18} />
                      GitHub
                    </a>
                  )}
                  {project.demoUrl && project.demoUrl !== '#' && (
                    <a 
                      href={project.demoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors text-sm"
                    >
                      <ExternalLink size={18} />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
              <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-500 w-0 group-hover:w-full transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;