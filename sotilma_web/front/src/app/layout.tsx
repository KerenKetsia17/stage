import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Barlow:wght@400;500;600&display=swap" rel="stylesheet" />



const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Sotilma — Gestion intelligente de l'eau",
    template: "%s | Sotilma",
  },
  description:
    "SOTILMA révolutionne la gestion de l'eau dans l'agriculture et l'industrie avec des vannes connectées, autonomes et pilotables depuis votre smartphone.",
  keywords: ["irrigation automatique", "vanne connectée", "IoT agricole", "Sénégal", "Sotilma"],
  authors: [{ name: "Sotilma", url: "https://www.sotilmaa.com" }],
  openGraph: {
    type: "website",
    locale: "fr_SN",
    url: "https://www.sotilmaa.com",
    siteName: "Sotilma",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={fontSans.variable}>
      <head />
      <body className="flex flex-col min-h-screen font-sans antialiased bg-white text-slate-800 selection:bg-primary/20 selection:text-primary-dark">
        <Navbar />
        <main className="flex-1 pt-[80px] sm:pt-[100px]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
