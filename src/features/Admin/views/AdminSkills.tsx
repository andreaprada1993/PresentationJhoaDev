import { useState, FormEvent } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { ISkill } from '../../../types';
import { AdminInput } from '../components/FormElements';
import { Save, Plus, Trash2, Edit2, X, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminSkills = () => {
    const { skills, addSkill, updateSkill, deleteSkill } = usePortfolio();

    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);

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

    const handleDelete = async (index: number) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta habilidad?')) {
            try {
                await deleteSkill(index);
            } catch (e: any) {
                alert('Hubo un error: ' + (e.message || 'No se pudo eliminar la habilidad.'));
            }
        }
    };

    if (isEditing) {
        return (
            <div className="glass-panel p-8 animate-fade-in">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-heading font-semibold text-text-primary">
                        {editIndex !== null ? 'Editar Habilidad' : 'Nueva Habilidad'}
                    </h2>
                    <button onClick={closeForm} className="text-text-secondary hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <AdminInput
                        label="Nombre de la Habilidad"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="E.g. React, TypeScript, Node.js"
                        required
                    />

                    <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">
                            Nivel / Porcentaje ({level}%)
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={level}
                            onChange={(e) => setLevel(Number(e.target.value))}
                            className="w-full accent-accent-primary bg-white/5 rounded-lg appearance-none h-2 cursor-pointer"
                        />
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <button type="button" onClick={closeForm} className="btn bg-white/5 text-text-primary hover:bg-white/10">
                            Cancelar
                        </button>
                        <button type="submit" className="btn btn-primary flex items-center gap-2">
                            Guardar Habilidad <Save size={18} />
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in">
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
                    <div key={idx} className="glass-panel p-6 flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-heading text-text-primary">{skill.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-accent-primary" style={{ width: `${skill.level}%` }}></div>
                                </div>
                                <span className="text-xs text-text-secondary">{skill.level}%</span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => openEditForm(idx)}
                                className="p-2 rounded-lg bg-white/5 text-text-secondary hover:text-white hover:bg-white/10 transition-colors"
                            >
                                <Edit2 size={16} />
                            </button>
                            <button
                                onClick={() => handleDelete(idx)}
                                className="p-2 rounded-lg bg-white/5 text-red-400 hover:text-white hover:bg-red-500 transition-colors"
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
        </div>
    );
};

export default AdminSkills;
