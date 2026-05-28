// ============================================================
// FICHIER : src/routes/contact.js
// RÔLE    : Route POST /api/contact
//           Valide les données du formulaire, envoie un email
//           via Nodemailer (SMTP Gmail ou autre), et sauvegarde
//           le message dans Firestore.
// ============================================================

const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

// ── Détection du mode ───────────────────────────────────────
const SMTP_READY = !!process.env.SMTP_USER;
const FIREBASE_READY = !!process.env.FIREBASE_PROJECT_ID;
let db = null;
if (FIREBASE_READY) {
  db = require("../config/firebase").db;
}

// ── Création du transporteur email ─────────────────────────
function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true", // true pour 465, false pour 587
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

// ── Validation ──────────────────────────────────────────────
function validate(data) {
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
  return null;
}

// ── POST /api/contact ───────────────────────────────────────
router.post("/", async (req, res) => {
  const body = req.body;

  // 1. Validation
  const error = validate(body);
  if (error) {
    return res.status(422).json({ error });
  }

  const name    = String(body.name).trim();
  const email   = String(body.email).trim().toLowerCase();
  const phone   = body.phone ? String(body.phone).trim() : "Non renseigné";
  const subject = String(body.subject).trim();
  const message = String(body.message).trim();

  // 2. Sauvegarder dans Firestore (si disponible)
  if (FIREBASE_READY) {
    try {
      await db.collection("contacts").add({
        name, email, phone, subject, message,
        createdAt: new Date().toISOString(),
        read: false,
      });
    } catch (err) {
      console.error("Firestore contact save :", err);
    }
  }

  // 3. Envoyer l'email (si SMTP configuré)
  if (!SMTP_READY) {
    console.log("\n📩  [MODE DÉMO] Message de contact reçu :");
    console.log(`   De      : ${name} <${email}>`);
    console.log(`   Tél     : ${phone}`);
    console.log(`   Sujet   : ${subject}`);
    console.log(`   Message : ${message}\n`);
    return res.json({ message: "Message reçu (mode démo — email simulé dans la console)." });
  }
  try {
    const transporter = createTransporter();

    await transporter.sendMail({
      from: `"Sotilma Web" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_RECIPIENT_EMAIL,
      replyTo: email,
      subject: `[Contact Sotilma] ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #16a34a;">Nouveau message de contact</h2>
          <table style="width:100%; border-collapse: collapse;">
            <tr><td style="padding:8px; font-weight:bold; width:30%;">Nom</td><td style="padding:8px;">${name}</td></tr>
            <tr style="background:#f9f9f9;"><td style="padding:8px; font-weight:bold;">Email</td><td style="padding:8px;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding:8px; font-weight:bold;">Téléphone</td><td style="padding:8px;">${phone}</td></tr>
            <tr style="background:#f9f9f9;"><td style="padding:8px; font-weight:bold;">Sujet</td><td style="padding:8px;">${subject}</td></tr>
          </table>
          <h3 style="color: #374151; margin-top: 20px;">Message</h3>
          <p style="background:#f3f4f6; padding:16px; border-radius:8px; white-space:pre-wrap;">${message}</p>
          <hr style="margin-top:24px; border:none; border-top:1px solid #e5e7eb;" />
          <p style="color:#9ca3af; font-size:12px;">Message envoyé depuis le site Sotilma</p>
        </div>
      `,
    });

    // Email de confirmation à l'expéditeur
    await transporter.sendMail({
      from: `"Sotilma" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Nous avons bien reçu votre message",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #16a34a;">Merci pour votre message, ${name} !</h2>
          <p>Nous avons bien reçu votre demande concernant <strong>${subject}</strong>.</p>
          <p>Notre équipe vous répondra dans les plus brefs délais.</p>
          <br/>
          <p>Cordialement,<br/><strong>L'équipe Sotilma</strong></p>
        </div>
      `,
    });
  } catch (err) {
    console.error("Nodemailer error :", err);
    return res.status(500).json({ error: "Erreur lors de l'envoi de l'email." });
  }

  return res.json({ message: "Message envoyé avec succès." });
});

module.exports = router;
