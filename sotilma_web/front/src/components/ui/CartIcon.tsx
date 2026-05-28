// ============================================================
// FICHIER : src/components/ui/CartIcon.tsx
// RÔLE    : Icône panier pour la navigation
// ============================================================

'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

interface CartIconProps {
  itemCount?: number;
}

export default function CartIcon({ itemCount = 0 }: CartIconProps) {
  return (
    <Link
      href="/panier"
      className="relative inline-flex items-center justify-center w-10 h-10 rounded-xl text-blue-600 hover:bg-blue-100/50 transition-all duration-300 group border border-transparent hover:border-blue-200/50 shadow-sm hover:shadow-md"
      aria-label="Panier"
    >
      <ShoppingCart className="w-5 h-5" strokeWidth={2.5} />

      {/* Badge de nombre d'articles */}
      {itemCount > 0 && (
        <span className="absolute -top-1.5 -right-1.5 inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-[10px] font-black leading-none text-white bg-red-500 shadow-sm shadow-red-500/40">
          {itemCount > 9 ? '9+' : itemCount}
        </span>
      )}
    </Link>
  );
}