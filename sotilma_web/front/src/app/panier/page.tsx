// ============================================================
// FICHIER : src/app/panier/page.tsx
// RÔLE    : Page du panier — état vide
// ============================================================

'use client';

import { ShoppingCart, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function PanierPage() {
  return (
    <div className="min-h-screen bg-blue-50/30 pt-32 pb-20">
      <div className="max-w-2xl mx-auto px-6">
        {/* Conteneur principal */}
        <div className="bg-white rounded-[2.5rem] border border-blue-50 shadow-2xl shadow-blue-900/5 p-10 sm:p-16 text-center">
          {/* Icône panier vide */}
          <div className="flex justify-center mb-10">
            <div className="w-28 h-28 rounded-3xl bg-blue-50 flex items-center justify-center animate-pulse relative">
              <ShoppingCart className="w-12 h-12 text-blue-600" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full border-4 border-white" />
            </div>
          </div>

          {/* Titre */}
          <h1 className="text-4xl sm:text-5xl font-black text-blue-900 mb-4 tracking-tighter">
            Mon panier
          </h1>

          {/* Message principal */}
          <p className="text-xl text-blue-900/60 mb-4 font-bold">
            Votre panier est vide
          </p>

          {/* Message secondaire */}
          <p className="text-sm text-blue-900/40 mb-12 max-w-xs mx-auto font-medium leading-relaxed">
            Explorez notre collection de solutions IoT innovantes pour la gestion intelligente de l'eau.
          </p>

          {/* CTA Button */}
          <Link
            href="/boutique"
            className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-blue-600/25 hover:bg-blue-700 hover:-translate-y-1 transition-all duration-300 group"
          >
            <span>Explorer la boutique</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Lien secondaire */}
          <div className="mt-10 pt-10 border-t border-blue-50">
            <Link
              href="/"
              className="text-[11px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-700 transition-colors"
            >
              ← Retour à l'accueil
            </Link>
          </div>
        </div>

        {/* Section bénéfices */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16">
          {[
            { 
              title: "Installation", 
              desc: "Mise en place rapide", 
              icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" /> 
            },
            { 
              title: "Économies", 
              desc: "Réduction des coûts", 
              icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> 
            },
            { 
              title: "Support", 
              desc: "Assistance 24/7", 
              icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /> 
            }
          ].map((item, i) => (
            <div key={i} className="text-center p-6 rounded-[2rem] bg-white border border-blue-50/50 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-4 text-blue-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {item.icon}
                </svg>
              </div>
              <h3 className="font-black text-blue-900 text-sm mb-1 tracking-tight uppercase">{item.title}</h3>
              <p className="text-[11px] text-blue-900/40 font-bold">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}