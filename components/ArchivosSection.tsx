import React, { useState, useEffect, useCallback } from 'react';
import { ArchiveItem } from '../types';

export const ArchivosSection: React.FC = () => {
  const tabs = [
    { id: 'informatica', label: 'Informática', icon: '💻' },
    { id: 'software', label: 'Programas', icon: '💾' },
    { id: 'audio', label: 'Audioteca', icon: '🎧' },
  ];

  const [activeTab, setActiveTab] = useState<string>('informatica');
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState<ArchiveItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<ArchiveItem | null>(null);

  const fetchFromArchive = useCallback(async (query: string, tab: string) => {
    setLoading(true);
    try {
      let baseFilter = '';
      switch (tab) {
        case 'informatica':
          baseFilter = 'mediatype:(software) AND (format:ISO OR subject:operating_system OR subject:windows OR subject:linux)';
          break;
        case 'software':
          baseFilter = 'mediatype:(software)';
          break;
        case 'audio':
          baseFilter = 'mediatype:(audio)';
          break;
        default:
          baseFilter = 'mediatype:(software)';
      }

      const queryPart = query.trim() 
        ? `q=(${encodeURIComponent(query)}) AND ${baseFilter}` 
        : `q=${baseFilter}`;
      
      const params = `&sort[]=downloads+desc&rows=16&page=1&output=json&fl[]=identifier&fl[]=title&fl[]=description&fl[]=mediatype&fl[]=collection`;
      const url = `https://archive.org/advancedsearch.php?${queryPart}${params}`;

      const response = await fetch(url);
      const data = await response.json();
      
      if (data.response && data.response.docs) {
        const results: ArchiveItem[] = data.response.docs.map((doc: any) => {
          const collections = Array.isArray(doc.collection) ? doc.collection : [doc.collection];
          const isGame = collections.includes('software_library_msdos_games');
          return {
            id: doc.identifier,
            title: doc.title || 'Sin Título',
            description: Array.isArray(doc.description) 
              ? doc.description[0] 
              : (doc.description || 'Archivo histórico preservado en Internet Archive.'),
            thumbnail: `https://archive.org/services/img/${doc.identifier}`,
            type: isGame ? 'juegos' : tab, 
            iaId: doc.identifier
          };
        });
        setItems(results);
      } else {
        setItems([]);
      }
    } catch (error) {
      console.error('Error conectando a Internet Archive:', error);
      setItems([]); 
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setSearchQuery('');
    fetchFromArchive('', activeTab);
  }, [activeTab, fetchFromArchive]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchFromArchive(searchQuery, activeTab);
  };

  const handleItemClick = (item: ArchiveItem) => {
    if (item.type === 'juegos' || item.type === 'audio') {
      setSelectedItem(item);
    } else {
      window.open(`https://archive.org/details/${item.iaId}`, '_blank');
    }
  };

  return (
    <section className="py-24 md:py-32 px-4 sm:px-6 md:px-12 bg-white min-h-screen pt-40">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16 reveal active">
          <div className="inline-block py-1 px-4 bg-sky-100 text-sky-600 rounded-full text-xs font-bold uppercase tracking-widest mb-4 md:mb-6">
            Conexión en Tiempo Real
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-brand text-slate-900 mb-6 md:mb-8 tracking-tighter">
            Archivos <span className="text-sky-500 italic">Universales</span>
          </h2>
          <p className="text-slate-500 max-w-3xl mx-auto text-base sm:text-lg md:text-xl font-light">
            Explora millones de recursos preservados digitalmente. 
            <span className="block mt-2 text-xs md:text-sm font-bold text-sky-600">
              Mostrando los archivos más populares de Internet Archive.
            </span>
          </p>
        </div>

        <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto mb-12 md:mb-16 reveal active">
          <div className="flex flex-col sm:flex-row gap-2 p-2 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm focus-within:shadow-xl focus-within:border-sky-200 transition-all">
            <input 
              type="text" 
              placeholder={`Buscar en ${tabs.find(t => t.id === activeTab)?.label}...`}
              className="flex-1 bg-transparent px-4 py-3 sm:px-6 outline-none text-slate-800 placeholder:text-slate-400 font-medium text-sm sm:text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="submit"
              className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 sm:px-8 rounded-xl font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm sm:text-base"
              disabled={loading}
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span className="hidden sm:inline">Buscar</span>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                </>
              )}
            </button>
          </div>
        </form>

        {/* TABS DE NAVEGACIÓN */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 md:mb-16">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-5 py-3 rounded-xl font-bold transition-all border text-sm whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'bg-sky-600 text-white border-sky-600 shadow-lg scale-105' 
                  : 'bg-slate-50 text-slate-600 border-slate-100 hover:bg-white hover:border-sky-200'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-3xl border border-slate-100 overflow-hidden h-[350px] shadow-sm animate-pulse">
                <div className="h-40 bg-slate-100"></div>
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-slate-100 rounded-full w-3/4" />
                  <div className="h-3 bg-slate-50 rounded-full w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 reveal active animate-in fade-in duration-700">
            {items.length > 0 ? (
              items.map((item) => (
                <div 
                  key={item.id} 
                  className="group bg-white rounded-3xl border border-slate-100 overflow-hidden hover-lift shadow-sm hover:shadow-2xl transition-all cursor-pointer flex flex-col"
                  onClick={() => handleItemClick(item)}
                >
                  <div className="h-40 relative overflow-hidden bg-slate-100 shrink-0">
                    <img 
                      src={item.thumbnail} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100" 
                      alt={item.title}
                      onError={(e) => { (e.target as HTMLImageElement).src = 'https://archive.org/images/notfound.png'; }} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                    <div className={`absolute top-3 right-3 backdrop-blur-md px-2 py-1 rounded-full text-[8px] font-black uppercase tracking-widest text-white border border-white/10 ${item.type === 'juegos' ? 'bg-orange-500/80' : 'bg-white/20'}`}>
                      {item.type === 'juegos' ? 'Juego' : item.type}
                    </div>
                    {item.type === 'juegos' && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center shadow-lg text-white">
                          <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h4 className="font-bold text-slate-900 mb-2 line-clamp-1 group-hover:text-sky-600 transition-colors text-sm" title={item.title}>
                      {item.title}
                    </h4>
                    <p className="text-slate-400 text-xs mb-4 line-clamp-3 font-light leading-relaxed flex-1">
                      {typeof item.description === 'string' 
                        ? item.description.replace(/<[^>]*>?/gm, '').substring(0, 120) + '...' 
                        : 'Sin descripción disponible.'}
                    </p>
                    <div className="flex items-center gap-2 text-sky-600 font-black text-[10px] uppercase tracking-widest mt-auto">
                      <span>
                        {item.type === 'juegos' ? 'Jugar Online' : item.type === 'audio' ? 'Escuchar' : 'Ver Archivo'}
                      </span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-16 md:py-20 text-slate-400">
                <p>No se encontraron resultados. Intenta con otra búsqueda.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {selectedItem && (
        <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col animate-fade-in">
          <div className="p-4 bg-slate-900 border-b border-white/10 flex justify-between items-center shadow-xl">
            <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center p-2 shrink-0 ${selectedItem.type === 'juegos' ? 'bg-orange-500' : 'bg-sky-600'}`}>
                 <span className="text-xl">{selectedItem.type === 'juegos' ? '🕹️' : '📂'}</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-white font-bold block truncate text-sm sm:text-base">{selectedItem.title}</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  {selectedItem.type === 'juegos' ? 'Emulador DOSBox' : 'Visor de Contenido'}
                </span>
              </div>
            </div>
            <button 
              onClick={() => setSelectedItem(null)} 
              className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-white/10 hover:bg-red-600 text-white rounded-lg transition-all shrink-0"
            >
              <span className="text-xs font-bold uppercase hidden md:inline">Cerrar</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
          <div className="flex-1 bg-black relative flex items-center justify-center">
            <iframe 
              src={`https://archive.org/embed/${selectedItem.iaId}`} 
              className="w-full h-full border-none shadow-2xl" 
              frameBorder="0" 
              allowFullScreen
              title="Archive Player"
            />
          </div>
        </div>
      )}
    </section>
  );
};