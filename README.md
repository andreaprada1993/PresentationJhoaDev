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

**Ruta de Acceso Seguro:** `/admin/login`

### Capacidades del Dashboard:
- **Editor del Hero:** Personaliza el título de inicio, tu subtítulo y tu biografía (con soporte ligero para *Markdown*). 
- **Gestor de Proyectos:** CRUD Completo (Crear, Leer, Actualizar, Borrar). Interfaz interactiva para añadir nuevos proyectos con sus respectivas URLs, imágenes representativas y tarjetas de etiquetas técnicas (*tags*). 
- **Base de Datos en Tiempo Real:** Configurado para integrarse fluida y visualmente con Supabase (BaaS) brindando lecturas y escrituras seguras a través de variables de entorno.

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

### ⚙️ Variables de Entorno (Importante)

Para que el **Panel de Administración** funcione y se conecte al CMS correctamente, debes configurar tus variables de entorno.

Crea un archivo `.env` en la raíz del proyecto (basado en el `.env.example` si existe) con las credenciales de tu propio proyecto de Supabase:

```env
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_anon_key_de_supabase
VITE_ADMIN_PASSWORD=tu_contraseña_segura_de_respaldo
```

> **Nota de Seguridad:** Las credenciales de base de datos o contraseñas jamás deben subirse al repositorio público. Asegúrate de que el archivo `.env` esté incluido en tu `.gitignore`.

*(El esquema de la base de datos de Supabase requiere las tablas `profile`, `projects`, `skills` y `settings` con las políticas RLS configuradas según las necesidades de tu instancia).*

---
<div align="center">
  Hecho con ❤️ y ☕ por Andrea Prada. 
</div>
