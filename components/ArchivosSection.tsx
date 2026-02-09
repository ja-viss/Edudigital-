
import React, { useState, useEffect } from 'react';
import { ArchiveItem } from '../types';

const INITIAL_DATA: Record<string, ArchiveItem[]> = {
  informatica: [
    { id: 'inf-1', title: 'Windows XP SP3 ISO', description: 'Imagen ISO original del sistema operativo más icónico de Microsoft.', thumbnail: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=400', type: 'informatica', iaId: 'windows-xp-professional-sp3-iso-image-genuine' },
    { id: 'inf-2', title: 'Hiren\'s BootCD 15.2', description: 'Herramienta definitiva de diagnóstico y reparación de computadoras.', thumbnail: 'https://images.unsplash.com/photo-1588505284419-3ce392ec5215?w=400', type: 'informatica', iaId: 'hirens-boot-cd-15.2' },
    { id: 'inf-3', title: 'Colección de Drivers Universales', description: 'Paquete histórico de controladores para hardware legacy.', thumbnail: 'https://images.unsplash.com/photo-1591405351990-4726e331f141?w=400', type: 'informatica', iaId: 'drivers-collection' },
    { id: 'inf-4', title: 'Linux Kernel 0.01 Source', description: 'El código fuente original que inició la revolución del software libre.', thumbnail: 'https://images.unsplash.com/photo-1629654297245-6346d03f0970?w=400', type: 'informatica', iaId: 'linux-0.01' },
    { id: 'inf-5', title: 'Norton Ghost 2003', description: 'Utilidad clásica para clonación de discos duros y respaldos.', thumbnail: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400', type: 'informatica', iaId: 'norton-ghost-2003' },
    { id: 'inf-6', title: 'Ultimate Boot CD', description: 'Consolidación de herramientas de testeo para CPU, RAM y Discos.', thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400', type: 'informatica', iaId: 'ubcd538' },
    { id: 'inf-7', title: 'MS-DOS 6.22 ISO', description: 'El sistema operativo de línea de comandos base para la era PC.', thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400', type: 'informatica', iaId: 'msdos622_iso' },
    { id: 'inf-8', title: 'Winamp Full Collection', description: 'Reproductores y skins del software que cambió la música digital.', thumbnail: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=400', type: 'informatica', iaId: 'winamp_skins' },
    { id: 'inf-9', title: 'Debian 1.1 Buzz', description: 'Una de las primeras distribuciones estables de la comunidad Debian.', thumbnail: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400', type: 'informatica', iaId: 'debian-1.1' },
    { id: 'inf-10', title: 'Netscape Navigator 4.0', description: 'El navegador que dominó la web en los años 90.', thumbnail: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400', type: 'informatica', iaId: 'netscape_4.0' },
    { id: 'inf-11', title: 'AutoCAD 10 para DOS', description: 'Software de diseño industrial pionero en la computación personal.', thumbnail: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400', type: 'informatica', iaId: 'autocad_10' },
    { id: 'inf-12', title: 'Office 97 Pro', description: 'Suite ofimática clásica que definió el trabajo en oficina.', thumbnail: 'https://images.unsplash.com/photo-1512428559083-a401c33c466b?w=400', type: 'informatica', iaId: 'office-97-pro' }
  ],
  software: ([
    { id: 's-1', title: 'Adobe Photoshop 1.0', description: 'La primera versión del editor de imágenes más famoso del mundo.', thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400', type: 'software', iaId: 'photoshop_1_0_1_mac' },
    { id: 's-2', title: 'Windows 3.11 for Workgroups', description: 'Versión legendaria con soporte nativo para redes.', thumbnail: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=400', type: 'software', iaId: 'win311' },
    { id: 's-3', title: 'CorelDRAW 3.0', description: 'Herramienta de diseño vectorial clásica de los 90.', thumbnail: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400', type: 'software', iaId: 'coreldraw_3.0' },
    { id: 's-4', title: 'Quake Full Shareware', description: 'El motor gráfico que revolucionó los videojuegos 3D.', thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400', type: 'software', iaId: 'QuakeShareware' }
  ] as ArchiveItem[]).concat(Array.from({ length: 8 }, (_, i) => ({
    id: `s-extra-${i}`,
    title: `Software Legacy Vol ${i+1}`,
    description: 'Recurso histórico de computación clásica.',
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400',
    type: 'software' as const,
    iaId: 'msdos_Pac-Man_1981'
  }))),
  audio: ([
    { id: 'a-1', title: 'Discurso de Angostura', description: 'Audio histórico con la proclama del Libertador Simón Bolívar.', thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400', type: 'audio', iaId: 'Discurso_de_Angostura' },
    { id: 'a-2', title: 'Beethoven: Sinfonía 9', description: 'Grabación clásica de la Novena Sinfonía dirigida por Karajan.', thumbnail: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400', type: 'audio', iaId: '78_the-blue-danube-waltz' },
    { id: 'a-3', title: 'Apollo 11 Landing Audio', description: 'Comunicaciones originales del alunizaje en 1969.', thumbnail: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400', type: 'audio', iaId: 'Apollo11Audio' }
  ] as ArchiveItem[]).concat(Array.from({ length: 9 }, (_, i) => ({
    id: `a-extra-${i}`,
    title: `Archivo Sonoro Histórico ${i+1}`,
    description: 'Grabación de dominio público preservada.',
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400',
    type: 'audio' as const,
    iaId: 'lp_the-nine-symphonies-of-beethoven_ludwig-van-beethoven'
  }))),
  image: ([
    { id: 'im-1', title: 'Cartografía de Venezuela 1884', description: 'Mapas detallados de la geografía nacional del siglo XIX.', thumbnail: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400', type: 'image', iaId: 'venezuelancartography' },
    { id: 'im-2', title: 'Caracas Antigua 1940', description: 'Colección fotográfica de la capital venezolana antes de la modernización.', thumbnail: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400', type: 'image', iaId: 'Caracas-Antigua' }
  ] as ArchiveItem[]).concat(Array.from({ length: 10 }, (_, i) => ({
    id: `im-extra-${i}`,
    title: `Galería Histórica Vol ${i+1}`,
    description: 'Documento gráfico de alta resolución.',
    thumbnail: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400',
    type: 'image' as const,
    iaId: 'venezuelancartography'
  })))
};

export const ArchivosSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<keyof typeof INITIAL_DATA>('informatica');
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState<ArchiveItem[]>(INITIAL_DATA['informatica']);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ArchiveItem | null>(null);

  useEffect(() => {
    setItems(INITIAL_DATA[activeTab]);
  }, [activeTab]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setItems(INITIAL_DATA[activeTab]);
      return;
    }

    setLoading(true);
    try {
      const mediaType = activeTab === 'audio' ? 'audio' : activeTab === 'image' ? 'image' : 'software';
      const response = await fetch(`https://archive.org/advancedsearch.php?q=title:(${searchQuery}) AND mediatype:(${mediaType})&output=json&rows=12`);
      const data = await response.json();
      
      const results: ArchiveItem[] = data.response.docs.map((doc: any) => ({
        id: doc.identifier,
        title: doc.title || 'Sin Título',
        description: doc.description ? (typeof doc.description === 'string' ? doc.description.substring(0, 100) : 'Recurso histórico') : 'Recurso histórico',
        thumbnail: `https://archive.org/services/img/${doc.identifier}`,
        type: activeTab,
        iaId: doc.identifier
      }));

      setItems(results);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleItemClick = (item: ArchiveItem) => {
    if (item.type === 'informatica') {
      // Redirección directa para archivos de informática
      window.open(`https://archive.org/details/${item.iaId}`, '_blank');
    } else {
      // Visor interno para el resto
      setSelectedItem(item);
    }
  };

  const tabs = [
    { id: 'informatica', label: 'Informática', icon: '💻' },
    { id: 'software', label: 'Programas', icon: '💾' },
    { id: 'audio', label: 'Audioteca', icon: '🎧' },
    { id: 'image', label: 'Galería', icon: '🖼️' },
  ];

  return (
    <section className="py-32 px-6 md:px-12 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 reveal active">
          <div className="inline-block py-1 px-4 bg-sky-100 text-sky-600 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            Repositorio de Conocimiento Libre
          </div>
          <h2 className="text-5xl md:text-7xl font-brand text-slate-900 mb-8 tracking-tighter">Archivos <span className="text-sky-500 italic">Estratégicos</span></h2>
          <p className="text-slate-500 max-w-3xl mx-auto text-xl font-light">Acceso directo a software, sistemas, audios y documentos gráficos preservados para la formación tecnológica e histórica.</p>
        </div>

        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-16 reveal active">
          <div className="flex gap-2 p-2 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm focus-within:shadow-xl focus-within:border-sky-200 transition-all">
            <input 
              type="text" 
              placeholder={`Buscar en ${tabs.find(t => t.id === activeTab)?.label}...`}
              className="flex-1 bg-transparent px-6 py-3 outline-none text-slate-800 placeholder:text-slate-400 font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="submit"
              className="bg-sky-600 hover:bg-sky-700 text-white px-8 py-3 rounded-xl font-bold transition-all disabled:opacity-50"
              disabled={loading}
            >
              {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Buscar'}
            </button>
          </div>
        </form>

        <div className="flex justify-center gap-4 mb-16 overflow-x-auto pb-4 no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                setSearchQuery('');
              }}
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold transition-all border ${
                activeTab === tab.id ? 'bg-sky-600 text-white border-sky-600 shadow-xl' : 'bg-slate-50 text-slate-600 border-slate-100 hover:bg-white hover:border-sky-200'
              }`}
            >
              <span>{tab.icon}</span>
              <span className="whitespace-nowrap">{tab.label}</span>
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden h-[380px] shadow-sm">
                <div className="h-48 bg-slate-100 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] animate-[shimmer_2s_infinite]" />
                </div>
                <div className="p-8 space-y-4">
                  <div className="h-4 bg-slate-100 rounded-full w-3/4" />
                  <div className="h-3 bg-slate-50 rounded-full w-full" />
                  <div className="h-2 bg-slate-50 rounded-full w-1/2 mt-6" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 reveal active">
            {items.map((item) => (
              <div 
                key={item.id} 
                className="group bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden hover-lift shadow-sm hover:shadow-2xl transition-all cursor-pointer"
                onClick={() => handleItemClick(item)}
              >
                <div className="h-48 relative overflow-hidden bg-slate-100">
                  <img src={item.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" alt={item.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-white">
                    {item.type}
                  </div>
                </div>
                <div className="p-8">
                  <h4 className="font-bold text-slate-900 mb-2 line-clamp-1 group-hover:text-sky-600 transition-colors">{item.title}</h4>
                  <p className="text-slate-400 text-xs mb-6 line-clamp-2 font-light leading-relaxed">{item.description}</p>
                  <div className="flex items-center gap-2 text-sky-600 font-black text-[10px] uppercase tracking-widest">
                    <span>{item.type === 'informatica' ? 'Descargar en IA' : 'Visualizar'}</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedItem && (
        <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col animate-fade-in">
          <div className="p-6 bg-slate-900 border-b border-white/10 flex justify-between items-center">
            <div className="flex items-center gap-6">
              <div className="w-10 h-10 bg-sky-600 rounded-xl flex items-center justify-center p-2">
                 <svg className="w-full h-full text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              </div>
              <div>
                <span className="text-white font-bold block truncate max-w-[200px] md:max-w-lg">{selectedItem.title}</span>
                <span className="text-[10px] font-black text-sky-500 uppercase tracking-widest">Visor de Archivo Histórico</span>
              </div>
            </div>
            <button 
              onClick={() => setSelectedItem(null)} 
              className="group flex items-center gap-2 px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all border border-white/5"
            >
              <span className="text-xs font-bold uppercase tracking-widest group-hover:text-sky-400">Cerrar Visor</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
          <div className="flex-1 bg-black overflow-hidden relative">
            <iframe 
              src={`https://archive.org/embed/${selectedItem.iaId}`} 
              className="w-full h-full border-none shadow-2xl" 
              frameBorder="0" 
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
};
