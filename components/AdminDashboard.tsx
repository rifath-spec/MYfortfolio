
import React, { useState } from 'react';
import { Upload, FileText, Image as ImageIcon, Save, LogOut, CheckCircle, AlertCircle, RefreshCw, Eye } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { supabase, getStorageUrl, supabaseUrl, isSupabaseReady } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const { profileData, updateProfileData, refreshFromSupabase, logout } = usePortfolio();
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

  const handleProjectImageUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
       const file = e.target.files[0];
       const fileName = `project-${index}.jpg`;
       
       const reader = new FileReader();
       reader.onloadend = () => {
         const updatedProjects = [...profileData.projects];
         updatedProjects[index] = { ...updatedProjects[index], image: reader.result as string };
         updateProfileData({ projects: updatedProjects });
       };
       reader.readAsDataURL(file);

       await uploadToSupabase('portfolio-images', fileName, file);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-slate-900 text-white py-4 px-6 shadow-md flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">R</div>
          Admin Dashboard
        </h1>
        <div className="flex gap-4 items-center">
            <button 
              onClick={() => navigate('/')}
              className="text-slate-400 hover:text-white text-sm flex items-center gap-1"
            >
              <Eye size={16} />
              View Site
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm transition-colors"
            >
              <LogOut size={16} />
              Logout
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
            {status.type === 'success' ? <CheckCircle size={20} /> : 
             status.type === 'error' ? <AlertCircle size={20} /> : 
             <AlertCircle size={20} />}
            <span className="font-medium">{status.msg}</span>
          </div>
        )}

        {!isSupabaseReady && (
          <div className="mb-8 p-6 bg-amber-50 border border-amber-200 rounded-2xl">
            <h3 className="text-amber-800 font-bold flex items-center gap-2 mb-2">
              <AlertCircle size={20} />
              Session-Only Mode
            </h3>
            <p className="text-amber-700 text-sm">
              The Supabase API key is missing or invalid. Your changes will be visible across the site during this session, but will <strong>reset</strong> if you refresh the page.
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <ImageIcon className="text-blue-600" />
                Profile & CV Assets
              </h2>

              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-sm bg-slate-200">
                    <img src={profileData.profileImage} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Profile Photo</label>
                    <p className="text-xs text-slate-500 mb-2">Changes are reflected instantly in this session</p>
                    <label className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 cursor-pointer transition-colors">
                      {uploading ? <RefreshCw className="animate-spin" size={16} /> : <Upload size={16} />}
                      {uploading ? 'Syncing...' : 'Update Photo'}
                      <input type="file" className="hidden" accept="image/*" onChange={handleProfileUpload} disabled={uploading} />
                    </label>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="w-16 h-16 rounded-lg bg-red-100 flex items-center justify-center text-red-500">
                    <FileText size={32} />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Resume / CV</label>
                    <p className="text-xs text-slate-500 mb-2">Update downloadable PDF for session</p>
                    <label className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm rounded-lg hover:bg-slate-800 cursor-pointer transition-colors">
                      {uploading ? <RefreshCw className="animate-spin" size={16} /> : <Upload size={16} />}
                      {uploading ? 'Syncing...' : 'Update PDF'}
                      <input type="file" className="hidden" accept=".pdf" onChange={handleCvUpload} disabled={uploading} />
                    </label>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <FileText className="text-blue-600" />
                Text Information
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Display Name</label>
                  <input 
                    type="text" 
                    value={profileData.name} 
                    onChange={(e) => updateProfileData({ name: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Job Title</label>
                  <input 
                    type="text" 
                    value={profileData.title} 
                    onChange={(e) => updateProfileData({ title: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Summary</label>
                  <textarea 
                    rows={4}
                    value={profileData.summary} 
                    onChange={(e) => updateProfileData({ summary: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            </section>

            <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h2 className="text-lg font-bold text-slate-900 mb-6">Project Images</h2>
                <div className="space-y-4">
                    {profileData.projects.map((project, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors">
                            <img src={project.image} alt="Thumb" className="w-10 h-10 rounded object-cover bg-slate-200" />
                            <div className="flex-1 truncate">
                                <div className="text-sm font-bold text-slate-800">{project.title}</div>
                                <div className="text-xs text-slate-500">Update image (session only)</div>
                            </div>
                            <label className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg cursor-pointer transition-colors">
                                <Upload size={18} />
                                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleProjectImageUpload(idx, e)} disabled={uploading} />
                            </label>
                        </div>
                    ))}
                </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
