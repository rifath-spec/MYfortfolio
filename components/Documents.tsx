
import React from 'react';
import { Award, FileText, ExternalLink, Download, FileCheck } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const Documents: React.FC = () => {
  const { profileData } = usePortfolio();

  const getIcon = (category: string) => {
    switch (category) {
      case 'Certification': return <Award className="text-amber-500" />;
      case 'Transcript': return <FileText className="text-blue-500" />;
      case 'Award': return <Award className="text-purple-500" />;
      default: return <FileCheck className="text-slate-500" />;
    }
  };

  return (
    <section id="documents" className="py-24 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
            <div>
              <h2 className="text-4xl font-extrabold text-slate-900 mb-4 flex items-center gap-4">
                <span className="p-3 bg-blue-50 text-blue-600 rounded-2xl shadow-sm"><FileText size={32} /></span>
                Documents & Credentials
              </h2>
              <p className="text-slate-500">
                Official certifications, academic transcripts, and professional recognition.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {profileData.documents.map((doc) => (
              <div 
                key={doc.id} 
                className="group p-6 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:border-blue-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-white rounded-xl shadow-sm group-hover:bg-blue-50 transition-colors">
                    {getIcon(doc.category)}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-white border border-slate-100 rounded-full text-slate-500 group-hover:border-blue-100 group-hover:text-blue-600 transition-colors">
                    {doc.category}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-700 transition-colors">
                  {doc.title}
                </h3>
                <p className="text-sm text-slate-500 mb-4 font-medium">{doc.issuer}</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-400">{doc.date}</span>
                  <a 
                    href={doc.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    View File
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 p-8 bg-slate-900 rounded-[2rem] text-white flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold mb-2">Need a full background check?</h3>
              <p className="text-slate-400 text-sm">I can provide detailed references and verified documents upon request.</p>
            </div>
            <a 
              href={`mailto:${profileData.contact.email}`}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20"
            >
              Request Verification
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Documents;
