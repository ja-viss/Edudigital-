
export interface Book {
  id?: string | number;
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_url?: string;
  cover_i?: number;
  ia?: string[];
  language?: string[];
  ia_id?: string;
  gutenberg_url?: string;
  source?: 'Gutenberg' | 'Archive.org';
}

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  platform: 'YouTube' | 'Archive.org' | 'Vimeo';
  url: string;
  duration?: string;
  category: string;
}

export interface Course {
  id: string;
  title: string;
  provider: string;
  description: string;
  image: string;
  url: string;
  category: string;
}

// Estructura de Operación Dinámica para el Dashboard
export interface ManagementPayload {
  operacion: 'INSERT' | 'UPDATE';
  modulo: 'Cursos' | 'Cine' | 'Libros' | 'Musica';
  payload: {
    id: string;
    metadata: {
      titulo: string;
      categoria_principal: string;
      sub_etiqueta: string;
      duracion_o_extension: string;
    };
    recursos: {
      url_portada: string;
      enlaces: string[];
    };
  };
}

export interface ResourceEntry {
  id: string;
  title: string;
  category: string;
  duration: string;
  imageUrl: string;
  accessLink: string;
  type: 'Educación' | 'Multimedia';
  subType: string;
}

export interface ArchiveItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  type: 'software' | 'audio' | 'image' | 'informatica';
  iaId: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  url: string;
  category: 'Venezuela' | 'Tecnología';
  date: string;
  image?: string;
}

export enum Section {
  Home = 'home',
  Library = 'library',
  Cinema = 'cinema',
  History = 'history',
  Courses = 'courses',
  Archivos = 'archivos',
  IA = 'ia',
  News = 'news',
  Management = 'management'
}
