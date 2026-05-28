// ============================================================
// FICHIER : server.js
// RÔLE    : Point d'entrée — charge les variables d'env et
//           démarre le serveur HTTP.
// ============================================================

require("dotenv").config();

const app  = require("./src/app");

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`\n🚀  Sotilma API démarrée sur http://localhost:${PORT}\n`);
});
