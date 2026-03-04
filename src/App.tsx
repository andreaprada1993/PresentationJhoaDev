import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Game from './components/Game';

// Admin Components
import { AuthProvider } from './context/AuthContext';
import { PortfolioProvider } from './context/PortfolioContext';
import { AdminLayout, ProtectedRoute } from './layout/AdminLayout';
import Login from './features/Admin/Login';
import Dashboard from './features/Admin/Dashboard';
import AdminHero from './features/Admin/views/AdminHero';
import AdminProjects from './features/Admin/views/AdminProjects';
import AdminSkills from './features/Admin/views/AdminSkills';
import AdminSettings from './features/Admin/views/AdminSettings';

// Public Page
const PublicPage = () => (
  <MainLayout>
    <Hero />
    <About />
    <Projects />
    <Game />
  </MainLayout>
);

function App() {
  return (
    <AuthProvider>
      <PortfolioProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Website */}
            <Route path="/" element={<PublicPage />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <Routes>
                      <Route path="dashboard" element={<Dashboard />} />
                      <Route path="hero" element={<AdminHero />} />
                      <Route path="projects" element={<AdminProjects />} />
                      <Route path="skills" element={<AdminSkills />} />
                      <Route path="settings" element={<AdminSettings />} />
                      <Route path="" element={<Dashboard />} />
                    </Routes>
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </PortfolioProvider>
    </AuthProvider>
  );
}

export default App;
