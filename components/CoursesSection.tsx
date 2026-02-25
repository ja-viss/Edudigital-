import React, { useState, useEffect } from 'react';
import { Video } from '../types';
import { INCES_COURSES } from '../constants';

const CATEGORIAS_DEFINIDAS = [
    { id: 'Inteligencia Artificial', nombre: 'Inteligencia Artificial', color: 'text-sky-600', border: 'border-sky-600' },
    { id: 'Finanzas', nombre: 'Finanzas', color: 'text-amber-600', border: 'border-amber-600' },
    { id: 'Cripto', nombre: 'Cripto', color: 'text-emerald-600', border: 'border-emerald-600' },
    { id: 'Administración', nombre: 'Administración', color: 'text-indigo-600', border: 'border-indigo-600' },
    { id: 'Office', nombre: 'Office', color: 'text-orange-600', border: 'border-orange-600' },
];

export const CoursesSection: React.FC = () => {
  const [videosBySubCategory, setVideosBySubCategory] = useState<Record<string, Video[]>>({});
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  useEffect(() => {
    const loadVideos = async () => {
      setLoading(true);
      try {
        const response = await fetch('/data-youtube.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Video[] = await response.json();
        const coursesVideos = data.filter(video => video.category === 'Cursos');

        const groupedVideos = coursesVideos.reduce((acc, video) => {
          const subcat = video.subcategory || 'General';
          if (!acc[subcat]) {
            acc[subcat] = [];
          }
          acc[subcat].push(video);
          return acc;
        }, {} as Record<string, Video[]>);

        setVideosBySubCategory(groupedVideos);

      } catch (error) {
        console.error("Error loading video data:", error);
        // Optionally, load backup data here
      } finally {
        setLoading(false);
      }
    };
    
    loadVideos();
  }, []);

  return (
    <section className="bg-slate-50 min-h-screen font-sans relative">
      
      {/* HEADER */}
      <div className="pt-32 pb-16 px-6 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-brand text-slate-900 tracking-tighter">
            Aprende <span className="text-sky-500 italic">Hoy</span>
          </h2>
          <p className="text-slate-500 mt-6 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
            Ecosistema dinámico de formación profesional y técnica impulsado por contenido libre.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {loading ? (
          <div className="text-center py-24">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-sky-600 mx-auto mb-6"></div>
            <p className="text-slate-400 font-bold uppercase text-xs tracking-[0.2em]">Sincronizando Plataforma...</p>
          </div>
        ) : (
          CATEGORIAS_DEFINIDAS.map((cat) => (
            videosBySubCategory[cat.id] && videosBySubCategory[cat.id].length > 0 && (
              <div key={cat.id} className="mb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <div className="flex items-end gap-4 mb-8 border-b border-slate-200 pb-4">
                  <h3 className={`text-2xl md:text-4xl font-brand text-slate-900 tracking-tight`}>
                    {cat.nombre.split(' ')[0]} <span className={cat.color}>{cat.nombre.split(' ').slice(1).join(' ')}</span>
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {videosBySubCategory[cat.id].map((video) => (
                    <div 
                      key={video.id} 
                      className="bg-white rounded-[2.5rem] shadow-lg border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group overflow-hidden cursor-pointer flex flex-col"
                      onClick={() => setSelectedVideo(video.id)}
                    >
                      <div className="h-48 overflow-hidden relative flex-shrink-0">
                        <img 
                          src={video.thumbnail} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                          alt={video.title}
                          onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/640x360?text=Video+No+Disponible'; }} 
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-slate-900 shadow-xl scale-75 group-hover:scale-100 transition-transform">
                            <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 20 20"><path d="M4.5 3.5v13L16 10 4.5 3.5z"/></svg>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-8 flex flex-col flex-1">
                        <h4 className="text-lg font-bold text-slate-800 mb-4 leading-snug line-clamp-2 h-14" title={video.title}>
                          {video.title}
                        </h4>
                        <button className="mt-auto block w-full text-center py-4 bg-slate-50 text-slate-900 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all">
                          Ver Curso Ahora
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          ))
        )}

        {/* SECCIÓN INCES */}
        {INCES_COURSES && INCES_COURSES.length > 0 && (
          <div className="mt-32 pt-16 border-t border-slate-200">
            <h3 className="text-3xl md:text-4xl font-brand text-slate-900 mb-12 text-center">
              Programas Oficiales <span className="text-sky-600">INCES</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {INCES_COURSES.map(course => (
                <div key={course.id} className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group hover:-translate-y-1">
                  <div className="h-40 rounded-[1.5rem] overflow-hidden mb-6">
                    <img src={course.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={course.title} />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm line-clamp-2 mb-6 h-10 leading-tight text-center">{course.title}</h4>
                  <a href={course.url} target="_blank" rel="noreferrer" className="block py-3 bg-slate-50 text-slate-500 text-center rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-sky-600 hover:text-white transition-all">
                    Inscripción
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* MODAL DE REPRODUCTOR FLOTANTE */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-in fade-in duration-300">
          <button 
            onClick={() => setSelectedVideo(null)} 
            className="absolute top-6 right-6 p-4 bg-white/10 text-white rounded-full hover:bg-white hover:text-black transition-all"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          
          <div className="w-full max-w-6xl aspect-video bg-black rounded-[3rem] overflow-hidden shadow-2xl border border-white/10">
            <iframe 
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`} 
              className="w-full h-full" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

    </section>
  );
};
