import React from 'react';

interface Developer {
  name: string;
  role: string;
  avatar: string;
  bio: string;
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    dribbble?: string;
  };
  objectPosition?: string;
}

const developers: Developer[] = [
  {
    name: 'Leidy Suarez',
    role: 'Estratega UI/UX y Diseñadora Visual',
    avatar: '/img/developers/leidy.jpeg',
    bio: 'Responsable de traducir la visión del proyecto en una experiencia de usuario intuitiva y estéticamente agradable. Su enfoque en la usabilidad fue clave para hacer la plataforma accesible y atractiva.',
    social: { twitter: '#', linkedin: '#', github: '#' },
  },
  {
    name: 'Luilly Florez',
    role: 'Ingeniero de Adquisición de Datos',
    avatar: '/img/developers/luilly.jpeg',
    bio: 'Especialista en la extracción y automatización de la recolección de datos. Desarrolló los scripts de web scraping que nutren de contenido valioso a la plataforma de forma continua.',
    social: { twitter: '#', dribbble: '#' },
  },
  {
    name: 'Ricsabel Perez',
    role: 'Arquitecta de la Biblioteca Digital',
    avatar: '/img/developers/ricsabel.jpeg',
    bio: 'Diseñó y desarrolló la arquitectura de la información y la lógica funcional de la Biblioteca, asegurando una organización coherente y un acceso eficiente a los recursos literarios.',
    social: { twitter: '#', linkedin: '#', github: '#' },
  },
  {
    name: 'Daniel Becerra',
    role: 'Curador de Contenido y Patrimonio Digital',
    avatar: '/img/developers/becerra.jpeg',
    bio: 'Lideró la investigación y selección de contenido cultural y educativo venezolano, fortaleciendo la identidad nacional del proyecto y asegurando la relevancia del material disponible.',
    social: { twitter: '#', linkedin: '#', github: '#' },
  },
  {
    name: 'Joel Blanco',
    role: 'Especialista en Frontend y Responsive Design',
    avatar: 'https://i.pravatar.cc/150?img=6',
    bio: 'Garantizó que la experiencia de usuario fuera óptima en cualquier dispositivo. Su trabajo en la adaptabilidad de la interfaz fue crucial para la accesibilidad multiplataforma.',
    social: { twitter: '#', linkedin: '#', github: '#' },
  },
  {
    name: 'Ing. Javier Sayago',
    role: 'Director de Proyecto y Estrategia',
    avatar: '/img/developers/javier-sayago.png',
    bio: 'Orquestó el ciclo de vida completo del proyecto, desde la conceptualización hasta la entrega. Su gestión estratégica y liderazgo aseguraron el cumplimiento de los objetivos y la cohesión del equipo.',
    social: { twitter: '#', linkedin: '#', github: '#' },
    objectPosition: 'top',
  },
  {
    name: 'Vladimir Altuve',
    role: 'Ingeniero DevOps y Fiabilidad del Sitio (SRE)',
    avatar: '/img/vladimir.jpg',
    bio: 'Responsable de la infraestructura, el despliegue automatizado y la monitorización del sistema. Su enfoque en la fiabilidad y la integración continua garantiza la alta disponibilidad de la plataforma.',
    social: { twitter: '#', linkedin: '#', github: '#' },
  },
];

