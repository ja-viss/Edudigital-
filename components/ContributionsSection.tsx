
import React from 'react';

const contributions = [
  {
    icon: (
      <svg className="w-10 h-10 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 5V3m0 18v-2M8 8l4 4 4-4m0 8l-4-4-4 4"></path></svg>
    ),
    title: 'Gestión de Contenidos Dinámica',
    description: 'Permite a los docentes y administradores gestionar de forma autónoma los recursos educativos (libros, videos, cursos) a través de un panel de control intuitivo (CRUD).',
  },
  {
    icon: (
      <svg className="w-10 h-10 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707.707"></path></svg>
    ),
    title: 'Asistente de IA Integrado',
    description: 'Incorpora un servicio de Inteligencia Artificial para el procesamiento y resumen de documentos, facilitando el análisis de grandes volúmenes de texto para estudiantes y profesores.',
  },
  {
    icon: (
      <svg className="w-10 h-10 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m0 18a9 9 0 01-9-9m9-9a9 9 0 00-9 9"></path></svg>
    ),
    title: 'Centralización del Conocimiento',
    description: 'Unifica el acceso a una diversa gama de materiales multimedia, desde la biblioteca digital y la cinemateca hasta cursos especializados, creando un ecosistema de aprendizaje cohesivo.',
  },
  {
    icon: (
      <svg className="w-10 h-10 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
    ),
    title: 'Seguridad y Protocolos de Gestión',
    description: 'Implementa un sistema de acceso seguro y protocolos de sanitización de datos para garantizar la integridad de la información y la fiabilidad de las integraciones externas.',
  }
];

export const ContributionsSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-2">Aportes a la Soberanía Tecnológica</h2>
          <p className="text-lg text-slate-600">¿Cómo este sistema fortalece a la Misión Sucre?</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contributions.map((item, index) => (
            <div key={index} className="reveal p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:border-sky-200 hover:shadow-xl transition-all duration-300">
              <div className="mb-6">{item.icon}</div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{item.title}</h3>
              <p className="text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
