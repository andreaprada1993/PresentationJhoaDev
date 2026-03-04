import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="animate-fade-in space-y-8">
            <header className="flex justify-between items-center bg-bg-secondary p-6 rounded-2xl border border-glass-border">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-text-primary">Hola, Andrea 👋</h1>
                    <p className="text-text-secondary mt-1">Este es tu espacio para gestionar el portafolio.</p>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="glass-panel p-6">
                    <h3 className="text-xl font-heading font-semibold mb-2 text-text-primary">Proyectos</h3>
                    <p className="text-text-secondary mb-4">Gestiona los proyectos que aparecen en tu portafolio.</p>
                    <Link to="/admin/projects" className="btn btn-primary w-full justify-center">Editar Proyectos</Link>
                </div>
                <div className="glass-panel p-6">
                    <h3 className="text-xl font-heading font-semibold mb-2 text-text-primary">Habilidades</h3>
                    <p className="text-text-secondary mb-4">Actualiza tus habilidades y herramientas.</p>
                    <Link to="/admin/skills" className="btn btn-secondary w-full justify-center">Editar Habilidades</Link>
                </div>
                <div className="glass-panel p-6">
                    <h3 className="text-xl font-heading font-semibold mb-2 text-text-primary">Perfil & Hero</h3>
                    <p className="text-text-secondary mb-4">Edita tu bio, enlaces sociales y encabezado.</p>
                    <Link to="/admin/hero" className="btn btn-secondary w-full justify-center">Editar Perfil</Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
