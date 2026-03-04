import { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';

const Navbar = () => {
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
          <a href="#" className="text-text-secondary transition-all duration-300 ease-in-out flex items-center justify-center hover:text-accent-primary hover:-translate-y-0.5">
            <Linkedin size={20} />
          </a>
          <a href="mailto:contact@example.com" className="btn btn-primary">
            <Mail size={18} />
            <span>Contactar</span>
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
          <a href="#" className="text-text-secondary hover:text-accent-primary">
            <Linkedin size={24} />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
