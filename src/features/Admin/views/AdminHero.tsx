import { useState, FormEvent } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { AdminInput, AdminTextarea } from '../components/FormElements';
import { Save, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminHero = () => {
    const { heroContent, updateHeroContent } = usePortfolio();

    const [title, setTitle] = useState(heroContent.title);
    const [subtitle, setSubtitle] = useState(heroContent.subtitle);
    const [badge, setBadge] = useState(heroContent.badge);
    const [description, setDescription] = useState(heroContent.description);
    const [history, setHistory] = useState(heroContent.history || '');
    const [linkedin, setLinkedin] = useState(heroContent.linkedin || '');
    const [whatsapp, setWhatsapp] = useState(heroContent.whatsapp || '');

    const [isSaving, setIsSaving] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        updateHeroContent({
            ...heroContent,
            title,
            subtitle,
            badge,
            description,
            history,
            linkedin,
            whatsapp
        });

        // Simulating artificial delay for UI feedback
        setTimeout(() => {
            setIsSaving(false);
            alert('¡Sección Hero y Mi Historia actualizadas con éxito!');
        }, 600);
    };

    return (
        <div className="animate-fade-in space-y-6">
            <Link to="/admin/dashboard" className="inline-flex items-center gap-2 text-text-secondary hover:text-accent-primary transition-colors mb-2">
                <ArrowLeft size={18} /> Regresar al Dashboard
            </Link>

            <div className="glass-panel p-8">
                <h2 className="text-2xl font-heading font-semibold text-text-primary mb-6">Editar Sección Principal e Historia</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <AdminInput
                        label="Título Principal"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="E.g. Andrea Prada"
                        required
                    />

                    <AdminInput
                        label="Subtítulo"
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
                        placeholder="E.g. Arquitecta de Software"
                        required
                    />

                    <AdminInput
                        label="Texto de Etiqueta (Badge)"
                        value={badge}
                        onChange={(e) => setBadge(e.target.value)}
                        placeholder="E.g. Disponible para nuevas oportunidades"
                    />

                    <AdminTextarea
                        label="Descripción Corta (Hero)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        rows={3}
                    />

                    <AdminTextarea
                        label="Mi Historia (Sección About)"
                        value={history}
                        onChange={(e) => setHistory(e.target.value)}
                        required
                        rows={8}
                        placeholder="Aquí puedes escribir tu biografía detallada..."
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-glass-border pt-6 mt-6">
                        <AdminInput
                            label="URL de LinkedIn"
                            value={linkedin}
                            onChange={(e) => setLinkedin(e.target.value)}
                            placeholder="https://linkedin.com/in/..."
                        />
                        <AdminInput
                            label="Número de WhatsApp"
                            value={whatsapp}
                            onChange={(e) => setWhatsapp(e.target.value)}
                            placeholder="E.g. +573001234567"
                        />
                    </div>

                    <div className="pt-4 flex justify-end">
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="btn btn-primary flex items-center gap-2"
                        >
                            {isSaving ? 'Guardando...' : 'Guardar Cambios'}
                            {!isSaving && <Save size={18} />}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminHero;
