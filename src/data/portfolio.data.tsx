import { Code2, Server, Database, Terminal, Cpu, Globe, Cloud, Layout } from 'lucide-react';
import { ISkill, IFeature, IProject, ICardIcon, IHeroStats } from '../types';

export const HERO_CONTENT = {
    title: 'Andrea Prada',
    subtitle: 'Desarrolladora Full Stack Jr',
    badge: 'Disponible para nuevas oportunidades',
    description: 'Especialista en construir aplicaciones robustas con **TypeScript** y proyectos escalables. Me apasiona resolver problemas complejos y crear experiencias fluidas de principio a fin.',
};

export const HERO_STATS: IHeroStats[] = [
    {
        title: 'Backend & Cloud',
        description: 'Microservicios, Docker, Kubernetes, Node.js'
    },
    {
        title: 'Frontend Seguros',
        description: 'React, TypeScript Estricto, UI Moderna'
    }
];

export const SKILLS_DATA: ISkill[] = [
    { name: 'Gestión de Proyectos', level: 95 },
    { name: 'TypeScript / Ecosistema TS', level: 95 },
    { name: 'React / Next.js', level: 85 },
    { name: 'Node.js / Express / NestJS', level: 90 },
    { name: 'Docker / Kubernetes', level: 85 },
    { name: 'Bases de Datos (SQL/NoSQL)', level: 85 }
];

export const FEATURES_DATA: IFeature[] = [
    {
        icon: <Server size={24} />,
        title: 'Gestión de Proyectos',
        description: 'Diseño e implementación de sistemas distribuidos, manejando la complejidad con elegancia y escalabilidad.'
    },
    {
        icon: <Code2 size={24} />,
        title: 'TypeScript Avanzado',
        description: 'Desarrollo fuertemente tipado para aplicaciones fluidas, seguras y libres de errores en tiempo de ejecución.'
    },
    {
        icon: <Database size={24} />,
        title: 'Bases de Datos',
        description: 'Modelado y optimización de datos para aplicaciones de alto rendimiento.'
    }
];

export const PROJECTS_DATA: IProject[] = [
    {
        title: 'E-Commerce Microservices',
        description: 'Plataforma de comercio electrónico de alto tráfico usando Kubernetes, NestJS, gRPC y Event-Driven Architecture.',
        image: 'https://images.unsplash.com/photo-1557821552-1710517f67cc?q=80&w=1000&auto=format&fit=crop',
        tags: ['Microservices', 'NestJS', 'Kafka', 'React'],
        liveUrl: '#',
        githubUrl: '#'
    },
    {
        title: 'Task Management App',
        description: 'Aplicación para gestión de proyectos y tareas con tableros Kanban, tiempo real y colaboración en equipo. Totalmente tipada.',
        image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=1000&auto=format&fit=crop',
        tags: ['Next.js', 'TypeScript Strict', 'Prisma', 'PostgreSQL'],
        liveUrl: '#',
        githubUrl: '#'
    },
    {
        title: 'AI Image Generator API',
        description: 'API distribuida para generación de imágenes impulsada por IA, orquestada mediante Docker Swarm y comunicada por colas.',
        image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop',
        tags: ['Node.js', 'RabbitMQ', 'Redis', 'Docker'],
        liveUrl: '#',
        githubUrl: '#'
    }
];

export const GAME_ICONS: ICardIcon[] = [
    { id: 1, icon: <Terminal size={32} />, name: 'Terminal' },
    { id: 2, icon: <Database size={32} />, name: 'Database' },
    { id: 3, icon: <Server size={32} />, name: 'Server' },
    { id: 4, icon: <Code2 size={32} />, name: 'Code' },
    { id: 5, icon: <Cpu size={32} />, name: 'CPU' },
    { id: 6, icon: <Globe size={32} />, name: 'Web' },
    { id: 7, icon: <Cloud size={32} />, name: 'Cloud' },
    { id: 8, icon: <Layout size={32} />, name: 'UI' },
];
