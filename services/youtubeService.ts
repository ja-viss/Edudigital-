
import { Video } from '../types';

/**
 * API Key de YouTube Data API v3.
 * @constant
 */
const API_KEY = 'AIzaSyDygRMPt04-u25wdosdVXlYnUs97bBi6nk';
const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

/**
 * Obtiene videos de YouTube optimizados para el contexto venezolano y educativo.
 * 
 * @param {string} query - El término de búsqueda.
 * @param {number} maxResults - Cantidad de resultados deseados (default 12).
 * @param {boolean} isMovie - Si es true, prioriza videos de duración media/larga (documentales).
 * @returns {Promise<Video[]>} Promesa con un arreglo de objetos Video formateados.
 */
export const fetchVenezuelanVideos = async (query: string, maxResults: number = 12, isMovie: boolean = false): Promise<Video[]> => {
  try {
    /**
     * @description Términos de exclusión para evitar contenido no educativo, político o violento.
     * Estos términos se añaden con un prefijo '-' para que YouTube los ignore.
     */
    const excludeTerms = [
      '-politica', '-chavez', '-maduro', '-gobierno', '-crisis', '-protestas', 
      '-elecciones', '-guaido', '-oposicion', '-noticias', '-violencia'
    ].join(' ');

    const cleanQuery = `${query} ${excludeTerms}`;

    /**
     * @description Configuración de duración:
     * 'medium' busca videos entre 4 y 20 minutos.
     * 'long' (opcional) buscaría más de 20 minutos.
     */
    const durationParam = isMovie ? '&videoDuration=medium' : '';

    const response = await fetch(
      `${BASE_URL}?part=snippet&q=${encodeURIComponent(cleanQuery)}&maxResults=${maxResults}&type=video&relevanceLanguage=es&regionCode=VE${durationParam}&key=${API_KEY}`
    );
    
    if (!response.ok) {
        const errorData = await response.json();
        console.error('YouTube API Error Details:', errorData);
        throw new Error('YouTube API Error');
    }
    
    const data = await response.json();
    
    if (!data.items || data.items.length === 0) return [];

    /**
     * Mapeo de la respuesta cruda de la API al contrato de datos de nuestra aplicación.
     */
    return data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.high.url,
      description: item.snippet.description,
      platform: 'YouTube',
      url: `https://www.youtube.com/embed/${item.id.videoId}`,
      category: isMovie ? 'Patrimonio Documental' : 'Formación Digital'
    }));
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return [];
  }
};
