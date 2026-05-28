"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronRight, ChevronLeft, X } from "lucide-react";

export interface GalleryImage {
  src: string;
  alt: string;
  title: string;
  description: string;
  location: string;
  category: string;
  year: string;
}

interface GalleryGridProps {
  images: GalleryImage[];
}

export default function GalleryGrid({ images }: GalleryGridProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openModal = (index: number) => {
    setSelectedIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedIndex(null);
    document.body.style.overflow = "auto";
  };

  const nextImage = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? images.length - 1 : selectedIndex - 1);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "Escape") closeModal();
  };

  return (
    <>
      {/* Grille */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {images.map((image, idx) => (
          <div
            key={idx}
            onClick={() => openModal(idx)}
            className="group relative overflow-hidden rounded-xl cursor-pointer bg-slate-100 border border-slate-200 hover:border-blue-800 transition-all duration-300 hover:shadow-xl animate-scale-in"
            style={{ animationDelay: `${idx * 75}ms` }}
          >
            {/* Image */}
            <div className="relative h-64 sm:h-72 lg:h-80 overflow-hidden">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Overlay avec infos */}
            <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-end translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-100 bg-blue-800/40 px-3 py-1 rounded-full">
                  {image.category}
                </span>
                <span className="text-xs text-slate-300">{image.year}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{image.title}</h3>
              <p className="text-sm text-slate-200 line-clamp-2 mb-3">{image.location}</p>
              <div className="inline-flex items-center gap-2 text-blue-100 font-semibold text-sm">
                Voir le détail
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in"
          onKeyDown={handleKeyDown}
          onClick={closeModal}
          tabIndex={0}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={closeModal}
            className="absolute top-6 right-6 z-50 p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
            aria-label="Fermer"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors hidden sm:flex items-center justify-center"
            aria-label="Précédent"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div
            className="relative w-full max-w-4xl max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <div className="relative flex-1 min-h-0 mb-6 bg-slate-900 rounded-xl overflow-hidden">
              <Image
                src={images[selectedIndex].src}
                alt={images[selectedIndex].alt}
                fill
                className="object-contain"
              />
            </div>

            {/* Infos */}
            <div className="px-6 sm:px-8 pb-6 bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-100 bg-blue-800/40 px-3 py-1.5 rounded-full">
                  {images[selectedIndex].category}
                </span>
                <span className="text-sm text-slate-400">{images[selectedIndex].year}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                {images[selectedIndex].title}
              </h2>
              <p className="text-sm text-slate-300 mb-4">{images[selectedIndex].location}</p>
              <p className="text-base text-slate-200 leading-relaxed">
                {images[selectedIndex].description}
              </p>
            </div>

            {/* Compteur */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-sm text-slate-400 bg-black/40 px-4 py-2 rounded-full">
              {selectedIndex + 1} / {images.length}
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors hidden sm:flex items-center justify-center"
            aria-label="Suivant"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </>
  );
}