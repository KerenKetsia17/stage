import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  User,
  Package,
  Clock,
  UserCheck,
  CheckCircle,
  XCircle,
  Phone,
  TrendingUp,
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const STATUS_STEPS = ['pending', 'accepted', 'in_transit', 'delivered'];
const STATUS_LABELS = {
  pending: 'En attente',
  accepted: 'Acceptée',
  in_transit: 'En livraison',
  delivered: 'Livrée',
  rejected: 'Refusée',
};

const COMMANDES_DEMO = {
  '1032': { id: '1032', material: 'Béton',    quantity: 15,  unit: 'm³', clientName: 'Martin Lemoine',     clientPhone: '+221 77 123 45 67', deliveryAddress: 'Plateau, Dakar',         status: 'pending',    price: 15000, createdAt: '2024-01-15', deliveryGeo: { lat: 14.6937, lng: -17.4441 } },
  '1031': { id: '1031', material: 'Sable',    quantity: 20,  unit: 'T',  clientName: 'Diop Construction',  clientPhone: '+221 76 234 56 78', deliveryAddress: 'Guédiawaye, Dakar',      status: 'pending',    price: 24000, createdAt: '2024-01-14', deliveryGeo: { lat: 14.7745, lng: -17.3886 } },
  '1030': { id: '1030', material: 'Gravier',  quantity: 8,   unit: 'T',  clientName: 'SARL BTP Pro',       clientPhone: '+221 70 345 67 89', deliveryAddress: 'Parcelles Assainies',    status: 'in_transit', price: 18000, createdAt: '2024-01-13', deliveryGeo: { lat: 14.7342, lng: -17.4245 } },
  '1029': { id: '1029', material: 'Ciment',   quantity: 50,  unit: 'sacs',clientName: 'Sow & Frères',     clientPhone: '+221 77 456 78 90', deliveryAddress: 'Pikine, Dakar',           status: 'accepted',   price: 37500, createdAt: '2024-01-12', deliveryGeo: { lat: 14.7609, lng: -17.3888 } },
  '1028': { id: '1028', material: 'Sable',    quantity: 10,  unit: 'T',  clientName: 'Dupont Construction',clientPhone: '+221 76 567 89 01', deliveryAddress: 'Almadies, Dakar',         status: 'delivered',  price: 12000, createdAt: '2024-01-11', deliveryGeo: { lat: 14.7302, lng: -17.5247 } },
  '1027': { id: '1027', material: 'Gravier',  quantity: 12,  unit: 'T',  clientName: 'Tall Bâtiment',      clientPhone: '+221 70 678 90 12', deliveryAddress: 'Dakar Plateau',           status: 'delivered',  price: 27000, createdAt: '2024-01-10', deliveryGeo: { lat: 14.6928, lng: -17.4467 } },
  '1026': { id: '1026', material: 'Parpaing', quantity: 200, unit: 'u',  clientName: 'PME Immobilier',     clientPhone: '+221 77 789 01 23', deliveryAddress: 'Rufisque',                status: 'rejected',   price: 20000, createdAt: '2024-01-09', deliveryGeo: { lat: 14.7164, lng: -17.2773 } },
};

const LIVREURS_DEMO = [
  { id: 'l1', name: 'Oumar Diop',   phone: '+221 77 100 20 30' },
  { id: 'l2', name: 'Ibou Ndiaye', phone: '+221 76 200 30 40' },
  { id: 'l3', name: 'Fatou Sarr',  phone: '+221 70 300 40 50' },
];

