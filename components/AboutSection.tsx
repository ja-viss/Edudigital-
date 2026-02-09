
import React, { useEffect, useRef } from 'react';

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about-section" className="py-32 px-6 md:px-12 bg-white relative overflow-hidden" ref={sectionRef}>
      {/* Background soft gradients */}
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-sky-50 rounded-full filter blur-[100px] -z-10" />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="reveal">
            <div className="inline-block py-1 px-4 bg-sky-100 text-sky-600 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              Compromiso Educativo
            </div>
            <h3 className="text-4xl md:text-6xl font-brand text-slate-900 mb-8 leading-[1.1]">
              Un ecosistema pensado <br/>
              <span className="text-sky-500">para tu crecimiento</span>
            </h3>
            <p className="text-slate-500 text-xl mb-10 leading-relaxed font-light">
              Garantizamos el acceso universal a la formación de calidad, integrando tecnología de vanguardia con la calidez de nuestra educación popular.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: 'Triunfadores', desc: 'Recursos adaptados a cada trayecto universitario.', icon: '🎓', color: 'bg-blue-50' },
                { title: 'Docentes', desc: 'Material pedagógico para la aldea universitaria.', icon: '💡', color: 'bg-sky-50' },
                { title: 'Saber Libre', desc: 'Bibliotecas digitales sin restricciones.', icon: '📚', color: 'bg-indigo-50' },
                { title: 'Cine Foro', desc: 'Memoria histórica y cultura nacional.', icon: '🎬', color: 'bg-cyan-50' }
              ].map((item, idx) => (
                <div key={idx} className="group p-6 rounded-[2rem] border border-slate-100 bg-white hover:border-sky-200 hover:shadow-xl transition-all duration-500">
                  <div className={`w-14 h-14 shrink-0 rounded-2xl ${item.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform mb-4`}>
                    {item.icon}
                  </div>
                  <h4 className="font-bold text-slate-800 mb-2">{item.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal relative">
            <div className="relative z-10 rounded-[3.5rem] overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700 aspect-[4/5]">
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop" 
                alt="Colaboración Educativa" 
                className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sky-900/60 via-transparent to-transparent" />
            </div>
            
            {/* Decorative background shapes */}
            <div className="absolute -top-10 -right-10 w-40 h-40 border-4 border-sky-100 rounded-full -z-10 animate-pulse" />
            <div className="absolute -bottom-10 -left-10 w-full h-full border border-sky-50 rounded-[3.5rem] -z-10 translate-x-4 translate-y-4" />
            
            <div className="absolute -bottom-12 right-0 p-8 glass-card-light rounded-3xl z-20 shadow-2xl max-w-[260px] border border-sky-100">
              <div className="flex -space-x-3 mb-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-slate-200">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-white bg-sky-500 flex items-center justify-center text-white text-xs font-bold">+</div>
              </div>
              <p className="text-slate-800 font-bold text-sm mb-1">Comunidad Activa</p>
              <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Triunfadores en línea ahora</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
