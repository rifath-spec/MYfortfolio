import React, { useState } from 'react';
import { Upload, FileText, Image as ImageIcon, Save, LogOut, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { supabase, getStorageUrl, supabaseUrl } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const { profileData, updateProfileData, refreshFromSupabase, logout } = usePortfolio();
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<{type: 'success'|'error', msg: string} | null>(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const uploadToSupabase = async (bucket: string, path: string, file: File) => {
    setUploading(true);
    setStatus(null);
    try {
      const { error } = await supabase.storage
        .from(bucket)
        .upload(path, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (error) throw error;

      setStatus({ type: 'success', msg: `Successfully uploaded to ${bucket}/${path}` });
      refreshFromSupabase(); // Update app state to point to new URL
    } catch (error: any) {
      console.error('Upload error:', error);
      setStatus({ type: 'error', msg: error.message || 'Upload failed' });
    } finally {
      setUploading(false);
    }
  };

  const handleProfileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      uploadToSupabase('portfolio-images', 'profile.jpg', e.target.files[0]);
    }
  };

  const handleCvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      uploadToSupabase('portfolio-cv', 'cv.pdf', e.target.files[0]);
    }
  };

  const handleProjectImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
       // We need a unique name or specific structure. Using project title slug or index.
       const fileName = `project-${index}.jpg`;
       uploadToSupabase('portfolio-images', fileName, e.target.files[0]);
       
       // Update context to point to this new URL
       const timestamp = new Date().getTime();
       const newUrl = `${getStorageUrl('portfolio-images', fileName)}?t=${timestamp}`;
       
       const updatedProjects = [...profileData.projects];
       updatedProjects[index] = { ...updatedProjects[index], image: newUrl };
       updateProfileData({ projects: updatedProjects });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-slate-900 text-white py-4 px-6 shadow-md flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">R</div>
          Admin Dashboard
        </h1>
        <div className="flex gap-4 items-center">
            <a href="/" target="_blank" className="text-slate-400 hover:text-white text-sm">View Site</a>
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
        
        {/* Status Notification */}
        {status && (
          <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
            status.type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
            {status.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            {status.msg}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
            
          {/* Main Assets Section */}
          <div className="space-y-8">
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <ImageIcon className="text-blue-600" />
                Profile & CV Assets
              </h2>

              <div className="space-y-6">
                {/* Profile Photo */}
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-sm bg-slate-200">
                    <img src={profileData.profileImage} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Profile Photo</label>
                    <p className="text-xs text-slate-500 mb-2">Uploads to 'portfolio-images/profile.jpg'</p>
                    <label className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 cursor-pointer transition-colors">
                      {uploading ? <RefreshCw className="animate-spin" size={16} /> : <Upload size={16} />}
                      {uploading ? 'Uploading...' : 'Update Photo'}
                      <input type="file" className="hidden" accept="image/*" onChange={handleProfileUpload} disabled={uploading} />
                    </label>
                  </div>
                </div>

                {/* CV Upload */}
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="w-16 h-16 rounded-lg bg-red-100 flex items-center justify-center text-red-500">
                    <FileText size={32} />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Resume / CV</label>
                    <p className="text-xs text-slate-500 mb-2">Uploads to 'portfolio-cv/cv.pdf'</p>
                    <label className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm rounded-lg hover:bg-slate-800 cursor-pointer transition-colors">
                      {uploading ? <RefreshCw className="animate-spin" size={16} /> : <Upload size={16} />}
                      {uploading ? 'Uploading...' : 'Update PDF'}
                      <input type="file" className="hidden" accept=".pdf" onChange={handleCvUpload} disabled={uploading} />
                    </label>
                  </div>
                </div>
              </div>
            </section>

             <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h2 className="text-lg font-bold text-slate-900 mb-6">Supabase Config</h2>
                <div className="bg-slate-50 p-4 rounded-lg text-sm text-slate-600 break-all font-mono">
                    <div className="mb-2"><strong>URL:</strong> {supabaseUrl}</div>
                    <div className="text-xs text-amber-600 flex items-center gap-1 mt-3">
                        <AlertCircle size={14} />
                        Ensure 'portfolio-images' and 'portfolio-cv' buckets are Public.
                    </div>
                </div>
            </section>
          </div>

          {/* Text Content Section */}
          <div className="space-y-8">
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <FileText className="text-blue-600" />
                Basic Information
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
                        <div key={idx} className="flex items-center gap-3 p-3 border border-slate-100 rounded-lg">
                            <img src={project.image} alt="Thumb" className="w-10 h-10 rounded object-cover bg-slate-100" />
                            <div className="flex-1 truncate">
                                <div className="text-sm font-medium">{project.title}</div>
                            </div>
                            <label className="p-2 text-blue-600 hover:bg-blue-50 rounded cursor-pointer">
                                <Upload size={16} />
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