function StepBar({ status }) {
  const idx = STATUS_STEPS.indexOf(status);
  return (
    <div className="flex items-center gap-2">
      {STATUS_STEPS.map((s, i) => (
        <div key={s} className="flex items-center gap-2">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
              i <= idx ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'
            }`}
          >
            {i < idx ? '✓' : i + 1}
          </div>
          <span className={`text-xs ${i <= idx ? 'text-blue-700 font-medium' : 'text-gray-400'}`}>
            {STATUS_LABELS[s]}
          </span>
          {i < STATUS_STEPS.length - 1 && (
            <div className={`h-0.5 w-8 ${i < idx ? 'bg-blue-600' : 'bg-gray-200'}`} />
          )}
        </div>
      ))}
    </div>
  );
}

export default function PageDetailCommande() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(() => COMMANDES_DEMO[orderId] || null);
  const deliverers = LIVREURS_DEMO;

  const [showAssign, setShowAssign] = useState(false);
  const [selectedDeliverer, setSelectedDeliverer] = useState('');
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);

  const handleAccept = () => {
    setOrder((prev) => ({ ...prev, status: 'accepted' }));
  };

  const handleReject = () => {
    setOrder((prev) => ({ ...prev, status: 'rejected' }));
    setShowRejectModal(false);
  };

  const handleAssign = () => {
    if (!selectedDeliverer) return;
    setOrder((prev) => ({ ...prev, status: 'in_transit', delivererId: selectedDeliverer }));
    setShowAssign(false);
  };

  const supplierPos = [14.7167, -17.4677];
  const deliveryPos = order?.deliveryGeo
    ? [order.deliveryGeo.lat, order.deliveryGeo.lng]
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pb-8 p-4 sm:p-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-orange-500 mb-5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Retour
          </button>

          {!order ? (
            <div className="bg-red-50 border border-red-100 rounded-2xl p-6 text-center">
              <p className="text-red-600">Commande introuvable.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Infos commande */}
              <div className="xl:col-span-2 space-y-5">
                {/* En-tête */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Commande #{order.id?.slice(-8)}</p>
                      <h2 className="text-lg font-bold text-gray-900">
                        {order.material} — {order.quantity} {order.unit || 't'}
                      </h2>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                      order.status === 'rejected' ? 'bg-red-100 text-red-700' :
                      order.status === 'in_transit' ? 'bg-indigo-100 text-indigo-700' :
                      order.status === 'accepted' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {STATUS_LABELS[order.status] || order.status}
                    </span>
                  </div>
                  {order.status !== 'rejected' && (
                    <div className="overflow-x-auto pb-1">
                      <StepBar status={order.status} />
                    </div>
                  )}
                </div>

                {/* Détails livraison */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
                  <h3 className="font-bold text-gray-900 text-sm">Informations de livraison</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-50 rounded-lg p-2 shrink-0">
                        <User className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Client</p>
                        <p className="text-sm font-semibold text-gray-800">{order.clientName || 'N/A'}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-green-50 rounded-lg p-2 shrink-0">
                        <Phone className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Téléphone</p>
                        <p className="text-sm font-semibold text-gray-800">{order.clientPhone || 'N/A'}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-orange-50 rounded-lg p-2 shrink-0">
                        <MapPin className="w-4 h-4 text-orange-500" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Adresse de livraison</p>
                        <p className="text-sm font-semibold text-gray-800">{order.deliveryAddress || 'N/A'}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-purple-50 rounded-lg p-2 shrink-0">
                        <Package className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Matériau</p>
                        <p className="text-sm font-semibold text-gray-800">{order.material} × {order.quantity} {order.unit}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-gray-50 rounded-lg p-2 shrink-0">
                        <Clock className="w-4 h-4 text-gray-500" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Créée le</p>
                        <p className="text-sm font-semibold text-gray-800">
                          {order.createdAt?.toDate
                            ? order.createdAt.toDate().toLocaleDateString('fr-FR')
                            : typeof order.createdAt === 'string'
                            ? new Date(order.createdAt).toLocaleDateString('fr-FR')
                            : 'N/A'}
                        </p>
                      </div>
                    </div>
                    {order.price && (
                      <div className="flex items-start gap-3">
                        <div className="bg-yellow-50 rounded-lg p-2 shrink-0">
                          <TrendingUp className="w-4 h-4 text-yellow-500" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Montant</p>
                          <p className="text-sm font-semibold text-gray-800">
                            {order.price.toLocaleString('fr-FR')} FCFA
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {/* Actions */}
                {order.status === 'pending' && (
                  <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 text-sm mb-4">Actions</h3>
                    <div className="flex gap-3">
                      <button
                        onClick={handleAccept}
                        className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-xl transition-colors"
                      >
                        <CheckCircle className="w-4 h-4" /> Accepter
                      </button>
                      <button
                        onClick={() => setShowRejectModal(true)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-xl transition-colors"
                      >
                        <XCircle className="w-4 h-4" /> Refuser
                      </button>
                    </div>
                  </div>
                )}

                {order.status === 'accepted' && (
                  <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 text-sm mb-4">Attribuer un livreur</h3>
                    {!showAssign ? (
                      <button
                        onClick={() => setShowAssign(true)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors"
                      >
                        <UserCheck className="w-4 h-4" /> Choisir un livreur
                      </button>
                    ) : (
                      <div className="space-y-3">
                        <select
                          value={selectedDeliverer}
                          onChange={(e) => setSelectedDeliverer(e.target.value)}
                          className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                        >
                          <option value="">Sélectionner un livreur</option>
                          {deliverers.map((d) => (
                            <option key={d.id} value={d.id}>
                              {d.name} — {d.phone}
                            </option>
                          ))}
                        </select>
                        <div className="flex gap-2">
                          <button
                            onClick={handleAssign}
                            disabled={!selectedDeliverer}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl disabled:opacity-50 transition-colors"
                          >
                            Confirmer
                          </button>
                          <button
                            onClick={() => setShowAssign(false)}
                            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-xl transition-colors"
                          >
                            Annuler
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Carte droite */}
              <div>
                <h3 className="font-bold text-gray-900 text-sm mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  Carte de livraison
                </h3>
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm" style={{ height: '380px' }}>
                  <MapContainer
                    center={deliveryPos || supplierPos}
                    zoom={13}
                    style={{ height: '100%', width: '100%' }}
                    scrollWheelZoom={false}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={supplierPos}>
                      <Popup>📦 Fournisseur</Popup>
                    </Marker>
                    {deliveryPos && (
                      <>
                        <Marker position={deliveryPos}>
                          <Popup>🏠 {order.deliveryAddress}</Popup>
                        </Marker>
                        <Polyline
                          positions={[supplierPos, deliveryPos]}
                          color="#2563eb"
                          dashArray="8 5"
                          weight={3}
                        />
                      </>
                    )}
                  </MapContainer>
                </div>
              </div>
            </div>
          )}

      {/* Modal refus */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
            <h3 className="font-bold text-gray-900 mb-4">Motif du refus</h3>
            <textarea
              rows={3}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Ex: Stock insuffisant, zone hors périmètre…"
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-red-200"
            />
            <div className="flex gap-3">
              <button
                onClick={handleReject}
                className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-xl transition-colors"
              >
                Confirmer le refus
              </button>
              <button
                onClick={() => setShowRejectModal(false)}
                className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-xl transition-colors"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      </main>
    </div>
  );
}
