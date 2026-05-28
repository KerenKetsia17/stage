// ============================================================
// FICHIER : src/routes/products.js
// RÔLE    : Routes produits.
//
//   GET  /api/products          → liste (+ filtre ?category=...)
//   GET  /api/products/:slug    → détail par slug
//   POST /api/products          → créer   (admin)
//   PUT  /api/products/:id      → modifier (admin)
//   DELETE /api/products/:id    → supprimer (admin)
//
// MODE DÉMO : si FIREBASE_PROJECT_ID est absent du .env,
// les données en mémoire sont utilisées (aucune config requise).
// ============================================================

const express = require("express");
const router  = express.Router();
const { requireAuth } = require("../middleware/auth");
const catalogProducts = require("../data/products");

// ── Détection du mode ───────────────────────────────────────
const FIREBASE_READY = !!process.env.FIREBASE_PROJECT_ID;
let db;
if (FIREBASE_READY) {
  db = require("../config/firebase").db;
} else {
  console.log("ℹ️  Mode démo — données en mémoire (Firebase non configuré)");
}

const COLLECTION = "products";

// ── Store en mémoire (mode démo) ────────────────────────────
let memoryStore = catalogProducts.map((p) => ({ ...p }));
let nextId = memoryStore.length + 1;

function storeGetAll(category) {
  return category ? memoryStore.filter((p) => p.category === category) : [...memoryStore];
}
function storeGetBySlug(slug) {
  return memoryStore.find((p) => p.slug === slug) || null;
}
function storeGetById(id) {
  return memoryStore.find((p) => p.id === String(id)) || null;
}
function storeCreate(data) {
  const product = { ...data, id: String(nextId++), createdAt: new Date().toISOString() };
  memoryStore.push(product);
  return product;
}
function storeUpdate(id, data) {
  const idx = memoryStore.findIndex((p) => p.id === String(id));
  if (idx === -1) return null;
  memoryStore[idx] = { ...memoryStore[idx], ...data, updatedAt: new Date().toISOString() };
  return memoryStore[idx];
}
function storeDelete(id) {
  const idx = memoryStore.findIndex((p) => p.id === String(id));
  if (idx === -1) return false;
  memoryStore.splice(idx, 1);
  return true;
}

// ── GET /api/products ───────────────────────────────────────
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;

    if (!FIREBASE_READY) return res.json(storeGetAll(category));

    let query = db.collection(COLLECTION);
    if (category) query = query.where("category", "==", category);
    const snapshot = await query.get();
    return res.json(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  } catch (err) {
    console.error("GET /products :", err);
    return res.status(500).json({ error: "Erreur serveur." });
  }
});

// ── GET /api/products/:slug ─────────────────────────────────
router.get("/:slug", async (req, res) => {
  try {
    const { slug } = req.params;

    if (!FIREBASE_READY) {
      const product = storeGetBySlug(slug);
      return product ? res.json(product) : res.status(404).json({ error: "Produit introuvable." });
    }

    const snapshot = await db
      .collection(COLLECTION)
      .where("slug", "==", slug)
      .limit(1)
      .get();

    if (snapshot.empty) return res.status(404).json({ error: "Produit introuvable." });
    const doc = snapshot.docs[0];
    return res.json({ id: doc.id, ...doc.data() });
  } catch (err) {
    console.error("GET /products/:slug :", err);
    return res.status(500).json({ error: "Erreur serveur." });
  }
});

// ── POST /api/products (admin) ──────────────────────────────
router.post("/", requireAuth, async (req, res) => {
  try {
    const data = req.body;
    if (!data.name || !data.slug || !data.price || !data.category) {
      return res.status(422).json({ error: "Champs obligatoires manquants : name, slug, price, category." });
    }

    if (!FIREBASE_READY) {
      if (storeGetBySlug(data.slug)) return res.status(409).json({ error: "Un produit avec ce slug existe déjà." });
      return res.status(201).json(storeCreate(data));
    }

    const existing = await db.collection(COLLECTION).where("slug", "==", data.slug).limit(1).get();
    if (!existing.empty) return res.status(409).json({ error: "Un produit avec ce slug existe déjà." });
    const docRef = await db.collection(COLLECTION).add({ ...data, createdAt: new Date().toISOString() });
    return res.status(201).json({ id: docRef.id, ...data });
  } catch (err) {
    console.error("POST /products :", err);
    return res.status(500).json({ error: "Erreur serveur." });
  }
});

// ── PUT /api/products/:id (admin) ───────────────────────────
router.put("/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;

    if (!FIREBASE_READY) {
      const updated = storeUpdate(id, req.body);
      return updated ? res.json(updated) : res.status(404).json({ error: "Produit introuvable." });
    }

    const docRef = db.collection(COLLECTION).doc(id);
    const doc = await docRef.get();
    if (!doc.exists) return res.status(404).json({ error: "Produit introuvable." });
    await docRef.update({ ...req.body, updatedAt: new Date().toISOString() });
    return res.json({ id, ...req.body });
  } catch (err) {
    console.error("PUT /products/:id :", err);
    return res.status(500).json({ error: "Erreur serveur." });
  }
});

// ── DELETE /api/products/:id (admin) ────────────────────────
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;

    if (!FIREBASE_READY) {
      return storeDelete(id)
        ? res.json({ message: "Produit supprimé." })
        : res.status(404).json({ error: "Produit introuvable." });
    }

    const docRef = db.collection(COLLECTION).doc(id);
    const doc = await docRef.get();
    if (!doc.exists) return res.status(404).json({ error: "Produit introuvable." });
    await docRef.delete();
    return res.json({ message: "Produit supprimé." });
  } catch (err) {
    console.error("DELETE /products/:id :", err);
    return res.status(500).json({ error: "Erreur serveur." });
  }
});

module.exports = router;
