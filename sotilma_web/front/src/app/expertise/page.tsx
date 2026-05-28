"use client";

import Image from "next/image";
import Link from "next/link";
import { domainesExpertise } from "@/lib/data";



export default function ExpertisePage() {
  return (
    <main
      className="bg-[#f7f7f5] text-[#111] min-h-screen"
      style={{ fontFamily: "'Barlow', sans-serif" }}
    >
      {/* ───────────────── HERO SIMPLE ───────────────── */}
      <section className="px-6 lg:px-16 pt-24 pb-16">
        <div className="max-w-5xl">
          

          <h1
            className="leading-none mb-6 text-[#111]"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(52px,8vw,92px)",
              fontWeight: 900,
              textTransform: "uppercase",
              lineHeight: 0.9,
              letterSpacing: "-2px",
            }}
          >
            Nos domaines
            <br />
            d’expertise
          </h1>

          <p className="max-w-2xl text-[15px] leading-relaxed text-black/55">
            Solutions professionnelles pour l’irrigation agricole,
            industrielle et les systèmes hydrauliques intelligents.
          </p>
        </div>
      </section>

      {/* ───────────────── EXPERTISE GRID ───────────────── */}
      <section className="px-6 lg:px-16 pb-28">
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {domainesExpertise.map((domaine) => (
            <div
              key={domaine.id}
              className="group bg-white rounded-[26px] overflow-hidden border border-black/5 hover:border-black/10 hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-all duration-500"
            >
              {/* IMAGE */}
              <div className="relative h-[190px] overflow-hidden">
                <Image
                  src={domaine.image}
                  alt={domaine.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-[#00b85c] text-[10px] font-bold uppercase tracking-[0.18em] px-3 py-1 rounded-full">
                  {domaine.subtitle}
                </span>
              </div>

              {/* CONTENT */}
              <div className="p-6">
                <h3
                  className="mb-3 text-[#111]"
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "28px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    lineHeight: 1,
                  }}
                >
                  {domaine.title}
                </h3>

                <p className="text-[13px] leading-relaxed text-black/50 mb-6">
                  {domaine.description}
                </p>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#00b85c] hover:gap-3 transition-all"
                >
                  En savoir plus

                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      
    </main>
  );
}