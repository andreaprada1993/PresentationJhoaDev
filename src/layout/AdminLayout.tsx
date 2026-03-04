import { useState, ReactNode } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, Link, useLocation } from 'react-router-dom';
import { Menu, X, LayoutDashboard, User, FolderCode, Code2, Settings, ExternalLink, LogOut } from 'lucide-react';

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
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    const navItems = [
        { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
        { label: 'Perfil & Hero', path: '/admin/hero', icon: User },
        { label: 'Proyectos', path: '/admin/projects', icon: FolderCode },
        { label: 'Habilidades', path: '/admin/skills', icon: Code2 },
        { label: 'Configuración', path: '/admin/settings', icon: Settings },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="flex h-screen bg-bg-primary text-text-primary overflow-hidden relative">
            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed md:relative w-64 h-full bg-bg-secondary border-r border-border p-6 flex flex-col z-[101]
                transition-transform duration-300 ease-in-out
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl font-heading font-bold gradient-text">Admin Panel</h2>
                    <button className="md:hidden text-text-secondary" onClick={() => setIsMobileMenuOpen(false)}>
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-grow flex flex-col gap-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive(item.path)
                                        ? 'bg-accent-primary/10 text-accent-primary border border-accent-primary/20'
                                        : 'text-text-secondary hover:bg-white/5 hover:text-text-primary'
                                    }`}
                            >
                                <Icon size={18} />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        );
                    })}

                    <div className="my-4 border-t border-glass-border"></div>

                    <a
                        href="/"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-text-secondary hover:bg-white/5 hover:text-text-primary transition-all duration-300"
                    >
                        <ExternalLink size={18} />
                        <span className="font-medium">Ver Sitio</span>
                    </a>
                </nav>

                <div className="mt-auto">
                    <button
                        onClick={logout}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300"
                    >
                        <LogOut size={18} />
                        <span className="font-medium">Cerrar Sesión</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Dashboard */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Mobile Header */}
                <header className="md:hidden h-16 bg-bg-secondary border-b border-border flex items-center justify-between px-6 shrink-0">
                    <h2 className="font-bold gradient-text">Admin</h2>
                    <button className="text-text-primary p-2" onClick={() => setIsMobileMenuOpen(true)}>
                        <Menu size={24} />
                    </button>
                </header>

                <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full">
                    {children}
                </main>
            </div>
        </div>
    );
};
