import { useState, FormEvent } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { AdminInput, AdminTextarea } from '../components/FormElements';
import { Save } from 'lucide-react';

const AdminHero = () => {
    const { heroContent, updateHeroContent } = usePortfolio();

    const [title, setTitle] = useState(heroContent.title);
    const [subtitle, setSubtitle] = useState(heroContent.subtitle);
    const [badge, setBadge] = useState(heroContent.badge);
    const [description, setDescription] = useState(heroContent.description);

    const [isSaving, setIsSaving] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        updateHeroContent({
            title,
            subtitle,
            badge,
            description
        });

        // Simulating artificial delay for UI feedback
        setTimeout(() => {
            setIsSaving(false);
            alert('¡Sección Hero actualizada con éxito!');
        }, 600);
    };

    return (
        <div className="glass-panel p-8 animate-fade-in">
            <h2 className="text-2xl font-heading font-semibold text-text-primary mb-6">Editar Sección Principal (Hero)</h2>

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
                    label="Descripción Biográfica (Usa **texto** para negritas)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    rows={4}
                />

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
    );
};

export default AdminHero;
