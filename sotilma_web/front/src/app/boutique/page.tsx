// ============================================================
// FICHIER : src/app/boutique/page.tsx
// ============================================================

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
}

const products: Product[] = [
  { id: "vanne-boisseau-3-voies",       name: "Vanne à boisseau sphérique 3 voies", description: "Contrôle du débit dans deux directions pour une irrigation optimisée.", price: 287000, originalPrice: 317000, image: "https://static.wixstatic.com/media/75ad33_0850deeacbde464f946746f6996a0bee~mv2.png/v1/fill/w_749,h_852,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_0850deeacbde464f946746f6996a0bee~mv2.png", category: "vanne" },
  { id: "vanne-papillon-iot",            name: "Vanne papillon IoT LoRa/4G",          description: "Communication LoRa et 4G intégrée. Actionneur électrique quart de tour.", price: 332500, originalPrice: 350000, image: "https://static.wixstatic.com/media/75ad33_0850deeacbde464f946746f6996a0bee~mv2.png/v1/fill/w_749,h_852,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_0850deeacbde464f946746f6996a0bee~mv2.png", category: "vanne" },
  { id: "vanne-automatique-electrique",  name: "Vanne automatique électrique",        description: "Pilotage à distance, programmation horaire, étanche IP68.", price: 720000, originalPrice: 800000, image: "https://static.wixstatic.com/media/75ad33_96d249a4714640d39ac9a456cc6aaa83~mv2.png/v1/fill/w_748,h_785,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_96d249a4714640d39ac9a456cc6aaa83~mv2.png", category: "vanne" },
  { id: "camera-agricole-4g",            name: "Caméra agricole 4G",                  description: "Vision HD 24/7, solaire, alertes instantanées, stockage cloud.", price: 105000, originalPrice: 125000, image: "https://static.wixstatic.com/media/75ad33_2b84b31e551f42e8ba634f3823910159~mv2.png/v1/fill/w_575,h_625,al_c,lg_1,q_85,enc_avif,quality_auto/75ad33_2b84b31e551f42e8ba634f3823910159~mv2.png", category: "camera" },
  { id: "arroseur-auto-4g",              name: "Arroseur automatique 4G",             description: "Compatible goutte-à-goutte et aspersion. Pilotable à distance.", price: 145000, originalPrice: 165000, image: "https://static.wixstatic.com/media/75ad33_96d249a4714640d39ac9a456cc6aaa83~mv2.png/v1/fill/w_748,h_785,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_96d249a4714640d39ac9a456cc6aaa83~mv2.png", category: "irrigation" },
  { id: "st-02x",                        name: "ST-02_X",                             description: "Référence pour l'irrigation de précision. Goutte-à-goutte & aspersion.", price: 195000, image: "https://static.wixstatic.com/media/75ad33_5ae75292849c40308616364b4b782980~mv2.png/v1/fill/w_950,h_719,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_5ae75292849c40308616364b4b782980~mv2.png", category: "irrigation" },
  { id: "st-03i",                        name: "ST-03_I",                             description: "Usage industriel, pipelines et canalisations. Monitoring 24/7.", price: 420000, image: "https://static.wixstatic.com/media/75ad33_f441855cdd1743b8982ad0a497d536c8~mv2.jpeg/v1/fill/w_1895,h_926,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_f441855cdd1743b8982ad0a497d536c8~mv2.jpeg", category: "industriel" },
  { id: "sotilma-st02t",                 name: "Sotilma-st02T",                       description: "Gestion de doubles parcelles, distribution d'eau optimisée.", price: 333000, originalPrice: 370000, image: "https://static.wixstatic.com/media/75ad33_82b826c91cd44c88954123ab55cbc531~mv2.jpg/v1/fill/w_446,h_544,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_82b826c91cd44c88954123ab55cbc531~mv2.jpg", category: "distribution" },
  { id: "camera-basic",                  name: "Caméra Basic",                        description: "Entrée de gamme pour la surveillance visuelle de vos parcelles.", price: 75000, originalPrice: 85000, image: "https://static.wixstatic.com/media/75ad33_2b84b31e551f42e8ba634f3823910159~mv2.png/v1/fill/w_575,h_625,al_c,lg_1,q_85,enc_avif,quality_auto/75ad33_2b84b31e551f42e8ba634f3823910159~mv2.png", category: "camera" },
  { id: "vanne-simple",                  name: "Vanne motorisée standard",            description: "Simple voie, solaire, pilotage 4G. Idéale pour débuter.", price: 180000, originalPrice: 210000, image: "https://static.wixstatic.com/media/75ad33_82b826c91cd44c88954123ab55cbc531~mv2.jpg/v1/fill/w_446,h_544,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_82b826c91cd44c88954123ab55cbc531~mv2.jpg", category: "vanne" },
  { id: "vanne-industrielle-papillon",   name: "Vanne industrielle papillon",         description: "Actionneur électrique pour applications intensives. Anti-corrosion.", price: 527000, image: "https://static.wixstatic.com/media/75ad33_0850deeacbde464f946746f6996a0bee~mv2.png/v1/fill/w_749,h_852,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_0850deeacbde464f946746f6996a0bee~mv2.png", category: "vanne" },
  { id: "pack-pro",                      name: "Kit Pack Pro",                        description: "Pack complet caméra + vanne. La solution tout-en-un.", price: 1408000, image: "https://static.wixstatic.com/media/75ad33_5ae75292849c40308616364b4b782980~mv2.png/v1/fill/w_950,h_719,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_5ae75292849c40308616364b4b782980~mv2.png", category: "pack" },
];

