import { ArrowRight, Download } from 'lucide-react';

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center pt-[80px] overflow-hidden" id="home">
            <div className="blob-1 bg-blob"></div>
            <div className="blob-2 bg-blob"></div>

            <div className="container flex flex-col justify-center items-center text-center relative z-10 w-full">
                <div className="max-w-[800px] mx-auto animate-fade-in">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8 text-text-secondary glass-panel">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981] animate-[pulse-dot_2s_infinite]"></span>
                        Disponible para nuevas oportunidades
                    </div>

                    <h1 className="text-[clamp(2.5rem,5vw+1rem,4.5rem)] tracking-tight mb-6 text-text-primary">
                        Hola, soy <span className="gradient-text">Andrea Prada</span>
                        <br /> Arquitecta de Software & Full-Stack
                    </h1>

                    <p className="text-[clamp(1rem,2vw,1.25rem)] text-text-secondary mb-10 max-w-[700px] mx-auto">
                        Especialista en construir aplicaciones robustas con <strong>TypeScript</strong> y arquitecturas escalables basadas en <strong>Microservicios</strong>.
                        Me apasiona resolver problemas complejos (ese "desmadre" del backend) y crear experiencias fluidas y tipadas de principio a fin.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 mb-16">
                        <a href="#projects" className="btn btn-primary">
                            Ver Arquitectura <ArrowRight size={20} />
                        </a>
                        <a href="#" className="btn btn-secondary">
                            Descargar CV <Download size={20} />
                        </a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 w-full">
                        <div className="p-6 text-left transition-transform duration-300 ease-in-out hover:-translate-y-1.5 glass-panel">
                            <h3 className="text-2xl mb-2 gradient-text">Backend & Cloud</h3>
                            <p className="text-text-secondary text-[0.95rem]">Microservicios, Docker, Kubernetes, Node.js</p>
                        </div>
                        <div className="p-6 text-left transition-transform duration-300 ease-in-out hover:-translate-y-1.5 glass-panel">
                            <h3 className="text-2xl mb-2 gradient-text">Frontend Seguros</h3>
                            <p className="text-text-secondary text-[0.95rem]">React, TypeScript Estricto, UI Moderna</p>
                        </div>
                    </div>
                </div>
            </div>

            <style>
                {`
                    @keyframes pulse-dot {
                        0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
                        70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
                        100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
                    }
                `}
            </style>
        </section>
    );
};

export default Hero;
