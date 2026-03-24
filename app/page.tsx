'use client';

import { useEffect, useState } from 'react';

const heroSlides = [
  {
    title: 'Panorama Sejangan',
    subtitle:
      'Pemandangan alam pesisir yang memperlihatkan keindahan khas Desa Labuhan Kuris.',
    desktopImage: '/images/sejangan.JPG',
    mobileImage: '/images/mobile/sejangan-mobile.JPG',
  },
  {
    title: 'Keindahan Sawah Desa',
    subtitle:
      'Sudut alam yang memperlihatkan kekayaan panorama pertanian Desa Labuhan Kuris.',
    desktopImage: '/images/sawah.JPG',
    mobileImage: '/images/mobile/sawah-mobile.JPG',
  },
  {
    title: 'Pesona Dangar Rea',
    subtitle:
      'Lanskap alam yang memperkuat daya tarik wisata desa dan cocok ditampilkan di halaman utama.',
    desktopImage: '/images/dangar-rea.jpg',
    mobileImage: '/images/mobile/dangar-rea-mobile.jpg',
  },
];

const wisata = [
  {
    title: 'Pulau Kecil Eksotis',
    desc: 'Pulau kecil yang cocok untuk menikmati laut jernih, berfoto, dan bersantai bersama keluarga.',
  },
  {
    title: 'Pantai yang Menawan',
    desc: 'Pesisir desa menawarkan panorama alami, udara segar, dan suasana yang cocok untuk wisata santai.',
  },
  {
    title: 'Keindahan Bawah Laut',
    desc: 'Pemandangan bawah laut yang indah berpotensi dikembangkan untuk snorkeling dan wisata edukasi.',
  },
];

const potensi = [
  {
    title: 'Pertanian Padi',
    desc: 'Hamparan sawah yang subur menjadi penopang pangan sekaligus sumber ekonomi masyarakat desa.',
  },
  {
    title: 'Budidaya Semangka',
    desc: 'Semangka menjadi salah satu hasil pertanian unggulan yang dapat memperkuat identitas desa.',
  },
];

const navItems = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Profil', href: '#profil' },
  { label: 'Wisata', href: '#wisata' },
  { label: 'Statistik', href: '#statistik' },
  { label: 'Pertanian', href: '#pertanian' },
  { label: 'Galeri', href: '#galeri' },
  { label: 'Kontak', href: '#kontak' },
];

