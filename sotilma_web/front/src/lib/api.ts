// ============================================================
// FICHIER : src/lib/api.ts
// RÔLE    : Fonctions pour appeler l'API backend Sotilma.
//           NEXT_PUBLIC_API_URL → ex: http://localhost:4000
// ============================================================

import type { Product } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

// ── Produits ────────────────────────────────────────────────

export async function fetchProducts(category?: string): Promise<Product[]> {
  const url = category
    ? `${API_URL}/api/products?category=${encodeURIComponent(category)}`
    : `${API_URL}/api/products`;

  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Impossible de charger les produits.");
  return res.json();
}

export async function fetchProduct(slug: string): Promise<Product | null> {
  const res = await fetch(`${API_URL}/api/products/${encodeURIComponent(slug)}`, {
    next: { revalidate: 60 },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Impossible de charger le produit.");
  return res.json();
}

// ── Contact ─────────────────────────────────────────────────

export async function sendContact(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}): Promise<void> {
  const res = await fetch(`${API_URL}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const json = await res.json().catch(() => ({}));
    throw new Error(json.error ?? "Erreur serveur.");
  }
}
