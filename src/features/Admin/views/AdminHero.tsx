import { useState, FormEvent } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { AdminInput, AdminTextarea } from '../components/FormElements';
import { Save, ArrowLeft, ShieldCheck, AlertCircle, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { IHeroStats } from '../../../types';

const AdminHero = () => {
    const { heroContent, updateHeroContent } = usePortfolio();

    const [title, setTitle] = useState(heroContent.title);
    const [subtitle, setSubtitle] = useState(heroContent.subtitle);
    const [badge, setBadge] = useState(heroContent.badge);
    const [description, setDescription] = useState(heroContent.description);
    const [history, setHistory] = useState(heroContent.history || '');
    const [linkedin, setLinkedin] = useState(heroContent.linkedin || '');
    const [whatsapp, setWhatsapp] = useState(heroContent.whatsapp || '');
    const [stats, setStats] = useState<IHeroStats[]>(heroContent.stats || []);

    const handleStatChange = (index: number, field: keyof IHeroStats, value: string) => {
        const newStats = [...stats];
        newStats[index] = { ...newStats[index], [field]: value };
        setStats(newStats);
    };

    const addStat = () => setStats([...stats, { title: '', description: '' }]);
    const removeStat = (index: number) => setStats(stats.filter((_, i) => i !== index));

    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage(null);

        try {
            await updateHeroContent({
                ...heroContent,
                title,
                subtitle,
                badge,
                description,
                history,
                linkedin,
                whatsapp,
                stats
            });
            setMessage({ type: 'success', text: '¡Sección Hero y Mi Historia actualizadas con éxito!' });
        } catch (error: any) {
            console.error(error);
            setMessage({ type: 'error', text: `Error al actualizar: ${error.message || 'Por favor, intenta de nuevo.'}` });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="animate-fade-in space-y-6">
            <Link to="/admin/dashboard" className="inline-flex items-center gap-2 text-text-secondary hover:text-accent-primary transition-colors mb-2">
                <ArrowLeft size={18} /> Regresar al Dashboard
            </Link>

            <div className="glass-panel p-8">
                <h2 className="text-2xl font-heading font-semibold text-text-primary mb-6">Editar Sección Principal e Historia</h2>

                {message && (
                    <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${message.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                        }`}>
                        {message.type === 'success' ? <ShieldCheck size={20} /> : <AlertCircle size={20} />}
                        <p className="text-sm">{message.text}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <AdminInput
                        label="Título Principal"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="E.g. Andrea Prada"
                    />

                    <AdminInput
                        label="Subtítulo"
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
                        placeholder="E.g. Arquitecta de Software"
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
                        rows={3}
                    />

                    <AdminTextarea
                        label="Mi Historia (Sección About)"
                        value={history}
                        onChange={(e) => setHistory(e.target.value)}
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

                    <div className="pt-6 mt-6 border-t border-glass-border">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-heading font-semibold text-text-primary">Tarjetas de Estadísticas Principales</h3>
                            <button
                                type="button"
                                onClick={addStat}
                                className="text-sm flex items-center gap-1 text-accent-primary hover:text-white transition-colors bg-accent-primary/10 hover:bg-accent-primary px-3 py-1.5 rounded-lg"
                            >
                                <Plus size={16} /> Añadir Tarjeta
                            </button>
                        </div>

                        <div className="space-y-4">
                            {stats.length === 0 && (
                                <p className="text-text-tertiary text-sm italic">No hay tarjetas de estadísticas configuradas.</p>
                            )}
                            {stats.map((stat, idx) => (
                                <div key={idx} className="bg-black/20 p-5 rounded-xl border border-glass-border flex flex-col gap-4 relative group">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium text-text-secondary">Tarjeta #{idx + 1}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeStat(idx)}
                                            className="text-red-400/50 hover:text-red-400 transition-colors p-1"
                                            title="Eliminar esta tarjeta"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4">
                                        <AdminInput
                                            label="Título (E.g. Backend & Cloud)"
                                            value={stat.title}
                                            onChange={(e) => handleStatChange(idx, 'title', e.target.value)}
                                        />
                                        <AdminInput
                                            label="Descripción (E.g. Node.js, Docker...)"
                                            value={stat.description}
                                            onChange={(e) => handleStatChange(idx, 'description', e.target.value)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
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
