
import React, { useState } from 'react';
import { ManagementPayload } from '../types';

interface ManagementProps {
  inventario: ManagementPayload[];
  setInventario: React.Dispatch<React.SetStateAction<ManagementPayload[]>>;
}

/**
 * Motor Dinámico de Gestión Educativa e Inmersiva (v4.1)
 * Dashboard interactivo con validación proactiva y normalización de datos.
 */
export const ManagementSection: React.FC<ManagementProps> = ({ inventario, setInventario }) => {
  const [activeTab, setActiveTab] = useState<'crear' | 'inventario'>('crear');
  const [editId, setEditId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [formData, setFormData] = useState({
    modulo: 'Cursos' as ManagementPayload['modulo'],
    titulo: '',
    categoria: '',
    subEtiqueta: '',
    duracion: '',
    urlPortada: '',
    enlaces: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const sanitizarInput = (text: string) => {
    return text.replace(/[()]/g, '').replace(/[#$@%^&*]/g, '').trim();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const buscarRecurso = () => {
    const q = sanitizarInput(searchQuery).toLowerCase();
    if (!q) return;

    const encontrado = inventario.find(item => 
      item.payload.metadata.titulo.toLowerCase().includes(q) || 
      item.payload.id === searchQuery
    );

    if (encontrado) {
      setEditId(encontrado.payload.id);
      setFormData({
        modulo: encontrado.modulo,
        titulo: encontrado.payload.metadata.titulo,
        categoria: encontrado.payload.metadata.categoria_principal,
        subEtiqueta: encontrado.payload.metadata.sub_etiqueta,
        duracion: encontrado.payload.metadata.duracion_o_extension,
        urlPortada: encontrado.payload.recursos.url_portada,
        enlaces: encontrado.payload.recursos.enlaces.join(', ')
      });
      setActiveTab('crear');
      setSuccess('Recurso localizado. Modo Edición activado.');
    } else {
      setError(`Recurso "${searchQuery}" no encontrado. Modo Autodidacta: Inicie la creación.`);
      setEditId(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validación Proactiva: Solicitar datos faltantes
    if (!formData.titulo) {
      setError('Error: El Título es obligatorio para el mapeo JSON.');
      return;
    }
    
    if (formData.modulo === 'Libros' && !formData.categoria) {
      setError('Pregunta del Sistema: ¿Bajo qué periodo histórico o categoría guardamos este libro?');
      return;
    }

    if (!formData.urlPortada || !formData.enlaces) {
      setError('Error de Estructura: Se requiere URL de Portada y al menos un Link de acceso.');
      return;
    }

    const operacion: ManagementPayload = {
      operacion: editId ? 'UPDATE' : 'INSERT',
      modulo: formData.modulo,
      payload: {
        id: editId || `uuid-${Date.now()}`,
        metadata: {
          titulo: sanitizarInput(formData.titulo),
          categoria_principal: formData.categoria || 'General',
          sub_etiqueta: formData.subEtiqueta || formData.modulo,
          duracion_o_extension: formData.duracion || 'N/A'
        },
        recursos: {
          url_portada: formData.urlPortada,
          enlaces: formData.enlaces.split(',').map(l => l.trim())
        }
      }
    };

    if (editId) {
      setInventario(prev => prev.map(item => item.payload.id === editId ? operacion : item));
      setSuccess('Recurso actualizado. Cambios propagados globalmente.');
    } else {
      setInventario(prev => [...prev, operacion]);
      setSuccess('Recurso registrado. Disponible en las secciones públicas.');
    }

    setTimeout(() => {
      setEditId(null);
      setFormData({
        modulo: 'Cursos', titulo: '', categoria: '', subEtiqueta: '', duracion: '', urlPortada: '', enlaces: ''
      });
      setSuccess('');
    }, 2000);
  };

  const eliminarRecurso = (id: string) => {
    setInventario(prev => prev.filter(item => item.payload.id !== id));
  };

  return (
    <section className="pt-32 pb-40 px-6 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
          <div>
            <div className="inline-block py-1 px-4 bg-sky-100 text-sky-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
              Consola Maestra v4.1
            </div>
            <h2 className="text-4xl md:text-6xl font-brand text-slate-900 tracking-tighter">
              Motor de <span className="text-sky-600 italic">Gestión</span>
            </h2>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={() => setActiveTab('crear')}
              className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === 'crear' ? 'bg-sky-600 text-white shadow-xl' : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              {editId ? 'Editar Recurso' : 'Nuevo Registro'}
            </button>
            <button 
              onClick={() => setActiveTab('inventario')}
              className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === 'inventario' ? 'bg-sky-600 text-white shadow-xl' : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              Inventario Activo ({inventario.length})
            </button>
          </div>
        </div>

        {activeTab === 'crear' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 reveal active">
              <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-slate-100">
                <h3 className="text-xl font-bold text-slate-800 mb-8">{editId ? 'Actualizar' : 'Registrar'} Recurso</h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Módulo</label>
                      <select name="modulo" value={formData.modulo} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-4 outline-none text-sm font-bold">
                        <option value="Cursos">Educación (Cursos)</option>
                        <option value="Cine">Multimedia (Cine/Pelis)</option>
                        <option value="Libros">Biblioteca (Libros/Historia)</option>
                        <option value="Musica">Multimedia (Música)</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Título / Tema</label>
                      <input type="text" name="titulo" value={formData.titulo} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-4 outline-none focus:border-sky-300 transition-all text-sm font-medium" placeholder="Sanitización automática..."/>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Categoría</label>
                      <input type="text" name="categoria" value={formData.categoria} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-4 outline-none text-sm" placeholder="Ej: Historia"/>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Tiempo/Duración</label>
                      <input type="text" name="duracion" value={formData.duracion} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-4 outline-none text-sm" placeholder="Ej: 2h / 200 pág"/>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">URL Portada</label>
                    <input type="text" name="urlPortada" value={formData.urlPortada} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-4 outline-none text-sm" placeholder="https://..."/>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Links de Acceso (Comas)</label>
                    <input type="text" name="enlaces" value={formData.enlaces} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-4 outline-none text-sm" placeholder="Link 1, Link 2..."/>
                  </div>
                  {error && <p className="bg-red-50 text-red-500 p-4 rounded-xl text-[10px] font-bold uppercase border border-red-100">{error}</p>}
                  {success && <p className="bg-emerald-50 text-emerald-500 p-4 rounded-xl text-[10px] font-bold uppercase border border-emerald-100">{success}</p>}
                  <button type="submit" className={`w-full py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl transition-all active:scale-95 ${editId ? 'bg-amber-500' : 'bg-sky-600'} text-white`}>
                    {editId ? 'Actualizar JSON' : 'Ejecutar INSERT'}
                  </button>
                </form>
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="bg-slate-900 rounded-[2.5rem] p-10 h-full shadow-2xl border border-white/5 flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-white font-bold">Esquema Lógico Activo</h3>
                  <div className="flex gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div></div>
                </div>
                <div className="flex-1 bg-slate-950/80 rounded-3xl p-6 font-mono text-[10px] text-sky-400 overflow-y-auto custom-scrollbar">
                  <pre>{JSON.stringify({operacion: editId ? 'UPDATE' : 'INSERT', modulo: formData.modulo, payload: formData}, null, 2)}</pre>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="reveal active">
            <div className="max-w-3xl mx-auto mb-16 flex gap-2 p-2 bg-white rounded-2xl border border-slate-200 shadow-xl">
              <input type="text" placeholder="Buscar por título para modificar..." className="flex-1 px-6 outline-none font-medium" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
              <button onClick={buscarRecurso} className="bg-slate-900 text-white px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest">Localizar</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {inventario.map((item) => (
                <div key={item.payload.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-lg flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-2 py-1 bg-sky-50 text-sky-600 rounded text-[9px] font-black uppercase">{item.modulo}</span>
                    <div className="flex gap-2">
                      <button onClick={() => { setEditId(item.payload.id); setFormData({modulo: item.modulo, titulo: item.payload.metadata.titulo, categoria: item.payload.metadata.categoria_principal, subEtiqueta: item.payload.metadata.sub_etiqueta, duracion: item.payload.metadata.duracion_o_extension, urlPortada: item.payload.recursos.url_portada, enlaces: item.payload.recursos.enlaces.join(', ')}); setActiveTab('crear'); }} className="text-slate-400 hover:text-sky-600"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg></button>
                      <button onClick={() => eliminarRecurso(item.payload.id)} className="text-slate-400 hover:text-red-600"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button>
                    </div>
                  </div>
                  <h4 className="font-bold text-slate-800 line-clamp-1">{item.payload.metadata.titulo}</h4>
                  <p className="text-slate-400 text-[10px] mt-1">{item.payload.metadata.categoria_principal} • {item.payload.metadata.duracion_o_extension}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
