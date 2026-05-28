// ============================================================
// FICHIER : src/app/page.tsx
// RÔLE    : Page d'accueil — Refonte style premium industriel
// INSPIRATION : camionsuf.com - Design moderne, minimaliste, impactant
// ============================================================

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";

// ============================================================
// COMPOSANT : Section Header (titre + sous-titre)
// ============================================================
function SectionHeader({ 
  badge, 
  title, 
  subtitle,
  align = "left" 
}: { 
  badge?: string; 
  title: React.ReactNode; 
  subtitle?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`mb-12 md:mb-16 ${align === "center" ? "text-center" : ""}`}>
      {badge && (
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="w-8 h-px bg-[#0078D7]"></span>
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#0078D7]">
            {badge}
          </span>
        </div>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-[1.15] tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className={`text-slate-500 text-base md:text-lg max-w-2xl leading-relaxed mt-4 ${align === "center" ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ============================================================
// COMPOSANT : Lightbox
// ============================================================
function Lightbox({ src, alt, isOpen, onClose }: { src: string; alt: string; isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (isOpen) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-8"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 md:top-8 md:right-8 z-[10000] w-11 h-11 md:w-12 md:h-12 border border-white/30 hover:bg-white/10 text-white flex items-center justify-center transition-all"
            aria-label="Fermer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="relative w-full max-w-6xl h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image src={src} alt={alt} fill className="object-contain" priority sizes="90vw" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============================================================
// SECTION 1 : HERO — Style impactant moderne (inspiré camionsuf)
// ============================================================
function HeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const slides = [
    {
      src: "https://static.wixstatic.com/media/75ad33_f441855cdd1743b8982ad0a497d536c8~mv2.jpeg/v1/fill/w_1895,h_926,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_f441855cdd1743b8982ad0a497d536c8~mv2.jpeg",
      alt: "Irrigation solaire Sotilma",
    },
    {
      src: "https://static.wixstatic.com/media/75ad33_5ae75292849c40308616364b4b782980~mv2.png",
      alt: "Sotilma Mobile",
    },
    {
      src: "https://static.wixstatic.com/media/75ad33_82b826c91cd44c88954123ab55cbc531~mv2.jpg",
      alt: "Vanne intelligente",
    },
  ];

  useEffect(() => {
    if (!isPlaying) return;
    const t = setInterval(() => setCurrentIndex((p) => (p + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, [isPlaying, slides.length]);

  return (
    <section className="relative min-h-screen flex items-center bg-white">
      {/* Image de fond avec overlay */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={slides[currentIndex].src}
              alt={slides[currentIndex].alt}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Contenu Hero */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-24 md:py-32">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-12 h-px bg-[#0078D7]"></span>
              <span className="text-white/80 text-xs font-semibold tracking-[0.2em] uppercase">
                Sotilma — Innovation agricole
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.08] tracking-tight mb-6"
          >
            Gérez votre eau,
            <br />
            <span className="text-[#0078D7]">simplement.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/80 text-lg lg:text-xl max-w-xl leading-relaxed mb-8"
          >
            Pompage solaire, vannes connectées et surveillance en temps réel.
            Des solutions pensées pour les agriculteurs exigeants.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-3 bg-[#0078D7] hover:bg-[#0060b0] text-white font-semibold text-sm uppercase tracking-[0.15em] px-8 py-4 transition-all hover:-translate-y-0.5 shadow-lg"
            >
              Demander un devis
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              href="/boutique"
              className="inline-flex items-center justify-center gap-2 border border-white/30 hover:border-[#0078D7] text-white hover:text-[#0078D7] font-semibold text-sm uppercase tracking-[0.15em] px-8 py-4 transition-all"
            >
              Voir les produits
            </Link>
          </motion.div>

          {/* Indicateurs de slide */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2"
          >
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentIndex(idx);
                  setIsPlaying(false);
                  setTimeout(() => setIsPlaying(true), 5000);
                }}
                className={`h-[2px] transition-all duration-500 ${
                  currentIndex === idx
                    ? "w-12 bg-[#0078D7]"
                    : "w-6 bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SECTION 2 : PRODUIT PHARE — Refonte moderne
// ============================================================
function MobileHero() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const imageSrc = "https://static.wixstatic.com/media/75ad33_5ae75292849c40308616364b4b782980~mv2.png";

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
              <button
                onClick={() => setLightboxOpen(true)}
                className="group relative block w-full cursor-zoom-in"
              >
                <div className="aspect-[4/3] relative p-8 md:p-12">
                  <Image
                    src={imageSrc}
                    alt="Sotilma Mobile"
                    fill
                    className="object-contain transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </button>
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-[#0078D7]/20 rounded-full" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#0078D7]/5 rounded-full" />
          </motion.div>

          {/* Contenu */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-px bg-[#0078D7]"></span>
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#0078D7]">
                Produit phare
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-[1.15] tracking-tight mb-5">
              Pompe solaire <br />
              <span className="text-[#0078D7]">100% autonome</span>
            </h2>

            <p className="text-slate-500 text-base lg:text-lg leading-relaxed mb-8">
              Aucun branchement électrique requis. Panneaux solaires intégrés sur châssis
              roulant. Déployez en quelques minutes et irriguez où vous voulez.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { label: "Débit max", value: "145 m³/h" },
                { label: "Alimentation", value: "100% solaire" },
                { label: "Châssis", value: "Mobile" },
                { label: "Pilotage", value: "App iOS/Android" },
              ].map((spec) => (
                <div key={spec.label} className="border-l-2 border-[#0078D7] pl-4">
                  <div className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                    {spec.label}
                  </div>
                  <div className="text-base font-bold text-slate-900">
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 bg-[#0078D7] hover:bg-[#0060b0] text-white font-semibold text-sm uppercase tracking-[0.15em] px-6 py-3 transition-all hover:-translate-y-0.5"
            >
              En savoir plus
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
      <Lightbox src={imageSrc} alt="Sotilma Mobile" isOpen={lightboxOpen} onClose={() => setLightboxOpen(false)} />
    </section>
  );
}

// ============================================================
// SECTION 3 : AVANTAGES — Grille moderne
// ============================================================
function MobileFeatures() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const features = [
    {
      icon: "M20 12V10H18V12H16V14H18V16H20V14H22V12H20Z M22 6H2V18H22V6Z",
      title: "Pompage 100% solaire",
      description: "Panneaux intégrés pour une autonomie complète. Plus aucune dépendance au réseau électrique.",
    },
    {
      icon: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
      title: "100% mobile",
      description: "Châssis roulant robuste, déplacez votre pompe d'une parcelle à l'autre sans démontage.",
    },
    {
      icon: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z",
      title: "Débit puissant",
      description: "De 20 à 145 m³/h selon le modèle. Adapté aux petites comme aux grandes exploitations.",
    },
    {
      icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15h-2v-2h2v2zm0-4h-2V7h2v6z",
      title: "Version connectée",
      description: "Pilotage à distance via application mobile. Suivi en temps réel, alertes et automatisations.",
    },
  ];

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHeader
          badge="Pourquoi Sotilma"
          title={
            <>
              Pensé pour le terrain,<br />
              <span className="text-[#0078D7]">pas pour la ville</span>
            </>
          }
          subtitle="Quatre raisons concrètes qui font de Sotilma Mobile le choix le plus rentable pour votre exploitation."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group p-6 bg-white border border-slate-200 hover:border-[#0078D7] hover:shadow-xl transition-all duration-300"
            >
              <div className="w-12 h-12 mb-5 text-[#0078D7]">
                <svg className="w-full h-full" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d={f.icon} />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {f.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SECTION 4 : INNOVATION — Refonte minimaliste
// ============================================================
function MobileAvantage() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const points = [
    "Élimine totalement les coûts énergétiques",
    "Le solaire devient votre carburant, disponible partout",
    "Un seul système suffit pour plusieurs parcelles",
    "Retour sur investissement en moins de 2 ans",
  ];

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Contenu gauche */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-px bg-[#0078D7]"></span>
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#0078D7]">
                Innovation
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-[1.15] tracking-tight mb-6">
              Une énergie <span className="text-[#0078D7]">gratuite</span>,<br />
              une liberté <span className="text-[#0078D7]">totale</span>
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed mb-8">
              Avec Sotilma Mobile, l&apos;eau devient accessible partout, sans contraintes
              ni factures d&apos;électricité. Une révolution pour l&apos;agriculture moderne.
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 text-[#0078D7] font-semibold hover:gap-3 transition-all"
            >
              Découvrir la solution
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </motion.div>

          {/* Liste à droite */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-4"
          >
            {points.map((text, i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-lg border border-slate-100">
                <div className="w-8 h-8 rounded-full bg-[#0078D7]/10 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-[#0078D7]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-slate-700 font-medium">{text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SECTION 5 : VANNES INTELLIGENTES — Refonte moderne
// ============================================================
function SmartValvesSection() {
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const images = [
    { src: "https://static.wixstatic.com/media/75ad33_82b826c91cd44c88954123ab55cbc531~mv2.jpg", alt: "Vanne Sotilma" },
    { src: "https://static.wixstatic.com/media/75ad33_8f29c3e714694a9d89307d3c5dbd8847~mv2.jpg", alt: "Vanne Sotilma contrôle" },
  ];

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Contenu gauche */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-px bg-[#0078D7]"></span>
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#0078D7]">
                Irrigation connectée
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-[1.15] tracking-tight mb-5">
              Vannes <span className="text-[#0078D7]">intelligentes</span>
            </h2>
            <p className="text-slate-500 text-base lg:text-lg leading-relaxed mb-8">
              Contrôlez votre irrigation à distance, automatisez vos cycles
              et réduisez votre consommation d&apos;eau jusqu&apos;à 40%.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {["Contrôle à distance", "Programmation auto", "Suivi conso", "Hors réseau"].map((tag) => (
                <span key={tag} className="text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1.5">
                  {tag}
                </span>
              ))}
            </div>

            <Link
              href="/boutique?categorie=vanne-automatique"
              className="group inline-flex items-center gap-2 bg-[#0078D7] hover:bg-[#0060b0] text-white font-semibold text-sm uppercase tracking-[0.15em] px-6 py-3 transition-all hover:-translate-y-0.5"
            >
              Découvrir les vannes
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </motion.div>

          {/* Images droite */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setLightboxImage(img)}
                className={`group relative overflow-hidden rounded-lg shadow-lg ${idx === 0 ? "mt-8" : ""}`}
              >
                <div className="aspect-[3/4] relative">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="300px"
                  />
                </div>
              </button>
            ))}
          </motion.div>
        </div>
      </div>
      {lightboxImage && (
        <Lightbox src={lightboxImage.src} alt={lightboxImage.alt} isOpen={!!lightboxImage} onClose={() => setLightboxImage(null)} />
      )}
    </section>
  );
}

// ============================================================
// SECTION 6 : SURVEILLANCE — Refonte moderne
// ============================================================
function SurveillanceSection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const image = {
    src: "https://static.wixstatic.com/media/75ad33_2b84b31e551f42e8ba634f3823910159~mv2.png",
    alt: "Caméra agricole Sotilma",
  };

  const features = [
    "Vision HD jour & nuit",
    "Fonctionne sans WiFi",
    "Alimentation 100% solaire",
    "Cloud chiffré sécurisé",
  ];

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Image gauche */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="order-2 lg:order-1"
          >
            <button
              onClick={() => setLightboxOpen(true)}
              className="group relative block w-full cursor-zoom-in"
            >
              <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="aspect-square relative p-8 md:p-12">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-contain transition-transform duration-700 group-hover:scale-105"
                    sizes="450px"
                  />
                </div>
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#0078D7] text-white px-4 py-2 flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase shadow-lg rounded">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full bg-green-400 rounded-full opacity-75" />
                  <span className="relative inline-flex h-2 w-2 bg-green-400 rounded-full" />
                </span>
                Live · 24/7
              </div>
            </button>
          </motion.div>

          {/* Contenu droite */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-px bg-[#0078D7]"></span>
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#0078D7]">
                Surveillance
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-[1.15] tracking-tight mb-5">
              Vos cultures <br />
              <span className="text-[#0078D7]">sous contrôle</span>
            </h2>
            <p className="text-slate-500 text-base lg:text-lg leading-relaxed mb-8">
              Caméra intelligente autonome, vision HD 24/7, alimentation
              solaire intégrée. Surveillez vos parcelles sans connexion internet.
            </p>

            <div className="space-y-3 mb-8">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#0078D7]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-600">{feature}</span>
                </div>
              ))}
            </div>

            <Link
              href="/boutique"
              className="group inline-flex items-center gap-2 bg-[#0078D7] hover:bg-[#0060b0] text-white font-semibold text-sm uppercase tracking-[0.15em] px-6 py-3 transition-all hover:-translate-y-0.5"
            >
              Découvrir la caméra
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
      <Lightbox src={image.src} alt={image.alt} isOpen={lightboxOpen} onClose={() => setLightboxOpen(false)} />
    </section>
  );
}

// ============================================================
// SECTION 7 : GALERIE PRODUITS — Avec bouton Achetez
// ============================================================
function GalerieProduits() {
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const produits = [
    { src: "https://static.wixstatic.com/media/75ad33_5ae75292849c40308616364b4b782980~mv2.png", alt: "Sotilma Mobile", titre: "Sotilma Mobile", cat: "Pompage", prix: "Sur devis" },
    { src: "https://static.wixstatic.com/media/75ad33_82b826c91cd44c88954123ab55cbc531~mv2.jpg", alt: "Vanne intelligente", titre: "Vanne intelligente", cat: "Irrigation", prix: "299€" },
    { src: "https://static.wixstatic.com/media/75ad33_2b84b31e551f42e8ba634f3823910159~mv2.png", alt: "Caméra agricole", titre: "Caméra agricole", cat: "Surveillance", prix: "199€" },
    { src: "https://static.wixstatic.com/media/75ad33_f441855cdd1743b8982ad0a497d536c8~mv2.jpeg", alt: "Irrigation solaire", titre: "Irrigation solaire", cat: "Solution", prix: "Sur devis" },
    { src: "https://static.wixstatic.com/media/75ad33_8f29c3e714694a9d89307d3c5dbd8847~mv2.jpg", alt: "Contrôle à distance", titre: "Contrôle à distance", cat: "Connecté", prix: "149€" },
    { src: "https://static.wixstatic.com/media/75ad33_f17a95ae86334fe382e1c543db89ce15~mv2.png", alt: "Application mobile", titre: "Application mobile", cat: "Logiciel", prix: "Gratuit" },
  ];

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHeader
          badge="Catalogue"
          title="Nos produits"
          subtitle="Pompage, irrigation et surveillance — toute la gamme Sotilma"
          align="center"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {produits.map((p, idx) => (
            <motion.div
              key={p.titre}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="group bg-white border border-slate-200 hover:border-[#0078D7] hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <button
                onClick={() => setLightboxImage({ src: p.src, alt: p.alt })}
                className="w-full cursor-zoom-in overflow-hidden"
              >
                <div className="aspect-[4/3] relative bg-slate-50 p-6">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    className="object-contain p-4 transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </button>

              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#0078D7] mb-1">
                      {p.cat}
                    </div>
                    <div className="text-base font-bold text-slate-900">
                      {p.titre}
                    </div>
                  </div>
                  <span className="text-sm font-bold text-[#0078D7]">
                    {p.prix}
                  </span>
                </div>
                
                <Link
                  href="/boutique"
                  className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-[#0078D7] hover:bg-[#0060b0] text-white text-[11px] font-semibold uppercase tracking-[0.15em] px-4 py-2.5 transition-all"
                >
                  Achetez
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {lightboxImage && (
        <Lightbox src={lightboxImage.src} alt={lightboxImage.alt} isOpen={!!lightboxImage} onClose={() => setLightboxImage(null)} />
      )}
    </section>
  );
}

// ============================================================
// SECTION 8 : CTA FINAL
// ============================================================
function CTAShop() {
  return (
    <section className="py-24 md:py-32 bg-[#0078D7]">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.15] tracking-tight mb-4">
          Prêt à transformer <br />
          votre exploitation ?
        </h2>
        <p className="text-white/80 text-base lg:text-lg max-w-md mx-auto leading-relaxed mb-8">
          Découvrez toute la gamme Sotilma et commandez en quelques clics.
        </p>
        <Link
          href="/boutique"
          className="group inline-flex items-center gap-3 bg-white hover:bg-slate-100 text-[#0078D7] font-bold text-sm uppercase tracking-[0.15em] px-8 py-4 transition-all hover:-translate-y-0.5 shadow-lg"
        >
          Visiter la boutique
          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </section>
  );
}

// ============================================================
// COMPOSANT : WhatsApp FAB
// ============================================================
function WhatsAppFab() {
  return (
    <Link
      href="https://wa.me/221770982290?text=Bonjour%20Sotilma%2C%20je%20souhaite%20avoir%20des%20informations"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-40 group flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1ea952] text-white font-bold text-[11px] uppercase tracking-[0.18em] pl-3 pr-5 py-3.5 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5 rounded-full"
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
      <span className="hidden sm:inline">WhatsApp</span>
    </Link>
  );
}

// ============================================================
// PAGE PRINCIPALE
// ============================================================
export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <MobileHero />
      <MobileFeatures />
      <MobileAvantage />
      <SmartValvesSection />
      <SurveillanceSection />
      <GalerieProduits />
      <CTAShop />
      <WhatsAppFab />
    </>
  );
}