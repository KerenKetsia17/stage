// ============================================================
// FICHIER : src/app.js
// RÔLE    : Configure Express (middlewares, routes, erreurs).
// ============================================================

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const productsRouter = require("./routes/products");
const contactRouter  = require("./routes/contact");
const ordersRouter   = require("./routes/orders");

const app = express();

// ── Sécurité ────────────────────────────────────────────────
app.use(helmet());

// ── CORS ────────────────────────────────────────────────────
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "http://localhost:3000")
  .split(",")
  .map((o) => o.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      // Autoriser les appels sans origin (ex: Postman, tests serveur)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS bloqué pour l'origine : ${origin}`));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ── Body parser ─────────────────────────────────────────────
app.use(express.json({ limit: "1mb" }));

// ── Rate limiting global ────────────────────────────────────
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Trop de requêtes. Réessayez dans 15 minutes." },
});
app.use(globalLimiter);

// Limite plus stricte sur le formulaire de contact
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 heure
  max: 10,
  message: { error: "Limite atteinte. Vous pouvez envoyer 10 messages maximum par heure." },
});

// ── Routes ──────────────────────────────────────────────────
app.get("/", (req, res) => res.json({ status: "ok", service: "Sotilma API" }));
app.use("/api/products", productsRouter);
app.use("/api/contact", contactLimiter, contactRouter);
app.use("/api/orders", ordersRouter);

// ── 404 ─────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: `Route introuvable : ${req.method} ${req.path}` });
});

// ── Gestionnaire d'erreurs global ───────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: err.message || "Erreur interne du serveur." });
});

module.exports = app;
