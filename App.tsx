
import React, { useState, useEffect } from 'react';
import { Section, ManagementPayload } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { PartnersSection } from './components/PartnersSection';
import { LibrarySection } from './components/LibrarySection';
import { CinemaSection } from './components/CinemaSection';
import { HistorySection } from './components/HistorySection';
import { CoursesSection } from './components/CoursesSection';
import { ArchivosSection } from './components/ArchivosSection';
import { IAServiceSection } from './components/IAServiceSection';
import { NewsSection } from './components/NewsSection';
import { ManagementSection } from './components/ManagementSection';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>(Section.Home);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loginData, setLoginData] = useState({ user: '', pass: '' });
  
  // Persistencia del inventario en LocalStorage para simular DB JSON
  const [inventario, setInventario] = useState<ManagementPayload[]>(() => {
    const saved = localStorage.getItem('edudigital_db');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('edudigital_db', JSON.stringify(inventario));
  }, [inventario]);

  useEffect(() => {
    const handleScroll = () => {
      const reveals = document.querySelectorAll('.reveal');
      reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 150;
        if (revealTop < windowHeight - revealPoint) {
          reveal.classList.add('active');
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeSection]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginData.user === 'juliocesar' && loginData.pass === 'evil123') {
      setIsAuthenticated(true);
      setShowLogin(false);
      setActiveSection(Section.Management);
    } else {
      alert('Credenciales incorrectas: El sistema requiere validación estática.');
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case Section.Home:
        return (
          <>
            <Hero onStart={setActiveSection} />
            <AboutSection />
            <PartnersSection />
          </>
        );
      case Section.Library: return <LibrarySection userBooks={inventario.filter(i => i.modulo === 'Libros')} />;
      case Section.Cinema: return <CinemaSection userMovies={inventario.filter(i => i.modulo === 'Cine')} />;
      case Section.History: return <HistorySection userHistory={inventario.filter(i => i.modulo === 'Libros' && i.payload.metadata.categoria_principal === 'Historia')} />;
      case Section.Courses: return <CoursesSection userCourses={inventario.filter(i => i.modulo === 'Cursos')} />;
      case Section.Archivos: return <ArchivosSection />;
      case Section.IA: return <IAServiceSection />;
      case Section.News: return <NewsSection />;
      case Section.Management: return isAuthenticated ? (
        <ManagementSection inventario={inventario} setInventario={setInventario} />
      ) : (
        <Hero onStart={setActiveSection} />
      );
      default: return <Hero onStart={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-white selection:bg-sky-500 selection:text-white flex flex-col">
      <Navbar activeSection={activeSection} setSection={setActiveSection} />
      
      {!isAuthenticated && (
        <button 
          onClick={() => setShowLogin(true)}
          className="fixed bottom-8 right-8 z-[60] w-14 h-14 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-sky-600 transition-all hover:scale-110"
          title="Acceso Maestro"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
        </button>
      )}

      {showLogin && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/95 backdrop-blur-3xl animate-fade-in p-6">
          <div className="w-full max-w-md bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-100">
             <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl font-brand font-black">Validación JSON</h3>
                <button onClick={() => setShowLogin(false)} className="text-slate-400 hover:text-red-500">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
             </div>
             <form onSubmit={handleLogin} className="space-y-6">
                <input 
                  type="text" 
                  placeholder="Usuario" 
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-5 outline-none focus:border-sky-300 transition-all font-medium"
                  value={loginData.user}
                  onChange={(e) => setLoginData({...loginData, user: e.target.value})}
                />
                <input 
                  type="password" 
                  placeholder="Contraseña" 
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-5 outline-none focus:border-sky-300 transition-all font-medium"
                  value={loginData.pass}
                  onChange={(e) => setLoginData({...loginData, pass: e.target.value})}
                />
                <button type="submit" className="w-full py-5 bg-sky-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-sky-700 transition-all">
                   Entrar al Motor Lógico
                </button>
             </form>
          </div>
        </div>
      )}

      <main className="flex-grow transition-all duration-700 ease-in-out">
        {renderSection()}
      </main>

      <footer className="bg-[#020617] text-white relative overflow-hidden border-t border-white/5 shrink-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-sky-900/10 via-transparent to-transparent opacity-50" />
        <div className="max-w-7xl mx-auto px-6 pt-32 pb-12 relative z-10">
          <div className="mb-32 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="reveal">
              <h2 className="text-5xl md:text-7xl font-brand font-black tracking-tighter leading-none mb-8">
                El conocimiento <br/>no tiene <span className="text-sky-500">límites.</span>
              </h2>
            </div>
            
            <div className="reveal flex flex-col sm:flex-row gap-6 lg:justify-end">
              <div className="p-8 bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 hover:border-sky-500/50 transition-colors group cursor-pointer" onClick={() => setActiveSection(Section.Archivos)}>
                 <p className="text-sky-400 font-black uppercase tracking-widest text-[10px] mb-2">Comienza ahora</p>
                 <h4 className="text-xl font-bold mb-4">Explora los Archivos</h4>
                 <div className="w-10 h-10 rounded-full bg-sky-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                 </div>
              </div>
            </div>
          </div>
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-slate-500 text-[10px] font-black uppercase tracking-widest">
               <span>&copy; {new Date().getFullYear()} Ecosistema de Formación Digital • SOBERANÍA TECNOLÓGICA</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
