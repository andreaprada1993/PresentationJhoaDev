# Portafolio Profesional - Arquitectura Limpia & TypeScript

Un portafolio moderno, interactivo y centrado en el desarrollo tipado, diseñado para demostrar habilidades avanzadas en el ecosistema **TypeScript**, arquitecturas escalables (**Microservicios**) y metodologías de **Clean Code**.

## 🚀 Tecnologías Principales

- **Frontend Core**: React 18, TypeScript (Modo Estricto)
- **Tooling & Build**: Vite, ESLint
- **Estilos**: Vanilla CSS con variables nativas (CSS Variables) y metodología BEM-like para UI Glassmorphism.
- **Iconografía**: Lucide React
- **Arquitectura**: Separación de responsabilidades mediante Clean Architecture (Tipos, Datos, Hooks, Componentes).

## 📂 Arquitectura del Proyecto (Clean Code)

El proyecto está estructurado para escalar, separar la lógica de negocio de la interfaz de usuario (UI) y mantener un tipado estricto en toda la aplicación.

```text
src/
├── types/                # Definiciones de interfaces globales de TypeScript (Contratos).
│   └── index.ts          # Tipos base: IProject, ISkill, ICardIcon, etc.
├── data/                 # Capa de datos estáticos (desacopla el contenido de los componentes).
│   └── portfolio.data.ts # Configuraciones como Heroes, Skills y Projects.
├── hooks/                # Custom React Hooks para la lógica de negocio.
│   └── useMemoryGame.ts  # Control de estado y lógica del mini-juego.
├── layout/               # Componentes estructurales de la página.
│   ├── MainLayout.tsx    # Wrapper principal de la aplicación.
│   ├── Navbar.tsx        # Menú de navegación interactivo.
│   └── Footer.tsx        # Pie de página.
├── features/             # Componentes encapsulados por dominio/funcionalidad.
│   ├── Hero/             # Sección de introducción principal.
│   ├── About/            # Sección de historia y barras de habilidades.
│   ├── Projects/         # Cuadrícula de proyectos destacados.
│   └── Game/             # Mini-juego interactivo de emparejamiento.
├── index.css             # Tokens CSS Globales (Colores, Animaciones, Glassmorphism).
└── App.tsx               # Punto de entrada de la UI.
```

### ¿Por qué esta arquitectura?
1. **Mantenibilidad**: Si necesitas cambiar la descripción de un proyecto, solo tocas `src/data/`, no tienes que buscar entre cientos de líneas de JSX.
2. **Reusabilidad**: La lógica compleja (como el juego de memoria) está aislada en `src/hooks/useMemoryGame.ts` y puede probarse (testing) independientemente de React.
3. **Tipado Fuerte**: Gracias a `src/types/`, los errores de datos entrantes se capturan en tiempo de compilación.

## 🎮 Características Destacadas

- **Diseño Glassmorphism Premium**: UI moderna con blur en tiempo real, paleta de colores oscura, y neón sutil.
- **Mini-Juego Integrado**: Incluye un "Tech Match Game" (Juego de Memoria) completamente funcional para demostrar el manejo complejo de estado en React (`useState`, `useEffect`, `useCallback`).
- **Enfoque en Microservicios**: El contenido y la presentación enfatizan la capacidad de dominar sistemas distribuidos y arquitecturas complejas de backend, demostrando un perfil Full-Stack avanzado.

## 🛠️ Instalación y Uso Local

Para correr este proyecto en tu entorno local, necesitas tener instalado **Node.js** (v18 o superior).

1. **Clonar el repositorio**
```bash
git clone https://github.com/andreaprada1993/PresentationJhoaDev.git
cd PresentationJhoaDev
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar el servidor de desarrollo**
```bash
npm run dev
```

4. **Compilar para producción**
```bash
npm run build
```

El servidor local se iniciará generalmente en `http://localhost:5173`.

---
*Diseñado y desarrollado con ♥ aplicando principios SOLID y código limpio.*
