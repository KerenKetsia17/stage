// ============================================================
// FICHIER : src/app/boutique/produit/[id]/page.tsx
// RÔLE    : Page produit individuelle — Design professionnel épuré
// ============================================================

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

// ============================================================
// TYPES
// ============================================================
interface Product {
  id: string;
  name: string;
  subtitle?: string;
  description: string;
  longDescription?: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  specs?: string[];
  features?: string[];
}

// ============================================================
// DONNÉES PRODUITS (mêmes données que la boutique)
// ============================================================
const products: Product[] = [
  {
    id: "vanne-boisseau-3-voies",
    name: "Vanne à boisseau sphérique 3 voies",
    description: "Vanne intelligente à trois voies QT-02ET, contrôle du débit dans deux directions pour une irrigation optimisée.",
    longDescription: "Vanne intelligente à trois voies QT-02ET, vanne A ouverte, vanne B ouverte, conception toutes fermées, réalise un contrôle du débit dans deux directions pour couvrir une plus grande zone d'irrigation et économiser plus de coûts. La vanne intelligente à trois voies adopte une technologie de débit constant et peut ajuster automatiquement le débit d'eau entre la vanne à courte et longue distance, évitant ainsi l'arrosage excessif dans le champ agricole où elle est proche de la pompe et la sécheresse dans le champ où elle est loin de la pompe, rendant l'irrigation uniforme et plus fiable.",
    price: 287000,
    originalPrice: 317000,
    image: "https://static.wixstatic.com/media/75ad33_0850deeacbde464f946746f6996a0bee~mv2.png/v1/fill/w_749,h_852,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_0850deeacbde464f946746f6996a0bee~mv2.png",
    images: [
      "https://static.wixstatic.com/media/75ad33_0850deeacbde464f946746f6996a0bee~mv2.png/v1/fill/w_749,h_852,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_0850deeacbde464f946746f6996a0bee~mv2.png",
      "https://static.wixstatic.com/media/75ad33_82b826c91cd44c88954123ab55cbc531~mv2.jpg/v1/fill/w_446,h_544,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_82b826c91cd44c88954123ab55cbc531~mv2.jpg",
    ],
    category: "vanne",
    specs: ["Débitmètre à ultrasons intégré", "Connexion rapide", "Technologie à flux stable", "Énergie solaire"],
    features: [
      "Conception unique de vanne verticale à trois voies",
      "Débitmètre à ultrasons intégré",
      "Technologie à flux stable à haut rendement",
      "Débit constant et irrigation uniforme à une touche",
      "Conception à connexion rapide et démontage rapide"
    ],
  },
  {
    id: "vanne-papillon-iot",
    name: "Vanne papillon IoT LoRa/4G",
    description: "Vanne papillon avec actionneur électrique quart de tour. Communication LoRa et 4G intégrée.",
    longDescription: "Vanne papillon industrielle avec actionneur électrique quart de tour. Équipée des technologies LoRa et 4G pour une communication fiable à longue distance. Idéale pour les applications industrielles nécessitant un contrôle précis du débit.",
    price: 332500,
    originalPrice: 350000,
    image: "https://static.wixstatic.com/media/75ad33_0850deeacbde464f946746f6996a0bee~mv2.png/v1/fill/w_749,h_852,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_0850deeacbde464f946746f6996a0bee~mv2.png",
    category: "vanne",
    specs: ["LoRa", "4G intégrée", "Quart de tour", "Monitoring"],
    features: ["Communication longue distance", "Actionneur électrique", "Contrôle précis", "Maintenance simplifiée"],
  },
  {
    id: "vanne-automatique-electrique",
    name: "Vanne automatique électrique",
    description: "Vanne motorisée solaire pour l'automatisation de votre irrigation. Pilotage à distance.",
    longDescription: "Vanne automatique électrique conçue pour l'automatisation complète de votre système d'irrigation. Pilotage à distance via application mobile, programmation horaire et contrôle du débit.",
    price: 720000,
    originalPrice: 800000,
    image: "https://static.wixstatic.com/media/75ad33_96d249a4714640d39ac9a456cc6aaa83~mv2.png/v1/fill/w_748,h_785,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_96d249a4714640d39ac9a456cc6aaa83~mv2.png",
    category: "vanne",
    specs: ["Motorisation solaire", "Pilotage distant", "Programmation", "Étanche IP68"],
    features: ["Contrôle à distance", "Programmation horaire", "Économie d'eau", "Installation simple"],
  },
  {
    id: "camera-agricole-4g",
    name: "Caméra agricole 4G",
    description: "Caméra solaire connectée 4G pour la surveillance de vos parcelles. Vision HD 24/7 avec alertes instantanées.",
    longDescription: "Caméra de surveillance agricole alimentée par énergie solaire avec connexion 4G. Vision nocturne HD, détection de mouvement, alertes en temps réel et stockage cloud. Résistante aux intempéries (IP66).",
    price: 105000,
    originalPrice: 125000,
    image: "https://static.wixstatic.com/media/75ad33_2b84b31e551f42e8ba634f3823910159~mv2.png/v1/fill/w_575,h_625,al_c,lg_1,q_85,enc_avif,quality_auto/75ad33_2b84b31e551f42e8ba634f3823910159~mv2.png",
    category: "camera",
    specs: ["Vision HD 24/7", "100% solaire", "Alertes instantanées", "Stockage cloud"],
    features: ["Surveillance 24h/24", "Vision nocturne", "Détection de mouvement", "Étanche IP66"],
  },
  {
    id: "arroseur-auto-4g",
    name: "Arroseur automatique 4G",
    description: "Système d'arrosage automatique pilotable à distance. Compatible goutte-à-goutte et aspersion.",
    longDescription: "Système d'irrigation intelligent pilotable via application mobile. Compatible avec les systèmes goutte-à-goutte et aspersion. Programmation personnalisable selon les besoins de vos cultures.",
    price: 145000,
    originalPrice: 165000,
    image: "https://static.wixstatic.com/media/75ad33_96d249a4714640d39ac9a456cc6aaa83~mv2.png/v1/fill/w_748,h_785,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_96d249a4714640d39ac9a456cc6aaa83~mv2.png",
    category: "irrigation",
    specs: ["Pilotage 4G", "Goutte-à-goutte", "Aspersion", "Programmation"],
    features: ["Application mobile", "Économie d'eau", "Multi-programmes", "Capteurs intégrés"],
  },
  {
    id: "st-02x",
    name: "ST-02_X",
    description: "Solution polyvalente adaptée aux systèmes goutte-à-goutte et aspersion. La référence des agriculteurs.",
    longDescription: "La solution ST-02_X est la référence des agriculteurs pour l'irrigation de précision. Compatible goutte-à-goutte et aspersion, elle s'adapte à tous types de cultures et de configurations de terrain.",
    price: 195000,
    image: "https://static.wixstatic.com/media/75ad33_5ae75292849c40308616364b4b782980~mv2.png/v1/fill/w_950,h_719,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_5ae75292849c40308616364b4b782980~mv2.png",
    category: "irrigation",
    specs: ["Goutte-à-goutte", "Aspersion", "Pilotage mobile", "Robuste"],
    features: ["Haute compatibilité", "Robustesse maximale", "Maintenance facile", "Pilotage intuitif"],
  },
  {
    id: "st-03i",
    name: "ST-03_I",
    description: "Conçu pour l'industrie, la distribution d'eau, les pipelines et les canalisations. Robustesse maximale.",
    longDescription: "Le ST-03_I est spécialement conçu pour les applications industrielles exigeantes. Distribution d'eau, pipelines, canalisations : ce système robuste assure un monitoring 24/7 pour une fiabilité maximale.",
    price: 420000,
    image: "https://static.wixstatic.com/media/75ad33_f441855cdd1743b8982ad0a497d536c8~mv2.jpeg/v1/fill/w_1895,h_926,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_f441855cdd1743b8982ad0a497d536c8~mv2.jpeg",
    category: "industriel",
    specs: ["Usage intensif", "Pipeline", "Canalisation", "Monitoring 24/7"],
    features: ["Construction robuste", "Contrôle précis", "Alertes automatiques", "Maintenance préventive"],
  },
  {
    id: "sotilma-st02t",
    name: "Sotilma-st02T",
    description: "Gestion de doubles parcelles et distribution d'eau optimisée. Solution complète pour les exploitants.",
    longDescription: "Le Sotilma-st02T est la solution idéale pour la gestion de doubles parcelles. Distribution d'eau optimisée, contrôle autonome et connectivité avancée pour une irrigation sans compromis.",
    price: 333000,
    originalPrice: 370000,
    image: "https://static.wixstatic.com/media/75ad33_82b826c91cd44c88954123ab55cbc531~mv2.jpg/v1/fill/w_446,h_544,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_82b826c91cd44c88954123ab55cbc531~mv2.jpg",
    category: "distribution",
    specs: ["Double parcelle", "Distribution eau", "Autonome", "Connecté"],
    features: ["Gestion intelligente", "Économie d'eau", "Application dédiée", "Support technique"],
  },
  {
    id: "camera-basic",
    name: "Caméra Basic",
    description: "Caméra solaire d'entrée de gamme pour la surveillance visuelle de vos parcelles. Installation simple.",
    longDescription: "Solution de surveillance abordable pour démarrer le monitoring de vos parcelles agricoles. Alimentée par énergie solaire, installation simple et rapide.",
    price: 75000,
    originalPrice: 85000,
    image: "https://static.wixstatic.com/media/75ad33_2b84b31e551f42e8ba634f3823910159~mv2.png/v1/fill/w_575,h_625,al_c,lg_1,q_85,enc_avif,quality_auto/75ad33_2b84b31e551f42e8ba634f3823910159~mv2.png",
    category: "camera",
    specs: ["Full HD", "Solaire", "WiFi/4G", "Étanche IP66"],
    features: ["Installation simple", "Qualité HD", "Vision de jour", "Application mobile"],
  },
  {
    id: "vanne-simple",
    name: "Vanne motorisée standard",
    description: "Vanne motorisée solaire simple voie. Idéale pour débuter l'automatisation de votre irrigation.",
    longDescription: "La solution idéale pour débuter dans l'automatisation de l'irrigation. Simple à installer et à utiliser, cette vanne motorisée solaire vous permet de contrôler votre irrigation à distance.",
    price: 180000,
    originalPrice: 210000,
    image: "https://static.wixstatic.com/media/75ad33_82b826c91cd44c88954123ab55cbc531~mv2.jpg/v1/fill/w_446,h_544,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_82b826c91cd44c88954123ab55cbc531~mv2.jpg",
    category: "vanne",
    specs: ["Simple voie", "Solaire", "Pilotage 4G", "Étanche"],
    features: ["Prise en main rapide", "Application intuitive", "Économie d'énergie", "Garantie 2 ans"],
  },
  {
    id: "vanne-industrielle-papillon",
    name: "Vanne industrielle papillon électrique",
    description: "Vanne industrielle papillon avec actionneur électrique pour applications intensives.",
    longDescription: "Vanne papillon électrique conçue pour les environnements industriels les plus exigeants. Actionneur puissant, matériaux résistants à la corrosion, contrôle précis du débit.",
    price: 527000,
    image: "https://static.wixstatic.com/media/75ad33_0850deeacbde464f946746f6996a0bee~mv2.png/v1/fill/w_749,h_852,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_0850deeacbde464f946746f6996a0bee~mv2.png",
    category: "vanne",
    specs: ["Usage industriel", "Haute pression", "Anti-corrosion", "Contrôle précis"],
    features: ["Matériaux haute résistance", "Contrôle PID", "Retour d'état", "Sécurité intégrée"],
  },
  {
    id: "pack-pro",
    name: "Kit Pack Pro",
    description: "Pack complet caméra + vanne pour une solution d'irrigation intégrale.",
    longDescription: "Le Pack Pro comprend tout le nécessaire pour une installation complète : caméra de surveillance, vanne motorisée, panneau solaire et accessoires. La solution tout-en-un pour votre exploitation.",
    price: 1408000,
    image: "https://static.wixstatic.com/media/75ad33_5ae75292849c40308616364b4b782980~mv2.png/v1/fill/w_950,h_719,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_5ae75292849c40308616364b4b782980~mv2.png",
    category: "pack",
    specs: ["Caméra + Vanne", "Panneau solaire", "Accessoires", "Application"],
    features: ["Installation complète", "Économisez 15%", "Support prioritaire", "Garantie étendue"],
  },
];

