"use client";

import { getImageProps } from "next/image";
import { useEffect, useState } from "react";

type HeroSlide = {
  title: string;
  subtitle: string;
  desktopImage: string;
  mobileImage: string;
};

const heroSlides: HeroSlide[] = [
  {
    title: "Panorama Sejangan",
    subtitle:
      "Pemandangan alam pesisir yang memperlihatkan keindahan khas Desa Labuhan Kuris.",
    desktopImage: "/images/sejangan.JPG",
    mobileImage: "/images/mobile/sejangan-mobile.JPG",
  },
  {
    title: "Keindahan Sawah Desa",
    subtitle:
      "Sudut alam yang memperlihatkan kekayaan panorama pertanian Desa Labuhan Kuris.",
    desktopImage: "/images/sawah.JPG",
    mobileImage: "/images/mobile/sawah-mobile.JPG",
  },
  {
    title: "Pesona Dangar Rea",
    subtitle:
      "Lanskap alam yang memperkuat daya tarik wisata desa dan cocok ditampilkan di halaman utama.",
    desktopImage: "/images/dangar-rea.jpg",
    mobileImage: "/images/mobile/dangar-rea-mobile.jpg",
  },
];

function HeroPicture({
  slide,
  eager = false,
}: {
  slide: HeroSlide;
  eager?: boolean;
}) {
  const common = {
    alt: slide.title,
    sizes: "100vw",
  };

  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    ...common,
    src: slide.desktopImage,
    width: 1600,
    height: 900,
    quality: 60,
  });

  const {
    props: { srcSet: mobileSrcSet, ...imgProps },
  } = getImageProps({
    ...common,
    src: slide.mobileImage,
    width: 1080,
    height: 1350,
    quality: 60,
  });

  return (
    <picture className="absolute inset-0">
      <source media="(max-width: 767px)" srcSet={mobileSrcSet} />
      <source media="(min-width: 768px)" srcSet={desktopSrcSet} />
      <img
        {...imgProps}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        className="h-full w-full object-cover"
        alt={slide.title}
      />
    </picture>
  );
}

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  const scrollToContent = () => {
    const target = document.getElementById("profil");
    target?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="beranda" className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <HeroPicture
          slide={heroSlides[currentSlide]}
          eager={currentSlide === 0}
        />
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-black/20" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 pb-24 pt-28 lg:px-8 md:pt-32">
        <div className="max-w-3xl text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-white/80 md:text-base">
            Selamat Datang Di
          </p>

          <h1 className="mt-3 text-3xl font-bold leading-none text-amber-200 sm:text-5xl md:text-7xl lg:text-7xl">
            Desa Labuhan Kuris
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-white/90 md:text-lg">
            Desa dengan potensi wisata bahari yang memukau, mulai dari pulau
            kecil, pantai, hingga keindahan bawah laut, serta kekuatan pertanian
            padi, semangka, dan jagung yang menjadi kebanggaan masyarakat.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#wisata"
              className="rounded-2xl bg-white px-6 py-3 font-semibold text-sky-700 shadow-lg transition hover:-translate-y-0.5"
            >
              Jelajahi Wisata
            </a>
            <a
              href="#profil"
              className="rounded-2xl border border-white/40 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              Lihat Profil Desa
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-28 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        {heroSlides.map((slide, index) => (
          <button
            key={slide.title}
            type="button"
            onClick={() => setCurrentSlide(index)}
            className={`h-3 rounded-full transition-all ${
              index === currentSlide ? "w-10 bg-white" : "w-3 bg-white/50"
            }`}
            aria-label={`Pilih slide ${index + 1}`}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 rounded-full border border-white/30 bg-white/10 p-3 text-white backdrop-blur transition hover:bg-white/20"
        aria-label="Scroll ke bawah"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M7 10L12 15L17 10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </section>
  );
}
