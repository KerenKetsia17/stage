// ============================================================
// FICHIER : src/routes/orders.js
// RÔLE    : Routes pour les commandes
//
//   GET  /api/orders          → liste des commandes (admin)
//   GET  /api/orders/:id      → détail d'une commande
//   POST /api/orders          → créer une commande
//   PUT  /api/orders/:id      → mettre à jour une commande (admin)
//
// ============================================================

const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/auth");

// ── Détection du mode ───────────────────────────────────────
const FIREBASE_READY = !!process.env.FIREBASE_PROJECT_ID;
let db;
if (FIREBASE_READY) {
  db = require("../config/firebase").db;
}

const COLLECTION = "orders";

// ── Store en mémoire (mode démo) ────────────────────────────
let memoryStore = [];
let nextId = 1;

function storeGetAll() {
  return [...memoryStore];
}

function storeGetById(id) {
  return memoryStore.find((o) => o.id === String(id)) || null;
}

function storeCreate(data) {
  const order = {
    ...data,
    id: String(nextId++),
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  memoryStore.push(order);
  return order;
}

function storeUpdate(id, data) {
  const idx = memoryStore.findIndex((o) => o.id === String(id));
  if (idx === -1) return null;
  memoryStore[idx] = {
    ...memoryStore[idx],
    ...data,
    updatedAt: new Date().toISOString(),
  };
  return memoryStore[idx];
}

// ── Validation ──────────────────────────────────────────────
function validateOrder(data) {
  const { customerEmail, customerName, items, totalPrice } = data;

  if (!customerName || typeof customerName !== "string") {
    return "Le nom du client est requis.";
  }

  if (!customerEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
    return "L'adresse email du client n'est pas valide.";
  }

  if (!Array.isArray(items) || items.length === 0) {
    return "Au moins un article est requis.";
  }

  if (typeof totalPrice !== "number" || totalPrice <= 0) {
    return "Le prix total doit être un nombre positif.";
  }

  return null;
}

// ── GET /api/orders ────────────────────────────────────────
router.get("/", async (req, res) => {
  try {
    if (!FIREBASE_READY) return res.json(storeGetAll());

    const snapshot = await db.collection(COLLECTION).get();
    return res.json(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  } catch (err) {
    console.error("GET /orders :", err);
    return res.status(500).json({ error: "Erreur serveur." });
  }
});

// ── GET /api/orders/:id ────────────────────────────────────
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!FIREBASE_READY) {
      const order = storeGetById(id);
      return order
        ? res.json(order)
        : res.status(404).json({ error: "Commande introuvable." });
    }

    const doc = await db.collection(COLLECTION).doc(id).get();
    if (!doc.exists) {
      return res.status(404).json({ error: "Commande introuvable." });
    }

    return res.json({ id: doc.id, ...doc.data() });
  } catch (err) {
    console.error("GET /orders/:id :", err);
    return res.status(500).json({ error: "Erreur serveur." });
  }
});

// ── POST /api/orders ───────────────────────────────────────
router.post("/", async (req, res) => {
  try {
    const { customerName, customerEmail, customerPhone, items, totalPrice, shippingAddress } =
      req.body;

    // Validation
    const error = validateOrder({ customerName, customerEmail, items, totalPrice });
    if (error) {
      return res.status(422).json({ error });
    }

    const orderData = {
      customerName: String(customerName).trim(),
      customerEmail: String(customerEmail).trim().toLowerCase(),
      customerPhone: customerPhone ? String(customerPhone).trim() : "Non renseigné",
      items: Array.isArray(items) ? items : [],
      totalPrice: Number(totalPrice),
      shippingAddress: shippingAddress || null,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    if (!FIREBASE_READY) {
      const newOrder = storeCreate(orderData);
      return res.status(201).json(newOrder);
    }

    const docRef = await db.collection(COLLECTION).add(orderData);
    const doc = await docRef.get();
    return res.status(201).json({ id: doc.id, ...doc.data() });
  } catch (err) {
    console.error("POST /orders :", err);
    return res.status(500).json({ error: "Erreur lors de la création de la commande." });
  }
});

// ── PUT /api/orders/:id ────────────────────────────────────
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status, shippingAddress } = req.body;

    if (!["pending", "confirmed", "shipped", "delivered", "cancelled"].includes(status)) {
      return res.status(422).json({ error: "Statut invalide." });
    }

    const updateData = { status };
    if (shippingAddress) updateData.shippingAddress = shippingAddress;

    if (!FIREBASE_READY) {
      const updatedOrder = storeUpdate(id, updateData);
      if (!updatedOrder) {
        return res.status(404).json({ error: "Commande introuvable." });
      }
      return res.json(updatedOrder);
    }

    await db.collection(COLLECTION).doc(id).update(updateData);
    const doc = await db.collection(COLLECTION).doc(id).get();
    return res.json({ id: doc.id, ...doc.data() });
  } catch (err) {
    console.error("PUT /orders/:id :", err);
    return res.status(500).json({ error: "Erreur serveur." });
  }
});

module.exports = router;
