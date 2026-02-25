
import { Video } from '../types';

const API_KEY = 'AIzaSyDygRMPt04-u25wdosdVXlYnUs97bBi6nk';
const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

export const fetchVenezuelanVideos = async (query: string, maxResults: number = 12, isMovie: boolean = false): Promise<Video[]> => {
  try {
    // Try to fetch from local data first
    const response = await fetch('/data-youtube.json');
    if (response.ok) {
      const videos = await response.json();
      return videos;
    }
  } catch (error) {
    console.warn('Could not fetch local YouTube data, falling back to API');
  }

  try {
    const excludeTerms = [
      '-politica', '-chavez', '-maduro', '-gobierno', '-crisis', '-protestas',
      '-elecciones', '-guaido', '-oposicion', '-noticias', '-violencia'
    ].join(' ');

    const cleanQuery = `${query} ${excludeTerms}`;
    const durationParam = isMovie ? '&videoDuration=medium' : '';

    const apiResponse = await fetch(
      `${BASE_URL}?part=snippet&q=${encodeURIComponent(cleanQuery)}&maxResults=${maxResults}&type=video&relevanceLanguage=es&regionCode=VE${durationParam}&key=${API_KEY}`
    );

    if (!apiResponse.ok) {
        const errorData = await apiResponse.json();
        console.error('YouTube API Error Details:', errorData);
        throw new Error('YouTube API Error');
    }

    const data = await apiResponse.json();

    if (!data.items || data.items.length === 0) return [];

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
