// =============================================================
// FICHIER : src/App.jsx
// RÔLE    : Routeur principal de l'application fournisseur.
//
//           Englobe toute l'app dans <AuthProvider> (contexte
//           d'authentification global) et definit les routes :
//             /           → LandingPage (publique)
//             /login      → PageConnexion
//             /dashboard  → TableauDeBordFournisseur (protégée)
//             /commandes  → PageCommandes (protégée)
//             /stock      → PageStock (protégée)
//
//           <ProtectedRoute> redirige vers /login si non connecté.
// =============================================================

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { utiliserAuth } from './hooks/utiliserAuth';

// Layout partagé
import LayoutFournisseur from './components/LayoutFournisseur';

// Pages
import LandingPage from './pages/LandingPage';
import PageConnexion from './pages/PageConnexion';
import TableauDeBordFournisseur from './pages/TableauDeBordFournisseur';
import PageCommandes from './pages/PageCommandes';
import PageStock from './pages/PageStock';

// Composant pour protéger les routes
function ProtectedRoute({ children }) {
  const { user, loading, userRole } = utiliserAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Routes publiques */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<PageConnexion />} />

          {/* Routes protégées — layout avec sidebar partagée */}
          <Route
            element={
              <ProtectedRoute>
                <LayoutFournisseur />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard"          element={<TableauDeBordFournisseur />} />
            <Route path="/orders"             element={<PageCommandes />} />
            <Route path="/stock"              element={<PageStock />} />
          </Route>

        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
