import { useState, useEffect } from 'react';
import { X, MapPin } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { realtimeDb, rtRef, rtOnValue, rtUpdate } from '../firebase';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const STATUS_STEPS  = ['pending', 'accepted', 'in_transit', 'delivered'];
const STATUS_LABELS = {
  pending:    'En attente',
  accepted:   'AcceptÃ©e',
  in_transit: 'En livraison',
  delivered:  'LivrÃ©e',
  rejected:   'RefusÃ©e',
};

const STATUS_STYLE = {
  pending:    'bg-amber-100 text-amber-700',
  accepted:   'bg-blue-100 text-blue-700',
  in_transit: 'bg-indigo-100 text-indigo-700',
  delivered:  'bg-green-100 text-green-700',
  rejected:   'bg-red-100 text-red-600',
};

function StepBar({ status }) {
  const idx = STATUS_STEPS.indexOf(status);
  return (
    <div className="flex items-center">
      {STATUS_STEPS.map((s, i) => (
        <div key={s} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center">
            <div
              className="w-2.5 h-2.5 rounded-full shrink-0 transition-colors"
              style={{ backgroundColor: i <= idx ? '#f5c300' : '#e5e7eb' }}
            />
            <span
              className="text-[10px] mt-1.5 text-center leading-tight"
              style={{
                color: i <= idx ? '#374151' : '#9ca3af',
                fontWeight: i <= idx ? 500 : 400,
                whiteSpace: 'nowrap',
              }}
            >
              {STATUS_LABELS[s]}
            </span>
          </div>
          {i < STATUS_STEPS.length - 1 && (
            <div
              className="h-px flex-1 mx-2 mb-4 transition-colors"
              style={{ backgroundColor: i < idx ? '#f5c300' : '#e5e7eb' }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function InfoRow({ label, value }) {
  if (!value) return null;
  return (
    <div className="py-3 flex items-baseline justify-between gap-4 border-b border-gray-50 last:border-0">
      <span className="text-xs text-gray-400 shrink-0">{label}</span>
      <span className="text-sm text-gray-800 font-medium text-right">{value}</span>
    </div>
  );
}

export default function ModalDetailCommande({ orderId, onClose }) {
  const [order, setOrder]                         = useState(null);
  const [loading, setLoading]                     = useState(true);
  const [showAssign, setShowAssign]               = useState(false);
  const [selectedDeliverer, setSelectedDeliverer] = useState('');
  const [availableDrivers, setAvailableDrivers]   = useState([]);
  const [rejectReason, setRejectReason]           = useState('');
  const [showRejectModal, setShowRejectModal]     = useState(false);

  // Ã‰coute la commande en temps rÃ©el
  useEffect(() => {
    if (!orderId) return;
    const orderRef = rtRef(realtimeDb, `orders/${orderId}`);
    const unsubscribe = rtOnValue(orderRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setOrder({ id: orderId, ...data });
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [orderId]);

  // Ã‰coute les chauffeurs disponibles
  useEffect(() => {
    const driversRef = rtRef(realtimeDb, 'drivers');
    const unsubscribe = rtOnValue(driversRef, (snapshot) => {
      const data = snapshot.val() || {};
      const list = Object.entries(data)
        .map(([id, val]) => ({ id, ...val }))
        .filter((d) => d.status === 'available' || !d.status);
      setAvailableDrivers(list);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', fn);
    return () => document.removeEventListener('keydown', fn);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleAccept = async () => {
    if (!order) return;
    await rtUpdate(rtRef(realtimeDb, `orders/${order.id}`), {
      status: 'accepted',
      acceptedAt: new Date().toISOString(),
    });
  };

  const handleReject = async () => {
    if (!order) return;
    await rtUpdate(rtRef(realtimeDb, `orders/${order.id}`), {
      status: 'rejected',
      rejectedAt: new Date().toISOString(),
      rejectReason: rejectReason || null,
    });
    setShowRejectModal(false);
  };

  const handleAssign = async () => {
    if (!selectedDeliverer || !order) return;
    const driver = availableDrivers.find((d) => d.id === selectedDeliverer);
    await rtUpdate(rtRef(realtimeDb, `orders/${order.id}`), {
      status: 'in_transit',
      delivererId: selectedDeliverer,
      delivererName: driver?.name || selectedDeliverer,
      inTransitAt: new Date().toISOString(),
    });
    setShowAssign(false);
  };

  // CoordonnÃ©es pour la carte
  const supplierPos = order?.pickupCoords
    ? [order.pickupCoords.lat, order.pickupCoords.lng ?? order.pickupCoords.lon]
    : [14.7167, -17.4677];
  const deliveryPos = order?.dropoffCoords
    ? [order.dropoffCoords.lat, order.dropoffCoords.lng ?? order.dropoffCoords.lon]
    : order?.destLat
      ? [order.destLat, order.destLon]
      : null;

  const clientName    = order?.customer || order?.prenom || 'â€”';
  const clientPhone   = order?.telephone || order?.phone || order?.whatsapp || 'â€”';
  const deliveryAddr  = order?.dropoff || order?.address || 'â€”';
  const material      = order?.title || order?.material || 'â€”';
  const montant       = Number(order?.price || order?.total || 0);
  const status        = order?.status || 'pending';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full flex flex-col overflow-hidden"
        style={{ maxWidth: 900, maxHeight: '90vh' }}
      >
        {/* Header navy */}
        <div
          className="flex items-center justify-between px-6 py-5 shrink-0"
          style={{ backgroundColor: '#0d1b2e' }}
        >
          <div>
            <p className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Commande #{orderId?.slice(-8)}
            </p>
            <h2 className="text-base font-semibold text-white">
              {order ? material : 'Chargementâ€¦'}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            {order && (
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_STYLE[status] || 'bg-gray-100 text-gray-600'}`}>
                {STATUS_LABELS[status] || status}
              </span>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Corps scrollable */}
        <div className="overflow-y-auto flex-1 bg-gray-50">
          {loading ? (
            <div className="p-8 text-center">
              <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm text-gray-400">Chargementâ€¦</p>
            </div>
          ) : !order ? (
            <div className="p-8 text-center">
              <p className="text-sm text-gray-400">Commande introuvable.</p>
            </div>
          ) : (
            <div className="p-6 grid grid-cols-1 xl:grid-cols-5 gap-6">

              {/* Colonne gauche */}
              <div className="xl:col-span-3 space-y-5">

                {status !== 'rejected' && (
                  <div className="bg-white rounded-xl border border-gray-100 px-5 py-4">
                    <p className="text-xs text-gray-400 mb-4 font-medium uppercase tracking-wide">Avancement</p>
                    <div className="overflow-x-auto pb-1">
                      <StepBar status={status} />
                    </div>
                  </div>
                )}

                <div className="bg-white rounded-xl border border-gray-100 px-5 py-2">
                  <p className="text-xs text-gray-400 pt-3 pb-1 font-medium uppercase tracking-wide">Informations</p>
                  <InfoRow label="Client"     value={clientName} />
                  <InfoRow label="TÃ©lÃ©phone"  value={clientPhone} />
                  <InfoRow label="Adresse"    value={deliveryAddr} />
                  <InfoRow label="MatÃ©riau"   value={`${material}${order.volumeLabel ? ' â€” ' + order.volumeLabel : ''}`} />
                  <InfoRow label="Date"       value={order.createdAt ? new Date(order.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : null} />
                  <InfoRow label="Montant"    value={montant ? montant.toLocaleString('fr-FR') + ' FCFA' : null} />
                  {order.delivererName && (
                    <InfoRow label="Livreur"  value={order.delivererName} />
                  )}
                </div>

                {status === 'pending' && (
                  <div className="flex gap-3">
                    <button
                      onClick={handleAccept}
                      className="flex-1 py-2.5 text-sm font-semibold rounded-xl transition-colors"
                      style={{ backgroundColor: '#0d1b2e', color: '#f5c300' }}
                    >
                      Accepter la commande
                    </button>
                    <button
                      onClick={() => setShowRejectModal(true)}
                      className="px-5 py-2.5 text-sm font-semibold rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                    >
                      Refuser
                    </button>
                  </div>
                )}

                {status === 'accepted' && (
                  <div className="bg-white rounded-xl border border-gray-100 px-5 py-4">
                    <p className="text-xs text-gray-400 mb-3 font-medium uppercase tracking-wide">Attribuer un livreur</p>
                    {!showAssign ? (
                      <button
                        onClick={() => setShowAssign(true)}
                        className="w-full py-2.5 text-sm font-semibold rounded-xl"
                        style={{ backgroundColor: '#0d1b2e', color: '#f5c300' }}
                      >
                        Choisir un livreur
                      </button>
                    ) : (
                      <div className="space-y-3">
                        <select
                          value={selectedDeliverer}
                          onChange={(e) => setSelectedDeliverer(e.target.value)}
                          className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 bg-white"
                        >
                          <option value="">SÃ©lectionner un livreurâ€¦</option>
                          {availableDrivers.map((d) => (
                            <option key={d.id} value={d.id}>
                              {d.name}{d.truckCapacity ? ` â€” ${d.truckCapacity} mÂ³` : ''}{d.truckPlate ? ` (${d.truckPlate})` : ''}
                            </option>
                          ))}
                        </select>
                        <div className="flex gap-2">
                          <button
                            onClick={handleAssign}
                            disabled={!selectedDeliverer}
                            className="flex-1 py-2.5 text-sm font-semibold rounded-xl disabled:opacity-40"
                            style={{ backgroundColor: '#0d1b2e', color: '#f5c300' }}
                          >
                            Confirmer
                          </button>
                          <button
                            onClick={() => setShowAssign(false)}
                            className="px-4 py-2.5 text-sm font-semibold rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                          >
                            Annuler
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Carte */}
              <div className="xl:col-span-2">
                <div className="flex items-center gap-1.5 mb-3">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Carte de livraison</p>
                </div>
                <div className="rounded-xl overflow-hidden border border-gray-100" style={{ height: 300 }}>
                  <MapContainer
                    center={deliveryPos || supplierPos}
                    zoom={12}
                    style={{ height: '100%', width: '100%' }}
                    scrollWheelZoom={false}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={supplierPos}>
                      <Popup>Fournisseur</Popup>
                    </Marker>
                    {deliveryPos && (
                      <>
                        <Marker position={deliveryPos}>
                          <Popup>{deliveryAddr}</Popup>
                        </Marker>
                        <Polyline
                          positions={[supplierPos, deliveryPos]}
                          color="#f5c300"
                          dashArray="7 5"
                          weight={2.5}
                        />
                      </>
                    )}
                  </MapContainer>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showRejectModal && (
        <div
          className="absolute inset-0 z-10 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
          onMouseDown={(e) => { if (e.target === e.currentTarget) setShowRejectModal(false); }}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-1">Motif du refus</h3>
            <p className="text-xs text-gray-400 mb-4">Cette information sera transmise au client.</p>
            <textarea
              rows={3}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Ex : stock insuffisant, zone non couverteâ€¦"
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-300 resize-none"
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={handleReject}
                className="flex-1 py-2.5 text-sm font-semibold rounded-xl bg-red-500 hover:bg-red-600 text-white transition-colors"
              >
                Confirmer le refus
              </button>
              <button
                onClick={() => setShowRejectModal(false)}
                className="px-4 py-2.5 text-sm font-semibold rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
