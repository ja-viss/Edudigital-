
import React from 'react';

export const PartnersSection: React.FC = () => {
  const partners = [
    {
      name: 'YouTube',
      role: 'Contenido Audiovisual',
      description: 'Acceso a documentales educativos, clases magistrales y el archivo histórico de la Villa del Cine.',
      color: 'text-red-600',
      logo: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
        </svg>
      )
    },
    {
      name: 'Internet Archive',
      role: 'Archivo Universal',
      description: 'Repositorio global de libros, películas y software de dominio público para el aprendizaje libre.',
      color: 'text-slate-800',
      logo: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L1 8l1.333.727V20H5v-7h2v7h3v-7h2v7h3v-7h2v7h2.667V8.727L23 8 12 2zM7 6l5-2.727L17 6H7z" />
        </svg>
      )
    },
    {
      name: 'Alejandría',
      role: 'Biblioteca Digital',
      description: 'Cuna de la literatura universal y textos académicos fundamentales para la formación crítica.',
      color: 'text-amber-700',
      logo: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18c-2.305 0-4.408.867-6 2.292m0-14.25v14.25" />
        </svg>
      )
    },
    {
      name: 'Misión Sucre',
      role: 'Eje Institucional',
      description: 'Plataforma de gestión y comunidad de triunfadores que da vida al sistema educativo nacional.',
      color: 'text-sky-600',
      logo: (
        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center overflow-hidden shadow-md p-1 border border-slate-100">
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXz6hPw5Aap2JwHBq30xL4UjDDiv8CFqdx4g&s" 
            alt="Misión Sucre" 
            className="w-full h-full object-contain"
          />
        </div>
      )
    }
  ];

  return (
    <section className="py-24 px-6 md:px-12 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 reveal">
          <h2 className="text-sky-600 font-bold uppercase tracking-[0.3em] text-xs mb-4">Alianzas Estratégicas</h2>
          <h3 className="text-3xl md:text-5xl font-brand text-slate-900 mb-6">Colaboradores del Conocimiento</h3>
          <p className="text-slate-500 max-w-2xl mx-auto font-light">
            Integramos los recursos de las plataformas más importantes del mundo para garantizar una educación de calidad y sin fronteras.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 reveal">
          {partners.map((partner, index) => (
            <div 
              key={index} 
              className="group p-8 bg-white rounded-[2.5rem] border border-slate-100 hover:border-sky-200 transition-all duration-500 hover:shadow-2xl hover:shadow-sky-100/50 flex flex-col items-center text-center"
            >
              <div className={`${partner.color} mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                {partner.logo}
              </div>
              <h4 className="text-xl font-brand text-slate-900 mb-1">{partner.name}</h4>
              <p className="text-sky-600 text-[10px] font-bold uppercase tracking-widest mb-4">{partner.role}</p>
              <p className="text-slate-400 text-sm leading-relaxed font-light">
                {partner.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-20 flex flex-wrap justify-center gap-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-700 reveal">
          {/* Subtle branding strip */}
          <span className="font-brand text-slate-900 text-xl tracking-tighter">YouTube</span>
          <span className="font-brand text-slate-900 text-xl tracking-tighter">ARCHIVE.ORG</span>
          <span className="font-brand text-slate-900 text-xl tracking-tighter">ALEJANDRÍA</span>
          <span className="font-brand text-slate-900 text-xl tracking-tighter">MISIÓN SUCRE</span>
        </div>
      </div>
    </section>
  );
};
