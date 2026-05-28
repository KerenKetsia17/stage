// =============================================================
// FICHIER : src/main.jsx
// RÔLE    : Point d'entrée de l'application React fournisseur.
//
//           Monte le composant <App /> dans le DOM (#root).
//           L'initialisation Firebase et le contexte Auth
//           sont gérés dans App.jsx via <AuthProvider>.
// =============================================================

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
