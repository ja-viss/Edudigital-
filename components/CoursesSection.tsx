
import React, { useState } from 'react';
import { INCES_COURSES, YOUTUBE_CHANNELS } from '../constants';
import { ManagementPayload } from '../types';

interface CoursesProps {
  userCourses: ManagementPayload[];
}

export const CoursesSection: React.FC<CoursesProps> = ({ userCourses }) => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <section className="bg-slate-50 min-h-screen">
      <div className="pt-40 pb-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-6xl md:text-8xl font-brand text-slate-900 tracking-tighter">Aprende <span className="text-sky-500 italic">Hoy</span></h2>
          <p className="text-slate-500 mt-6 max-w-2xl mx-auto text-xl font-light">Ecosistema dinámico de formación profesional y técnica.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Cursos Dinámicos del Inventario */}
        {userCourses.length > 0 && (
          <div className="mb-24">
            <div className="flex justify-between items-end mb-12">
               <div>
                  <h3 className="text-3xl font-brand text-slate-900">Formación Especializada</h3>
                  <p className="text-slate-400 font-medium">Contenido cargado manualmente por el administrador.</p>
               </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {userCourses.map((course) => (
                 <div key={course.payload.id} className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 hover-lift group">
                    <div className="h-48 rounded-3xl overflow-hidden mb-6">
                       <img src={course.payload.recursos.url_portada} className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt={course.payload.metadata.titulo} />
                    </div>
                    <span className="bg-sky-50 text-sky-600 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">{course.payload.metadata.categoria_principal}</span>
                    <h4 className="mt-4 text-xl font-bold text-slate-800 mb-6">{course.payload.metadata.titulo}</h4>
                    <a href={course.payload.recursos.enlaces[0]} target="_blank" className="block text-center py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-sky-600 transition-colors">Empezar Curso</a>
                 </div>
               ))}
            </div>
          </div>
        )}

        <div className="mb-32">
          <h3 className="text-3xl font-brand text-slate-900 mb-12">Programas INCES</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {INCES_COURSES.map(course => (
              <div key={course.id} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all overflow-hidden group">
                <div className="h-40 rounded-2xl overflow-hidden mb-4">
                  <img src={course.image} className="w-full h-full object-cover" alt={course.title} />
                </div>
                <h4 className="font-bold text-slate-900 text-sm line-clamp-2 mb-4">{course.title}</h4>
                <a href={course.url} target="_blank" className="block py-3 bg-slate-50 text-slate-900 text-center rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-sky-600 hover:text-white transition-all">Ver Más</a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
