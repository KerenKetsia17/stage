import { useState } from 'react';
import { Package, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';


const STOCK_INITIAL = [
  { id: 's1', name: 'Sable',    unit: 'T',    qty: 1400, min: 200, price: 1200,  color: '#f59e0b' },
  { id: 's2', name: 'Béton',    unit: 'm³',   qty: 100,  min: 50,  price: 8500,  color: '#3b82f6' },
  { id: 's3', name: 'Gravier',  unit: 'T',    qty: 50,   min: 100, price: 2250,  color: '#8b5cf6' },
  { id: 's4', name: 'Ciment',   unit: 'sacs', qty: 150,  min: 80,  price: 750,   color: '#6b7280' },
  { id: 's5', name: 'Parpaing', unit: 'u',    qty: 0,    min: 500, price: 175,   color: '#ef4444' },
];

export default function PageStock() {
  const [stock, setStock] = useState(STOCK_INITIAL);
  const [editing, setEditing] = useState(null);
  const [valeur, setValeur] = useState('');

  const startEdit = (item) => {
    setEditing(item.id);
    setValeur(String(item.qty));
  };

  const saveEdit = (id) => {
    const n = parseInt(valeur, 10);
    if (!isNaN(n) && n >= 0) {
      setStock((prev) => prev.map((s) => s.id === id ? { ...s, qty: n } : s));
    }
    setEditing(null);
  };

  const valeurTotale = stock.reduce((acc, s) => acc + s.qty * s.price, 0);
  const ruptures = stock.filter((s) => s.qty === 0).length;
  const alertes = stock.filter((s) => s.qty > 0 && s.qty < s.min).length;

  return (
    <div>

      {/* Hero */}
      <div className="relative overflow-hidden" style={{ background: '#1c1c1e', minHeight: 140 }}>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1553413077-190dd305871c?w=900&q=60')" }}
        />
        <div className="relative z-10 px-5 py-8">
          <p className="text-xs text-orange-400 font-semibold uppercase tracking-widest mb-1">Inventaire</p>
          <h1 className="text-2xl font-bold text-white mb-1">Gestion du stock</h1>
          <p className="text-sm text-white/50">Appuyez sur une quantité pour la modifier</p>
        </div>
      </div>

      <main className="pb-28 px-4 py-5 sm:px-6">
        {/* Résumé */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-gray-900">{stock.length}</p>
            <p className="text-xs text-gray-500 mt-0.5">Matériaux</p>
          </div>
          <div className={`rounded-2xl border p-4 text-center shadow-sm ${alertes > 0 ? 'bg-yellow-50 border-yellow-200' : 'bg-white border-gray-100'}`}>
            <p className={`text-2xl font-bold ${alertes > 0 ? 'text-yellow-600' : 'text-gray-900'}`}>{alertes}</p>
            <p className="text-xs text-gray-500 mt-0.5">Alertes</p>
          </div>
          <div className={`rounded-2xl border p-4 text-center shadow-sm ${ruptures > 0 ? 'bg-red-50 border-red-200' : 'bg-white border-gray-100'}`}>
            <p className={`text-2xl font-bold ${ruptures > 0 ? 'text-red-600' : 'text-gray-900'}`}>{ruptures}</p>
            <p className="text-xs text-gray-500 mt-0.5">Ruptures</p>
          </div>
        </div>

        {/* Cartes stock */}
        <div className="space-y-3">
          {stock.map((item) => {
            const isRupture = item.qty === 0;
            const isAlerte = item.qty > 0 && item.qty < item.min;
            const pct = Math.min(100, Math.round((item.qty / (item.min * 2)) * 100));

            return (
              <div
                key={item.id}
                className={`bg-white rounded-2xl border p-5 shadow-sm ${
                  isRupture ? 'border-red-200' : isAlerte ? 'border-yellow-200' : 'border-gray-100'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: item.color + '20' }}
                    >
                      <Package className="w-5 h-5" style={{ color: item.color }} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-400">Min. {item.min} {item.unit}</p>
                    </div>
                  </div>

                  {isRupture ? (
                    <span className="flex items-center gap-1 px-2.5 py-1 bg-red-100 text-red-600 text-xs font-semibold rounded-full">
                      <AlertTriangle className="w-3 h-3" /> Rupture
                    </span>
                  ) : isAlerte ? (
                    <span className="flex items-center gap-1 px-2.5 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">
                      <TrendingDown className="w-3 h-3" /> Bas
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 px-2.5 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                      <TrendingUp className="w-3 h-3" /> OK
                    </span>
                  )}
                </div>

                {/* Barre de progression */}
                <div className="h-1.5 bg-gray-100 rounded-full mb-3 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${pct}%`, backgroundColor: isRupture ? '#ef4444' : isAlerte ? '#f59e0b' : item.color }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    {editing === item.id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="0"
                          value={valeur}
                          onChange={(e) => setValeur(e.target.value)}
                          onBlur={() => saveEdit(item.id)}
                          onKeyDown={(e) => e.key === 'Enter' && saveEdit(item.id)}
                          autoFocus
                          className="w-24 border border-orange-300 rounded-lg px-2 py-1 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-orange-300"
                        />
                        <span className="text-xs text-gray-500">{item.unit}</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => startEdit(item)}
                        className="text-lg font-bold text-gray-900 hover:text-orange-500 transition-colors"
                      >
                        {item.qty.toLocaleString('fr-FR')} <span className="text-sm font-normal text-gray-400">{item.unit}</span>
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-gray-400">
                    {(item.qty * item.price).toLocaleString('fr-FR')} FCFA
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Valeur totale */}
        <div className="mt-6 bg-[#1c1c1e] rounded-2xl p-5">
          <p className="text-xs text-orange-400 font-semibold uppercase tracking-wider mb-1">Valeur totale du stock</p>
          <p className="text-2xl font-bold text-white">
            {valeurTotale.toLocaleString('fr-FR')} <span className="text-base font-normal text-white/60">FCFA</span>
          </p>
        </div>
      </main>
    </div>
  );
}
