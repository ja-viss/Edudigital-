import React, { useState, useEffect } from 'react';
import { INCES_COURSES } from '../constants';
import { Video } from '../types';
import { fetchVenezuelanVideos } from '../services/youtubeService';

// 1. CONFIGURACIÓN DE CATEGORÍAS
const CATEGORIAS_DEFINIDAS = [
  { id: 'ia', nombre: 'Inteligencia Artificial', color: 'text-sky-600', border: 'border-sky-600' },
  { id: 'trading', nombre: 'Trading y Mercados', color: 'text-emerald-600', border: 'border-emerald-600' },
  { id: 'finanzas', nombre: 'Finanzas Personales', color: 'text-amber-600', border: 'border-amber-600' },
  { id: 'programacion', nombre: 'Programación Web', color: 'text-indigo-600', border: 'border-indigo-600' },
  { id: 'office', nombre: 'Microsoft Office', color: 'text-orange-600', border: 'border-orange-600' }
];

// 2. SISTEMA DE RESPALDO (BACKUP) - Se activa si falla la API
const BACKUP_VIDEOS: Record<string, Video[]> = {
  ia: [
    { id: '8lMNIS_lA4A', title: 'Curso de Inteligencia Artificial para Principiantes', thumbnail: 'https://i.ytimg.com/vi/8lMNIS_lA4A/hqdefault.jpg', description: '', platform: 'YouTube', url: '', category: 'IA' },
    { id: '_tA5chinTpE', title: 'Aprende ChatGPT desde Cero', thumbnail: 'https://i.ytimg.com/vi/_tA5chinTpE/hqdefault.jpg', description: '', platform: 'YouTube', url: '', category: 'IA' },
    { id: '2ePbH6xs06Q', title: 'Curso Básico de IA Generativa', thumbnail: 'https://i.ytimg.com/vi/2ePbH6xs06Q/hqdefault.jpg', description: '', platform: 'YouTube', url: '', category: 'IA' }
  ],
  trading: [
    { id: 'P7w_q23QhKw', title: 'Curso de Trading desde Cero (Gratis)', thumbnail: 'https://i.ytimg.com/vi/P7w_q23QhKw/hqdefault.jpg', description: '', platform: 'YouTube', url: '', category: 'Trading' },
    { id: 'M-3-x4w8k20', title: 'Análisis Técnico Básico', thumbnail: 'https://i.ytimg.com/vi/M-3-x4w8k20/hqdefault.jpg', description: '', platform: 'YouTube', url: '', category: 'Trading' },
    { id: 'yy31_N9jXvE', title: 'Psicología del Trading', thumbnail: 'https://i.ytimg.com/vi/yy31_N9jXvE/hqdefault.jpg', description: '', platform: 'YouTube', url: '', category: 'Trading' }
  ],
  finanzas: [
    { id: 'Uf_2tZ4zGz4', title: 'Finanzas Personales: Curso Completo', thumbnail: 'https://i.ytimg.com/vi/Uf_2tZ4zGz4/hqdefault.jpg', description: '', platform: 'YouTube', url: '', category: 'Finanzas' },
    { id: 'D7d1L0v9j6s', title: 'Cómo organizar tu dinero', thumbnail: 'https://i.ytimg.com/vi/D7d1L0v9j6s/hqdefault.jpg', description: '', platform: 'YouTube', url: '', category: 'Finanzas' },
    { id: '8Y0sCq2E5xM', title: 'Ahorro e Inversión para Principiantes', thumbnail: 'https://i.ytimg.com/vi/8Y0sCq2E5xM/hqdefault.jpg', description: '', platform: 'YouTube', url: '', category: 'Finanzas' }
  ],
  programacion: [
    { id: 'n28W4bV1j_E', title: 'Curso Programación Web Desde Cero', thumbnail: 'https://i.ytimg.com/vi/n28W4bV1j_E/hqdefault.jpg', description: '', platform: 'YouTube', url: '', category: 'Programación' },
    { id: 'rfscVS0vtbw', title: 'Aprende Python - Curso para Principiantes', thumbnail: 'https://i.ytimg.com/vi/rfscVS0vtbw/hqdefault.jpg', description: '', platform: 'YouTube', url: '', category: 'Programación' },
    { id: 'z95mZLCX6kg', title: 'JavaScript Curso Completo', thumbnail: 'https://i.ytimg.com/vi/z95mZLCX6kg/hqdefault.jpg', description: '', platform: 'YouTube', url: '', category: 'Programación' }
  ],
  office: [
    { id: 'Zk9oN0w-5bQ', title: 'Curso Excel Completo (Básico a Avanzado)', thumbnail: 'https://i.ytimg.com/vi/Zk9oN0w-5bQ/hqdefault.jpg', description: '', platform: 'YouTube', url: '', category: 'Office' },
    { id: '4l_7sI5qg0o', title: 'Word: Domina el Procesador de Texto', thumbnail: 'https://i.ytimg.com/vi/4l_7sI5qg0o/hqdefault.jpg', description: '', platform: 'YouTube', url: '', category: 'Office' },
    { id: '9X-3b9D2oT4', title: 'PowerPoint: Presentaciones de Impacto', thumbnail: 'https://i.ytimg.com/vi/9X-3b9D2oT4/hqdefault.jpg', description: '', platform: 'YouTube', url: '', category: 'Office' }
  ]
};

export const CoursesSection: React.FC = () => {
  const [categoriesData, setCategoriesData] = useState<Record<string, Video[]>>({});
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  useEffect(() => {
    let montado = true;

    const cargarTodo = async () => {
      setLoading(true);
      const results: Record<string, Video[]> = {};
      
      try {
        // Ejecutamos las peticiones secuencialmente para no saturar la API
        for (const cat of CATEGORIAS_DEFINIDAS) {
          try {
            const query = `${cat.nombre} curso completo español`;
            // Intentamos obtener videos de la API
            const videos = await fetchVenezuelanVideos(query, 3).catch(() => []);
            
            if (montado) {
              // LÓGICA CLAVE: Si la API devuelve vacío o falla, usamos el BACKUP
              if (videos && videos.length > 0) {
                results[cat.id] = videos;
              } else {
                console.log(`Usando backup para: ${cat.nombre}`);
                results[cat.id] = BACKUP_VIDEOS[cat.id] || [];
              }
            }
          } catch (err) {
            if (montado) results[cat.id] = BACKUP_VIDEOS[cat.id] || [];
          }
        }

        if (montado) setCategoriesData(results);
      } catch (error) {
        console.error("Error general:", error);
      } finally {
        if (montado) setLoading(false);
      }
    };

    cargarTodo();
    return () => { montado = false; };
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
            <div key={cat.id} className="mb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <div className="flex items-end gap-4 mb-8 border-b border-slate-200 pb-4">
                <h3 className={`text-2xl md:text-4xl font-brand text-slate-900 tracking-tight`}>
                  {cat.nombre.split(' ')[0]} <span className={cat.color}>{cat.nombre.split(' ').slice(1).join(' ')}</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Renderizamos videos, ya sea de API o de Backup */}
                {(categoriesData[cat.id] || BACKUP_VIDEOS[cat.id]).map((video) => (
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