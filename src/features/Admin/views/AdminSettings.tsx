import { useState, FormEvent } from 'react';
import { supabase } from '../../../lib/supabase';
import { AdminInput } from '../components/FormElements';
import { Save, Lock, ShieldCheck, AlertCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminSettings = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handlePasswordChange = async (e: FormEvent) => {
        e.preventDefault();
        setMessage(null);

        if (newPassword.length < 6) {
            setMessage({ type: 'error', text: 'La contraseña debe tener al menos 6 caracteres.' });
            return;
        }

        if (newPassword !== confirmPassword) {
            setMessage({ type: 'error', text: 'Las contraseñas no coinciden.' });
            return;
        }

        setIsSaving(true);

        try {
            // Update the admin_password key in the settings table
            const { error } = await supabase
                .from('settings')
                .update({
                    value: newPassword,
                    updated_at: new Date().toISOString()
                })
                .eq('key', 'admin_password');

            if (error) throw error;

            setMessage({ type: 'success', text: '¡Contraseña actualizada con éxito!' });
            setNewPassword('');
            setConfirmPassword('');
        } catch (e) {
            console.error("Error updating password", e);
            setMessage({ type: 'error', text: 'Error al actualizar la contraseña.' });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="animate-fade-in space-y-6">
            <Link to="/admin/dashboard" className="inline-flex items-center gap-2 text-text-secondary hover:text-accent-primary transition-colors">
                <ArrowLeft size={18} /> Regresar al Dashboard
            </Link>

            <header className="flex justify-between items-center bg-bg-secondary p-6 rounded-2xl border border-glass-border">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-text-primary">Configuración</h1>
                    <p className="text-text-secondary mt-1">Gestiona la seguridad de tu panel de administración.</p>
                </div>
            </header>

            <div className="max-w-2xl">
                <div className="glass-panel p-8">
                    <div className="flex items-center gap-3 mb-6 text-accent-primary">
                        <Lock size={24} />
                        <h2 className="text-xl font-heading font-semibold text-text-primary">Cambiar Contraseña</h2>
                    </div>

                    {message && (
                        <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${message.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                            }`}>
                            {message.type === 'success' ? <ShieldCheck size={20} /> : <AlertCircle size={20} />}
                            <p className="text-sm">{message.text}</p>
                        </div>
                    )}

                    <form onSubmit={handlePasswordChange} className="space-y-4">
                        <AdminInput
                            label="Nueva Contraseña"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Mínimo 6 caracteres"
                            required
                        />

                        <AdminInput
                            label="Confirmar Nueva Contraseña"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Repite la contraseña"
                            required
                        />

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isSaving}
                                className="btn btn-primary w-full justify-center flex items-center gap-2"
                            >
                                {isSaving ? 'Guardando...' : 'Actualizar Contraseña'}
                                {!isSaving && <Save size={18} />}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
