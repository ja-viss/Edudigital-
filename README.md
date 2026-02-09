# Misión Sucre - Sistema Educativo Inmersivo 🇻🇪

## 📋 Descripción General
Esta aplicación es una plataforma educativa de vanguardia diseñada para centralizar el acceso al conocimiento libre e integrar herramientas de gestión de contenidos multimedia bajo esquemas JSON dinámicos (CRUD).

## 🏗️ Arquitectura del Software

### 📂 Estructura de Módulos Evolucionada
- `/management`: Motor de Gestión Dinámica (CRUD). Permite la creación (INSERT) y modificación (UPDATE) de recursos mediante un Dashboard autodidacta.
- `/ia-assistant`: Procesamiento NLP local para resumen de documentos.
- `/grounding-news`: Noticias verificadas mediante Google Search API (Gemini 3 Pro).

### 🔐 Seguridad y Protocolos de Gestión
- **Autenticación Maestro**: Acceso restringido con credenciales JSON estáticas.
- **Sanitización v4.0**: El sistema limpia recursivamente los inputs, eliminando paréntesis `()` y caracteres de escape para asegurar la integridad en integraciones externas.
- **Modo Autodidacta**: Si se busca un recurso inexistente para editarlo, el sistema sugiere la creación automática basada en los términos de búsqueda.

### 🧩 Esquema de Operación (JSON Persistente)
Toda acción en el Dashboard genera una transacción estructurada:
- `operacion`: Tipo de cambio en el inventario.
- `modulo`: Categoría de destino (Cursos, Cine, Libros, Musica).
- `payload`: Metadatos (título, categoría, duración) y Recursos (enlaces, portadas).

## 🛠️ Tecnologías Utilizadas
- **React 19**: Interfaz dinámica y reactiva.
- **Tailwind CSS**: Diseño responsivo y fluid design.
- **Google GenAI SDK**: IA para el módulo de noticias realistas.
- **Dynamic CRUD Engine**: Lógica propietaria para la gestión de inventario JSON.

---
*Desarrollado para el fortalecimiento de la soberanía tecnológica y educativa.*
