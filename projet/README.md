# CamionSuf — Vue d'ensemble du projet

CamionSuf est une plateforme digitale de livraison de **matériaux de construction** (sable, gravier, béton, ciment) dans la région de Dakar, Sénégal.

Elle est composée de **trois applications indépendantes** qui communiquent via Firebase et une API Flask.

---

## Architecture générale

```
projet/
├── client/       # Application web client (commande + suivi de livraison)
├── fournisseur/  # Application web fournisseur (gestion des commandes et du stock)
└── livreur/      # Application mobile-first livreur (missions + tracking GPS)
```

### Comment les 3 apps interagissent

```
┌─────────────┐        Firestore / Realtime DB        ┌──────────────────┐
│   CLIENT    │ ──── enregistre la commande ────────► │   FOURNISSEUR    │
│  (Vercel)   │                                        │  (React + Flask) │
└──────┬──────┘                                        └────────┬─────────┘
       │                                                         │
       │  POST /track (WhatsApp notify)                          │ affecte livreur
       ▼                                                         ▼
┌─────────────┐   ◄────── envoie position GPS ─────── ┌──────────────────┐
│  BACKEND    │                                        │    LIVREUR       │
│  (Render)   │                                        │  (React + Flask) │
└─────────────┘                                        └──────────────────┘
```

| App | Frontend | Backend | Déployé sur |
|---|---|---|---|
| **client** | React + Vite (JS) | Flask (Python) | Vercel + Render |
| **fournisseur** | React + Vite + Tailwind | Flask (Python) | — |
| **livreur** | React + Vite | Flask (Python) | — |

---

## Prérequis communs

- **Node.js 18+** et **npm**
- **Python 3.10+** et **pip**
- Un projet **Firebase** avec Firestore + Realtime Database + Authentication activés
- Copier chaque `.env.example` en `.env` et remplir les valeurs

---

## Démarrage rapide

Chaque sous-projet possède son propre README avec les instructions détaillées :

- [`client/README.md`](client/README.md) — App de commande client + notifications WhatsApp
- [`fournisseur/README.md`](fournisseur/README.md) — App de gestion fournisseur
- [`livreur/README.md`](livreur/README.md) — App de suivi des missions pour le chauffeur

---

## Variables d'environnement importantes

Chaque application lit ses variables depuis un fichier `.env` local (jamais commité).
Des fichiers `.env.example` sont fournis dans chaque dossier `backend/` et `frontend/`.

> ⚠️ **Ne jamais commiter** les fichiers `.env`, les clés Firebase (`firebase_key.json`),
> ni les tokens Meta/WhatsApp.

---

## Stack technique résumée

| Couche | Technologie |
|---|---|
| Frontend | React 18, Vite, React Router v6 |
| Style | CSS modules / Tailwind CSS (fournisseur, livreur) |
| Backend | Python 3.10, Flask, Flask-CORS |
| Base de données | Firebase Firestore + Realtime Database |
| Auth | Firebase Authentication |
| Cartographie | Leaflet + OpenStreetMap (Photon / Nominatim) |
| Notifications | Meta WhatsApp Cloud API |
| Déploiement | Vercel (frontend client), Render (backend client) |