// ============================================================
// UTILITAIRES
// ============================================================
function formatFCFA(amount: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "decimal",
    maximumFractionDigits: 0,
  }).format(amount) + " CFA";
}

// ============================================================
// PAGE PRODUIT
// ============================================================
export default function ProduitPage() {
  const params = useParams();
  const { id } = params;
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const currentIndex = products.findIndex((p) => p.id === id);
  const product = products[currentIndex];

  if (!product) {
    return (
      <main className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xs text-gray-400">Produit non trouvé</p>
        </div>
      </main>
    );
  }

  const images = product.images || [product.image];

  return (
    <main className="bg-white min-h-screen">
      {/* Fil d'Ariane */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-[11px] text-gray-400">
            <Link href="/" className="hover:text-gray-600">Accueil</Link>
            <span>/</span>
            <Link href="/boutique" className="hover:text-gray-600">Boutique</Link>
            <span>/</span>
            <span className="text-gray-700">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Navigation Retour simple */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <Link 
          href="/boutique"
          className="inline-flex items-center gap-1.5 text-[11px] font-medium text-gray-500 hover:text-primary transition-colors group"
        >
          <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
          Retour à la boutique
        </Link>
      </div>

      {/* Section produit - Galerie et Infos */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Galerie images */}
          <div>
            <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden mb-4">
              <Image
                src={images[selectedImage]}
                alt={product.name}
                fill
                className="object-contain p-6"
              />
            </div>
            
            {images.length > 1 && (
              <div className="space-y-2">
                <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Miniatures :</p>
                <div className="flex gap-2">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative w-16 h-16 rounded-md overflow-hidden border transition-all ${
                        selectedImage === index ? "border-primary border-2" : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Image src={img} alt={`Vue ${index + 1}`} fill className="object-contain p-1" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Infos produit */}
          <div>
            <h1 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h1>
            
            {/* Évaluation */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-medium text-yellow-500">★★★★★</span>
              <span className="text-[10px] text-gray-400">(5/5)</span>
            </div>

            {/* Prix */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-semibold text-gray-900">{formatFCFA(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-xs text-gray-400 line-through">Prix original {formatFCFA(product.originalPrice)}</span>
                )}
              </div>
              {product.originalPrice && (
                <p className="text-[10px] text-green-600 mt-1 font-medium">Prix promotionnel</p>
              )}
            </div>

            {/* Description courte */}
            <p className="text-[12px] text-gray-600 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Sélecteurs - Performance/Taille et Quantité */}
            <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
              {/* Sélecteur Performance/Taille */}
              <div>
                <label className="text-[10px] font-medium text-gray-700 uppercase block mb-2">Performance*</label>
                <select className="w-full px-2.5 py-2 border border-gray-300 rounded text-[11px] focus:outline-none focus:border-primary">
                  <option>Pro</option>
                  <option>Standard</option>
                </select>
              </div>

              {/* Quantité */}
              <div>
                <label className="text-[10px] font-medium text-gray-700 uppercase block mb-2">Quantité*</label>
                <div className="flex items-center border border-gray-300 rounded w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-2.5 py-1.5 text-gray-500 hover:text-gray-700 text-xs"
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-xs font-medium text-gray-700">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-2.5 py-1.5 text-gray-500 hover:text-gray-700 text-xs"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="space-y-2 mb-6">
              <button className="w-full flex items-center justify-center bg-gray-900 text-white text-sm font-medium px-5 py-2.5 rounded hover:bg-gray-800 transition-colors">
                Ajouter au panier
              </button>
              <button className="w-full flex items-center justify-center bg-primary text-white text-sm font-medium px-5 py-2.5 rounded hover:opacity-90 transition-opacity">
                Commander et payer
              </button>
            </div>

            {/* Caractéristiques principales */}
            {product.specs && product.specs.length > 0 && (
              <div>
                <h3 className="text-[10px] font-semibold text-gray-900 uppercase mb-3">Caractéristiques principales</h3>
                <ul className="space-y-2">
                  {product.specs.slice(0, 4).map((spec, index) => (
                    <li key={index} className="flex items-start gap-2 text-[11px] text-gray-600">
                      <span className="text-primary font-bold">✓</span>
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>


    </main>
  );
}