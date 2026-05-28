// ============================================================
// FICHIER : src/components/ui/ParallaxHeroImage.tsx
// RÔLE    : Image avec effet parallaxe au scroll (Framer Motion)
//           L'image se déplace plus lentement que le scroll →
//           effet de profondeur cinématographique.
// ============================================================
"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import Image from "next/image";

interface ParallaxHeroImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  speed?: number; // 0 = aucun parallax, 1 = max
  className?: string;
}

export default function ParallaxHeroImage({
  src,
  alt,
  priority = false,
  speed = 0.25,
  className = "",
}: ParallaxHeroImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // L'image remonte doucement pendant le scroll (effet parallaxe)
  const yPercent = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);

  return (
    <div
      ref={ref}
      className={`relative w-full overflow-hidden ${className}`}
    >
      {/* scale-[1.15] = marge pour que le parallax ne crée pas de bords vides */}
      <motion.div style={{ y: yPercent }} className="absolute inset-0 scale-[1.15]">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          quality={95}
          className="object-cover"
        />
      </motion.div>
    </div>
  );
}
