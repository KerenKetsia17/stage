import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, ClipboardList, Package, History, User, Menu, X, ChevronRight } from 'lucide-react';
import { usePendingCount } from '../hooks/usePendingCount';

const NAV_ITEMS = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Accueil',    desc: 'Vue générale de votre activité' },
  { to: '/orders',    icon: ClipboardList,   label: 'Commandes',  desc: 'Gérer vos commandes en cours', badge: true },
  { to: '/stock',     icon: Package,         label: 'Stock',      desc: 'Niveaux et disponibilités' },
  { to: '/history',   icon: History,         label: 'Historique', desc: 'Toutes vos commandes passées' },
  { to: '/profile',   icon: User,            label: 'Profil',     desc: 'Paramètres de votre compte' },
];

const PAGE_LABELS = {
  '/dashboard': 'Accueil',
  '/orders':    'Commandes',
  '/stock':     'Stock',
  '/history':   'Historique',
  '/profile':   'Profil',
};

export default function BottomNavFournisseur() {
  const [open, setOpen] = useState(false);
  const pendingCount = usePendingCount();
  const { pathname } = useLocation();

  const currentLabel = PAGE_LABELS[pathname] || 'Menu';

  return (
    <>
      {/* ── Bouton flottant ── */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2.5 bg-[#1c1c1e] text-white pl-4 pr-5 py-3 rounded-full shadow-xl shadow-black/30 active:scale-95 transition-transform"
          aria-label="Ouvrir le menu"
        >
          <Menu className="w-4 h-4" />
          <span className="text-sm font-semibold">{currentLabel}</span>
          {pendingCount > 0 && (
            <span className="w-5 h-5 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
              {pendingCount > 9 ? '9+' : pendingCount}
            </span>
          )}
        </button>
      </div>

      {/* ── Backdrop ── */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ── Tiroir vertical ── */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl transition-transform duration-300 ease-out ${
          open ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {/* Poignée */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-gray-200 rounded-full" />
        </div>

        {/* En-tête tiroir */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
          <p className="text-base font-bold text-gray-900">Navigation</p>
          <button
            onClick={() => setOpen(false)}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
            aria-label="Fermer"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Items */}
        <nav className="px-4 py-3 space-y-1 pb-8">
          {NAV_ITEMS.map(({ to, icon: Icon, label, desc, badge }) => {
            const isActive = pathname === to;
            return (
              <NavLink
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-colors ${
                  isActive
                    ? 'bg-orange-50 border border-orange-100'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  isActive ? 'bg-orange-500' : 'bg-gray-100'
                }`}>
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-[15px] font-semibold leading-tight ${isActive ? 'text-orange-600' : 'text-gray-900'}`}>
                    {label}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5 truncate">{desc}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {badge && pendingCount > 0 && (
                    <span className="w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {pendingCount > 9 ? '9+' : pendingCount}
                    </span>
                  )}
                  <ChevronRight className={`w-4 h-4 ${isActive ? 'text-orange-400' : 'text-gray-300'}`} />
                </div>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </>
  );
}
