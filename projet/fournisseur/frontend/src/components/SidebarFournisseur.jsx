import { NavLink, useNavigate } from 'react-router-dom';
import {
  Truck,
  LayoutDashboard,
  ClipboardList,
  History,
  LogOut,
  X,
} from 'lucide-react';
import { utiliserAuth } from '../hooks/utiliserAuth';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Tableau de bord' },
  { to: '/orders', icon: ClipboardList, label: 'Commandes' },
  { to: '/history', icon: History, label: 'Historique' },
];

export default function SidebarFournisseur({ open, onClose }) {
  const { deconnexion, userProfile } = utiliserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await deconnexion();
    navigate('/login');
  };

  const content = (
    <div className="flex flex-col h-full bg-[#1a2e4a]">
      {/* Logo + nom entreprise */}
      <div className="px-5 py-5 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-orange-500 rounded-lg p-1.5">
              <Truck className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-white text-base">CamionSuf</span>
              <p className="text-xs text-white/50 leading-none mt-0.5">
                {userProfile?.name || 'Fournisseur'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/50 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-white/15 text-white'
                  : 'text-white/60 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            <Icon className="w-4 h-4 shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Déconnexion */}
      <div className="px-3 pb-5 pt-3 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-white/10 hover:text-red-300 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Déconnexion
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-200 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      {/* Drawer */}
      <aside
        className={`fixed left-0 top-0 bottom-0 w-60 z-50 flex flex-col shadow-2xl bg-[#1a2e4a] transition-transform duration-200 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {content}
      </aside>
    </>
  );
}
