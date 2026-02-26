import React, { useEffect, useState } from 'react';
import { Section } from '../types';

interface NavbarProps {
  activeSection: Section;
  setSection: (section: Section) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, setSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: Section.Home, label: 'Inicio' },
    { id: Section.Library, label: 'Biblioteca' },
    { id: Section.Cinema, label: 'Cine' },
    { id: Section.History, label: 'Historia' },
    { id: Section.Courses, label: 'Cursos' },
    { id: Section.Archivos, label: 'Archivos' },
    { id: Section.News, label: 'Noticias' },
    { id: Section.IA, label: 'IA' },
    { id: Section.Developers, label: 'Desarrolladores' },
  ];

  const handleNavClick = (section: Section) => {
    setSection(section);
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled || isMenuOpen ? 'glass-nav py-3 px-6' : 'bg-transparent py-6 px-8'
    }`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => handleNavClick(Section.Home)}
        >
          <div className="w-10 h-10 bg-sky-600 rounded-xl flex items-center justify-center shadow-lg shadow-sky-200 group-hover:rotate-12 transition-transform">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.582.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.582.477-4.5 1.253" />
            </svg>
          </div>
          <span className="hidden sm:block text-slate-900 font-brand font-black text-sm uppercase tracking-widest group-hover:text-sky-600 transition-colors">EduDigital</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex bg-white/40 backdrop-blur-xl rounded-2xl p-1 gap-1 border border-white/20 shadow-sm">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 text-sm font-bold rounded-xl transition-all whitespace-nowrap ${
                  activeSection === item.id 
                  ? 'bg-white text-sky-600 shadow-md scale-105' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/30'
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button (Hamburger) */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-slate-800 p-2 rounded-md hover:bg-white/50 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
            </svg>
          </button>
        </div>
        
        <div className="hidden lg:block">
          <button className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-lg transition-all hover:scale-105 active:scale-95">
            Acceso
          </button>
        </div>
      </div>
      
      {/* Mobile Menu Panel */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 pt-4' : 'max-h-0'}`}>
        <ul className="flex flex-col items-center gap-1">
          {navItems.map((item) => (
            <li key={item.id} className="w-full">
              <button
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-center px-4 py-3 rounded-lg font-bold transition-all ${
                  activeSection === item.id 
                  ? 'bg-white text-sky-600 shadow-md' 
                  : 'text-slate-700 hover:bg-white/50'
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
