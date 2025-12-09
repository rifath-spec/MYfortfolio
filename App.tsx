import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Education from './components/Education';
import Projects from './components/Projects';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';

const MainSite = () => (
  <Layout>
    <Hero />
    <Experience />
    <Skills />
    <Education />
    <Projects />
  </Layout>
);

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = usePortfolio();
  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <PortfolioProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainSite />} />
          <Route path="/admin" element={<Login />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </PortfolioProvider>
  );
}

export default App;
