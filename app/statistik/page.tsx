import PageHero from '@/components/page-hero';

export default function StatistikPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <PageHero
        eyebrow="Statistik"
        title="Statistik Desa Labuhan Kuris"
        description="Gambaran umum data desa yang dapat menampilkan informasi penting mengenai potensi wilayah, masyarakat, serta sektor unggulan Desa Labuhan Kuris."
      />

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
              Wisata
            </p>
            <h2 className="mt-3 text-4xl font-bold">3+</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Potensi wisata utama desa, mulai dari pulau kecil, pantai, hingga panorama bawah laut.
            </p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Pertanian
            </p>
            <h2 className="mt-3 text-4xl font-bold">3</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Komoditas utama desa yang saat ini ditampilkan adalah padi, semangka, dan jagung.
            </p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
              Potensi
            </p>
            <h2 className="mt-3 text-4xl font-bold">100%</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Halaman ini bisa dikembangkan lagi untuk menampilkan data penduduk, wilayah, dan potensi desa.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
