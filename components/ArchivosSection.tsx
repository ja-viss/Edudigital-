import React, { useState, useEffect, useCallback } from 'react';
import { ArchiveItem } from '../types';

export const ArchivosSection: React.FC = () => {
  // Configuración de las pestañas (Videojuegos está oculto pero soportado lógicamente)
  const tabs = [
    { id: 'informatica', label: 'Informática', icon: '💻' },
    { id: 'software', label: 'Programas', icon: '💾' },
    { id: 'audio', label: 'Audioteca', icon: '🎧' },
  ];

  // Estado
  const [activeTab, setActiveTab] = useState<string>('informatica');
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState<ArchiveItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<ArchiveItem | null>(null);

  // Función principal de búsqueda y carga de datos
  const fetchFromArchive = useCallback(async (query: string, tab: string) => {
    setLoading(true);

    try {
      // 1. DEFINIR FILTROS BASE
      let baseFilter = '';
      
      switch (tab) {
        case 'informatica':
          // ISOs y Sistemas Operativos
          baseFilter = 'mediatype:(software) AND (format:ISO OR subject:operating_system OR subject:windows OR subject:linux)';
          break;
        case 'software':
          // AQUÍ ESTÁ EL TRUCO:
          // En la pestaña "Programas", permitimos buscar TODO tipo de software, INCLUYENDO juegos.
          // Quitamos el filtro "NOT collection" para que aparezcan juegos si se buscan.
          baseFilter = 'mediatype:(software)';
          break;
        case 'audio':
          baseFilter = 'mediatype:(audio)';
          break;
        default:
          baseFilter = 'mediatype:(software)';
      }

      // 2. CONSTRUIR LA QUERY
      const queryPart = query.trim() 
        ? `q=(${encodeURIComponent(query)}) AND ${baseFilter}` 
        : `q=${baseFilter}`;

      // 3. PARÁMETROS ADICIONALES
      // Solicitamos el campo 'collection' para poder detectar si es un juego
      const params = `&sort[]=downloads+desc&rows=16&page=1&output=json&fl[]=identifier&fl[]=title&fl[]=description&fl[]=mediatype&fl[]=collection`;
      
      const url = `https://archive.org/advancedsearch.php?${queryPart}${params}`;

      // 4. PETICIÓN
      const response = await fetch(url);
      const data = await response.json();
      
      // 5. MAPEO DE RESULTADOS
      if (data.response && data.response.docs) {
        const results: ArchiveItem[] = data.response.docs.map((doc: any) => {
          // DETECCIÓN AUTOMÁTICA DE JUEGOS
          // Si el item pertenece a la colección de juegos MS-DOS, lo marcamos como 'juegos'
          const collections = Array.isArray(doc.collection) ? doc.collection : [doc.collection];
          const isGame = collections.includes('software_library_msdos_games');

          return {
            id: doc.identifier,
            title: doc.title || 'Sin Título',
            description: Array.isArray(doc.description) 
              ? doc.description[0] 
              : (doc.description || 'Archivo histórico preservado en Internet Archive.'),
            thumbnail: `https://archive.org/services/img/${doc.identifier}`,
            // Si es juego, forzamos el tipo 'juegos', si no, usamos el tab actual
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

  // EFECTO: Carga inicial y cambio de pestañas
  useEffect(() => {
    setSearchQuery('');
    fetchFromArchive('', activeTab);
  }, [activeTab, fetchFromArchive]);

  // Manejador del formulario de búsqueda
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchFromArchive(searchQuery, activeTab);
  };

  // Manejador de clics en las tarjetas
  const handleItemClick = (item: ArchiveItem) => {
    // LÓGICA DE APERTURA INTELIGENTE:
    // 1. Juegos -> Modal con emulador
    // 2. Audio -> Modal con reproductor
    // 3. Informática/Software general -> Nueva pestaña para descarga
    if (item.type === 'juegos' || item.type === 'audio') {
      setSelectedItem(item);
    } else {
      window.open(`https://archive.org/details/${item.iaId}`, '_blank');
    }
  };

  return (
    <section className="py-32 px-6 md:px-12 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 reveal active">
          <div className="inline-block py-1 px-4 bg-sky-100 text-sky-600 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            Conexión en Tiempo Real
          </div>
          <h2 className="text-5xl md:text-7xl font-brand text-slate-900 mb-8 tracking-tighter">
            Archivos <span className="text-sky-500 italic">Universales</span>
          </h2>
          <p className="text-slate-500 max-w-3xl mx-auto text-xl font-light">
            Explora millones de recursos preservados digitalmente. 
            <span className="block mt-2 text-sm font-bold text-sky-600">
              Mostrando los archivos más populares de Internet Archive.
            </span>
          </p>
        </div>

        {/* BARRA DE BÚSQUEDA */}
        <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto mb-16 reveal active">
          <div className="flex gap-2 p-2 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm focus-within:shadow-xl focus-within:border-sky-200 transition-all">
            <input 
              type="text" 
              placeholder={`Buscar en ${tabs.find(t => t.id === activeTab)?.label} (ej: Windows, Doom, Música)...`}
              className="flex-1 bg-transparent px-6 py-3 outline-none text-slate-800 placeholder:text-slate-400 font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="submit"
              className="bg-sky-600 hover:bg-sky-700 text-white px-8 py-3 rounded-xl font-bold transition-all disabled:opacity-50 flex items-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Buscar</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                </>
              )}
            </button>
          </div>
        </form>

        {/* TABS DE NAVEGACIÓN */}
        <div className="flex justify-center gap-4 mb-16 overflow-x-auto pb-4 no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold transition-all border ${
                activeTab === tab.id 
                  ? 'bg-sky-600 text-white border-sky-600 shadow-xl scale-105' 
                  : 'bg-slate-50 text-slate-600 border-slate-100 hover:bg-white hover:border-sky-200'
              }`}
            >
              <span>{tab.icon}</span>
              <span className="whitespace-nowrap">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* GRILLA DE RESULTADOS */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden h-[380px] shadow-sm animate-pulse">
                <div className="h-48 bg-slate-100"></div>
                <div className="p-8 space-y-4">
                  <div className="h-4 bg-slate-100 rounded-full w-3/4" />
                  <div className="h-3 bg-slate-50 rounded-full w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 reveal active animate-in fade-in duration-700">
            {items.length > 0 ? (
              items.map((item) => (
                <div 
                  key={item.id} 
                  className="group bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden hover-lift shadow-sm hover:shadow-2xl transition-all cursor-pointer flex flex-col"
                  onClick={() => handleItemClick(item)}
                >
                  <div className="h-48 relative overflow-hidden bg-slate-100 shrink-0">
                    <img 
                      src={item.thumbnail} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100" 
                      alt={item.title}
                      onError={(e) => { (e.target as HTMLImageElement).src = 'https://archive.org/images/notfound.png'; }} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                    
                    {/* Etiqueta Tipo (Muestra 'JUEGO' si fue detectado como tal) */}
                    <div className={`absolute top-4 right-4 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-white border border-white/10 ${item.type === 'juegos' ? 'bg-orange-500/80' : 'bg-white/20'}`}>
                      {item.type === 'juegos' ? 'Juego' : item.type}
                    </div>

                    {/* Icono de Play solo si es juego */}
                    {item.type === 'juegos' && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center shadow-lg text-white">
                          <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <h4 className="font-bold text-slate-900 mb-2 line-clamp-1 group-hover:text-sky-600 transition-colors" title={item.title}>
                      {item.title}
                    </h4>
                    <p className="text-slate-400 text-xs mb-6 line-clamp-3 font-light leading-relaxed flex-1">
                      {typeof item.description === 'string' 
                        ? item.description.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...' 
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
              <div className="col-span-full text-center py-20 text-slate-400">
                <p>No se encontraron resultados para esta categoría. Intenta con otra búsqueda.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* MODAL DE VISUALIZACIÓN / JUEGO */}
      {selectedItem && (
        <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col animate-fade-in">
          <div className="p-4 bg-slate-900 border-b border-white/10 flex justify-between items-center shadow-xl">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center p-2 ${selectedItem.type === 'juegos' ? 'bg-orange-500' : 'bg-sky-600'}`}>
                 {selectedItem.type === 'juegos' ? <span className="text-xl">🕹️</span> : <span className="text-xl">📂</span>}
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold block truncate max-w-[200px] md:max-w-lg">{selectedItem.title}</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  {selectedItem.type === 'juegos' ? 'Emulador DOSBox (Internet Archive)' : 'Visor de Contenido'}
                </span>
              </div>
            </div>
            <button 
              onClick={() => setSelectedItem(null)} 
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-red-600 text-white rounded-lg transition-all"
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