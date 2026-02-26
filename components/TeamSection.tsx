
import React from 'react';

const teamMembers = [
  {
    name: 'Ana Mercedes Arciniegas',
    role: 'Fundadora de la Misión',
    contribution: 'Pionera en la creación de espacios educativos alternativos, dedicando su trayectoria a garantizar que la formación universitaria sea un derecho accesible para todos los sectores del país.',
    imageUrl: '/img/mercedes.jpeg'
  },
  {
    name: 'Trina de las Mercedes Carrero Arciniegas',
    role: 'Coordinadora de Aldea Capacho Nuevo',
    contribution: 'Gestora del talento humano y académico en la región, enfocada en optimizar los procesos administrativos y pedagógicos para el éxito de los triunfadores en la Aldea.',
    imageUrl: '/img/trina.jpeg'
  },
  {
    name: 'Antonio Ramón Silva Mejias',
    role: 'Asistente Académico',
    contribution: 'Estratega en el acompañamiento estudiantil y soporte técnico-administrativo, facilitando las herramientas necesarias para la continuidad y excelencia del proceso formativo.',
    imageUrl: '/img/antonio.jpeg'
  },
  {
    name: 'Gustavo Adolfo Carrero Arciniegas',
    role: 'Docente Colaborador',
    contribution: 'Facilitador de conocimiento comprometido con la formación crítica y ética, impulsando el desarrollo de habilidades técnicas y sociales en las nuevas generaciones de profesionales.',
    imageUrl: '/img/gustavo.jpeg'
  },
  {
    name: 'Glenda Yarely Parada',
    role: 'Docente Asesor',
    contribution: 'Especialista en atención al estudiante, dedicada a brindar orientación integral y apoyo administrativo en la ruta académica de los nuevos ingresos.',
    imageUrl: '/img/glenda.jpg'
  },
  {
    name: 'Gladys Zulay Albarran Reyes ',
    role: ' Coordinadora de Eje',
    contribution: 'Responsable de la cohesión y el buen funcionamiento de las aldeas en su eje, promoviendo la colaboración y el intercambio de buenas prácticas educativas.',
    imageUrl: '/img/zulay.jpg'
  },
  {
    name: 'Vladimir Altuve',
    role: 'Docente colaborador',
    contribution: 'Facilitador especializado en infraestructura de redes, dedicado a la transferencia de conocimientos técnicos y al fortalecimiento de las competencias digitales de los estudiantes.',
    imageUrl: '/img/vladimir.jpg'
  },
  {
    name: 'Sydney Montoya',
    role: 'Coordinador de la Mision Sucre Estado',
    contribution: 'Impulsor de la municipalización educativa, coordinando esfuerzos para fortalecer el despliegue de las aldeas universitarias en cada rincón del estado.',
    imageUrl: '/img/sydney.png'
  }
];

export const TeamSection: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-slate-800 mb-2">Agradecimiento al Equipo de Trabajo de la Mision Sucre</h2>
        <p className="text-lg text-center text-slate-600 mb-12">Conoce a las personas que hacen posible la Misión.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
              <img src={member.imageUrl} alt={member.name} className="w-full h-56 object-cover"/>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800">{member.name}</h3>
                <p className="text-sky-600 font-semibold">{member.role}</p>
                <p className="text-sm text-slate-600 mt-4">{member.contribution}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
