
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
  const [activeFilter, setActiveFilter] = useState('Territorios');

  useEffect(() => {
    const loadCinema = async () => {
      setLoading(true);
      let queryBase = activeFilter === 'Territorios' ? 'documental venezuela paisajes' : activeFilter === 'Naturaleza' ? 'fauna flora parques nacionales venezuela' : 'cultura tradiciones venezuela';
      const results = await fetchVenezuelanVideos(queryBase, 20, true);
      setVideos(results);
      setLoading(false);
    };
    loadCinema();
  }, [activeFilter]);

  return (
    <section className="bg-white text-slate-900 min-h-screen">
      <div className="relative h-[50vh] w-full overflow-hidden bg-emerald-950">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1549558549-415fe4c37b60?q=80&w=2038" className="w-full h-full object-cover opacity-30" alt="Hero" />
          <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
        </div>
        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
          <h2 className="text-5xl md:text-7xl font-brand font-black text-white tracking-tighter">Cinemateca <span className="text-emerald-400">Digital</span></h2>
          <p className="text-white/80 mt-4 max-w-lg">Cine y documentales educativos del inventario nacional.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Sección de Estrenos del Inventario Propio */}
        {userMovies.length > 0 && (
          <div className="mb-24">
             <h3 className="text-xl font-black uppercase tracking-widest text-emerald-600 mb-8 flex items-center gap-3">
               <span className="w-8 h-px bg-emerald-600"></span> Recursos del Inventario Maestro
             </h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {userMovies.map((movie) => (
                  <div key={movie.payload.id} className="group cursor-pointer" onClick={() => setSelectedVideo({ id: movie.payload.id, url: movie.payload.recursos.enlaces[0], title: movie.payload.metadata.titulo, isUser: true })}>
                    <div className="aspect-video rounded-[2rem] overflow-hidden bg-slate-100 border border-slate-100 shadow-lg group-hover:-translate-y-2 transition-all">
                      <img src={movie.payload.recursos.url_portada} className="w-full h-full object-cover" alt={movie.payload.metadata.titulo} />
                    </div>
                    <h4 className="mt-4 font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">{movie.payload.metadata.titulo}</h4>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{movie.payload.metadata.categoria_principal} • {movie.payload.metadata.duracion_o_extension}</p>
                  </div>
                ))}
             </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {videos.map((video) => (
            <div key={video.id} className="group cursor-pointer" onClick={() => setSelectedVideo({ id: video.id, title: video.title })}>
              <div className="aspect-video rounded-[2rem] overflow-hidden bg-slate-100 shadow-sm group-hover:shadow-xl transition-all">
                <img src={video.thumbnail} className="w-full h-full object-cover" alt={video.title} />
              </div>
              <h4 className="mt-4 text-sm font-bold text-slate-800 line-clamp-2">{video.title}</h4>
            </div>
          ))}
        </div>
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-3xl animate-fade-in">
          <button onClick={() => setSelectedVideo(null)} className="absolute top-8 right-8 p-4 bg-white text-black rounded-2xl shadow-2xl">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <div className="w-full max-w-5xl aspect-video bg-black rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10">
            {selectedVideo.isUser ? (
              <iframe src={selectedVideo.url} className="w-full h-full" allowFullScreen></iframe>
            ) : (
              <iframe src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`} className="w-full h-full" allowFullScreen></iframe>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
