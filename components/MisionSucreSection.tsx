
import React from 'react';

export const MisionSucreSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="reveal">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Desarrollado para la Misión Sucre</h2>
          <p className="text-lg text-slate-600 mb-6">
            Este Sistema Educativo Inmersivo fue concebido y desarrollado como una herramienta de apoyo para la <strong>Misión Sucre - Aldea Universitaria "Capacho Nuevo"</strong>, con el objetivo de fortalecer la soberanía tecnológica y el acceso al conocimiento libre.
          </p>
          <p className="text-lg text-slate-600">
            La Misión Sucre es un programa fundamental del gobierno venezolano para garantizar el acceso a la educación universitaria a todos los bachilleres del país, promoviendo la inclusión y la municipalización de la educación.
          </p>
        </div>
        <div className="flex justify-center items-center reveal">
          <img 
            src="https://pbs.twimg.com/media/EdDKaStWsAEptn5.jpg" 
            alt="Logo Misión Sucre" 
            className="max-w-xs md:max-w-sm rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};
