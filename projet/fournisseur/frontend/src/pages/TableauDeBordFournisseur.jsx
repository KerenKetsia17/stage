import { useState, useEffect, useRef } from 'react';
import ModalDetailCommande from '../components/ModalDetailCommande';
import { Search } from 'lucide-react';
import { utiliserAuth } from '../hooks/utiliserAuth';
import { realtimeDb, rtRef, rtOnValue, rtUpdate } from '../firebase';

const STATUT_CFG = {
  pending:    { label: 'En attente',   bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-400' },
  accepted:   { label: 'Acceptée',     bg: 'bg-blue-50',  text: 'text-blue-700',  dot: 'bg-blue-500'  },
  in_transit: { label: 'En livraison', bg: 'bg-indigo-50',text: 'text-indigo-700',dot: 'bg-indigo-500'},
  delivered:  { label: 'Livré',        bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
  rejected:   { label: 'Refusé',       bg: 'bg-red-50',   text: 'text-red-600',   dot: 'bg-red-500'   },
};

const FILTRES_STATUT = ['Tous', 'En attente', 'Acceptée', 'En livraison', 'Livré', 'Refusé'];
const FILTRES_MAT    = ['Tous', 'Sable', 'Béton', 'Gravier', 'Ciment', 'Parpaing'];

function fmt(n) {
  return Number(n || 0).toLocaleString('fr-FR') + ' FCFA';
}

function StatusBadge({ statut }) {
  const cfg = STATUT_CFG[statut] || STATUT_CFG.pending;
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium ${cfg.bg} ${cfg.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

export default function TableauDeBordFournisseur() {
  const [commandeSelectee, setCommandeSelectee] = useState(null);
  const { userProfile, supplierId } = utiliserAuth();
  const prenom = (userProfile?.name || 'Fournisseur').split(' ')[0];

  const [commandes, setCommandes]       = useState([]);
  const [recherche, setRecherche]       = useState('');
  const [filtreStatut, setFiltreStatut] = useState('Tous');
  const [filtreMat, setFiltreMat]       = useState('Tous');
  const [newOrderToast, setNewOrderToast] = useState(false);

  const prevPendingRef = useRef(null);

  // Abonnement temps réel aux commandes de ce fournisseur
  useEffect(() => {
    const ordersRef = rtRef(realtimeDb, 'orders');
    const unsubscribe = rtOnValue(
      ordersRef,
      (snapshot) => {
        const data = snapshot.val() || {};
        const list = Object.entries(data)
          .map(([id, val]) => ({ id, ...val }))
          .filter((o) => !supplierId || o.supplierId === supplierId)
          .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        setCommandes(list);
      },
      (error) => {
        console.error('[TableauDeBord] Erreur lecture Firebase:', error.code, error.message);
      }
    );
    return () => unsubscribe();
  }, [supplierId]);

  // Détection nouvelle commande en attente → son + toast
  useEffect(() => {
    const currentPending = commandes.filter((c) => (c.status || c.statut) === 'pending').length;
    if (prevPendingRef.current !== null && currentPending > prevPendingRef.current) {
      try {
        new Audio('https://assets.mixkit.co/sfx/preview/mixkit-software-interface-start-2574.mp3').play();
      } catch (_) { /* ignore autoplay restrictions */ }
      setNewOrderToast(true);
      setTimeout(() => setNewOrderToast(false), 4000);
    }
    prevPendingRef.current = currentPending;
  }, [commandes]);

  const affichees = commandes.filter((c) => {
    const q = recherche.toLowerCase();
    const material = (c.title || c.material || c.materiau || '').split(' ').pop() || '';
    const client = c.customer || c.prenom || c.client || '';
    const okRech =
      !q ||
      (c.id || '').toLowerCase().includes(q) ||
      client.toLowerCase().includes(q) ||
      material.toLowerCase().includes(q);
    const cfg = STATUT_CFG[c.status || c.statut];
    const okStatut = filtreStatut === 'Tous' || cfg?.label === filtreStatut;
    const okMat = filtreMat === 'Tous' || material === filtreMat;
    return okRech && okStatut && okMat;
  });

  const nbAttente  = commandes.filter((c) => (c.status || c.statut) === 'pending').length;
  const revenuMois = commandes
    .filter((c) => (c.status || c.statut) === 'delivered')
    .reduce((s, c) => s + Number(c.price || c.total || c.montantNum || 0), 0);

  async function accepter(id) {
    try {
      await rtUpdate(rtRef(realtimeDb, `orders/${id}`), {
        status: 'accepted',
        acceptedAt: new Date().toISOString(),
      });
    } catch (err) {
      console.error('[TableauDeBord] Erreur acceptation:', err);
    }
  }

  async function refuser(id) {
    try {
      await rtUpdate(rtRef(realtimeDb, `orders/${id}`), {
        status: 'rejected',
        rejectedAt: new Date().toISOString(),
      });
    } catch (err) {
      console.error('[TableauDeBord] Erreur refus:', err);
    }
  }

  return (
    <>
    {/* Toast nouvelle commande */}
    {newOrderToast && (
      <div style={{
        position: 'fixed', top: '1.2rem', right: '1.2rem', zIndex: 9999,
        background: '#0d1b2e', color: '#fff', borderLeft: '4px solid #f5c300',
        borderRadius: '10px', padding: '0.8rem 1.2rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', gap: '0.6rem',
        animation: 'slideIn 0.3s ease',
      }}>
        <span style={{ fontSize: '1.2rem' }}>🔔</span>
        <div>
          <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Nouvelle commande !</div>
          <div style={{ fontSize: '0.77rem', color: 'rgba(255,255,255,0.65)' }}>Une commande en attente vient d'arriver</div>
        </div>
      </div>
    )}
    <div className="px-4 sm:px-8 py-6">

      {/* Titre + stats */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl text-gray-900" style={{ fontWeight: 600 }}>
            Commandes
          </h1>
          <p className="text-sm text-gray-400 mt-0.5">
            Bonjour {prenom} —{' '}
            {new Date().toLocaleDateString('fr-FR', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
            })}
          </p>
        </div>
        <div className="flex gap-3">
          <div className="bg-white rounded-2xl px-4 py-3 border border-gray-100 shadow-sm text-center min-w-[100px]">
            <p className="text-2xl text-gray-900" style={{ fontWeight: 700 }}>{nbAttente}</p>
            <p className="text-xs text-gray-400 mt-0.5">En attente</p>
          </div>
          <div className="bg-white rounded-2xl px-4 py-3 border border-gray-100 shadow-sm text-center min-w-[130px]">
            <p className="text-lg text-gray-900 leading-tight" style={{ fontWeight: 700 }}>
              {fmt(revenuMois)}
            </p>
          <p className="text-xs text-gray-400 mt-0.5">Ce mois</p>
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative flex-1 min-w-[180px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher..."
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />
        </div>
        <select
          value={filtreStatut}
          onChange={(e) => setFiltreStatut(e.target.value)}
          className="bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-300"
        >
          {FILTRES_STATUT.map((f) => <option key={f}>{f}</option>)}
        </select>
        <select
          value={filtreMat}
          onChange={(e) => setFiltreMat(e.target.value)}
          className="bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-300"
        >
          {FILTRES_MAT.map((f) => <option key={f}>{f}</option>)}
        </select>
      </div>

      {/* Table (desktop) */}
      <div className="hidden sm:block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              {['Commande', 'Matériau', 'Date', 'Statut', 'Client', 'Montant', 'Actions'].map((h) => (
                <th
                  key={h}
                  className="text-left px-4 py-3.5 text-xs text-gray-400 uppercase tracking-wider"
                  style={{ fontWeight: 500 }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {affichees.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-sm text-gray-400">
                  Aucune commande trouvée.
                </td>
              </tr>
            ) : affichees.map((c) => {
              const statut = c.status || c.statut || 'pending';
              const materiau = c.title || c.material || c.materiau || '—';
              const quantite = c.volumeLabel || c.quantite || '';
              const client = c.customer || c.prenom || c.client || 'Client';
              const email = c.telephone || c.whatsapp || c.email || '';
              const date = c.createdAt
                ? new Date(c.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
                : (c.date || '—');
              const montant = Number(c.price || c.total || c.montantNum || 0);
              return (
              <tr
                key={c.id}
                className="transition-colors hover:bg-gray-50/70"
              >
                <td className="px-4 py-3.5">
                  <span className="text-sm text-gray-900" style={{ fontWeight: 500 }}>{c.id?.slice(-8)}</span>
                </td>
                <td className="px-4 py-3.5">
                  <p className="text-sm text-gray-800" style={{ fontWeight: 500 }}>{materiau}</p>
                  <p className="text-xs text-gray-400">{quantite}</p>
                </td>
                <td className="px-4 py-3.5 text-sm text-gray-500">{date}</td>
                <td className="px-4 py-3.5"><StatusBadge statut={statut} /></td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0"
                      style={{ backgroundColor: '#0d1b2e', color: '#f5c300', fontWeight: 700 }}
                    >
                      {(client[0] || '?').toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm text-gray-900 leading-tight" style={{ fontWeight: 500 }}>{client}</p>
                      <p className="text-xs text-gray-400">{email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3.5 text-sm text-gray-900" style={{ fontWeight: 500 }}>
                  {fmt(montant)}
                </td>
                <td className="px-4 py-3.5">
                  {statut === 'pending' ? (
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => accepter(c.id)}
                        className="text-xs px-2.5 py-1.5 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition-colors font-medium"
                      >
                        Accepter
                      </button>
                      <button
                        onClick={() => refuser(c.id)}
                        className="text-xs px-2.5 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors font-medium"
                      >
                        Refuser
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setCommandeSelectee(c.id)}
                      className="text-xs text-gray-400 hover:text-gray-700 transition-colors"
                    >
                      Voir détail →
                    </button>
                  )}
                </td>
              </tr>
              );
            })}
          </tbody>
        </table>

        {/* Footer / pagination */}
        <div className="px-4 py-3.5 border-t border-gray-100 flex items-center justify-between">
          <p className="text-xs text-gray-400">
            {affichees.length} résultat{affichees.length > 1 ? 's' : ''}
          </p>
          <div className="flex items-center gap-1">
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                className={`w-7 h-7 rounded-lg text-xs transition-all ${p === 1 ? 'text-white' : 'text-gray-400 hover:bg-gray-100'}`}
                style={p === 1 ? { backgroundColor: '#0d1b2e', fontWeight: 500 } : {}}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cards (mobile) */}
      <div className="sm:hidden space-y-3 pb-6">
        {affichees.map((c) => {
          const statut = c.status || c.statut || 'pending';
          const materiau = c.title || c.material || c.materiau || '—';
          const quantite = c.volumeLabel || c.quantite || '';
          const client = c.customer || c.prenom || c.client || 'Client';
          const date = c.createdAt
            ? new Date(c.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
            : (c.date || '—');
          const montant = Number(c.price || c.total || c.montantNum || 0);
          return (
          <div key={c.id} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-400" style={{ fontWeight: 500 }}>{c.id?.slice(-8)}</span>
              <StatusBadge statut={statut} />
            </div>
            <p className="text-gray-900 text-sm" style={{ fontWeight: 600 }}>
              {materiau} {quantite ? `· ${quantite}` : ''}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">{client} · {date}</p>
            <div className="flex items-center justify-between mt-3">
              <span className="text-sm text-gray-900" style={{ fontWeight: 600 }}>
                {fmt(montant)}
              </span>
              {statut === 'pending' && (
                <div className="flex gap-2">
                  <button
                    onClick={() => accepter(c.id)}
                    className="text-xs px-3 py-1.5 rounded-lg bg-green-50 text-green-700"
                    style={{ fontWeight: 500 }}
                  >
                    Accepter
                  </button>
                  <button
                    onClick={() => refuser(c.id)}
                    className="text-xs px-3 py-1.5 rounded-lg bg-red-50 text-red-600"
                    style={{ fontWeight: 500 }}
                  >
                    Refuser
                  </button>
                </div>
              )}
            </div>
          </div>
          );
        })}
      </div>

    </div>

    {commandeSelectee && (
      <ModalDetailCommande
        orderId={commandeSelectee}
        onClose={() => setCommandeSelectee(null)}
      />
    )}
    </>
  );
}
