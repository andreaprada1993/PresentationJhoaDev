import { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const Navbar = () => {
  const { heroContent } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${isScrolled ? 'py-4 glass-panel !rounded-none !border-t-0 !border-x-0' : 'py-6'}`}>
      <div className="container flex justify-between items-center">
        <a href="#" className="font-heading text-2xl font-extrabold tracking-tight">
          Andrea<span className="gradient-text">Prada</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8">
          <a href="#about" className="text-[0.95rem] font-medium text-text-secondary transition-colors duration-300 ease-in-out relative hover:text-text-primary group">
            Sobre Mí
            <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-gradient-to-r from-accent-primary to-accent-secondary transition-all duration-300 ease-in-out group-hover:w-full"></span>
          </a>
          <a href="#projects" className="text-[0.95rem] font-medium text-text-secondary transition-colors duration-300 ease-in-out relative hover:text-text-primary group">
            Proyectos
            <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-gradient-to-r from-accent-primary to-accent-secondary transition-all duration-300 ease-in-out group-hover:w-full"></span>
          </a>
          <a href="#game" className="text-[0.95rem] font-medium text-text-secondary transition-colors duration-300 ease-in-out relative hover:text-text-primary group">
            Juego
            <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-gradient-to-r from-accent-primary to-accent-secondary transition-all duration-300 ease-in-out group-hover:w-full"></span>
          </a>
          <a href="#skills" className="text-[0.95rem] font-medium text-text-secondary transition-colors duration-300 ease-in-out relative hover:text-text-primary group">
            Habilidades
            <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-gradient-to-r from-accent-primary to-accent-secondary transition-all duration-300 ease-in-out group-hover:w-full"></span>
          </a>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <a href="https://github.com/andreaprada1993" target="_blank" rel="noreferrer" className="text-text-secondary transition-all duration-300 ease-in-out flex items-center justify-center hover:text-accent-primary hover:-translate-y-0.5">
            <Github size={20} />
          </a>
          <a href={heroContent.linkedin || "#"} target="_blank" rel="noreferrer" className="text-text-secondary transition-all duration-300 ease-in-out flex items-center justify-center hover:text-accent-primary hover:-translate-y-0.5">
            <Linkedin size={20} />
          </a>
          <a href={heroContent.whatsapp ? `https://wa.me/${heroContent.whatsapp.replace(/\+/g, '')}` : "mailto:contact@example.com"} className="btn btn-primary">
            <Mail size={18} />
            <span>{heroContent.whatsapp ? 'WhatsApp' : 'Contactar'}</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="block md:hidden text-text-primary z-[1001]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed top-[80px] left-[5%] w-[90%] p-8 flex flex-col gap-6 opacity-0 invisible -translate-y-5 transition-all duration-300 ease-in-out glass-panel ${isMobileMenuOpen ? '!opacity-100 !visible !translate-y-0' : ''}`}>
        <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-semibold text-text-primary">Sobre Mí</a>
        <a href="#projects" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-semibold text-text-primary">Proyectos</a>
        <a href="#game" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-semibold text-text-primary">Juego</a>
        <a href="#skills" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-semibold text-text-primary">Habilidades</a>
        <div className="flex gap-6 mt-4 pt-6 border-t border-glass-border">
          <a href="https://github.com/andreaprada1993" target="_blank" rel="noreferrer" className="text-text-secondary hover:text-accent-primary">
            <Github size={24} />
          </a>
          <a href={heroContent.linkedin || "#"} target="_blank" rel="noreferrer" className="text-text-secondary hover:text-accent-primary">
            <Linkedin size={24} />
          </a>
          {heroContent.whatsapp && (
            <a href={`https://wa.me/${heroContent.whatsapp.replace(/\+/g, '')}`} target="_blank" rel="noreferrer" className="text-text-secondary hover:text-accent-primary text-emerald-400">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.588-5.946 0-6.556 5.332-11.891 11.891-11.891 3.181 0 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.402 0 6.556-5.332-11.891-11.891 11.891-2.01 0-3.987-.512-5.748-1.488l-6.248 1.641zm6.721-3.722c1.487.882 3.018 1.346 4.605 1.346 4.965 0 9.006-4.041 9.006-9.006 0-2.404-.936-4.664-2.635-6.363-1.698-1.699-3.958-2.634-6.362-2.634-4.965 0-9.006 4.041-9.006 9.006 0 1.696.471 3.344 1.362 4.777l-1.025 3.738 3.832-1.005zm10.948-6.144c-.279-.14-1.647-.812-1.903-.905-.255-.093-.441-.14-.627.14-.186.279-.719.905-.882 1.092-.163.186-.325.21-.604.07-.279-.14-1.18-.435-2.246-1.387-.83-.74-1.389-1.654-1.551-1.933-.163-.279-.017-.43.123-.569.126-.125.279-.325.418-.488.139-.163.186-.279.279-.465.093-.186.046-.349-.023-.488-.07-.139-.627-1.511-.859-2.07-.226-.558-.454-.482-.627-.491-.161-.009-.348-.01-.534-.01-.186 0-.488.07-.743.349-.255.279-.975.953-.975 2.325 0 1.372 1.022 2.697 1.162 2.883.139.186 2.01 3.067 4.869 4.295.681.293 1.213.468 1.628.599.683.217 1.307.187 1.8.113.551-.083 1.647-.674 1.879-1.325.233-.651.233-1.209.163-1.325-.071-.116-.256-.186-.535-.325z" /></svg>
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
