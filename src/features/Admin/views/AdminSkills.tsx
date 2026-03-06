import { useState, FormEvent } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { ISkill } from '../../../types';
import { AdminInput } from '../components/FormElements';
import { Save, Plus, Trash2, Edit2, X, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ConfirmModal } from '../components/ConfirmModal';

const AdminSkills = () => {
    const { skills, addSkill, updateSkill, deleteSkill } = usePortfolio();

    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<number | null>(null);

    // Form state
    const [name, setName] = useState('');
    const [level, setLevel] = useState(80);

    const openEditForm = (index: number | null = null) => {
        if (index !== null) {
            const skill = skills[index];
            setName(skill.name);
            setLevel(skill.level);
            setEditIndex(index);
        } else {
            setName('');
            setLevel(80);
            setEditIndex(null);
        }
        setIsEditing(true);
    };

    const closeForm = () => {
        setIsEditing(false);
        setEditIndex(null);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const skillData: ISkill = {
            name,
            level: Number(level)
        };

        try {
            if (editIndex !== null) {
                await updateSkill(editIndex, skillData);
            } else {
                await addSkill(skillData);
            }

            closeForm();
            alert('¡Habilidad guardada con éxito!');
        } catch (e: any) {
            alert('Hubo un error: ' + (e.message || 'No se pudo guardar la habilidad. Revisa la consola o configuración de Supabase.'));
        }
    };

    const triggerDelete = (index: number) => {
        setItemToDelete(index);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (itemToDelete !== null) {
            try {
                await deleteSkill(itemToDelete);
            } catch (e: any) {
                alert('Hubo un error: ' + (e.message || 'No se pudo eliminar la habilidad.'));
            }
            setItemToDelete(null);
            setIsDeleteModalOpen(false);
        }
    };

    return (
        <div className="space-y-6 animate-fade-in relative hidden-scrollbar">
            <Link to="/admin/dashboard" className="inline-flex items-center gap-2 text-text-secondary hover:text-accent-primary transition-colors">
                <ArrowLeft size={18} /> Regresar al Dashboard
            </Link>

            <div className="flex justify-between items-center bg-bg-secondary p-6 rounded-2xl border border-glass-border">
                <h2 className="text-2xl font-heading font-semibold text-text-primary">Gestión de Habilidades</h2>
                <button onClick={() => openEditForm(null)} className="btn btn-primary flex items-center gap-2 py-2">
                    <Plus size={18} /> Nueva Habilidad
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {skills.map((skill, idx) => (
                    <div key={idx} className="glass-panel p-6 flex justify-between items-center group">
                        <div className="w-full pr-4">
                            <h3 className="text-lg font-heading text-text-primary truncate">{skill.name}</h3>
                            <div className="flex items-center gap-2 mt-2 w-full">
                                <span className="text-xs font-semibold text-accent-primary min-w-[3ch]">{skill.level}%</span>
                                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-accent-primary rounded-full transition-all duration-500 ease-out" style={{ width: `${skill.level}%` }}></div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 shrink-0">
                            <button
                                onClick={() => openEditForm(idx)}
                                className="p-2 rounded-lg bg-white/5 text-text-secondary hover:text-accent-primary hover:bg-white/10 transition-colors"
                            >
                                <Edit2 size={16} />
                            </button>
                            <button
                                onClick={() => triggerDelete(idx)}
                                className="p-2 rounded-lg bg-white/5 text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}

                {skills.length === 0 && (
                    <div className="col-span-full glass-panel p-12 text-center text-text-secondary">
                        <p>No hay habilidades registradas.</p>
                        <button onClick={() => openEditForm(null)} className="mt-4 text-accent-primary hover:underline">
                            Añade tu primera habilidad
                        </button>
                    </div>
                )}
            </div>

            {/* Modal de Edición */}
            {isEditing && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-bg-primary border border-glass-border w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
                        <div className="flex justify-between items-center p-6 border-b border-glass-border bg-bg-secondary/50">
                            <h2 className="text-xl font-heading font-semibold text-text-primary">
                                {editIndex !== null ? 'Editar Habilidad' : 'Nueva Habilidad'}
                            </h2>
                            <button onClick={closeForm} className="text-text-secondary hover:text-white transition-colors p-1 rounded-md hover:bg-white/10">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <AdminInput
                                label="Nombre de la Habilidad"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="E.g. React, TypeScript, Node.js"
                                required
                            />

                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="block text-sm font-medium text-text-secondary">
                                        Nivel de Dominio
                                    </label>
                                    <span className="text-sm font-bold text-accent-primary">{level}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={level}
                                    onChange={(e) => setLevel(Number(e.target.value))}
                                    className="w-full accent-accent-primary cursor-pointer outline-none"
                                />
                                <div className="flex justify-between text-xs text-text-tertiary mt-2">
                                    <span>Básico</span>
                                    <span>Intermedio</span>
                                    <span>Avanzado</span>
                                    <span>Experto</span>
                                </div>
                            </div>

                            <div className="pt-6 flex justify-end gap-3 border-t border-glass-border">
                                <button type="button" onClick={closeForm} className="px-4 py-2 rounded-lg font-medium text-text-secondary hover:bg-white/5 hover:text-white transition-colors">
                                    Cancelar
                                </button>
                                <button type="submit" className="btn btn-primary flex items-center gap-2 py-2">
                                    Guardar <Save size={18} />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <ConfirmModal
                isOpen={isDeleteModalOpen}
                title="Eliminar Habilidad"
                message="¿Estás seguro de que deseas eliminar esta habilidad? Esta acción no se puede deshacer."
                onConfirm={confirmDelete}
                onCancel={() => {
                    setIsDeleteModalOpen(false);
                    setItemToDelete(null);
                }}
            />
        </div>
    );
};

export default AdminSkills;
