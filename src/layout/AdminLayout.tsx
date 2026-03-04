import { ReactNode } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
    return <>{children}</>;
};

export const AdminLayout = ({ children }: { children: ReactNode }) => {
    const { logout } = useAuth();

    return (
        <div className="flex h-screen bg-bg-primary text-text-primary overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-bg-secondary border-r border-border p-6 flex flex-col">
                <div className="mb-8">
                    <h2 className="text-xl font-heading font-bold gradient-text">Admin Panel</h2>
                </div>

                <nav className="flex-grow flex flex-col gap-2">
                    <a href="/admin/dashboard" className="px-4 py-2 rounded-lg bg-white/5 text-text-primary hover:bg-white/10 transition-colors">Dashboard</a>
                    <a href="/" className="px-4 py-2 rounded-lg text-text-secondary hover:bg-white/5 hover:text-text-primary transition-colors">Ver Sitio Publico</a>
                </nav>

                <div className="mt-auto">
                    <button onClick={logout} className="w-full btn btn-secondary mt-4">Cerrar Sesión</button>
                </div>
            </aside>

            {/* Main Content Dashboard */}
            <main className="flex-1 p-8 overflow-y-auto w-full">
                {children}
            </main>
        </div>
    );
};
