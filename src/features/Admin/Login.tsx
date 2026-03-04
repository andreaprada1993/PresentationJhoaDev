import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Super simple mock auth
        if (password === 'admin123') {
            login();
            navigate('/admin/dashboard');
        } else {
            setError('Contraseña incorrecta');
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
                    <button type="submit" className="btn btn-primary w-full justify-center">Entrar</button>
                </form>
                <div className="mt-6 text-center">
                    <a href="/" className="text-text-secondary hover:text-accent-primary text-sm transition-colors">Volver al sitio público</a>
                </div>
            </div>
        </div>
    );
};

export default Login;
