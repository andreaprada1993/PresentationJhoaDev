import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
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
                            <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-text-primary transition-all duration-300 ease-in-out hover:bg-accent-primary hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(99,102,241,0.3)]">
                                <Linkedin size={20} />
                            </a>
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
                    <p className="flex items-center gap-2">
                        Hecho con <Heart size={16} className="text-accent-tertiary" /> por Andrea
                        <span className="opacity-50 mx-1">|</span>
                        <Link to="/admin/login" className="hover:text-accent-primary transition-colors cursor-pointer">Admin</Link>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
