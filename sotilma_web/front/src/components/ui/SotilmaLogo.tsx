'use client';

interface SotilmaLogoProps {
  width?: number;
  height?: number;
  className?: string;
  variant?: 'icon' | 'full';
}

export default function SotilmaLogo({
  width = 40,
  height = 40,
  className = '',
  variant = 'icon',
}: SotilmaLogoProps) {
  const blueColor = '#5AA9E6';
  const greenColor = '#47AB34';

  if (variant === 'icon') {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        {/* Gear/Cogwheel - Vert secondaire */}
        <g transform="translate(50, 55)">
          {/* Cercle principal */}
          <circle cx="0" cy="0" r="16" fill="none" stroke={greenColor} strokeWidth="3.5" />
          {/* Dents de l'engrenage */}
          <rect x="-2.5" y="-24" width="5" height="7" rx="1" fill={greenColor} />
          <rect x="-2.5" y="17" width="5" height="7" rx="1" fill={greenColor} />
          <rect x="-24" y="-2.5" width="7" height="5" rx="1" fill={greenColor} />
          <rect x="17" y="-2.5" width="7" height="5" rx="1" fill={greenColor} />
          {/* Dents diagonales */}
          <rect x="-17" y="-17" width="5" height="5" rx="1" fill={greenColor} transform="rotate(45 -14.5 -14.5)" />
          <rect x="12" y="-17" width="5" height="5" rx="1" fill={greenColor} transform="rotate(-45 14.5 -14.5)" />
          <rect x="-17" y="12" width="5" height="5" rx="1" fill={greenColor} transform="rotate(-45 -14.5 14.5)" />
          <rect x="12" y="12" width="5" height="5" rx="1" fill={greenColor} transform="rotate(45 14.5 14.5)" />
        </g>

        {/* Goutte d'eau - Bleu primary */}
        <g transform="translate(38, 28)">
          <path
            d="M 0 -16 C -9 -5 -11 5 -7 13 C -3 19 4 21 9 15 C 13 9 13 1 9 -7 C 5 -13 2 -16 0 -16Z"
            fill="none"
            stroke={blueColor}
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M -4 -9 Q -6 -1 -4 9"
            fill="none"
            stroke={blueColor}
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.5"
          />
          {/* Point de lumière */}
          <circle cx="-3" cy="-8" r="1.5" fill={blueColor} opacity="0.4" />
        </g>
      </svg>
    );
  }

  // Logo complet avec texte
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 800 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* S - Lettre stylisée */}
      <path
        d="M 60 40 Q 30 40 30 70 Q 30 85 45 95 Q 20 105 20 130 Q 20 160 50 160 Q 80 160 80 145"
        stroke={blueColor}
        strokeWidth="12"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Gear icon */}
      <g transform="translate(140, 100)">
        <circle cx="0" cy="0" r="30" fill="none" stroke={greenColor} strokeWidth="5" />
        <rect x="-3" y="-45" width="6" height="12" rx="1" fill={greenColor} />
        <rect x="-3" y="33" width="6" height="12" rx="1" fill={greenColor} />
        <rect x="-45" y="-3" width="12" height="6" rx="1" fill={greenColor} />
        <rect x="33" y="-3" width="12" height="6" rx="1" fill={greenColor} />
        <rect x="-30" y="-30" width="6" height="6" rx="1" fill={greenColor} transform="rotate(45 -27 -27)" />
        <rect x="24" y="-30" width="6" height="6" rx="1" fill={greenColor} transform="rotate(-45 27 -27)" />
        <rect x="-30" y="24" width="6" height="6" rx="1" fill={greenColor} transform="rotate(-45 -27 27)" />
        <rect x="24" y="24" width="6" height="6" rx="1" fill={greenColor} transform="rotate(45 27 27)" />
      </g>

      {/* TILMA text */}
      <text
        x="230"
        y="130"
        fontSize="90"
        fontWeight="600"
        fill={blueColor}
        fontFamily="Metropolis, system-ui, -apple-system, sans-serif"
        letterSpacing="3"
      >
        SOTILMA
      </text>
    </svg>
  );
}