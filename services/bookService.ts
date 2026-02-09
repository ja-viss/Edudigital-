
import { Book } from '../types';

export const searchBooks = async (query: string, type: 'title' | 'author' = 'title'): Promise<Book[]> => {
  try {
    const param = type === 'title' ? 'title' : 'author';
    // We add fields=ia to get the archive.org identifier
    const response = await fetch(`https://openlibrary.org/search.json?${param}=${encodeURIComponent(query)}&limit=24&fields=key,title,author_name,first_publish_year,cover_i,language,ia`);
    if (!response.ok) throw new Error('Error al buscar libros');
    const data = await response.json();
    
    // Filter to prioritize books that actually have an Internet Archive identifier (readable online)
    return data.docs.map((doc: any) => ({
      key: doc.key,
      title: doc.title,
      author_name: doc.author_name,
      first_publish_year: doc.first_publish_year,
      cover_i: doc.cover_i,
      language: doc.language,
      ia: doc.ia
    })).filter((book: Book) => book.ia && book.ia.length > 0);
  } catch (error) {
    console.error('Book Search Error:', error);
    return [];
  }
};

export const getBookCoverUrl = (coverId?: number, size: 'S' | 'M' | 'L' = 'M') => {
  if (!coverId) return 'https://via.placeholder.com/400x600?text=Sin+Portada';
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
};
