

import { usePortfolio } from '../context/PortfolioContext';
import { FEATURES_DATA } from '../data/portfolio.data';

const About = () => {
    const { skills } = usePortfolio();

    return (
        <section className="relative z-10 section-padding" id="about">
            <div className="container">
                <h2 className="section-title">
                    <span>Conoce más</span>
                    Sobre Mí
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    <div className="p-10 glass-panel">
                        <h3 className="text-[2rem] mb-6 gradient-text">Mi Historia</h3>
                        <p className="text-text-secondary text-[1.05rem] mb-6 leading-[1.8]">
                            Soy una Desarrolladora de Software comprometida con la creación de soluciones innovadoras y eficientes.
                            Mi especialidad radica en la <strong>gestión de la complejidad técnica</strong> en sistemas de gran escala mediante
                            <strong>Arquitecturas de Microservicios</strong> robustas y el desarrollo de código escalable con <strong>TypeScript</strong>.
                        </p>
                        <p className="text-text-secondary text-[1.05rem] mb-6 leading-[1.8]">
                            Me encanta el desarrollo End-to-End: desde diseñar un clúster escalable y bases de datos distribuidas en el backend,
                            hasta construir una interfaz de usuario en React sumamente fluida y atractiva en el frontend.
                        </p>

                        <div className="mt-8">
                            <h4 className="mb-6 text-xl text-text-primary">Habilidades Técnicas</h4>
                            <div className="flex flex-col gap-5">
                                {skills.map((skill, idx) => (
                                    <div key={idx} className="w-full">
                                        <div className="flex justify-between mb-2 text-[0.9rem] font-medium text-text-primary">
                                            <span>{skill.name}</span>
                                            <span>{skill.level}%</span>
                                        </div>
                                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full transition-all duration-[1.5s] ease-out"
                                                style={{ width: `${skill.level}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {FEATURES_DATA.map((feature, idx) => (
                            <div key={idx} className="p-8 glass-panel">
                                <div className="w-[50px] h-[50px] rounded-xl bg-indigo-500/10 text-accent-primary flex items-center justify-center mb-6">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl mb-4 text-text-primary">{feature.title}</h3>
                                <p className="text-text-secondary text-[0.95rem] leading-[1.6]">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
