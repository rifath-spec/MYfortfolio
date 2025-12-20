
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProfileData, Project } from '../types';
import { PROFILE_DATA } from '../constants';
import { supabase, getStorageUrl } from '../lib/supabase';

interface PortfolioContextType {
  profileData: ProfileData;
  updateProfileData: (data: Partial<ProfileData>) => void;
  updateProject: (index: number, project: Project) => void;
  refreshFromSupabase: () => void;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const STORAGE_KEY = 'portfolio_live_data';

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize from localStorage or fallback to constants
  const [profileData, setProfileData] = useState<ProfileData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : PROFILE_DATA;
  });
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for session persistence
  useEffect(() => {
    const auth = localStorage.getItem('admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Save to localStorage whenever profileData changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profileData));
  }, [profileData]);

  const refreshFromSupabase = async () => {
    const timestamp = new Date().getTime(); // Cache busting
    
    setProfileData(prev => ({
      ...prev,
      profileImage: `${getStorageUrl('portfolio-images', 'profile.jpg')}?t=${timestamp}`,
      resumeUrl: `${getStorageUrl('portfolio-cv', 'cv.pdf')}?t=${timestamp}`
    }));
  };

  const updateProfileData = (data: Partial<ProfileData>) => {
    setProfileData(prev => ({ ...prev, ...data }));
  };

  const updateProject = (index: number, project: Project) => {
    setProfileData(prev => {
      const newProjects = [...prev.projects];
      newProjects[index] = project;
      return { ...prev, projects: newProjects };
    });
  };

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('admin_auth', 'true');
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_auth');
  };

  return (
    <PortfolioContext.Provider value={{ 
      profileData, 
      updateProfileData, 
      updateProject,
      refreshFromSupabase,
      isAuthenticated,
      login,
      logout
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
