// ============================================================
// FICHIER : src/lib/data.ts
// ============================================================

import type { Product, DomaineExpertise, Partenaire } from "@/types";

// ── Produits ───────────────────────────────────────────────

export const products: Product[] = [
  {
    id: "1",
    slug: "vanne-st02-x",
    name: "Vanne Sotilma ST-02X",
    reference: "ST-02X",
    category: "vanne-automatique",
    image: "https://static.wixstatic.com/media/75ad33_91ae93a325dd451cbece7e978781c56a~mv2.png/v1/fill/w_600,h_600,al_c,q_85,enc_avif,quality_auto/75ad33_91ae93a325dd451cbece7e978781c56a~mv2.png",
    description: "Vanne motorisée IoT pilotable à distance via smartphone, fonctionnant à l'énergie solaire sans connexion internet.",
    longDescription: "La ST-02X est notre vanne phare : pilotage à distance via l'application Sotilma, alimentation solaire autonome, fonctionnement hors-ligne grâce au réseau LoRa. Idéale pour l'irrigation agricole en zone rurale.",
    price: 185000,
    originalPrice: 220000,
    inStock: true,
    badge: "Best-seller",
    features: [
      "Pilotage smartphone (Android / iOS)",
      "Énergie solaire — aucune alimentation requise",
      "Fonctionne sans internet (réseau LoRa)",
      "Ouverture / fermeture programmable",
      "Boîtier IP67 étanche",
    ],
  },
  {
    id: "2",
    slug: "vanne-st03-pro",
    name: "Vanne Sotilma ST-03 Pro",
    reference: "ST-03P",
    category: "vanne-automatique",
    image: "https://static.wixstatic.com/media/75ad33_91ae93a325dd451cbece7e978781c56a~mv2.png/v1/fill/w_600,h_600,al_c,q_85,enc_avif,quality_auto/75ad33_91ae93a325dd451cbece7e978781c56a~mv2.png",
    description: "Version professionnelle avec capteur de débit intégré et alertes de fuite en temps réel.",
    price: 275000,
    inStock: true,
    badge: "Nouveau",
    features: [
      "Capteur de débit intégré",
      "Alertes fuite temps réel",
      "Pilotage smartphone",
      "Énergie solaire",
      "Historique de consommation",
    ],
  },
  {
    id: "3",
    slug: "vanne-industrielle-vi-100",
    name: "Vanne Industrielle VI-100",
    reference: "VI-100",
    category: "vanne-industrielle",
    image: "https://static.wixstatic.com/media/75ad33_91ae93a325dd451cbece7e978781c56a~mv2.png/v1/fill/w_600,h_600,al_c,q_85,enc_avif,quality_auto/75ad33_91ae93a325dd451cbece7e978781c56a~mv2.png",
    description: "Vanne papillon industrielle haute pression, alliages spéciaux résistant aux températures extrêmes.",
    price: 450000,
    inStock: true,
    features: [
      "Pression max 40 bar",
      "Température -40°C à +200°C",
      "Corps en acier inoxydable 316L",
      "Actionnement pneumatique ou électrique",
      "Certification ATEX zone 1",
    ],
  },
  {
    id: "4",
    slug: "camera-agricole-ca-01",
    name: "Caméra Agricole CA-01",
    reference: "CA-01",
    category: "camera-agricole",
    image: "https://static.wixstatic.com/media/75ad33_91ae93a325dd451cbece7e978781c56a~mv2.png/v1/fill/w_600,h_600,al_c,q_85,enc_avif,quality_auto/75ad33_91ae93a325dd451cbece7e978781c56a~mv2.png",
    description: "Caméra de surveillance solaire pour exploitation agricole, vision nocturne et alertes mouvement.",
    price: 95000,
    originalPrice: 120000,
    inStock: true,
    features: [
      "Vision nocturne infrarouge",
      "Alimentation solaire autonome",
      "Alertes mouvement sur smartphone",
      "Stockage SD + cloud",
      "Résistance IP66",
    ],
  },
  {
    id: "5",
    slug: "compteur-intelligent-ci-50",
    name: "Compteur Intelligent CI-50",
    reference: "CI-50",
    category: "accessoire",
    image: "https://static.wixstatic.com/media/75ad33_91ae93a325dd451cbece7e978781c56a~mv2.png/v1/fill/w_600,h_600,al_c,q_85,enc_avif,quality_auto/75ad33_91ae93a325dd451cbece7e978781c56a~mv2.png",
    description: "Compteur d'eau connecté avec relevé automatique et détection de fuites.",
    price: 65000,
    inStock: true,
    features: [
      "Relevé automatique à distance",
      "Détection de fuites",
      "Historique de consommation",
      "Compatible réseau LoRa",
      "Batterie longue durée (5 ans)",
    ],
  },
  {
    id: "6",
    slug: "kit-solaire-ks-200",
    name: "Kit Solaire KS-200",
    reference: "KS-200",
    category: "accessoire",
    image: "https://static.wixstatic.com/media/75ad33_91ae93a325dd451cbece7e978781c56a~mv2.png/v1/fill/w_600,h_600,al_c,q_85,enc_avif,quality_auto/75ad33_91ae93a325dd451cbece7e978781c56a~mv2.png",
    description: "Panneau solaire + batterie pour alimenter les vannes et capteurs Sotilma en toute autonomie.",
    price: 45000,
    inStock: false,
    features: [
      "Panneau 20W monocristallin",
      "Batterie lithium 12V 7Ah",
      "Régulateur de charge intégré",
      "Connectique universelle Sotilma",
      "Support de fixation inclus",
    ],
  },
];

