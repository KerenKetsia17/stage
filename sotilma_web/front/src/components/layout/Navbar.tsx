'use client';

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import CartIcon from "@/components/ui/CartIcon";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/expertise", label: "Expertise" },
  { href: "/boutique", label: "Boutique" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/sotilma",
    icon: <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/sotilma",
    icon: <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/sotilma",
    icon: <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>,
  },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      
      {/* ── TOP UTILITY BAR ── */}
      <div className={`hidden md:block bg-blue-900 text-white transition-all duration-300 ${scrolled ? "max-h-0 overflow-hidden opacity-0" : "max-h-12 opacity-100"}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-9 flex items-center justify-between text-[11px]">
          
          <div className="flex items-center gap-6 text-blue-100">
            <a href="tel:+221000000000" className="flex items-center gap-2 hover:text-green-400 transition-colors">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h2.5a1 1 0 01.97.757l1.2 4.8a1 1 0 01-.5 1.137L7.5 10.5a11 11 0 006 6l1.806-1.67a1 1 0 011.137-.5l4.8 1.2A1 1 0 0122 16.5V19a2 2 0 01-2 2C10.611 21 3 13.389 3 5z" />
              </svg>
              <span className="font-medium">+221 00 000 00 00</span>
            </a>
            <a href="mailto:contact@sotilmafarm.com" className="hidden lg:flex items-center gap-2 hover:text-green-400 transition-colors">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="font-medium">contact@sotilmafarm.com</span>
            </a>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden lg:inline text-[10px] tracking-[0.2em] text-blue-200 uppercase font-semibold">
              Gérer votre eau, notre priorité
            </span>
            <div className="flex items-center gap-1">
              {socialLinks.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="w-7 h-7 flex items-center justify-center text-blue-200 hover:text-green-400 transition-colors"
                  aria-label={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN NAVBAR ── */}
      <div className={`bg-white border-b transition-all duration-300 ${
        scrolled ? "border-blue-100 shadow-[0_4px_24px_rgba(15,42,99,0.06)]" : "border-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? "h-16" : "h-20"}`}>

            {/* ── LOGO ── */}
            <Link href="/" onClick={closeMenu} className="flex items-center gap-3 shrink-0 group">
              <div className={`relative transition-all duration-300 ${scrolled ? "w-12 h-12" : "w-14 h-14"}`}>
                <Image
                  src="/logo.png"
                  alt="Sotilma Farm"
                  fill
                  sizes="64px"
                  priority
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="hidden sm:flex flex-col leading-none">
                <span className="font-black text-lg tracking-tight italic">
                  <span className="text-blue-700">Sotilma</span>
                  <span className="text-green-500 ml-1">Farm</span>
                </span>
                <span className="text-[8.5px] font-semibold tracking-[0.18em] uppercase text-slate-500 mt-1">
                  Gestion de l'eau
                </span>
              </div>
            </Link>

            {/* ── DESKTOP NAV (sharp links, bottom-border indicator) ── */}
            <nav className="hidden lg:flex items-center h-full">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative group h-full flex items-center px-5 xl:px-7"
                  >
                    <span className={`text-[11px] font-bold uppercase tracking-[0.18em] transition-colors duration-200 ${
                      isActive ? "text-blue-700" : "text-slate-700 group-hover:text-blue-700"
                    }`}>
                      {link.label}
                    </span>
                    {/* Bottom-border accent (the new active indicator) */}
                    <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] bg-gradient-to-r from-blue-600 to-green-500 transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-1/2"
                    }`} />
                  </Link>
                );
              })}
            </nav>

            {/* ── ACTIONS ── */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Cart */}
              <div className="hidden sm:flex items-center">
                <CartIcon />
              </div>

              {/* Vertical divider */}
              <div className="hidden sm:block w-px h-7 bg-slate-200" />

              {/* CTA Devis (sharp corners) */}
              <Link
                href="/contact"
                className="group relative flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white text-[10.5px] font-extrabold px-5 py-3 transition-all uppercase tracking-[0.15em] overflow-hidden"
              >
                <span className="relative z-10">Devis gratuit</span>
                <svg className="w-3.5 h-3.5 relative z-10 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
                {/* green accent slice on hover */}
                <span className="absolute inset-y-0 right-0 w-1 bg-green-500 group-hover:w-full transition-all duration-300 -z-0 opacity-0 group-hover:opacity-100" />
              </Link>

              {/* Hamburger mobile */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden w-11 h-11 flex items-center justify-center border border-slate-200 text-blue-700 hover:bg-blue-50 transition-all"
                aria-label="Menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen
                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Subtle gradient line at the bottom — blue → green (logo colors) */}
        <div className="h-px bg-gradient-to-r from-blue-600/0 via-blue-600/40 to-green-500/0" />
      </div>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="lg:hidden overflow-hidden bg-white border-t border-slate-100 shadow-lg"
          >
            <div className="px-6 py-6 flex flex-col">
              
              {/* Nav links — sharp, with left-border indicator */}
              <nav className="flex flex-col">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMenu}
                      className={`relative pl-5 py-4 border-b border-slate-100 text-xs font-bold uppercase tracking-[0.18em] transition-all ${
                        isActive
                          ? "text-blue-700 bg-blue-50/50"
                          : "text-slate-700 hover:text-blue-700 hover:bg-slate-50"
                      }`}
                    >
                      {/* Left-border accent for active */}
                      <span className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 to-green-500 transition-opacity ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`} />
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
              
              {/* Mobile CTAs */}
              <div className="flex flex-col gap-2 pt-6">
                <Link href="/contact" onClick={closeMenu}
                  className="flex items-center justify-center gap-2 bg-blue-700 text-white py-4 font-extrabold text-[11px] uppercase tracking-[0.18em]">
                  Demander un Devis
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
                <Link href="/panier" onClick={closeMenu}
                  className="flex items-center justify-center gap-2 border border-slate-200 text-slate-700 py-4 font-extrabold text-[11px] uppercase tracking-[0.18em] hover:bg-slate-50">
                  Mon Panier
                </Link>
              </div>

              {/* Contact info + socials */}
              <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col gap-3 text-[11px]">
                <a href="tel:+221000000000" className="flex items-center gap-3 text-slate-600">
                  <span className="w-8 h-8 bg-blue-50 text-blue-700 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h2.5a1 1 0 01.97.757l1.2 4.8a1 1 0 01-.5 1.137L7.5 10.5a11 11 0 006 6l1.806-1.67a1 1 0 011.137-.5l4.8 1.2A1 1 0 0122 16.5V19a2 2 0 01-2 2C10.611 21 3 13.389 3 5z" />
                    </svg>
                  </span>
                  +221 00 000 00 00
                </a>
                <a href="mailto:contact@sotilmafarm.com" className="flex items-center gap-3 text-slate-600">
                  <span className="w-8 h-8 bg-blue-50 text-blue-700 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  contact@sotilmafarm.com
                </a>

                <div className="flex items-center gap-2 pt-3">
                  {socialLinks.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                      className="w-9 h-9 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-blue-700 hover:border-blue-200 transition-colors">
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
