import PageHero from '@/components/page-hero';

export default function GaleriPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <PageHero
        eyebrow="Galeri"
        title="Galeri Desa Labuhan Kuris"
        description="Dokumentasi visual Desa Labuhan Kuris yang menampilkan keindahan alam, aktivitas masyarakat, potensi wisata, dan sektor pertanian desa."
      />

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            'Pemandangan Pantai',
            'Pulau Kecil',
            'Sawah Desa',
            'Perkebunan Semangka',
            'Lanskap Jagung',
            'Aktivitas Masyarakat',
          ].map((item) => (
            <article
              key={item}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="h-56 bg-linear-to-br from-sky-100 via-cyan-50 to-emerald-100" />
              <div className="p-5">
                <h2 className="text-xl font-bold">{item}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Dokumentasi ini dapat diisi dengan foto asli desa untuk memperkuat
                  identitas visual website.
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
