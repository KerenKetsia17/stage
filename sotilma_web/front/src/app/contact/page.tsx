// ============================================================
// FICHIER : src/app/contact/page.tsx
// ============================================================

"use client";

import { useState } from "react";

type FormState = "idle" | "loading" | "success" | "error";

const INITIAL_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
};

export default function ContactPage() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${form.firstName} ${form.lastName}`.trim(),
          email: form.email,
          phone: form.phone,
          message: form.message,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Erreur serveur");
      }
      setState("success");
      setForm(INITIAL_FORM);
    } catch (err) {
      setState("error");
      setErrorMsg(err instanceof Error ? err.message : "Une erreur est survenue.");
    }
  }

  const inputBase =
    "w-full bg-sky-50/40 border border-sky-100 px-5 py-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all";

  return (
    <main className="bg-white">

      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-sky-50 via-white to-blue-50/40 pt-20 pb-16 sm:pt-28 sm:pb-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="block w-10 h-[2px] bg-gradient-to-r from-sky-500 to-green-500" />
            <span className="text-[11px] font-bold tracking-[0.28em] uppercase text-sky-600">Contactez-nous</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">
            Votre projet mérite{" "}
            <span className="text-sky-600 italic font-medium">une réponse d&apos;expert.</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto">
            Notre équipe est à votre disposition pour toute demande de devis, support technique ou partenariat.
          </p>
        </div>
      </section>

      {/* ── FORMULAIRE + INFOS ── */}
      <section className="py-20 sm:py-28 border-t border-sky-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-5 gap-14 lg:gap-20 items-start">

            {/* ── Infos (2/5) ── */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">Nos coordonnées</h2>
                <p className="text-slate-500 text-sm">Retrouvez-nous ou contactez-nous directement.</p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    label: "Localisation",
                    value: "Keur Massar, Dakar — Sénégal",
                    href: null,
                    icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z",
                  },
                  {
                    label: "Téléphone",
                    value: "+221 77 674 09 24",
                    href: "tel:+221776740924",
                    icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
                  },
                  {
                    label: "E-mail",
                    value: "sntech.afrique@gmail.com",
                    href: "mailto:sntech.afrique@gmail.com",
                    icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                  },
                ].map((c) => (
                  <div key={c.label} className="flex items-start gap-4">
                    <span className="w-11 h-11 bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d={c.icon} />
                      </svg>
                    </span>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-sky-600 mb-1">{c.label}</p>
                      {c.href ? (
                        <a href={c.href} className="text-base font-semibold text-slate-900 hover:text-sky-700 transition-colors">
                          {c.value}
                        </a>
                      ) : (
                        <p className="text-base font-semibold text-slate-900">{c.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Formulaire (3/5) ── */}
            <div className="lg:col-span-3 bg-white border border-sky-100 shadow-lg shadow-sky-900/5">
              <div className="h-[3px] bg-gradient-to-r from-sky-500 to-green-500" />
              <div className="p-8 sm:p-10">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-1">Envoyez un message</h2>
                <p className="text-slate-500 text-sm mb-8">Réponse garantie sous 24 heures ouvrées.</p>

                {state === "success" ? (
                  <div className="flex items-center gap-4 bg-green-50 border border-green-200 p-6">
                    <svg className="w-8 h-8 text-green-600 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-bold text-green-800">Message envoyé !</p>
                      <p className="text-sm text-green-700">Nous vous répondrons dans les 24 heures.</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-2">Prénom</label>
                        <input name="firstName" value={form.firstName} onChange={handleChange} className={inputBase} placeholder="Jean" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-2">Nom</label>
                        <input name="lastName" value={form.lastName} onChange={handleChange} className={inputBase} placeholder="Dupont" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-2">E-mail *</label>
                      <input name="email" required type="email" value={form.email} onChange={handleChange} className={inputBase} placeholder="contact@entreprise.com" />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-2">Téléphone</label>
                      <input name="phone" type="tel" value={form.phone} onChange={handleChange} className={inputBase} placeholder="+221 77 000 00 00" />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-2">Message *</label>
                      <textarea name="message" required rows={5} value={form.message} onChange={handleChange} className={`${inputBase} resize-none`} placeholder="Comment pouvons-nous vous aider ?" />
                    </div>

                    {state === "error" && (
                      <p className="text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-3">{errorMsg}</p>
                    )}

                    <button
                      type="submit"
                      disabled={state === "loading"}
                      className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold text-[11px] uppercase tracking-[0.2em] py-5 transition-all shadow-lg shadow-sky-600/20 hover:-translate-y-0.5 disabled:opacity-50"
                    >
                      {state === "loading" ? "Envoi en cours…" : "Envoyer le message"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
