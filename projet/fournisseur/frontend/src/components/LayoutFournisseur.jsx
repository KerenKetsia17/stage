import { Outlet, NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Truck, LayoutDashboard, ClipboardList, Package,
  Bell, LogOut, ChevronRight, Home,
} from 'lucide-react';
import TopbarFournisseur from './TopbarFournisseur';
import BottomNavFournisseur from './BottomNavFournisseur';
import { utiliserAuth } from '../hooks/utiliserAuth';
import { useState, useEffect } from 'react';
import { realtimeDb, rtRef, rtOnValue } from '../firebase';

const NAV = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Vue générale'  },
  { to: '/orders',    icon: ClipboardList,   label: 'Commandes'     },
  { to: '/stock',     icon: Package,         label: 'Stocks'        },
];

const BREADCRUMBS = {
  '/dashboard': 'Vue générale',
  '/orders':    'Commandes',
  '/stock':     'Stocks',
};

const MOBILE_TITLES = {
  '/dashboard': 'Tableau de bord',
  '/orders':    'Commandes',
  '/stock':     'Stocks',
};

export default function LayoutFournisseur() {
  const { deconnexion, userProfile, supplierId } = utiliserAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const initiale  = (userProfile?.name || 'F')[0].toUpperCase();
  const prenom    = (userProfile?.name || 'Fournisseur').split(' ')[0];
  const pageLabel = BREADCRUMBS[pathname] ?? 'Détail';
  const mobileTitle = MOBILE_TITLES[pathname] ?? 'CamionSuf';

  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    const ordersRef = rtRef(realtimeDb, 'orders');
    const unsub = rtOnValue(ordersRef, (snapshot) => {
      const data = snapshot.val() || {};
      const count = Object.values(data).filter(
        (o) => o.status === 'pending' && (!supplierId || o.supplierId === supplierId)
      ).length;
      setPendingCount(count);
    });
    return () => unsub();
  }, [supplierId]);

  /* ── Sidebar ── */
  const sidebar = (
    <aside
      className="flex flex-col w-64 shrink-0 h-screen sticky top-0"
      style={{ backgroundColor: '#0d1b2e' }}
    >
      {/* Logo */}
      <div className="px-5 py-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        <Link to="/" className="flex items-center gap-2.5">
          <div className="rounded-lg p-1.5" style={{ backgroundColor: '#f5c300' }}>
            <Truck className="w-4 h-4" style={{ color: '#0d1b2e' }} />
          </div>
          <span className="text-white text-lg" style={{ fontWeight: 600 }}>CamionSuf</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <p
          className="text-[10px] uppercase tracking-widest px-3 pb-2"
          style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}
        >
          Menu principal
        </p>
        {NAV.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                isActive ? 'text-white' : 'hover:bg-white/5'
              }`
            }
            style={({ isActive }) =>
              isActive
                ? { backgroundColor: 'rgba(245,195,0,0.15)', color: '#f5c300', fontWeight: 500 }
                : { color: 'rgba(255,255,255,0.5)', fontWeight: 400 }
            }
          >
            {({ isActive }) => (
              <>
                <Icon className="w-4 h-4 shrink-0" />
                {label}
                {to === '/orders' && pendingCount > 0 && (
                  <span style={{
                    marginLeft: 'auto', background: '#f5c300', color: '#0d1b2e',
                    borderRadius: '9999px', fontSize: '0.65rem', fontWeight: 700,
                    padding: '0.1rem 0.45rem', lineHeight: 1.4,
                  }}>
                    {pendingCount}
                  </span>
                )}
                {to !== '/orders' && isActive && (
                  <span
                    className="ml-auto w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: '#f5c300' }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Profil + déconnexion */}
      <div className="px-3 pb-4 pt-2 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        <div
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl"
          style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0"
            style={{ backgroundColor: '#f5c300', color: '#0d1b2e', fontWeight: 700 }}
          >
            {initiale}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs truncate" style={{ fontWeight: 500 }}>
              {userProfile?.name || 'Fournisseur'}
            </p>
            <p className="text-[11px] truncate" style={{ color: 'rgba(255,255,255,0.35)' }}>
              {userProfile?.email || ''}
            </p>
          </div>
          <button
            onClick={async () => { await deconnexion(); navigate('/login'); }}
            className="text-red-400 hover:text-red-300 transition-colors ml-1"
            title="Déconnexion"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );

  return (
    <>
      {/* ── DESKTOP ── */}
      <div className="hidden lg:flex h-screen overflow-hidden bg-gray-50">
        {sidebar}

        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Topbar desktop commun */}
          <header className="bg-white border-b border-gray-100 px-8 h-14 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Home className="w-4 h-4" />
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-gray-500">Dashboard</span>
              {pageLabel !== 'Vue générale' && (
                <>
                  <ChevronRight className="w-3.5 h-3.5" />
                  <span className="text-gray-900" style={{ fontWeight: 500 }}>{pageLabel}</span>
                </>
              )}
            </div>
            <div className="flex items-center gap-3">
              <button className="relative w-9 h-9 rounded-xl flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200">
                <Bell className="w-4 h-4 text-gray-500" />
                {pendingCount > 0 && (
                  <span style={{
                    position: 'absolute', top: '4px', right: '4px',
                    background: '#ef4444', color: '#fff', borderRadius: '9999px',
                    fontSize: '0.6rem', fontWeight: 700, padding: '0.05rem 0.3rem',
                    lineHeight: 1.4, minWidth: '14px', textAlign: 'center',
                  }}>
                    {pendingCount}
                  </span>
                )}
              </button>
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                style={{ backgroundColor: '#f5c300', color: '#0d1b2e', fontWeight: 700 }}
              >
                {prenom[0]}
              </div>
            </div>
          </header>

          {/* Contenu de la page (scrollable) */}
          <div className="flex-1 overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </div>

      {/* ── MOBILE ── */}
      <div className="lg:hidden min-h-screen bg-gray-50">
        <TopbarFournisseur title={mobileTitle} />
        <Outlet />
        <BottomNavFournisseur />
      </div>
    </>
  );
}
