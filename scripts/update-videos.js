const fs = require('fs');
const path = require('path');

// --- TU CONFIGURACIÓN EXACTA (Adaptada para Node.js) ---
const API_KEY = 'AIzaSyDygRMPt04-u25wdosdVXlYnUs97bBi6nk'; // Tu Key
const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

// Categorías que quieres buscar
const CATEGORIAS_A_BUSCAR = [
  { id: 'ia', query: 'Inteligencia Artificial curso completo español' },
  { id: 'trading', query: 'Trading y Mercados curso completo español' },
  { id: 'finanzas', query: 'Finanzas Personales curso completo español' },
  { id: 'programacion', query: 'Programación Web curso completo español' },
  { id: 'office', query: 'Microsoft Office curso completo español' }
];

// --- TU LÓGICA DE FILTRADO (Copiada de tu código) ---
const EXCLUDE_TERMS = [
  '-politica', '-chavez', '-maduro', '-gobierno', '-crisis', '-protestas', 
  '-elecciones', '-guaido', '-oposicion', '-noticias', '-violencia'
].join(' ');

async function fetchVenezuelanVideosNode(queryTerm) {
  try {
    const cleanQuery = `${queryTerm} ${EXCLUDE_TERMS}`;
    const maxResults = 3; // Traemos 3 por categoría como en tu diseño

    // Construcción de URL idéntica a tu código original
    const url = `${BASE_URL}?part=snippet&q=${encodeURIComponent(cleanQuery)}&maxResults=${maxResults}&type=video&relevanceLanguage=es&regionCode=VE&key=${API_KEY}`;

    console.log(`📡 Buscando: ${queryTerm}...`);
    
    // Nota: Node v18+ soporta fetch nativo. Si usas Node viejo, necesitarás 'node-fetch'
    const response = await fetch(url);
    
    if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ YouTube API Error:', errorData.error.message);
        return [];
    }
    
    const data = await response.json();
    
    if (!data.items || data.items.length === 0) return [];

    // Mapeo idéntico a tu interfaz Video
    return data.items.map((item) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.high.url,
      description: item.snippet.description,
      platform: 'YouTube',
      url: `https://www.youtube.com/embed/${item.id.videoId}`,
      category: 'Formación Digital' 
    }));

  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return [];
  }
}

async function generarJSON() {
  const finalData = {
    lastUpdate: new Date().toISOString(),
    categories: {}
  };

  // Iteramos por todas las categorías
  for (const cat of CATEGORIAS_A_BUSCAR) {
    const videos = await fetchVenezuelanVideosNode(cat.query);
    finalData.categories[cat.id] = videos;
  }

  // Guardamos el archivo en la carpeta PUBLIC para que React pueda leerlo
  // Asegúrate de que la carpeta 'public' exista
  const outputPath = path.join(__dirname, '..', 'public', 'data-youtube.json');
  
  fs.writeFileSync(outputPath, JSON.stringify(finalData, null, 2));
  console.log('✅ Archivo public/data-youtube.json generado exitosamente.');
}

// Ejecutar
generarJSON();