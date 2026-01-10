
import React, { useState } from 'react';
import { Upload, FileText, Image as ImageIcon, Save, LogOut, CheckCircle, AlertCircle, RefreshCw, Eye, Plus, Trash2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { supabase, getStorageUrl, supabaseUrl, isSupabaseReady } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { Document } from '../types';

const AdminDashboard: React.FC = () => {
  const { profileData, updateProfileData, logout } = usePortfolio();
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<{type: 'success'|'error'|'info', msg: string} | null>(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const uploadToSupabase = async (bucket: string, path: string, file: File) => {
    if (!isSupabaseReady) {
      setStatus({ 
        type: 'info', 
        msg: 'Supabase key not configured. Changes will apply to this session but reset on refresh.' 
      });
      return false;
    }

    setUploading(true);
    try {
      const { error } = await supabase.storage
        .from(bucket)
        .upload(path, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (error) throw error;

      setStatus({ type: 'success', msg: `Successfully synced to cloud: ${bucket}/${path}` });
      return true;
    } catch (error: any) {
      console.error('Upload error:', error);
      setStatus({ 
        type: 'error', 
        msg: error.message?.includes('JWS') 
          ? 'Invalid Supabase Configuration. Please check your API keys.' 
          : error.message || 'Cloud upload failed. Changes saved to session memory only.' 
      });
      return false;
    } finally {
      setUploading(false);
    }
  };

  const handleProfileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        updateProfileData({ profileImage: reader.result as string });
      };
      reader.readAsDataURL(file);
      await uploadToSupabase('portfolio-images', 'profile.jpg', file);
    }
  };

  const handleCvUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const localUrl = URL.createObjectURL(file);
      updateProfileData({ resumeUrl: localUrl });
      await uploadToSupabase('portfolio-cv', 'cv.pdf', file);
    }
  };

  const handleDocumentUpload = async (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileName = `doc-${id}-${file.name}`;
      
      const localUrl = URL.createObjectURL(file);
      const updatedDocs = profileData.documents.map(doc => 
        doc.id === id ? { ...doc, url: localUrl } : doc
      );
      updateProfileData({ documents: updatedDocs });

      await uploadToSupabase('portfolio-documents', fileName, file);
    }
  };

  const addDocument = () => {
    const newDoc: Document = {
      id: Math.random().toString(36).substr(2, 9),
      title: 'New Credential',
      category: 'Certification',
      issuer: 'Organization Name',
      date: new Date().getFullYear().toString(),
      url: '#'
    };
    updateProfileData({ documents: [...profileData.documents, newDoc] });
  };

  const removeDocument = (id: string) => {
    updateProfileData({ documents: profileData.documents.filter(doc => doc.id !== id) });
  };

  const updateDocField = (id: string, field: keyof Document, value: string) => {
    const updatedDocs = profileData.documents.map(doc => 
      doc.id === id ? { ...doc, [field]: value } : doc
    );
    updateProfileData({ documents: updatedDocs as Document[] });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-slate-900 text-white py-4 px-6 shadow-md flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">R</div>
          Admin Dashboard
        </h1>
        <div className="flex gap-4 items-center">
            <button onClick={() => navigate('/')} className="text-slate-400 hover:text-white text-sm flex items-center gap-1">
              <Eye size={16} /> View Site
            </button>
            <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm transition-colors">
              <LogOut size={16} /> Logout
            </button>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 max-w-5xl">
        {status && (
          <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 animate-fade-in ${
            status.type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' : 
            status.type === 'error' ? 'bg-red-100 text-red-800 border border-red-200' :
            'bg-blue-100 text-blue-800 border border-blue-200'
          }`}>
            <AlertCircle size={20} />
            <span className="font-medium">{status.msg}</span>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <ImageIcon className="text-blue-600" /> Assets
              </h2>
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-200">
                    <img src={profileData.profileImage} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-slate-700">Profile Photo</label>
                    <label className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 cursor-pointer">
                      <Upload size={16} /> Update
                      <input type="file" className="hidden" accept="image/*" onChange={handleProfileUpload} />
                    </label>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                   <FileText className="text-red-500" size={32} />
                   <div className="flex-1">
                     <label className="block text-sm font-medium text-slate-700">Resume / CV</label>
                     <label className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm rounded-lg hover:bg-slate-800 cursor-pointer">
                       <Upload size={16} /> Update PDF
                       <input type="file" className="hidden" accept=".pdf" onChange={handleCvUpload} />
                     </label>
                   </div>
                </div>
              </div>
            </section>

            <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="text-amber-600" /> Documents & Certs
                </h2>
                <button onClick={addDocument} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                  <Plus size={20} />
                </button>
              </div>
              <div className="space-y-4">
                {profileData.documents.map((doc) => (
                  <div key={doc.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input 
                        type="text" value={doc.title} placeholder="Title"
                        onChange={(e) => updateDocField(doc.id, 'title', e.target.value)}
                        className="px-3 py-2 text-sm border rounded-lg focus:ring-1 outline-none"
                      />
                      <select 
                        value={doc.category}
                        onChange={(e) => updateDocField(doc.id, 'category', e.target.value)}
                        className="px-3 py-2 text-sm border rounded-lg focus:ring-1 outline-none"
                      >
                        <option>Certification</option>
                        <option>Transcript</option>
                        <option>Award</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <input 
                        type="text" value={doc.issuer} placeholder="Issuer"
                        onChange={(e) => updateDocField(doc.id, 'issuer', e.target.value)}
                        className="px-3 py-2 text-sm border rounded-lg focus:ring-1 outline-none"
                      />
                      <div className="flex gap-2">
                        <input 
                          type="text" value={doc.date} placeholder="Year"
                          onChange={(e) => updateDocField(doc.id, 'date', e.target.value)}
                          className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-1 outline-none"
                        />
                        <button onClick={() => removeDocument(doc.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                    <label className="flex items-center justify-center gap-2 w-full py-2 bg-white border border-dashed border-slate-300 rounded-lg text-xs font-bold text-slate-500 hover:border-blue-400 hover:text-blue-600 cursor-pointer">
                      <Upload size={14} /> Upload Document File
                      <input type="file" className="hidden" onChange={(e) => handleDocumentUpload(doc.id, e)} />
                    </label>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <FileText className="text-blue-600" /> Info
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Display Name</label>
                  <input type="text" value={profileData.name} onChange={(e) => updateProfileData({ name: e.target.value })} className="w-full px-4 py-2 border rounded-lg mt-1 outline-none focus:ring-1" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Summary</label>
                  <textarea rows={6} value={profileData.summary} onChange={(e) => updateProfileData({ summary: e.target.value })} className="w-full px-4 py-2 border rounded-lg mt-1 outline-none focus:ring-1" />
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
