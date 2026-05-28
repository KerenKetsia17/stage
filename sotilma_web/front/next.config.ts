// ============================================================
// FICHIER : next.config.ts
// RÔLE    : Configuration de Next.js
//
// Important : next/image vérifie que les images viennent
// d'un domaine autorisé. Si on utilise des URLs externes
// (Wix CDN ici), on doit les déclarer ici sinon Next.js
// les bloque pour des raisons de sécurité.
// ============================================================

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Domaines autorisés pour next/image
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.wixstatic.com",
        // On autorise toutes les URLs de ce domaine
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