export default function Page() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);

    return () => window.clearInterval(interval);
  }, []);

  const scrollToContent = () => {
    const target = document.getElementById('profil');
    target?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <section
        id="beranda"
        className="relative min-h-screen overflow-hidden"
      >
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <div key={slide.title} className="absolute inset-0">
              <div
                className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 md:block ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                } hidden`}
                style={{ backgroundImage: `url(${slide.desktopImage})` }}
              />
              <div
                className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 md:hidden ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ backgroundImage: `url(${slide.mobileImage})` }}
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-black/5" />
          <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-black/20" />
        </div>

        <header className="fixed left-0 top-0 z-30 w-full md:absolute">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between rounded-full border border-white/20 bg-black/20 px-4 py-3 text-white backdrop-blur md:px-6">
              <a href="#beranda" className="text-base font-bold tracking-wide md:text-lg">
                Desa Labuhan Kuris
              </a>

              <nav className="hidden items-center gap-6 md:flex">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-sm font-medium text-white/90 transition hover:text-white"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 md:hidden"
                aria-label="Buka menu navigasi"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M4 7H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M4 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {mobileMenuOpen && (
              <div className="mt-3 rounded-3xl border border-white/20 bg-black/75 p-4 text-white backdrop-blur md:hidden">
                <nav className="flex flex-col gap-1">
                  {navItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="rounded-2xl px-4 py-3 text-sm font-medium text-white/90 transition hover:bg-white/10 hover:text-white"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
            )}
          </div>
        </header>

        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 py-24 lg:px-8">
          <div className="max-w-3xl text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-white/80 md:text-base">
              Selamat Datang Di
            </p>

            <h1 className="mt-3 text-5xl font-bold leading-none sm:text-5xl md:text-7xl lg:text-7xl">
              Desa Labuhan Kuris
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-white/90 md:text-lg">
              Desa dengan potensi wisata bahari yang memukau, mulai dari pulau kecil, pantai, hingga
              keindahan bawah laut, serta kekuatan pertanian padi dan semangka yang menjadi kebanggaan
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
                index === currentSlide ? 'w-10 bg-white' : 'w-3 bg-white/50'
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

      <section id="profil" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-700">Tentang Desa</p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">Desa dengan kekayaan laut dan pertanian</h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Desa Labuhan Kuris memiliki perpaduan kekuatan antara wisata alam bahari dan sektor
            pertanian. Laut yang indah, pantai yang menawan, serta hasil padi dan semangka memberi
            identitas yang kuat bagi desa ini.
          </p>
        </div>
      </section>

      <section id="wisata" className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-700">Wisata Unggulan</p>
            <h2 className="mt-2 text-3xl font-bold">Pesona bahari desa</h2>
          </div>
          <button className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold shadow-sm">
            Lihat Semua
          </button>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {wisata.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 h-44 rounded-2xl bg-linear-to-br from-sky-100 via-cyan-50 to-emerald-100" />
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.desc}</p>
              <button className="mt-5 text-sm font-semibold text-sky-700">Baca Detail →</button>
            </article>
          ))}
        </div>
      </section>

      <section id="statistik" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">Statistik</p>
            <h3 className="mt-3 text-3xl font-bold">3+</h3>
            <p className="mt-2 text-sm text-slate-600">Potensi wisata unggulan desa.</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Pertanian</p>
            <h3 className="mt-3 text-3xl font-bold">2</h3>
            <p className="mt-2 text-sm text-slate-600">Komoditas utama: padi dan semangka.</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">Potensi</p>
            <h3 className="mt-3 text-3xl font-bold">100%</h3>
            <p className="mt-2 text-sm text-slate-600">Keindahan alam dan daya tarik lokal.</p>
          </div>
        </div>
      </section>

      <section id="pertanian" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="rounded-4xl bg-slate-900 px-6 py-10 text-white md:px-10">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">Potensi Pertanian</p>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">Dari sawah hingga kebun semangka</h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/80 md:text-base">
                Selain wisata, desa juga memiliki kekuatan pada sektor pertanian. Potensi ini bisa
                ditampilkan untuk menarik perhatian pengunjung, investor, maupun mitra pengembangan desa.
              </p>
            </div>
            <div className="grid gap-4">
              {potensi.map((item) => (
                <div key={item.title} className="rounded-3xl bg-white/10 p-5 backdrop-blur">
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/80">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="galeri" className="mx-auto max-w-7xl px-6 pb-10 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {['Galeri Foto', 'Berita Desa', 'Lokasi Desa', 'Kontak Pengelola'].map((item) => (
            <div key={item} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 h-12 w-12 rounded-2xl bg-slate-100" />
              <h3 className="text-lg font-bold">{item}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Bagian ini dapat diisi informasi lanjutan agar pengunjung mudah mengenal desa dan
                menghubungi pihak terkait.
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="kontak" className="mx-auto max-w-7xl px-6 pb-20 pt-6 lg:px-8">
        <div className="rounded-4xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold">Kontak Desa</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
            Tambahkan alamat kantor desa, nomor telepon, email, media sosial, dan peta lokasi pada
            bagian ini agar masyarakat dan pengunjung mudah menghubungi pihak desa.
          </p>
        </div>
      </section>

      <footer className="bg-black px-6 py-6 text-center text-sm text-white">
        Copyright @ {currentYear} Desa Labuhan Kuris
      </footer>
    </main>
  );
}
