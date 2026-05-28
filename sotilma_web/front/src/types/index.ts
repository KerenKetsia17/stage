// ============================================================
// FICHIER : src/types/index.ts
// ============================================================

export type ProductCategory =
  | "vanne-automatique"
  | "vanne-industrielle"
  | "camera-agricole"
  | "accessoire";

export interface Product {
  id: string;
  slug: string;
  name: string;
  reference: string;
  category: ProductCategory;
  image: string;
  description: string;
  longDescription?: string;
  price: number;
  originalPrice?: number;
  inStock: boolean;
  badge?: string;
  features: string[];
}

export interface DomaineExpertise {
  id: string;
  subtitle: string;
  title: string;
  description: string;
  image: string;
  secondaryImage: string;
  tags: string[];
}

export interface Partenaire {
  id: string;
  name: string;
  logo: string;
}

export interface DonneesContact {
  nom: string;
  email: string;
  telephone?: string;
  message: string;
}
