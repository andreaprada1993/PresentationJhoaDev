import { ArrowRight, Download } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

const Hero = () => {
    const { heroContent, heroStats } = usePortfolio();

    return (
        <section className="hero" id="home">
            <div className="blob-1 bg-blob"></div>
            <div className="blob-2 bg-blob"></div>

            <div className="container hero-container">
                <div className="hero-content animate-fade-in">
                    <div className="badge glass-panel">
                        <span className="badge-dot"></span>
                        {heroContent.badge}
                    </div>

                    <h1 className="hero-title">
                        Hola, soy <span className="gradient-text">{heroContent.title}</span>
                        <br /> {heroContent.subtitle}
                    </h1>

                    <p className="hero-description">
                        {heroContent.description.split('**').map((text, i) =>
                            i % 2 === 1 ? <strong key={i}>{text}</strong> : <span key={i}>{text}</span>
                        )}
                    </p>

                    <div className="hero-actions">
                        <a href="#projects" className="btn btn-primary">
                            Ver Arquitectura <ArrowRight size={20} />
                        </a>
                        <a href="#" className="btn btn-secondary">
                            Descargar CV <Download size={20} />
                        </a>
                    </div>

                    <div className="hero-stats">
                        {(heroStats || []).map((stat, idx) => (
                            <div key={idx} className="stat-item glass-panel">
                                <h3 className="gradient-text">{stat.title}</h3>
                                <p>{stat.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
