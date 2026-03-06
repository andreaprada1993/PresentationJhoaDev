import { useState, FormEvent } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { IProject } from '../../../types';
import { AdminInput, AdminTextarea } from '../components/FormElements';
import { Save, Plus, Trash2, Edit2, X, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminProjects = () => {
    const { projects, addProject, updateProject, deleteProject } = usePortfolio();

    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);

    // Form state
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [tags, setTags] = useState('');
    const [liveUrl, setLiveUrl] = useState('');
    const [githubUrl, setGithubUrl] = useState('');

    const openEditForm = (index: number | null = null) => {
        if (index !== null) {
            const proj = projects[index];
            setTitle(proj.title);
            setDescription(proj.description);
            setImage(proj.image);
            setTags(proj.tags.join(', '));
            setLiveUrl(proj.liveUrl);
            setGithubUrl(proj.githubUrl);
            setEditIndex(index);
        } else {
            setTitle('');
            setDescription('');
            setImage('');
            setTags('');
            setLiveUrl('');
            setGithubUrl('');
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

        const newProject: IProject = {
            title,
            description,
            image,
            tags: tags.split(',').map(t => t.trim()).filter(Boolean),
            liveUrl,
            githubUrl
        };

        try {
            if (editIndex !== null) {
                await updateProject(editIndex, newProject);
            } else {
                await addProject(newProject);
            }

            closeForm();
            alert('¡Proyecto guardado con éxito!');
        } catch (e: any) {
            alert('Hubo un error: ' + (e.message || 'No se pudo guardar el proyecto. Revisa la consola o configuración de Supabase.'));
        }
    };

    const handleDelete = async (index: number) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este proyecto?')) {
            try {
                await deleteProject(index);
            } catch (e: any) {
                alert('Hubo un error: ' + (e.message || 'No se pudo eliminar el proyecto.'));
            }
        }
    };

    return (
        <div className="space-y-6 animate-fade-in relative hidden-scrollbar">
            <Link to="/admin/dashboard" className="inline-flex items-center gap-2 text-text-secondary hover:text-accent-primary transition-colors">
                <ArrowLeft size={18} /> Regresar al Dashboard
            </Link>

            <div className="flex justify-between items-center bg-bg-secondary p-6 rounded-2xl border border-glass-border">
                <h2 className="text-2xl font-heading font-semibold text-text-primary">Gestión de Proyectos</h2>
                <button onClick={() => openEditForm(null)} className="btn btn-primary flex items-center gap-2 py-2">
                    <Plus size={18} /> Nuevo Proyecto
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {projects.map((project, idx) => (
                    <div key={idx} className="glass-panel p-6 flex flex-col md:flex-row gap-6 items-center">
                        {project.image && (
                            <img src={project.image} alt={project.title} className="w-full md:w-[200px] h-[120px] object-cover rounded-xl border border-glass-border/50" />
                        )}
                        <div className="flex-1 w-full">
                            <h3 className="text-xl font-heading text-text-primary mb-2">{project.title}</h3>
                            <p className="text-text-secondary text-sm mb-3 line-clamp-2">{project.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag, tIdx) => (
                                    <span key={tIdx} className="text-xs px-2 py-1 rounded bg-white/5 text-text-tertiary">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="flex md:flex-col gap-2 w-full md:w-auto mt-4 md:mt-0">
                            <button
                                onClick={() => openEditForm(idx)}
                                className="flex-1 md:flex-none p-2 rounded-lg bg-white/5 text-text-secondary hover:text-accent-primary hover:bg-white/10 transition-colors flex justify-center items-center"
                                title="Editar Proyecto"
                            >
                                <Edit2 size={16} />
                            </button>
                            <button
                                onClick={() => handleDelete(idx)}
                                className="flex-1 md:flex-none p-2 rounded-lg bg-white/5 text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-colors flex justify-center items-center"
                                title="Eliminar Proyecto"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}

                {projects.length === 0 && (
                    <div className="glass-panel p-12 text-center text-text-secondary">
                        <p>No hay proyectos en el portafolio todavía.</p>
                        <button onClick={() => openEditForm(null)} className="mt-4 text-accent-primary hover:underline">
                            Añade tu primer proyecto
                        </button>
                    </div>
                )}
            </div>

            {/* Modal de Edición */}
            {isEditing && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
                    <div className="bg-bg-primary border border-glass-border w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden animate-slide-up my-auto">
                        <div className="flex justify-between items-center p-6 border-b border-glass-border bg-bg-secondary/50">
                            <h2 className="text-xl font-heading font-semibold text-text-primary">
                                {editIndex !== null ? 'Editar Proyecto' : 'Nuevo Proyecto'}
                            </h2>
                            <button onClick={closeForm} className="text-text-secondary hover:text-white transition-colors p-1 rounded-md hover:bg-white/10">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-5">
                            <AdminInput
                                label="Título del Proyecto"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="E.g. E-Commerce Microservices"
                            />

                            <AdminTextarea
                                label="Descripción"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={3}
                            />

                            <AdminInput
                                label="URL de la Imagen"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                placeholder="https://..."
                            />

                            <AdminInput
                                label="Etiquetas (separadas por coma)"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                placeholder="React, Node.js, MongoDB"
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <AdminInput
                                    label="URL en Vivo"
                                    value={liveUrl}
                                    onChange={(e) => setLiveUrl(e.target.value)}
                                    placeholder="https://..."
                                />
                                <AdminInput
                                    label="URL de GitHub"
                                    value={githubUrl}
                                    onChange={(e) => setGithubUrl(e.target.value)}
                                    placeholder="https://github.com/..."
                                />
                            </div>

                            <div className="pt-6 flex justify-end gap-3 border-t border-glass-border mt-4">
                                <button type="button" onClick={closeForm} className="px-4 py-2 rounded-lg font-medium text-text-secondary hover:bg-white/5 hover:text-white transition-colors">
                                    Cancelar
                                </button>
                                <button type="submit" className="btn btn-primary flex items-center gap-2 py-2">
                                    Guardar Proyecto <Save size={18} />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProjects;
