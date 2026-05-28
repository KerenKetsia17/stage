// ============================================================
// FICHIER : src/app/api/contact/route.ts
// RÔLE    : Route API — reçoit les données du formulaire de
//           contact et les envoie par email.
//
// C'est du code backend (Node.js), il s'exécute côté serveur,
// jamais dans le navigateur. Il a accès aux variables d'env.
//
// URL : POST /api/contact
// ============================================================

import { NextRequest, NextResponse } from "next/server";

// ---- Validation simple ----
// On vérifie que les champs obligatoires sont présents et corrects
// AVANT de faire quoi que ce soit avec les données.
function validate(data: Record<string, unknown>) {
  const { name, email, subject, message } = data;

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return "Le nom est requis (minimum 2 caractères).";
  }
  if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "L'adresse email n'est pas valide.";
  }
  if (!subject || typeof subject !== "string" || subject.trim() === "") {
    return "Le sujet est requis.";
  }
  if (!message || typeof message !== "string" || message.trim().length < 10) {
    return "Le message est requis (minimum 10 caractères).";
  }
  return null; // null = pas d'erreur
}

// ---- Handler POST ----
// Next.js appelle cette fonction quand le formulaire envoie une requête POST
export async function POST(req: NextRequest) {
  // 1. Lire le corps JSON de la requête
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Format de données invalide." }, { status: 400 });
  }

  // 2. Valider les données
  const validationError = validate(body);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 422 });
  }

  // 3. Extraire les champs nettoyés
  const name = String(body.name).trim();
  const email = String(body.email).trim().toLowerCase();
  const phone = body.phone ? String(body.phone).trim() : "Non renseigné";
  const subject = String(body.subject).trim();
  const message = String(body.message).trim();

  // 4. Envoyer l'email
  // Pour l'instant on utilise Resend (gratuit jusqu'à 3 000 mails/mois).
  // Si RESEND_API_KEY n'est pas défini, on simule l'envoi en dev.
  //
  // Pour activer en production :
  //   1. Créer un compte sur resend.com
  //   2. Ajouter RESEND_API_KEY dans .env.local
  //   3. npm install resend
  //
  const RESEND_API_KEY = process.env.RESEND_API_KEY;

  if (!RESEND_API_KEY) {
    // Mode développement : on logue juste dans la console du serveur
    console.log("📧 [DEV] Message reçu (email non envoyé — RESEND_API_KEY manquant):");
    console.log({ name, email, phone, subject, message });
    return NextResponse.json({ ok: true });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Formulaire Sotilma <contact@sotilmaa.com>",
        to: ["sntech.afrique@gmail.com"],
        // on met l'email de l'expéditeur en reply-to pour pouvoir répondre directement
        reply_to: email,
        subject: `[Contact Sotilma] ${subject} — ${name}`,
        html: `
          <h2> Nouveau message depuis le site Sotilma </h2>
          <table>
            <tr><td><strong> Nom </strong></td><td>${name}</td></tr>
            <tr><td><strong> Email </strong></td><td>${email}</td></tr>
            <tr><td><strong> Téléphone </strong></td><td>${phone}</td></tr>
            <tr><td><strong> Sujet </strong></td><td>${subject}</td></tr>
          </table>
          <hr/>
          <h3> Message : </h3>
          <p style="white-space: pre-wrap">${message}</p>
        `,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      console.error("Resend error:", err);
      return NextResponse.json({ error: "Erreur lors de l'envoi de l'email." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("API contact error:", err);
    return NextResponse.json({ error: "Erreur interne." }, { status: 500 });
  }
}

// On refuse toutes les autres méthodes HTTP (GET, PUT, etc.)
export async function GET() {
  return NextResponse.json({ error: "Méthode non autorisée." }, { status: 405 });
}
