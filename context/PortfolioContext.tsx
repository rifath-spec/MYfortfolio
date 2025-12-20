
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

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize from constants only, no local storage caching
  const [profileData, setProfileData] = useState<ProfileData>(PROFILE_DATA);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
  };

  const logout = () => {
    setIsAuthenticated(false);
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
