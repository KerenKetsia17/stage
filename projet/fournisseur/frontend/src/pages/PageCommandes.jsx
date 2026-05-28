import { useState, useEffect } from 'react';
import ModalDetailCommande from '../components/ModalDetailCommande';
import { utiliserAuth } from '../hooks/utiliserAuth';
import { realtimeDb, rtRef, rtOnValue, rtUpdate } from '../firebase';
import {
  ClipboardList,
  MapPin,
  Filter,
  Search,
  CheckCircle,
  XCircle,
} from 'lucide-react';

const STATUS_LABELS = {
  pending:    { label: 'En attente',   color: 'bg-yellow-100 text-yellow-700' },
  accepted:   { label: 'Acceptée',     color: 'bg-blue-100 text-blue-700' },
  in_transit: { label: 'En livraison', color: 'bg-indigo-100 text-indigo-700' },
  delivered:  { label: 'Livrée',       color: 'bg-green-100 text-green-700' },
  rejected:   { label: 'Refusée',      color: 'bg-red-100 text-red-700' },
};

export default function PageCommandes() {
  const { supplierId } = utiliserAuth();
  const [commandeSelectee, setCommandeSelectee] = useState(null);
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  // Abonnement temps réel aux commandes de ce fournisseur
  useEffect(() => {
    const ordersRef = rtRef(realtimeDb, 'orders');
    const unsubscribe = rtOnValue(ordersRef, (snapshot) => {
      const data = snapshot.val() || {};
      const list = Object.entries(data)
        .map(([id, val]) => ({ id, ...val }))
        .filter((o) => {
          // Afficher toutes les commandes si supplierId non résolu (fallback)
          if (!supplierId) return true;
          return o.supplierId === supplierId;
        })
        .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      setCommandes(list);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [supplierId]);

  const handleAccept = async (id) => {
    try {
      await rtUpdate(rtRef(realtimeDb, `orders/${id}`), {
        status: 'accepted',
        acceptedAt: new Date().toISOString(),
      });
    } catch (err) {
      console.error('[PageCommandes] Erreur acceptation:', err);
    }
  };

  const handleReject = async (id) => {
    try {
      await rtUpdate(rtRef(realtimeDb, `orders/${id}`), {
        status: 'rejected',
        rejectedAt: new Date().toISOString(),
      });
    } catch (err) {
      console.error('[PageCommandes] Erreur refus:', err);
    }
  };

  const filtered = commandes.filter((o) => {
    const matchFilter = filter === 'all' || o.status === filter;
    const q = search.toLowerCase();
    const matchSearch = !q ||
      (o.id || '').toLowerCase().includes(q) ||
      (o.title || o.material || '').toLowerCase().includes(q) ||
      (o.customer || o.prenom || '').toLowerCase().includes(q) ||
      (o.dropoff || o.address || '').toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  return (
    <>
        {/* Filtres */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-5 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
              >
                <option value="all">Tous</option>
                {Object.entries(STATUS_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>{v.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
            <div className="w-8 h-8 border-4 border-orange-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-gray-400 text-sm">Chargement des commandes…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
            <ClipboardList className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">Aucune commande trouvée</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((order) => {
              const s = STATUS_LABELS[order.status] || { label: order.status, color: 'bg-gray-100 text-gray-600' };
              const clientName = order.customer || order.prenom || 'Client';
              const deliveryAddress = order.dropoff || order.address || '—';
              const material = order.title || order.material || '—';
              const price = Number(order.price || order.total || 0);
              return (
                <div key={order.id} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${s.color}`}>
                          {s.label}
                        </span>
                        <span className="text-xs text-gray-400 font-mono">#{order.id?.slice(-8)}</span>
                      </div>
                      <p className="font-semibold text-gray-900 mb-1">{material}</p>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <p className="text-xs text-gray-500 truncate">{deliveryAddress}</p>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">Client : {clientName}</p>
                    </div>

                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <span className="text-sm font-bold text-gray-800">
                        {price.toLocaleString('fr-FR')} FCFA
                      </span>
                      {order.status === 'pending' ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAccept(order.id)}
                            className="flex items-center gap-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold rounded-lg transition-colors"
                          >
                            <CheckCircle className="w-3.5 h-3.5" /> Accepter
                          </button>
                          <button
                            onClick={() => handleReject(order.id)}
                            className="flex items-center gap-1 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold rounded-lg transition-colors"
                          >
                            <XCircle className="w-3.5 h-3.5" /> Refuser
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setCommandeSelectee(order.id)}
                          className="text-xs text-orange-500 hover:underline font-medium"
                        >
                          Voir détails →
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

    {commandeSelectee && (
      <ModalDetailCommande
        orderId={commandeSelectee}
        onClose={() => setCommandeSelectee(null)}
      />
    )}
    </>
  );
}
