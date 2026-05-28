import { Link } from 'react-router-dom';
import { Truck } from 'lucide-react';
import { utiliserAuth } from '../hooks/utiliserAuth';

export default function TopbarFournisseur({ title }) {
  const { userProfile } = utiliserAuth();
  const initiale = (userProfile?.name || userProfile?.email || 'F')[0].toUpperCase();

  return (
    <header className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="bg-orange-500 rounded-lg p-1.5">
          <Truck className="w-4 h-4 text-white" />
        </div>
        <span className="font-bold text-gray-900 text-base">
          {title || 'CamionSuf'}
        </span>
      </div>

      {/* Avatar profil */}
      <Link
        to="/profile"
        className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0"
        aria-label="Mon profil"
      >
        <span className="text-blue-700 font-bold text-sm">{initiale}</span>
      </Link>
    </header>
  );
}