// ── Domaines d'expertise ───────────────────────────────────

export const domainesExpertise: DomaineExpertise[] = [
  {
    id: "irrigation",
    subtitle: "Farm",
    title: "Irrigation",
    description:
      "La technologie SOTILMA est non seulement accessible et facile à utiliser, mais elle fonctionne également sans besoin d'internet, en utilisant l'énergie solaire.",
    image:
      "https://static.wixstatic.com/media/75ad33_1eb29bbf53824df6bd82594937dcc22f~mv2.jpg/v1/crop/x_2294,y_0,w_2507,h_3546/fill/w_576,h_796,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/rafraichissement-haut-alors-que-arroseurs-arcs-eau-verdure-geometrique-champs%20(1).jpg",
    secondaryImage:
      "https://static.wixstatic.com/media/75ad33_1eb29bbf53824df6bd82594937dcc22f~mv2.jpg/v1/crop/x_2294,y_0,w_2507,h_3546/fill/w_576,h_796,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/rafraichissement-haut-alors-que-arroseurs-arcs-eau-verdure-geometrique-champs%20(1).jpg",
    tags: ["IoT solaire", "Sans internet", "Pilotage mobile", "LoRa"],
  },
  {
    id: "industrie",
    subtitle: "Industrie",
    title: "Industrie",
    description:
      "Vannes en alliages spéciaux pouvant s'adapter à des températures très élevées et basses notamment dans l'industrie.",
    image:
      "https://static.wixstatic.com/media/11062b_219c166fc6d04b7aa60f59100e1a6ea5~mv2.jpg/v1/crop/x_790,y_0,w_1333,h_1632/fill/w_576,h_796,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Pipelines%20d'usine.jpg",
    secondaryImage:
      "https://static.wixstatic.com/media/11062b_219c166fc6d04b7aa60f59100e1a6ea5~mv2.jpg/v1/crop/x_790,y_0,w_1333,h_1632/fill/w_576,h_796,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Pipelines%20d'usine.jpg",
    tags: ["Haute pression", "Températures extrêmes", "ATEX", "Inox 316L"],
  },
  {
    id: "canalisation",
    subtitle: "Water",
    title: "Canalisation",
    description:
      "Vanne principalement utilisée comme le robinet motorisé, la vanne papillon, l'électrovanne pour la distribution et la gestion de l'eau potable.",
    image:
      "https://static.wixstatic.com/media/11062b_d680497ae73e423b81f2050772980f4e~mv2.jpg/v1/crop/x_781,y_0,w_2500,h_3064/fill/w_576,h_796,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Fixer%20un%20tuyau.jpg",
    secondaryImage:
      "https://static.wixstatic.com/media/11062b_d680497ae73e423b81f2050772980f4e~mv2.jpg/v1/crop/x_781,y_0,w_2500,h_3064/fill/w_576,h_796,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Fixer%20un%20tuyau.jpg",
    tags: ["Eau potable", "Vanne papillon", "Électrovanne", "Motorisé"],
  },
  {
    id: "pipeline",
    subtitle: "Oil",
    title: "Pipeline Pétrole & Gaz",
    description:
      "Solution complète de gestion des fluides dédiée aux applications les plus exigeantes : gestion automatisée, système pipeline, pétrochimie.",
    image:
      "https://static.wixstatic.com/media/fb82545edb1641db909d551d5f65382b.jpg/v1/crop/x_2106,y_0,w_3063,h_3744/fill/w_576,h_796,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Usine%20chimique.jpg",
    secondaryImage:
      "https://static.wixstatic.com/media/fb82545edb1641db909d551d5f65382b.jpg/v1/crop/x_2106,y_0,w_3063,h_3744/fill/w_576,h_796,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Usine%20chimique.jpg",
    tags: ["Pipeline", "Pétrochimie", "Haute sécurité", "Automatisation"],
  },
];

// ── Partenaires ────────────────────────────────────────────

export const partenaires: Partenaire[] = [
  { id: "1", name: "SAED", logo: "/images/partners/saed.png" },
  { id: "2", name: "OFOR", logo: "/images/partners/ofor.png" },
  { id: "3", name: "SDE", logo: "/images/partners/sde.png" },
  { id: "4", name: "ISRA", logo: "/images/partners/isra.png" },
];

// ── Fonctions utilitaires ──────────────────────────────────

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}
