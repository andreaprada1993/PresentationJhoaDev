import { ExternalLink, Github } from 'lucide-react';

const Projects = () => {
    const projects = [
        {
            title: 'E-Commerce Platform',
            description: 'Una plataforma de comercio electrónico completa con carrito de compras, pagos integrados y panel de administración.',
            image: 'https://images.unsplash.com/photo-1557821552-1710517f67cc?q=80&w=1000&auto=format&fit=crop',
            tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            liveUrl: '#',
            githubUrl: '#'
        },
        {
            title: 'Task Management App',
            description: 'Aplicación para gestión de proyectos y tareas con tableros Kanban, tiempo real y colaboración en equipo.',
            image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=1000&auto=format&fit=crop',
            tags: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
            liveUrl: '#',
            githubUrl: '#'
        },
        {
            title: 'AI Image Generator',
            description: 'Generador de imágenes impulsado por IA que permite a los usuarios crear obras de arte a partir de texto.',
            image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop',
            tags: ['React', 'OpenAI API', 'Tailwind', 'Express'],
            liveUrl: '#',
            githubUrl: '#'
        }
    ];

    return (
        <section className="relative z-10 section-padding" id="projects">
            <div className="container">
                <h2 className="section-title">
                    <span>Mi Trabajo</span>
                    Proyectos Destacados
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-10 mb-16 max-w-[500px] md:max-w-none mx-auto">
                    {projects.map((project, idx) => (
                        <div key={idx} className="flex flex-col overflow-hidden transition-all duration-400 ease-in-out h-full hover:-translate-y-2.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_20px_rgba(99,102,241,0.2)] glass-panel group relative">
                            <div className="relative h-[240px] overflow-hidden">
                                <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105" />
                                <div className="absolute inset-0 bg-black/80 flex items-center justify-center opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 z-20">
                                    <div className="flex gap-4 translate-y-5 transition-transform duration-300 ease-in-out group-hover:translate-y-0">
                                        <a href={project.liveUrl} className="w-[45px] h-[45px] rounded-full bg-accent-primary text-white flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-accent-secondary hover:scale-110" aria-label="Ver Demo">
                                            <ExternalLink size={20} />
                                        </a>
                                        <a href={project.githubUrl} className="w-[45px] h-[45px] rounded-full bg-accent-primary text-white flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-accent-secondary hover:scale-110" aria-label="Ver Código">
                                            <Github size={20} />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 flex flex-col grow">
                                <h3 className="text-2xl mb-4 text-text-primary">{project.title}</h3>
                                <p className="text-text-secondary text-[0.95rem] mb-6 leading-[1.6] grow">{project.description}</p>

                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.tags.map((tag, tagIdx) => (
                                        <span key={tagIdx} className="text-[0.8rem] px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-text-primary">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <a href="https://github.com/andreaprada1993" target="_blank" rel="noreferrer" className="btn btn-secondary">
                        Ver más en GitHub <Github size={18} />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Projects;
