<div align="center">
  <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/terminal-square.svg" alt="Logo" width="80" height="80">
  
  <h1 align="center">Portafolio & CMS Admin</h1>

  <p align="center">
    Un portafolio moderno, dinámico y auto-administrable construido para desarrolladores Full Stack. 
    <br />
    <br />
    <a href="#-características">Características</a>
    ·
    <a href="#-tecnologías">Tecnologías</a>
    ·
    <a href="#-panel-de-administración-cms">Panel CMS</a>
    ·
    <a href="#-instalación-y-uso">Instalación</a>
  </p>
</div>

---

## 🚀 Características

- **Diseño Ultra Moderno:** Estilizado meticulosamente con **Tailwind CSS v3**, layouts fluidos, animaciones sutiles, *glassmorphism* y total responsividad.
- **Arquitectura Basada en Componentes:** Creado con **React + Vite** para tiempos de carga y construcción instantáneos.
- **Tipado Fuerte:** Desarrollado integralmente en **TypeScript** garantizando código limpio y seguro.
- **Juego Interactivo:** Incluye un mini-juego de cartas *Memory Match* interactivo construido nativamente.
- **Content Management System (CMS):** Un panel de administración protegido por rutas privadas para editar toda la información del sitio en tiempo real desde una interfaz gráfica sin tocar código fuente.

<br />

## 🛠 Tecnologías

Este proyecto está construido sobre las siguientes tecnologías:

- ⚛️ **[React 18](https://reactjs.org/)** - Librería UI
- ⚡ **[Vite](https://vitejs.dev/)** - Empaquetador de módulos increíblemente rápido
- 📐 **[TypeScript](https://www.typescriptlang.org/)** - Tipado estático
- 🎨 **[Tailwind CSS v3](https://tailwindcss.com/)** - Framework CSS de utilidad prioritaria
- 📍 **[React Router DOM v6](https://reactrouter.com/)** - Enrutamiento dinámico en cliente
- 🎭 **[Lucide React](https://lucide.dev/)** - Iconos y vectores de SVG limpios

<br />

## 🔒 Panel de Administración (CMS)

El portafolio expone una arquitectura CMS apoyada por `Context API` y almacenamiento local, ideal para desarrolladores que desean mantener su sitio actualizado sin necesidad de crear un *PR*.

**Ruta de Acceso:** `http://localhost:5173/admin/login`
> 🔑 **Credenciales Mock de Prueba:**

### Capacidades del Dashboard:
- **Editor del Hero:** Personaliza el título de inicio, tu subtítulo y tu biografía (con soporte ligero para *Markdown*). 
- **Gestor de Proyectos:** CRUD Completo (Crear, Leer, Actualizar, Borrar). Interfaz interactiva para añadir nuevos proyectos con sus respectivas URLs, imágenes representativas y tarjetas de etiquetas técnicas (*tags*). 
- **Persistencia Autónoma:** Toda la data ingresada a través del panel persiste fluidamente en tu navegador sin base de datos temporal requerida, actualizando el DOM público de forma paralela.

<br />

## ⚙️ Instalación y Uso

Para desplegar este proyecto localmente, sigue estas instrucciones:

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/tu-repo.git
   cd portafolioCV
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo local**
   ```bash
   npm run dev
   ```

4. **Compilar para producción (Build)**
   ```bash
   npm run build
   ```

8. **Previsualizar la compilación**
   ```bash
   npm run preview
   ```

### ⚙️ Configuración de Supabase (Importante)

Para que el **Panel de Administración** te permita guardar cambios en la base de datos (Proyectos, Habilidades, Hero), debes desactivar el *Row Level Security (RLS)* en tus tablas de Supabase, de lo contrario obtendrás un error `42501` (Restricción de Privilegios). 

Ve a **SQL Editor** en Supabase, pega y ejecuta este código:

```sql
alter table "profile" disable row level security;
alter table "projects" disable row level security;
alter table "skills" disable row level security;

-- Añadir nuevas columnas al perfil si no existen
alter table "profile" add column if not exists history text;
alter table "profile" add column if not exists linkedin text;
alter table "profile" add column if not exists whatsapp text;
alter table "profile" add column if not exists stats jsonb;

-- Crear la tabla de configuración para contraseñas si no existe
create table if not exists "settings" (
  id uuid default uuid_generate_v4() primary key,
  key text unique not null,
  value text not null,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);
alter table "settings" disable row level security;

-- Recargar esquema de Supabase
NOTIFY pgrst, 'reload schema';
```

<br />

---
<div align="center">
  Hecho con ❤️ y ☕ por Andrea Prada. 
</div>