const ITEMS_PER_PAGE = 8;

const categories = [
  { id: "tous",         label: "Tous" },
  { id: "vanne",        label: "Vannes" },
  { id: "irrigation",   label: "Irrigation" },
  { id: "camera",       label: "Caméras" },
  { id: "industriel",   label: "Industriel" },
  { id: "distribution", label: "Distribution" },
  { id: "pack",         label: "Packs" },
];

function formatFCFA(amount: number) {
  return new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(amount) + " CFA";
}

export default function BoutiquePage() {
  const [activeCategory, setActiveCategory] = useState("tous");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = activeCategory === "tous" ? products : products.filter((p) => p.category === activeCategory);
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <main className="bg-white min-h-screen">

      {/* ── HEADER ── */}
      <div className="bg-gradient-to-br from-sky-50 via-white to-blue-50/40 border-b border-sky-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 text-center">
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="block w-10 h-[2px] bg-gradient-to-r from-sky-500 to-green-500" />
            <span className="text-[11px] font-bold tracking-[0.28em] uppercase text-sky-600">Boutique officielle</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">
            Solutions d&apos;irrigation
          </h1>
          <p className="text-slate-600 text-sm md:text-base mt-4 max-w-xl mx-auto">
            Découvrez notre sélection de technologies autonomes pour optimiser vos rendements agricoles.
          </p>
        </div>
      </div>

      {/* ── FILTRES ── */}
      <div className="border-b border-sky-100 bg-white sticky top-[64px] sm:top-[80px] z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4">
          <div className="flex items-center gap-2 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); setCurrentPage(1); }}
                className={`px-5 py-2 text-[11px] font-bold uppercase tracking-[0.18em] whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? "bg-sky-600 text-white shadow-lg shadow-sky-600/20"
                    : "bg-sky-50 text-slate-600 hover:bg-sky-100 hover:text-sky-700"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── GRILLE ── */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          <div className="flex items-center gap-3 mb-8 border-l-4 border-sky-500 pl-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 uppercase tracking-tight">
                {activeCategory === "tous" ? "Toutes les catégories" : categories.find((c) => c.id === activeCategory)?.label}
              </h2>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-0.5">
                {filtered.length} référence{filtered.length > 1 ? "s" : ""} disponible{filtered.length > 1 ? "s" : ""}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-sky-100 border border-sky-100">
            {paginated.map((product) => (
              <article key={product.id} className="group bg-white relative overflow-hidden">
                <span className="absolute top-0 left-0 h-[3px] w-0 bg-gradient-to-r from-sky-500 to-green-500 group-hover:w-full transition-all duration-500 z-10" />

                {/* Image */}
                <Link href={`/boutique/produit/${product.id}`} className="relative aspect-square bg-sky-50/30 block overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-6 group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  {product.originalPrice && (
                    <span className="absolute top-3 left-3 bg-red-500 text-white text-[9px] font-bold px-2 py-1">
                      -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                    </span>
                  )}
                </Link>

                {/* Infos */}
                <div className="p-5 border-t border-sky-100">
                  <div className="text-[9px] font-bold tracking-[0.2em] uppercase text-sky-600 mb-1">
                    {categories.find((c) => c.id === product.category)?.label}
                  </div>
                  <Link href={`/boutique/produit/${product.id}`} className="block text-sm font-bold text-slate-900 mb-1 line-clamp-2 hover:text-sky-700 transition-colors leading-tight">
                    {product.name}
                  </Link>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mb-4">{product.description}</p>

                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-base font-bold text-sky-600">{formatFCFA(product.price)}</span>
                    {product.originalPrice && (
                      <span className="text-[10px] text-slate-400 line-through">{formatFCFA(product.originalPrice)}</span>
                    )}
                  </div>

                  <Link
                    href={`/boutique/produit/${product.id}`}
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-sky-50 hover:bg-sky-600 text-sky-700 hover:text-white text-[10px] font-bold uppercase tracking-wider transition-all"
                  >
                    Voir les détails
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-9 h-9 text-xs font-bold transition-all ${
                    page === currentPage ? "bg-sky-600 text-white" : "bg-sky-50 text-slate-600 hover:bg-sky-100"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
