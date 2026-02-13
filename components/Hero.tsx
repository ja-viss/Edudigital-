
import React from 'react';
import { Section } from '../types';

interface HeroProps {
  onStart: (section: Section) => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white px-4">
      {/* Dynamic Animated Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-48 h-48 md:w-72 md:h-72 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute top-1/3 -right-20 w-56 h-56 md:w-80 md:h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/2 w-64 h-64 md:w-96 md:h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
        
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
      </div>

      <div className="relative z-10 text-center w-full max-w-6xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 md:mb-8 bg-sky-50 border border-sky-100 rounded-full animate-fade-in shadow-sm">
           <span className="relative flex h-2 w-2">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
             <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
           </span>
           <span className="text-sky-600 font-bold text-[9px] md:text-xs uppercase tracking-[0.2em]">
             Nueva Era Digital • Venezuela
           </span>
        </div>
        
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-brand text-slate-900 mb-6 md:mb-8 leading-[1.1] md:leading-[0.95] tracking-tight">
          Educación que <br/>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-blue-400">Transforma</span>
        </h1>
        
        <p className="text-slate-500 text-base md:text-xl mb-8 md:mb-12 max-w-3xl mx-auto font-light leading-relaxed px-2">
          Plataforma inmersiva diseñada para el empoderamiento de <span className="text-sky-600 font-semibold italic">Triunfadores</span> y <span className="text-sky-600 font-semibold italic">Docentes</span>. Conocimiento libre para todos.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center px-6">
          <button 
            onClick={() => onStart(Section.Library)}
            className="w-full sm:w-auto group relative px-8 md:px-12 py-4 md:py-5 bg-sky-600 text-white rounded-2xl font-bold text-base md:text-lg transition-all hover:scale-105 active:scale-95 shadow-xl hover:shadow-sky-500/40"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Empezar ahora
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
            </span>
          </button>
          
          <button 
            onClick={() => {
              const about = document.getElementById('about-section');
              about?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-8 md:px-12 py-4 md:py-5 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold text-base md:text-lg transition-all hover:bg-slate-50 shadow-sm"
          >
            Nuestra Misión
          </button>
        </div>
      </div>

      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-40">
        <div className="w-5 h-8 md:w-6 md:h-10 border-2 border-sky-400 rounded-full flex justify-center p-1">
          <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-sky-500 rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  );
};
