// ============================================================
// FICHIER : src/middleware/auth.js
// RÔLE    : Middleware de vérification du token Firebase Admin.
//           Protège les routes réservées à l'admin.
// ============================================================

const { admin } = require("../config/firebase");

const FIREBASE_READY = !!process.env.FIREBASE_PROJECT_ID;
const DEMO_ADMIN_KEY = process.env.DEMO_ADMIN_KEY || "sotilma-demo-2026";

/**
 * Vérifie le token Firebase (production) ou la clé démo (mode démo).
 * En mode démo : Authorization: Bearer <DEMO_ADMIN_KEY>
 */
async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token d'authentification manquant." });
  }

  const token = authHeader.split("Bearer ")[1];

  // Mode démo — clé statique
  if (!FIREBASE_READY) {
    if (token === DEMO_ADMIN_KEY) {
      req.user = { uid: "demo-admin", email: "admin@sotilma.demo" };
      return next();
    }
    return res.status(401).json({ error: "Clé admin démo invalide." });
  }

  // Mode production — token Firebase
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "Token invalide ou expiré." });
  }
}

module.exports = { requireAuth };
