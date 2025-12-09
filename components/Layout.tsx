import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail, Instagram, Twitter, Send, UserCog } from 'lucide-react';
import { PROFILE_DATA } from '../constants';
import { useNavigate } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });

  const navigate = useNavigate();
  const { isAuthenticated } = usePortfolio();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);

    // If it's a route (starts with /), navigate there
    if (href.startsWith('/')) {
      navigate(href);
      return;
    }

    // If it's an anchor (starts with #), scroll to it
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);

    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you, ${formState.name}! Your message has been received.`);
    setFormState({ name: '', email: '', message: '' });
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Education', href: '#education' },
    { name: 'Projects', href: '#projects' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, '#home')}
            className="text-2xl font-bold text-slate-900 tracking-tighter cursor-pointer"
          >
            RIFATH AHAMED<span className="text-blue-600">.</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
              >
                {link.name}
              </a>
            ))}
            
            {/* Admin Tab */}
            <button 
              onClick={() => navigate(isAuthenticated ? '/admin/dashboard' : '/admin')}
              className={`flex items-center gap-1 text-sm font-medium transition-colors ${isAuthenticated ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
            >
              {isAuthenticated ? 'Dashboard' : 'Admin'}
            </button>

            <a 
              href={`mailto:${PROFILE_DATA.contact.email}`}
              className="px-5 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors"
            >
              Hire Me
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-slate-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-xl py-4 px-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-slate-600 font-medium py-2 block cursor-pointer"
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.name}
              </a>
            ))}
            
            <button 
              onClick={() => {
                navigate(isAuthenticated ? '/admin/dashboard' : '/admin');
                setIsMenuOpen(false);
              }}
              className="text-slate-600 font-medium py-2 text-left flex items-center gap-2"
            >
              <UserCog size={16} />
              {isAuthenticated ? 'Dashboard' : 'Admin Login'}
            </button>

             <a 
              href={`mailto:${PROFILE_DATA.contact.email}`}
              className="px-5 py-2.5 bg-blue-600 text-white text-center font-medium rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Hire Me
            </a>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16">
        <div className="container mx-auto px-6 md:px-12">
          
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {/* Left Side: Info & Socials */}
            <div className="space-y-6">
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold text-white mb-2">{PROFILE_DATA.name}</h2>
                <p className="text-lg text-slate-400 max-w-sm mx-auto md:mx-0">{PROFILE_DATA.title}</p>
                <p className="mt-4 text-slate-500 leading-relaxed max-w-md mx-auto md:mx-0">
                  Thank you for visiting my portfolio. I am always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                </p>
              </div>
              
              <div className="flex justify-center md:justify-start gap-6 pt-2">
                {PROFILE_DATA.contact.githubUrl && PROFILE_DATA.contact.githubUrl !== '#' && (
                  <a href={PROFILE_DATA.contact.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-full">
                    <Github size={20} />
                  </a>
                )}
                {PROFILE_DATA.contact.linkedinUrl && PROFILE_DATA.contact.linkedinUrl !== '#' && (
                  <a href={PROFILE_DATA.contact.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-full">
                    <Linkedin size={20} />
                  </a>
                )}
                {PROFILE_DATA.contact.instagramUrl && PROFILE_DATA.contact.instagramUrl !== '#' && (
                  <a href={PROFILE_DATA.contact.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-full">
                    <Instagram size={20} />
                  </a>
                )}
                {PROFILE_DATA.contact.twitterUrl && PROFILE_DATA.contact.twitterUrl !== '#' && (
                  <a href={PROFILE_DATA.contact.twitterUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-full">
                    <Twitter size={20} />
                  </a>
                )}
                <a href={`mailto:${PROFILE_DATA.contact.email}`} className="hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-full">
                  <Mail size={20} />
                </a>
              </div>
            </div>

            {/* Right Side: Contact Form */}
            <div className="bg-slate-800/50 p-6 md:p-8 rounded-2xl border border-slate-800">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Mail size={20} className="text-blue-500" />
                Get in Touch
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="name" className="text-sm font-medium text-slate-300 ml-1">Name</label>
                    <input 
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formState.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-white outline-none transition-all placeholder:text-slate-600"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="email" className="text-sm font-medium text-slate-300 ml-1">Email</label>
                    <input 
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formState.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-white outline-none transition-all placeholder:text-slate-600"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <label htmlFor="message" className="text-sm font-medium text-slate-300 ml-1">Message</label>
                  <textarea 
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formState.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-white outline-none transition-all placeholder:text-slate-600 resize-none"
                    placeholder="Your message here..."
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg hover:shadow-blue-600/20 transition-all flex items-center justify-center gap-2 mt-2"
                >
                  <Send size={18} />
                  Send Message
                </button>
              </form>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
            <p>&copy; {new Date().getFullYear()} Rifath Ahamed. All rights reserved.</p>
            <div className="flex gap-4">
              <button onClick={() => navigate('/admin')} className="hover:text-blue-500 transition-colors">Admin Login</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;