// ============================================================
// FICHIER : src/components/Footer.tsx
// RÔLE    : Footer global — fond blanc, texte noir
// ============================================================

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white text-black border-t border-sky-100">
      {/* Ligne accent en haut */}
      <div className="h-[3px] bg-gradient-to-r from-sky-500 via-sky-400 to-green-500" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 lg:gap-8">

          {/* ── Bloc marque (2/5) ── */}
          <div className="md:col-span-2 space-y-6">
            <div className="relative w-48 h-16">
              <Image
                src="/logo.png"
                alt="Sotilma Farm"
                fill
                className="object-contain object-left"
                priority
              />
            </div>

            <p className="text-sm text-neutral-600 leading-relaxed max-w-xs">
              Solutions d&apos;irrigation solaire, vannes connectées et surveillance agricole au Sénégal et au-delà.
            </p>

            {/* Réseaux sociaux */}
            <div className="flex items-center gap-3">
              {[
                {
                  label: "Facebook",
                  href: "https://facebook.com/sotilma",
                  d: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z",
                },
                {
                  label: "Instagram",
                  href: "https://instagram.com/sotilma",
                  d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
                },
                {
                  label: "LinkedIn",
                  href: "https://linkedin.com/company/sotilma",
                  d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 border border-sky-200 hover:border-sky-500 hover:bg-sky-50 text-neutral-600 hover:text-sky-700 flex items-center justify-center transition-all"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d={s.d} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* ── Boutique ── */}
          <div>
            <h4 className="text-[11px] font-bold tracking-[0.22em] uppercase text-sky-600 mb-5">
              Boutique
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Vannes automatiques", href: "/boutique?categorie=vanne-automatique" },
                { label: "Caméras agricoles",   href: "/boutique?categorie=camera" },
                { label: "Sotilma Mobile",      href: "/boutique?categorie=pompe" },
                { label: "Accessoires",         href: "/boutique?categorie=accessoire" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-black hover:text-sky-700 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Entreprise ── */}
          <div>
            <h4 className="text-[11px] font-bold tracking-[0.22em] uppercase text-sky-600 mb-5">
              Entreprise
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: "À propos",        href: "/a-propos" },
                { label: "Notre expertise", href: "/expertise" },
                { label: "Contact",         href: "/contact" },
                { label: "Mentions légales",href: "/termes-et-conditions" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-black hover:text-sky-700 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact ── */}
          <div>
            <h4 className="text-[11px] font-bold tracking-[0.22em] uppercase text-sky-600 mb-5">
              Contact
            </h4>
            <div className="space-y-3 text-sm">
              <p className="text-black font-medium">Keur Massar, Dakar — Sénégal</p>
              <a href="tel:+221776740924" className="block text-black hover:text-sky-700 transition-colors font-medium">
                +221 77 674 09 24
              </a>
              <a href="mailto:sntech.afrique@gmail.com" className="block text-black hover:text-sky-700 transition-colors break-all">
                sntech.afrique@gmail.com
              </a>
              <a
                href="https://wa.me/221770982290"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 pt-1 text-[#25D366] hover:text-[#1ea952] font-bold text-[11px] transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Support WhatsApp 24/7
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bandeau copyright */}
      <div className="border-t border-sky-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-neutral-500">
            © {new Date().getFullYear()} <span className="font-semibold text-black">Sotilma Farm</span> — Solutions d&apos;irrigation solaire
          </p>
          <div className="flex items-center gap-5 text-xs">
            <Link href="/termes-et-conditions" className="text-neutral-500 hover:text-sky-700 transition-colors">
              Mentions légales
            </Link>
            <Link href="/confidentialite" className="text-neutral-500 hover:text-sky-700 transition-colors">
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
