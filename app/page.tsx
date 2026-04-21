"use client";

import GaleriPreviewSection from "@/components/home/galeri-preview-section";
import WisataPreviewSection from "@/components/home/wisata-preview-section";
import PertanianPreviewSection from "@/components/home/pertanian-preview-section";
import StatistikPreviewSection from "@/components/home/statistik-preview-section";
import ProfilPreviewSection from "@/components/home/profil-preview-section";
import KontakPreviewSection from "@/components/home/kontak-preview-section";
import HeroSection from "@/components/home/hero-section";

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <HeroSection />
      <ProfilPreviewSection />
      <WisataPreviewSection />
      <StatistikPreviewSection />
      <PertanianPreviewSection />
      <GaleriPreviewSection />
      <KontakPreviewSection />
    </main>
  );
}
