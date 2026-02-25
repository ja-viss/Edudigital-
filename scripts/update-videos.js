import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Replicate __dirname functionality in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_KEY = 'AIzaSyDygRMPt04-u25wdosdVXlYnUs97bBi6nk'; // Replace with environment variable in production
const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';
const OUTPUT_PATH = path.join(__dirname, '..', 'public', 'data-youtube.json');

const QUERIES_CONFIG = [
    // --- CINE ---
    { query: 'peliculas venezolanas completas', category: 'Cine', subcategory: 'Cine Nacional', isMovie: true, maxResults: 6 },
    { query: 'leyendas y mitos de venezuela', category: 'Cine', subcategory: 'Leyendas y Mitos', isMovie: false, maxResults: 6 },
    { query: 'paisajes de venezuela drone', category: 'Cine', subcategory: 'Paisajes de Venezuela', isMovie: false, maxResults: 6 },
    { query: 'fauna de venezuela documental', category: 'Cine', subcategory: 'Fauna Nacional', isMovie: true, maxResults: 6 },

    // --- HISTORIA ---
    { query: 'historia de venezuela documental', category: 'Historia', subcategory: 'Historia de Venezuela', isMovie: true, maxResults: 12 },

    // --- CURSOS ---
    { query: 'curso de inteligencia artificial gratis en español', category: 'Cursos', subcategory: 'Inteligencia Artificial', isMovie: false, maxResults: 5 },
    { query: 'curso de finanzas personales gratis', category: 'Cursos', subcategory: 'Finanzas', isMovie: false, maxResults: 5 },
    { query: 'curso de criptomonedas para principiantes', category: 'Cursos', subcategory: 'Cripto', isMovie: false, maxResults: 5 },
    { query: 'curso de administracion de empresas', category: 'Cursos', subcategory: 'Administración', isMovie: false, maxResults: 5 },
    { query: 'curso de excel completo gratis', category: 'Cursos', subcategory: 'Office', isMovie: false, maxResults: 5 },
];


const fetchVideos = async ({ query, category, subcategory, maxResults, isMovie }) => {
  try {
    const excludeTerms = [
      '-politica', '-chavez', '-maduro', '-gobierno', '-crisis', '-protestas',
      '-elecciones', '-guaido', '-oposicion', '-noticias', '-violencia'
    ].join(' ');

    const cleanQuery = `${query} ${excludeTerms}`;
    const durationParam = isMovie ? '&videoDuration=long' : ''; // Use 'long' for movies/documentals

    const response = await fetch(
      `${BASE_URL}?part=snippet&q=${encodeURIComponent(cleanQuery)}&maxResults=${maxResults}&type=video&relevanceLanguage=es&regionCode=VE${durationParam}&key=${API_KEY}`
    );

    if (!response.ok) {
        const errorData = await response.json();
        console.error('YouTube API Error Details:', errorData);
        throw new Error(`YouTube API Error for query: ${query}`);
    }

    const data = await response.json();

    if (!data.items || data.items.length === 0) return [];

    return data.items.map((item) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.high.url,
      description: item.snippet.description,
      platform: 'YouTube',
      url: `https://www.youtube.com/embed/${item.id.videoId}`,
      category: category,
      subcategory: subcategory
    }));
  } catch (error) {
    console.error(`Error fetching YouTube videos for query \"${query}\":`, error);
    return [];
  }
};

const updateVideoCache = async () => {
    console.log('Starting to fetch videos from YouTube API with new categories...');
    let allVideos = [];

    for (const config of QUERIES_CONFIG) {
        console.log(`Fetching videos for: \"${config.query}\"...`);
        const videos = await fetchVideos(config);
        allVideos = allVideos.concat(videos);
    }

    // Remove duplicates based on video ID
    const uniqueVideos = allVideos.filter((video, index, self) =>
        index === self.findIndex((v) => v.id === video.id)
    );

    console.log(`Fetched a total of ${uniqueVideos.length} unique videos.`);

    try {
        fs.writeFileSync(OUTPUT_PATH, JSON.stringify(uniqueVideos, null, 2));
        console.log(`Successfully wrote ${uniqueVideos.length} videos to ${OUTPUT_PATH}`);
    } catch (error) {
        console.error('Error writing video data to file:', error);
    }
};

updateVideoCache();
