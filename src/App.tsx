import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Game from './components/Game';

// Admin Components
import { AuthProvider } from './context/AuthContext';
import { AdminLayout, ProtectedRoute } from './layout/AdminLayout';
import Login from './features/Admin/Login';
import Dashboard from './features/Admin/Dashboard';

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
                    {/* Add more admin routes here like /admin/projects */}
                    <Route path="" element={<Dashboard />} />
                  </Routes>
                </AdminLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
