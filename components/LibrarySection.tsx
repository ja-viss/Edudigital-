
import React, { useState } from 'react';
import { Book, ManagementPayload } from '../types';
import { searchBooks, getBookCoverUrl } from '../services/bookService';

interface LibraryProps {
  userBooks: ManagementPayload[];
}

export const LibrarySection: React.FC<LibraryProps> = ({ userBooks }) => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedBookUrl, setSelectedBookUrl] = useState<string | null>(null);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    const results = await searchBooks(query);
    setBooks(results);
    setLoading(false);
  };

  return (
    <section className="py-32 px-6 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-5xl md:text-7xl font-brand text-slate-900 tracking-tighter">Saber <span className="text-sky-600 italic">Libre</span></h2>
          <p className="text-slate-500 mt-4 max-w-2xl mx-auto text-xl font-light">Explora el inventario maestro de textos académicos e históricos.</p>
        </div>

        {userBooks.length > 0 && (
          <div className="mb-24">
             <h3 className="text-xl font-black uppercase tracking-widest text-sky-600 mb-8 flex items-center gap-3">
               <span className="w-8 h-px bg-sky-600"></span> Colección Especial
             </h3>
             <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
                {userBooks.map((item) => (
                  <div key={item.payload.id} className="group cursor-pointer" onClick={() => setSelectedBookUrl(item.payload.recursos.enlaces[0])}>
                    <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg group-hover:-translate-y-2 transition-all">
                      <img src={item.payload.recursos.url_portada} className="w-full h-full object-cover" alt={item.payload.metadata.titulo} />
                    </div>
                    <h4 className="mt-3 text-xs font-bold text-slate-800 line-clamp-2">{item.payload.metadata.titulo}</h4>
                  </div>
                ))}
             </div>
          </div>
        )}

        <form onSubmit={handleSearch} className="max-w-3xl mx-auto mb-20">
          <div className="flex gap-2 p-2 bg-slate-50 rounded-3xl border border-slate-200 shadow-sm focus-within:shadow-xl transition-all">
            <input type="text" placeholder="Buscar en OpenLibrary..." className="flex-1 bg-transparent px-6 py-3 outline-none font-medium" value={query} onChange={(e) => setQuery(e.target.value)}/>
            <button type="submit" className="bg-sky-600 text-white px-10 py-3 rounded-2xl font-bold transition-all shadow-lg" disabled={loading}>Buscar</button>
          </div>
        </form>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {books.map((book) => (
            <div key={book.key} className="group cursor-pointer" onClick={() => setSelectedBookUrl(`https://archive.org/embed/${book.ia![0]}?ui=full&view=theater`)}>
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-sm group-hover:shadow-xl transition-all">
                <img src={getBookCoverUrl(book.cover_i)} alt={book.title} className="w-full h-full object-cover" />
              </div>
              <h3 className="mt-3 text-xs font-bold text-slate-800 line-clamp-2">{book.title}</h3>
            </div>
          ))}
        </div>
      </div>

      {selectedBookUrl && (
        <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col animate-fade-in">
          <div className="p-4 bg-slate-900 flex justify-between items-center">
            <span className="text-white text-sm font-bold">Lector Inmersivo EduDigital</span>
            <button onClick={() => setSelectedBookUrl(null)} className="px-6 py-2 bg-white/10 text-white rounded-xl hover:bg-red-500 transition-colors">Cerrar</button>
          </div>
          <iframe src={selectedBookUrl} className="flex-1 border-none" title="Reader" />
        </div>
      )}
    </section>
  );
};
