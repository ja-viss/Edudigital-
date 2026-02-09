
import { Course, Video } from './types';

export const COLORS = {
  primary: '#0ea5e9',
  secondary: '#38bdf8',
  accent: '#f43f5e',
  white: '#FFFFFF',
  dark: '#0f172a',
  lightBlue: '#f0f9ff',
  ai: '#8b5cf6',
  robotics: '#ec4899',
  cooking: '#f59e0b',
  admin: '#10b981',
};

export const INCES_COURSES: Course[] = [
  // TECNOLOGÍA Y DESARROLLO
  { id: 'i1', title: 'Desarrollo Web Avanzado', provider: 'INCES', description: 'Creación de apps web con PHP, MySQL y frameworks.', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800', url: 'https://campus.inces.edu.ve/', category: 'Tecnología' },
  { id: 'i2', title: 'Seguridad Informática', provider: 'INCES', description: 'Protección de redes y sistemas contra amenazas modernas.', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800', url: 'https://campus.inces.edu.ve/', category: 'Tecnología' },
  { id: 'i3', title: 'Introducción a Cloud Computing', provider: 'INCES', description: 'Fundamentos de servicios en la nube (AWS, Azure, GCP).', image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800', url: 'https://campus.inces.edu.ve/', category: 'Tecnología' },
  { id: 'i4', title: 'Edición de Páginas Web', provider: 'INCES', description: 'Maquetación y diseño de sitios web estáticos y blogs.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800', url: 'https://campus.inces.edu.ve/', category: 'Tecnología' },
  
  // AUDIOVISUAL Y COMUNICACIÓN
  { id: 'i5', title: 'Manejo de Cámaras', provider: 'INCES', description: 'Operación profesional de equipos de grabación y fotografía.', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800', url: 'https://campus.inces.edu.ve/', category: 'Comunicación' },
  { id: 'i6', title: 'Guión Audiovisual', provider: 'INCES', description: 'Escritura creativa para cine, TV y medios digitales.', image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800', url: 'https://campus.inces.edu.ve/', category: 'Comunicación' },
  
  // GESTIÓN Y ADMINISTRACIÓN
  { id: 'i10', title: 'Plan de Negocio', provider: 'INCES', description: 'Creación de propuestas de emprendimientos exitosos.', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800', url: 'https://campus.inces.edu.ve/', category: 'Gestión' },
  { id: 'i11', title: 'Administración de la PyME', provider: 'INCES', description: 'Fundamentos de gestión para pequeñas y medianas empresas.', image: 'https://images.unsplash.com/photo-1554224155-1696413565d3?w=800', url: 'https://campus.inces.edu.ve/', category: 'Gestión' },
];

export const YOUTUBE_CHANNELS = [
  {
    category: 'Ofimática Avanzada',
    items: [
      { id: 'yo1', title: 'Excel: de Básico a Experto', url: 'https://www.youtube.com/embed/videoseries?list=PL9fKz8L6G05S4T-YdG8UqY7A_pS7lGv6Y', image: 'https://images.unsplash.com/photo-1586281380349-631531a744c2?w=800', desc: 'Domina fórmulas, tablas dinámicas y macros.' },
      { id: 'yo2', title: 'Productividad con Office 365', url: 'https://www.youtube.com/embed/videoseries?list=PL9fKz8L6G05Te-r9qK27O6_Y3V2S-Y_vM', image: 'https://images.unsplash.com/photo-1512428559083-a401c33c466b?w=800', desc: 'Mejora tu flujo de trabajo en Word y PowerPoint.' }
    ]
  },
  {
    category: 'Finanzas & Economía',
    items: [
      { id: 'yf1', title: 'Finanzas para no Financieros', url: 'https://www.youtube.com/embed/videoseries?list=PL_XqN92UfLq3_M_NTo-D9R6-gR0vYv_Mh', image: 'https://images.unsplash.com/photo-1579621970795-87f967b16c8d?w=800', desc: 'Aprende a gestionar presupuestos y ahorros.' },
      { id: 'yf2', title: 'Principios de Economía Moderna', url: 'https://www.youtube.com/embed/videoseries?list=PL3oW2tjiCw4S0r7q6g-5N_89L_6Y8u3rR', image: 'https://images.unsplash.com/photo-1611974714158-f88c1465afad?w=800', desc: 'Entiende cómo funciona el mercado global.' }
    ]
  },
  {
    category: 'Cripto & Web3',
    items: [
      { id: 'yc1', title: 'Ecosistema Cripto 2025', url: 'https://www.youtube.com/embed/videoseries?list=PLZ87mO5FqO9V9m5Q7Q-L9n6Wq9C_qY-tB', image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800', desc: 'Bitcoin, Ethereum y el futuro de las finanzas.' },
      { id: 'yc2', title: 'Desarrollo en Blockchain', url: 'https://www.youtube.com/embed/videoseries?list=PLuEBeYyS_1f8L9S_yC8v0j0D9pM7G-O8N', image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800', desc: 'Crea tus primeros Smart Contracts.' }
    ]
  },
  {
    category: 'Tecnología & IA',
    items: [
      { id: 'y1', title: 'Fundamentos de IA', url: 'https://www.youtube.com/embed/videoseries?list=PLZ87mO5FqO9XUe4L00f7XN8W-F_0v0wE4', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800', desc: 'Aprende qué es y cómo usar la inteligencia artificial.' },
      { id: 'y2', title: 'Electrónica y Robótica', url: 'https://www.youtube.com/embed/videoseries?list=PLfT8L0_rAnUfF7r3lVscW4SshO0t6eO6f', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800', desc: 'Construye y programa tus propios sistemas.' }
    ]
  }
];
