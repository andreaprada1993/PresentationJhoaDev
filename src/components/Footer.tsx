import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';

const Footer = () => {
    const { heroContent } = usePortfolio();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-20 pt-16 pb-8 bg-black/80 backdrop-blur-xl border-t border-glass-border relative z-10">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-10 mb-12">
                    <div>
                        <a href="#" className="inline-block mb-4 font-heading text-xl font-bold">
                            Andrea<span className="gradient-text">Prada</span>
                        </a>
                        <p className="text-text-secondary max-w-[300px] text-[0.95rem] leading-[1.6]">
                            Construyendo experiencias digitales increíbles con código y creatividad.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h4 className="text-text-primary text-[1.1rem] font-heading font-medium mb-2">Navegación</h4>
                        <a href="#home" className="text-text-secondary text-[0.95rem] w-fit transition-colors duration-300 hover:text-accent-primary">Inicio</a>
                        <a href="#about" className="text-text-secondary text-[0.95rem] w-fit transition-colors duration-300 hover:text-accent-primary">Sobre Mí</a>
                        <a href="#projects" className="text-text-secondary text-[0.95rem] w-fit transition-colors duration-300 hover:text-accent-primary">Proyectos</a>
                    </div>

                    <div>
                        <h4 className="text-text-primary text-[1.1rem] font-heading font-medium mb-6">Conectar</h4>
                        <div className="flex gap-4">
                            <a href="https://github.com/andreaprada1993" target="_blank" rel="noreferrer" aria-label="GitHub" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-text-primary transition-all duration-300 ease-in-out hover:bg-accent-primary hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(99,102,241,0.3)]">
                                <Github size={20} />
                            </a>
                            <a href={heroContent.linkedin || "#"} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-text-primary transition-all duration-300 ease-in-out hover:bg-accent-primary hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(99,102,241,0.3)]">
                                <Linkedin size={20} />
                            </a>
                            {heroContent.whatsapp && (
                                <a href={`https://wa.me/${heroContent.whatsapp.replace(/\+/g, '')}`} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-emerald-400 transition-all duration-300 ease-in-out hover:bg-accent-primary hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(99,102,241,0.3)]">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.588-5.946 0-6.556 5.332-11.891 11.891-11.891 3.181 0 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.402 0 6.556-5.332-11.891-11.891-11.891-2.01 0-3.987-.512-5.748-1.488l-6.248 1.641zm6.721-3.722c1.487.882 3.018 1.346 4.605 1.346 4.965 0 9.006-4.041 9.006-9.006 0-2.404-.936-4.664-2.635-6.363-1.698-1.699-3.958-2.634-6.362-2.634-4.965 0-9.006 4.041-9.006 9.006 0 1.696.471 3.344 1.362 4.777l-1.025 3.738 3.832-1.005zm10.948-6.144c-.279-.14-1.647-.812-1.903-.905-.255-.093-.441-.14-.627.14-.186.279-.719.905-.882 1.092-.163.186-.325.21-.604.07-.279-.14-1.18-.435-2.246-1.387-.83-.74-1.389-1.654-1.551-1.933-.163-.279-.017-.43.123-.569.126-.125.279-.325.418-.488.139-.163.186-.279.279-.465.093-.186.046-.349-.023-.488-.07-.139-.627-1.511-.859-2.07-.226-.558-.454-.482-.627-.491-.161-.009-.348-.01-.534-.01-.186 0-.488.07-.743.349-.255.279-.975.953-.975 2.325 0 1.372 1.022 2.697 1.162 2.883.139.186 2.01 3.067 4.869 4.295.681.293 1.213.468 1.628.599.683.217 1.307.187 1.8.113.551-.083 1.647-.674 1.879-1.325.233-.651.233-1.209.163-1.325-.071-.116-.256-.186-.535-.325z" /></svg>
                                </a>
                            )}
                            <a href="mailto:contact@example.com" aria-label="Email" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-text-primary transition-all duration-300 ease-in-out hover:bg-accent-primary hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(99,102,241,0.3)]">
                                <Mail size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left text-text-tertiary text-[0.85rem]">
                    <p>
                        &copy; {currentYear} Andrea Prada. Todos los derechos reservados.
                    </p>
                    <p className="flex items-center gap-2 group">
                        Hecho con <Heart size={16} className="text-accent-tertiary" /> por Andrea
                        <span className="opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center">
                            <span className="opacity-50 mx-1">|</span>
                            <Link to="/admin/login" className="hover:text-accent-primary transition-colors cursor-pointer">Admin</Link>
                        </span>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
