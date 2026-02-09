
import React, { useState, useEffect } from 'react';
import { Video, ManagementPayload } from '../types';
import { fetchVenezuelanVideos } from '../services/youtubeService';

interface HistoryProps {
  userHistory: ManagementPayload[];
}

export const HistorySection: React.FC<HistoryProps> = ({ userHistory }) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);

  useEffect(() => {
    const loadHistory = async () => {
      setLoading(true);
      const historyVideos = await fetchVenezuelanVideos('documental historia de venezuela bolívar', 12);
      setVideos(historyVideos);
      setLoading(false);
    };
    loadHistory();
  }, []);

  return (
    <section className="py-32 px-6 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24 reveal active">
          <h2 className="text-5xl md:text-7xl font-brand text-slate-900 tracking-tighter">Memoria <span className="text-indigo-600 italic">Insurgente</span></h2>
          <p className="text-slate-500 mt-4 max-w-2xl mx-auto text-xl font-light">Documentos y archivos para la formación de la conciencia nacional.</p>
        </div>

        {userHistory.length > 0 && (
          <div className="mb-24">
             <h3 className="text-xl font-black uppercase tracking-widest text-indigo-600 mb-8 flex items-center gap-3">
               <span className="w-8 h-px bg-indigo-600"></span> Archivos de la Nación
             </h3>
             <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {userHistory.map((item) => (
                  <div key={item.payload.id} className="group cursor-pointer" onClick={() => setSelectedVideo({ url: item.payload.recursos.enlaces[0], title: item.payload.metadata.titulo, isUser: true })}>
                    <div className="aspect-[3/4] rounded-[2.5rem] overflow-hidden bg-slate-100 border border-slate-100 shadow-xl group-hover:scale-[1.02] transition-all">
                      <img src={item.payload.recursos.url_portada} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt={item.payload.metadata.titulo} />
                    </div>
                    <h4 className="mt-4 font-bold text-slate-800 line-clamp-1">{item.payload.metadata.titulo}</h4>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{item.payload.metadata.sub_etiqueta}</p>
                  </div>
                ))}
             </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 reveal active">
          {videos.map((video) => (
            <div key={video.id} className="group cursor-pointer bg-slate-50 p-4 rounded-[2.5rem] border border-slate-100 hover:bg-white transition-all shadow-sm hover:shadow-xl" onClick={() => setSelectedVideo({ id: video.id, title: video.title })}>
              <div className="aspect-video rounded-3xl overflow-hidden mb-4">
                <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
              </div>
              <h3 className="font-bold text-slate-800 line-clamp-2 text-sm">{video.title}</h3>
            </div>
          ))}
        </div>
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/98 backdrop-blur-3xl animate-fade-in">
          <button onClick={() => setSelectedVideo(null)} className="absolute top-8 right-8 p-4 bg-white rounded-2xl">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <div className="w-full max-w-5xl aspect-video bg-black rounded-[3rem] overflow-hidden shadow-2xl">
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