export const DevelopersSection: React.FC = () => {
  return (
    <section className="bg-slate-50 min-h-screen font-sans py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-brand text-slate-900 tracking-tighter">
            Equipo <span className="text-purple-600 italic">Creativo</span>
          </h2>
          <p className="text-slate-500 mt-4 max-w-2xl mx-auto text-xl font-light">
            Conoce a las mentes detrás de este proyecto.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
          {developers.map((dev, index) => (
            <div
              key={index}
              className="bg-white rounded-[2.5rem] shadow-lg border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group overflow-hidden text-center p-8"
            >
              <div className="relative inline-block mb-6">
                <img
                  src={dev.avatar}
                  alt={dev.name}
                  className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-white shadow-md group-hover:scale-110 transition-transform duration-700"
                  style={{ objectPosition: dev.objectPosition || 'center' }}
                />
                <span className="absolute bottom-2 right-2 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold ring-4 ring-white">
                  {dev.name.charAt(0)}
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-800 mb-1">{dev.name}</h3>
              <p className="text-purple-600 text-sm font-medium mb-4">{dev.role}</p>
              <p className="text-slate-500 text-sm mb-6">{dev.bio}</p>

              <div className="flex justify-center gap-4">
                {dev.social.twitter && (
                  <a href={dev.social.twitter} className="text-slate-400 hover:text-purple-600 transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.724 9.94 9.94 0 01-3.127 1.184 4.952 4.952 0 00-8.448 4.513A14.075 14.075 0 011.646 3.25a4.952 4.952 0 001.528 6.608 4.935 4.935 0 01-2.24-.616v.06a4.952 4.952 0 003.975 4.85-4.94 4.94 0 01-2.23.084 4.952 4.952 0 004.623 3.424A9.957 9.957 0 010 19.53a14.028 14.028 0 007.618 2.223c9.142 0 14.137-7.566 14.137-14.137 0-.215 0-.43-.015-.643A10.06 10.06 0 0024 4.59z"/></svg>
                  </a>
                )}
                {dev.social.linkedin && (
                  <a href={dev.social.linkedin} className="text-slate-400 hover:text-purple-600 transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.23 0H1.77C.79 0 0 .79 0 1.77v20.46C0 23.21.79 24 1.77 24h20.46c.98 0 1.77-.79 1.77-1.77V1.77C24 .79 23.21 0 22.23 0zM7.06 20.45H3.53V8.99h3.53v11.46zM5.3 7.43c-1.12 0-2.03-.91-2.03-2.03s.91-2.03 2.03-2.03 2.03.91 2.03 2.03-.91 2.03-2.03 2.03zm13.39 13.02h-3.52V14.7c0-1.37-.02-3.13-1.9-3.13-1.91 0-2.2 1.49-2.2 3.03v5.85H7.56V8.99h3.38v1.55h.05c.47-.89 1.62-1.83 3.33-1.83 3.56 0 4.22 2.34 4.22 5.39v6.35z"/></svg>
                  </a>
                )}
                {dev.social.github && (
                  <a href={dev.social.github} className="text-slate-400 hover:text-purple-600 transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.725-4.042-1.61-4.042-1.61-.546-1.385-1.333-1.755-1.333-1.755-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.235 1.84 1.235 1.07 1.83 2.805 1.305 3.49.998.108-.775.418-1.305.76-1.605-2.665-.3-5.465-1.33-5.465-5.93 0-1.31.465-2.38 1.235-3.22-.125-.3-.535-1.52.115-3.175 0 0 1.005-.32 3.3 1.23.955-.265 1.98-.4 3.005-.405 1.02.005 2.045.14 3.005.405 2.295-1.55 3.3-1.23 3.3-1.23.65 1.655.24 2.875.12 3.175.77.84 1.235 1.91 1.235 3.22 0 4.61-2.805 5.625-5.475 5.92.43.37.815 1.1.815 2.22 0 1.605-.015 2.895-.015 3.285 0 .32.215.69.825.575A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                  </a>
                )}
                {dev.social.dribbble && (
                    <a href={dev.social.dribbble} className="text-slate-400 hover:text-purple-600 transition-colors">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12zm0-2C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10zm6.687-9.52c-.21-.128-1.04-.504-2.438-.625.138-.633.25-1.25.344-1.844.156-1.015.11-1.808-.088-2.312-.2-.504-.633-.86-1.22-.97-.585-.11-1.25.047-1.9.43-.65.383-1.29.984-1.89 1.765-1.125 1.485-2.148 3.3-3.03 5.42-.48 1.15-.843 2.305-.983 3.28-.14 1.01.03 1.83.47 2.37.44.54 1.12.82 1.95.78 1.01-.04 1.93-.46 2.62-1.12.69-.66 1.15-1.57 1.34-2.66.1-.5.18-1.01.21-1.53.03-.52.04-1.02.04-1.5 0-.25-.01-.5-.03-.75.81.25 1.58.62 2.27 1.07.23.15.48.23.75.23.63 0 1.16-.36 1.42-1.02.26-.66.1-1.42-.41-1.92z"/></svg>
                    </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
