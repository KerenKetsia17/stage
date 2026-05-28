import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Truck, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { utiliserAuth } from '../hooks/utiliserAuth';

/* Slides du carrousel gauche */
const SLIDES = [
  {
    img: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=900&q=80&auto=format&fit=crop',
    titre: 'Livrez vite,\nlivrez bien.',
    sous: 'Coordonnez vos camions en temps réel.',
  },
  {
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80&auto=format&fit=crop',
    titre: 'Vos matériaux,\ntoujours à temps.',
    sous: 'Gérez sable, béton, gravier depuis votre téléphone.',
  },
  {
    img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80&auto=format&fit=crop',
    titre: 'Construisez\nplus vite.',
    sous: 'Des chantiers approvisionnés sans délai.',
  },
];

export default function PageConnexion() {
  const { connexion } = utiliserAuth();
  const navigate = useNavigate();

  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd]   = useState(false);
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const [slide, setSlide]       = useState(0);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await connexion(email, password);
      navigate('/dashboard');
    } catch (err) {
      const messages = {
        'auth/wrong-password':    'Mot de passe incorrect.',
        'auth/user-not-found':    'Aucun compte trouvé pour cet email.',
        'auth/invalid-email':     'Adresse email invalide.',
        'auth/too-many-requests': 'Trop de tentatives. Réessayez plus tard.',
      };
      setError(messages[err.code] || 'Identifiants incorrects. Réessayez.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-stretch" style={{ backgroundColor: '#0d1b2e' }}>

      {/* ═══ PANNEAU GAUCHE — illustration ═══ */}
      <div className="hidden lg:flex lg:w-[52%] relative overflow-hidden rounded-r-3xl">
        {/* Image de fond avec transition douce */}
        {SLIDES.map((s, i) => (
          <div
            key={i}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
            style={{
              backgroundImage: `url('${s.img}')`,
              opacity: slide === i ? 1 : 0,
            }}
          />
        ))}

        {/* Overlay dégradé sombre */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(5,12,28,0.92) 0%, rgba(5,12,28,0.45) 55%, rgba(5,12,28,0.3) 100%)' }}
        />

        {/* Contenu */}
        <div className="relative z-10 flex flex-col h-full p-10">
          {/* Logo + retour */}
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="rounded-lg p-1.5" style={{ backgroundColor: '#f5c300' }}>
                <Truck className="w-4 h-4" style={{ color: '#0d1b2e' }} />
              </div>
              <span className="text-white text-lg" style={{ fontWeight: 600 }}>CamionSuf</span>
            </Link>
            <Link
              to="/"
              className="text-xs px-4 py-2 rounded-full transition-all hover:bg-white/20"
              style={{ border: '1px solid rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.75)' }}
            >
              ← Retour au site
            </Link>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Texte du slide */}
          <div className="mb-6">
            <h2
              className="text-4xl leading-tight text-white mb-2 whitespace-pre-line"
              style={{ fontWeight: 600 }}
            >
              {SLIDES[slide].titre}
            </h2>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
              {SLIDES[slide].sous}
            </p>
          </div>

          {/* Dots carrousel */}
          <div className="flex gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                className="rounded-full transition-all"
                style={{
                  width: slide === i ? 24 : 8,
                  height: 8,
                  backgroundColor: slide === i ? '#f5c300' : 'rgba(255,255,255,0.25)',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ═══ PANNEAU DROIT — formulaire ═══ */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10" style={{ backgroundColor: '#111827' }}>

        {/* Logo mobile uniquement */}
        <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
          <div className="rounded-lg p-1.5" style={{ backgroundColor: '#f5c300' }}>
            <Truck className="w-4 h-4" style={{ color: '#0d1b2e' }} />
          </div>
          <span className="text-white text-lg" style={{ fontWeight: 600 }}>CamionSuf</span>
        </Link>

        <div className="w-full max-w-sm">
          <h1 className="text-3xl text-white mb-1" style={{ fontWeight: 600 }}>Connexion</h1>
          <p className="text-sm mb-8" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Pas encore de compte ?{' '}
            <Link to="/#contact" className="hover:underline" style={{ color: '#f5c300', fontWeight: 500 }}>
              Faire une demande
            </Link>
          </p>

          {/* Erreur */}
          {error && (
            <div
              className="flex items-start gap-2 rounded-xl p-3 mb-5 text-sm"
              style={{ backgroundColor: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5' }}
            >
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="text-xs block mb-1.5" style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>
                Adresse email
              </label>
              <input
                type="email"
                autoComplete="email"
                placeholder="vous@exemple.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                style={{ backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
              />
            </div>

            {/* Mot de passe */}
            <div>
              <label className="text-xs block mb-1.5" style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPwd ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="w-full rounded-xl px-4 py-3 pr-11 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                  style={{ backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: 'rgba(255,255,255,0.35)' }}
                  tabIndex={-1}
                >
                  {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Bouton connexion */}
            <button
              type="submit"
              disabled={loading}
              className="w-full text-sm py-3.5 rounded-xl transition-all hover:brightness-110 disabled:opacity-50 mt-2"
              style={{ backgroundColor: '#f5c300', color: '#0d1b2e', fontWeight: 600 }}
            >
              {loading ? 'Connexion en cours...' : 'Se connecter'}
            </button>
          </form>

          {/* Séparateur */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }} />
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>Accès démo</span>
            <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }} />
          </div>

          {/* Bouton démo rapide */}
          <button
            type="button"
            onClick={() => { setEmail('sow@yahoo.fr'); setPassword('passer1'); }}
            className="w-full text-sm py-3 rounded-xl transition-all hover:brightness-110"
            style={{ backgroundColor: 'rgba(245,195,0,0.1)', border: '1px solid rgba(245,195,0,0.25)', color: '#f5c300', fontWeight: 500 }}
          >
            Remplir avec le compte démo
          </button>

          <p className="text-center text-[11px] mt-4" style={{ color: 'rgba(255,255,255,0.2)' }}>
            sow@yahoo.fr · mot de passe ≥ 6 caractères
          </p>
        </div>
      </div>

    </div>
  );
}
