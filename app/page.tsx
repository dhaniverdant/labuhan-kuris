"use client";

import Link from "next/link";
import Image, { getImageProps } from "next/image";
import { useEffect, useState } from "react";
import { wisataItems } from "@/data/wisata";
import { pertanianItems } from "@/data/pertanian";
import { galeriItems } from "@/data/galeri";
import GalleryCard from "@/components/gallery-card";

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
    quality: 75,
  });

  const {
    props: { srcSet: mobileSrcSet, ...imgProps },
  } = getImageProps({
    ...common,
    src: slide.mobileImage,
    width: 1080,
    height: 1350,
    quality: 75,
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
        alt="slider image"
      />
    </picture>
  );
}

export default function Page() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);

    return () => window.clearInterval(interval);
  }, []);

  const scrollToContent = () => {
    const target = document.getElementById("profil");
    target?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
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
              kecil, pantai, hingga keindahan bawah laut, serta kekuatan
              pertanian padi, semangka, dan jagung yang menjadi kebanggaan
              masyarakat.
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

      <section id="profil" className="mx-auto max-w-7xl px-6 py-18 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-700">
            Tentang Desa
          </p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Desa dengan kekayaan laut dan pertanian
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Desa Labuhan Kuris memiliki perpaduan kekuatan antara wisata alam
            bahari dan sektor pertanian. Laut yang indah, pantai yang menawan,
            serta hasil padi dan semangka memberi identitas yang kuat bagi desa
            ini.
          </p>

          <div className="mt-8">
            <Link
              href="/profil"
              className="inline-flex rounded-2xl bg-sky-700 px-6 py-3 font-semibold text-white transition hover:bg-sky-800"
            >
              Lihat selengkapnya
            </Link>
          </div>
        </div>
      </section>

      <section id="wisata" className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-700">
              Wisata Unggulan
            </p>
            <h2 className="mt-2 text-3xl font-bold">Pesona bahari desa</h2>
          </div>
          <Link
            href="/wisata"
            className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold shadow-sm"
          >
            Lihat Semua
          </Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {wisataItems.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 h-44 rounded-2xl bg-linear-to-br from-sky-100 via-cyan-50 to-emerald-100" />
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {item.description}
              </p>
              <Link
                href="/wisata"
                className="mt-5 inline-block text-sm font-semibold text-sky-700"
              >
                Baca Detail →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section id="statistik" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-700">
              Statistik
            </p>
            <h2 className="mt-2 text-3xl font-bold">
              Gambaran singkat data desa
            </h2>
          </div>

          <Link
            href="/statistik"
            className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold shadow-sm"
          >
            Lihat Semua
          </Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
              Penduduk
            </p>
            <h3 className="mt-3 text-3xl font-bold">3.245</h3>
            <p className="mt-2 text-sm text-slate-600">
              Gambaran jumlah penduduk desa secara umum.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Dana Desa
            </p>
            <h3 className="mt-3 text-3xl font-bold">4 Bidang</h3>
            <p className="mt-2 text-sm text-slate-600">
              Ringkasan anggaran dan realisasi penggunaan dana desa.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
              Pertanian
            </p>
            <h3 className="mt-3 text-3xl font-bold">3 Komoditas</h3>
            <p className="mt-2 text-sm text-slate-600">
              Padi, semangka, dan jagung sebagai komoditas utama desa.
            </p>
          </div>
        </div>
      </section>

      <section id="pertanian" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="rounded-4xl bg-slate-900 px-6 py-10 text-white md:px-10">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
                Potensi Pertanian
              </p>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">
                Dari sawah hingga kebun semangka dan jagung
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/80 md:text-base">
                Selain wisata, desa juga memiliki kekuatan pada sektor
                pertanian. Potensi ini bisa ditampilkan untuk menarik perhatian
                pengunjung, investor, maupun mitra pengembangan desa.
              </p>
              <div className="mt-8">
                <Link
                  href="/pertanian"
                  className="inline-flex rounded-2xl bg-white px-6 py-3 font-semibold text-slate-900 transition hover:bg-slate-100"
                >
                  Lihat selengkapnya
                </Link>
              </div>
            </div>

            <div className="grid gap-4">
              {pertanianItems.map((item) => (
                <div
                  key={item.title}
                  className="rounded-3xl bg-white/10 p-5 backdrop-blur"
                >
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/80">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="galeri" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-700">
              Galeri
            </p>
            <h2 className="mt-2 text-3xl font-bold">Potret visual desa</h2>
          </div>

          <Link
            href="/galeri"
            className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold shadow-sm"
          >
            Lihat Semua
          </Link>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {galeriItems.slice(0, 3).map((item) => (
            <GalleryCard
              key={item.title}
              title={item.title}
              description={item.description}
              image={item.image}
            />
          ))}
        </div>
      </section>

      <section
        id="kontak"
        className="mx-auto max-w-7xl px-6 pb-20 pt-6 lg:px-8"
      >
        <div className="rounded-4xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-700">
            Kontak
          </p>
          <h2 className="mt-3 text-3xl font-bold">
            Hubungi Desa Labuhan Kuris
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
            Dapatkan informasi lebih lanjut mengenai profil desa, potensi
            wisata, kerja sama, dan kebutuhan informasi lainnya melalui halaman
            kontak.
          </p>

          <div className="mt-8">
            <Link
              href="/kontak"
              className="inline-flex rounded-2xl bg-sky-700 px-6 py-3 font-semibold text-white transition hover:bg-sky-800"
            >
              Lihat selengkapnya
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
