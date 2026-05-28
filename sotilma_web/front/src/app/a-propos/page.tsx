// ============================================================
// FICHIER : src/app/a-propos/page.tsx
// ============================================================

import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "À propos",
  description: "Découvrez l'histoire de Sotilma, start-up sénégalaise dédiée à la gestion intelligente de l'eau.",
};

const partners = [
  { name: "Orange",      logo: "https://static.wixstatic.com/media/75ad33_fd98e35c10b341a5bd2156e0f335348d~mv2.png/v1/fill/w_258,h_258,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_fd98e35c10b341a5bd2156e0f335348d~mv2.png" },
  { name: "EOAP",        logo: "https://static.wixstatic.com/media/75ad33_e9d531d5d8314a83a2126be3b0229f4f~mv2.png/v1/fill/w_428,h_138,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_e9d531d5d8314a83a2126be3b0229f4f~mv2.png" },
  { name: "World Bank",  logo: "https://static.wixstatic.com/media/75ad33_03b5a101d1f846e6b07423fdf39bc81e~mv2.png/v1/fill/w_564,h_114,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_03b5a101d1f846e6b07423fdf39bc81e~mv2.png" },
  { name: "Heifer",      logo: "https://static.wixstatic.com/media/75ad33_0f5dc8b0b88e4b6dac0bd5c96cd1b0d9~mv2.jpeg/v1/fill/w_258,h_258,al_c,lg_1,q_80,enc_avif,quality_auto/75ad33_0f5dc8b0b88e4b6dac0bd5c96cd1b0d9~mv2.jpeg" },
];

export default function AProposPage() {
  return (
    <main className="bg-white overflow-hidden">

      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-sky-50 via-white to-blue-50/40 pt-20 pb-16 sm:pt-28 sm:pb-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="block w-10 h-[2px] bg-gradient-to-r from-sky-500 to-green-500" />
            <span className="text-[11px] font-bold tracking-[0.28em] uppercase text-sky-600">Notre identité</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">
            Gérer votre eau,{" "}
            <span className="text-sky-600 italic font-medium">notre priorité.</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            SOTILMA révolutionne la gestion de l&apos;eau avec des solutions intelligentes,
            pensées pour l&apos;efficacité et la durabilité au Sénégal et au-delà.
          </p>
        </div>
      </section>

      {/* ── IMAGE VISION ── */}
      <section className="relative w-full h-72 sm:h-96 lg:h-[480px]">
        <Image
          src="https://static.wixstatic.com/media/75ad33_1eb29bbf53824df6bd82594937dcc22f~mv2.jpg/v1/fill/w_1470,h_575,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_1eb29bbf53824df6bd82594937dcc22f~mv2.jpg"
          alt="Vision Sotilma"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-sky-900/10" />
      </section>

      {/* ── NOTRE HISTOIRE ── */}
      <section className="py-20 sm:py-28 bg-white border-t border-sky-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid sm:grid-cols-12 gap-12 items-start">
            <div className="sm:col-span-5">
              <div className="inline-flex items-center gap-3 mb-5">
                <span className="block w-10 h-[2px] bg-gradient-to-r from-sky-500 to-green-500" />
                <span className="text-[11px] font-bold tracking-[0.28em] uppercase text-sky-600">Histoire</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight tracking-tight">
                L&apos;origine du projet SOTILMA
              </h2>
            </div>
            <div className="sm:col-span-7 space-y-6 text-base text-slate-600 leading-relaxed">
              <p>
                Tout a commencé par une observation simple : la gestion de l&apos;eau, ressource précieuse,
                était souvent inefficace et source de gaspillage, particulièrement dans le secteur agricole sénégalais.
              </p>
              <p>
                Face aux défis de l&apos;irrégularité des pluies et de la difficulté de surveillance, nous avons
                conçu une solution technologique locale, adaptée aux réalités du terrain.
              </p>
              <p className="font-semibold text-slate-800 border-l-4 border-sky-500 pl-5">
                Aujourd&apos;hui, SOTILMA accompagne des centaines d&apos;exploitants vers une agriculture
                connectée, autonome et rentable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PARTENAIRES ── */}
      <section className="py-16 sm:py-20 bg-sky-50/40 border-y border-sky-100">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-slate-400 mb-10">
            Ils nous font confiance
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 items-center">
            {partners.map((p) => (
              <div key={p.name} className="relative h-12 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                <Image src={p.logo} alt={p.name} fill className="object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALEURS ── */}
      <section className="py-20 sm:py-28 bg-white border-t border-sky-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="block w-10 h-[2px] bg-gradient-to-r from-sky-500 to-green-500" />
              <span className="text-[11px] font-bold tracking-[0.28em] uppercase text-sky-600">Nos valeurs</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Ce qui nous guide
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-px bg-sky-100 border border-sky-100">
            {[
              {
                title: "Innovation",
                desc: "Nous utilisons le meilleur de la technologie IoT pour simplifier la vie des agriculteurs et optimiser chaque goutte d'eau.",
                icon: "M13 10V3L4 14h7v7l9-11h-7z",
              },
              {
                title: "Durabilité",
                desc: "Préserver l'eau est notre mission. Nos systèmes permettent une agriculture résiliente face aux changements climatiques.",
                icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
              },
              {
                title: "Proximité",
                desc: "Nous sommes sur le terrain. Nos solutions sont co-conçues avec les exploitants pour répondre à leurs besoins réels.",
                icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
              },
            ].map((v) => (
              <div key={v.title} className="group bg-white p-8 lg:p-10 hover:bg-sky-50/40 transition-colors relative">
                <span className="absolute top-0 left-0 h-[3px] w-0 bg-gradient-to-r from-sky-500 to-green-500 group-hover:w-full transition-all duration-500" />
                <div className="w-12 h-12 bg-sky-100 group-hover:bg-sky-600 text-sky-600 group-hover:text-white flex items-center justify-center mb-6 transition-all duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={v.icon} />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{v.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
