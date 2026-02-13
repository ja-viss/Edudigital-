import React, { useState, useEffect } from 'react';
import { Video, ManagementPayload } from '../types';
import { fetchVenezuelanVideos } from '../services/youtubeService';

interface CinemaProps {
  userMovies: ManagementPayload[];
}

export const CinemaSection: React.FC<CinemaProps> = ({ userMovies }) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  
  // Estado para la categoría activa
  const [activeCategory, setActiveCategory] = useState('cine');

  // Definición de las categorías y sus consultas de búsqueda optimizadas
  const categories = [
    { id: 'cine', label: 'Cine Nacional', query: 'cine venezolano peliculas completas documentales historia' },
    { id: 'leyendas', label: 'Leyendas y Mitos', query: 'leyendas venezolanas el silbon la sayona cuentos de camino' },
    { id: 'paisajes', label: 'Paisajes de Venezuela', query: 'paisajes venezuela gran sabana merida roques drone 4k' },
    { id: 'fauna', label: 'Fauna Nacional', query: 'animales de venezuela fauna silvestre documentales' },
  ];

  useEffect(() => {
    const loadCinema = async () => {
      setLoading(true);
      
      // Buscamos la query correspondiente a la categoría activa
      const currentCategory = categories.find(c => c.id === activeCategory);
      const queryBase = currentCategory ? currentCategory.query : 'documental venezuela';

      // isMovie = true fuerza videos largos/documentales
      const results = await fetchVenezuelanVideos(queryBase, 24, true);
      setVideos(results);
      setLoading(false);
    };
    loadCinema();
  }, [activeCategory]);

  return (
    <section className="bg-white text-slate-900 min-h-screen font-sans">
      
      {/* HERO SECTION */}
      <div className="relative h-[50vh] w-full overflow-hidden bg-emerald-950">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1549558549-415fe4c37b60?q=80&w=2038" className="w-full h-full object-cover opacity-40" alt="Hero" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/40" />
        </div>
        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
          <h2 className="text-5xl md:text-7xl font-brand font-black text-white tracking-tighter drop-shadow-lg">
            Cinemateca <span className="text-emerald-400 italic">Digital</span>
          </h2>
          <p className="text-white/90 mt-4 max-w-lg text-lg font-light">
            Preservando nuestra identidad visual: Cine, Naturaleza e Historia.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* MENÚ DE CATEGORÍAS (NUEVO) */}
        <div className="flex flex-wrap gap-4 mb-16 justify-center md:justify-start border-b border-slate-100 pb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 transform hover:-translate-y-1 ${
                activeCategory === cat.id
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200 ring-2 ring-emerald-600 ring-offset-2'
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Sección de Estrenos del Inventario Propio (DB.JSON) */}
        {userMovies.length > 0 && activeCategory === 'cine' && (
          <div className="mb-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
             <h3 className="text-xl font-black uppercase tracking-widest text-emerald-800 mb-8 flex items-center gap-3">
               <span className="w-8 h-1 bg-emerald-500 rounded-full"></span> Estrenos del Inventario
             </h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {userMovies.map((movie) => (
                  <div key={movie.payload.id} className="group cursor-pointer" onClick={() => setSelectedVideo({ id: movie.payload.id, url: movie.payload.recursos.enlaces[0], title: movie.payload.metadata.titulo, isUser: true })}>
                    <div className="aspect-[2/3] rounded-[2rem] overflow-hidden bg-slate-100 shadow-md group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500 relative">
                      <img src={movie.payload.recursos.url_portada} className="w-full h-full object-cover" alt={movie.payload.metadata.titulo} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                      <div className="absolute bottom-6 left-6 right-6">
                        <span className="bg-emerald-500 text-white px-3 py-1 rounded-lg text-[9px] font-black uppercase mb-2 inline-block">Destacado</span>
                        <h4 className="text-white font-bold leading-tight">{movie.payload.metadata.titulo}</h4>
                      </div>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        )}

        {/* GRID DE RESULTADOS (YOUTUBE) */}
        <div className="min-h-[400px]">
          {loading ? (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
               {[1,2,3,4,5,6,7,8].map(i => (
                 <div key={i} className="aspect-video bg-slate-100 rounded-[2rem] animate-pulse"></div>
               ))}
             </div>
          ) : (
            <>
              <h3 className="text-xl font-black uppercase tracking-widest text-slate-400 mb-8 flex items-center gap-3">
                 <span className="w-2 h-2 bg-slate-300 rounded-full"></span> Explorando: <span className="text-emerald-600">{categories.find(c => c.id === activeCategory)?.label}</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {videos.map((video) => (
                  <div key={video.id} className="group cursor-pointer" onClick={() => setSelectedVideo({ id: video.id, title: video.title })}>
                    <div className="aspect-video rounded-[2rem] overflow-hidden bg-slate-100 shadow-sm group-hover:shadow-xl transition-all duration-300 relative">
                      <img src={video.thumbnail} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={video.title} />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors flex items-center justify-center">
                        <div className="w-12 h-12 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-emerald-900 shadow-lg scale-90 group-hover:scale-110 transition-transform">
                          <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                        </div>
                      </div>
                    </div>
                    <h4 className="mt-4 text-sm font-bold text-slate-800 line-clamp-2 leading-relaxed group-hover:text-emerald-700 transition-colors">{video.title}</h4>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* MODAL REPRODUCTOR */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-emerald-950/90 backdrop-blur-xl animate-in fade-in duration-300">
          <button 
            onClick={() => setSelectedVideo(null)} 
            className="absolute top-6 right-6 p-4 bg-white/10 text-white hover:bg-white hover:text-emerald-900 rounded-full transition-all"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          
          <div className="w-full max-w-6xl aspect-video bg-black rounded-[3rem] overflow-hidden shadow-2xl ring-1 ring-white/10">
            {selectedVideo.isUser ? (
              <iframe src={selectedVideo.url} className="w-full h-full" allowFullScreen></iframe>
            ) : (
              <iframe src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`} className="w-full h-full" allow="autoplay; encrypted-media" allowFullScreen></iframe>
            )}
          </div>
        </div>
      )}
    </section>
  );
};