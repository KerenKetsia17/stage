# Sotilma Backend API

## Structure

```
backend/
├── server.js              # Point d'entrée
├── .env.example           # Variables d'environment (exemple)
├── package.json
└── src/
    ├── app.js             # Configuration Express
    ├── config/
    │   └── firebase.js    # Initialisation Firebase
    ├── middleware/
    │   └── auth.js        # Authentification
    ├── routes/
    │   ├── products.js    # Endpoints produits
    │   ├── contact.js     # Endpoint contact
    │   └── orders.js      # Endpoints commandes (NEW)
    └── data/
        └── products.js    # Données de démo
```

## Installation

```bash
cd backend
npm install
```

## Variables d'environnement

Copier `.env.example` en `.env` et configurer :

```env
# Server
PORT=4000
NODE_ENV=development

# CORS
ALLOWED_ORIGINS=http://localhost:3000,https://www.sotilmaa.com

# Email (Nodemailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Firebase (optionnel - mode démo si absent)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY_ID=your-key-id
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n
FIREBASE_CLIENT_EMAIL=your-email@your-project.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your-client-id
```

## Lancement

### Mode développement (avec nodemon)
```bash
npm run dev
```

### Mode production
```bash
npm start
```

Le serveur démarrera sur `http://localhost:4000`

## API Endpoints

### Products
- `GET /api/products` - Liste des produits (avec filtrage optionnel `?category=...`)
- `GET /api/products/:slug` - Détail d'un produit par slug
- `POST /api/products` - Créer un produit (admin)
- `PUT /api/products/:id` - Modifier un produit (admin)
- `DELETE /api/products/:id` - Supprimer un produit (admin)

### Contact
- `POST /api/contact` - Envoyer un message de contact

**Payload exemple :**
```json
{
  "name": "Jean Dupont",
  "email": "jean@example.com",
  "phone": "+221776740924",
  "subject": "Question sur SOTILMA Mobile",
  "message": "J'aimerais en savoir plus sur..."
}
```

### Orders (NEW)
- `GET /api/orders` - Liste des commandes
- `GET /api/orders/:id` - Détail d'une commande
- `POST /api/orders` - Créer une commande

**Payload exemple :**
```json
{
  "customerName": "Jean Dupont",
  "customerEmail": "jean@example.com",
  "customerPhone": "+221776740924",
  "shippingAddress": "123 Rue Example, Dakar, Sénégal",
  "items": [
    {
      "productId": "sotilma-mobile-1",
      "productName": "SOTILMA Mobile Pro",
      "quantity": 1,
      "price": 5000
    }
  ],
  "totalPrice": 5000
}
```

- `PUT /api/orders/:id` - Mettre à jour le statut d'une commande (admin)

## Sécurité

- **Helmet.js** : Protection des headers HTTP
- **CORS** : Gestion des origines autorisées
- **Rate limiting** : Limitation des requêtes par IP
  - Global : 200 requêtes par 15 minutes
  - Contact : 10 messages par heure

## Mode démo vs Firebase

- **Mode démo** : Si `FIREBASE_PROJECT_ID` n'est pas défini, les données sont stockées en mémoire (idéal pour le développement)
- **Mode Firebase** : Avec une config Firebase, les données sont persistées dans Firestore

## Notes de développement

1. Les routes d'administration (POST, PUT, DELETE sur products) peuvent nécessiter une authentification
2. Le middleware `requireAuth` est disponible dans `src/middleware/auth.js`
3. Pour ajouter une nouvelle route, créer un fichier dans `src/routes/` et l'importer dans `app.js`
4. Les erreurs sont centralisées dans un gestionnaire global d'erreurs
