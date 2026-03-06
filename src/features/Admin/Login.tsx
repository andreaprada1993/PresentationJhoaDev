import { useState, FormEvent } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const { data, error: sbError } = await supabase
                .from('settings')
                .select('value')
                .eq('key', 'admin_password')
                .single();

            if (sbError) console.warn("Supabase check failed, falling back to ENV", sbError);

            const dbPassword = data?.value;
            const envPassword = import.meta.env.VITE_ADMIN_PASSWORD;

            const isAuthorized = dbPassword
                ? (password === dbPassword)
                : (password === envPassword);

            if (isAuthorized) {
                login();
                navigate('/admin/dashboard');
            } else {
                setError('Contraseña incorrecta');
            }
        } catch (e: any) {
            console.error("Login Error", e);
            // On hard network error, allow ENV fallback if no DB could be reached
            if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
                login();
                navigate('/admin/dashboard');
            } else {
                setError('Contraseña incorrecta');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="glass-panel p-8 w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-heading font-bold mb-2 text-text-primary">Admin Login</h1>
                    <p className="text-text-secondary">Ingresa para administrar tu portafolio</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full bg-white/5 border border-glass-border rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-accent-primary transition-colors"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="btn btn-primary w-full justify-center"
                    >
                        {isLoading ? 'Verificando...' : 'Entrar'}
                    </button>
                </form>
                <div className="mt-6 text-center">
                    <a href="/" className="text-text-secondary hover:text-accent-primary text-sm transition-colors">Volver al sitio público</a>
                </div>
            </div>
        </div>
    );
};

export default Login;
