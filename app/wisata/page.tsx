import PageHero from '@/components/page-hero';
import { wisataItems } from '@/data/wisata';

export default function WisataPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <PageHero
        eyebrow="Wisata"
        title="Wisata Desa Labuhan Kuris"
        description="Desa Labuhan Kuris memiliki potensi wisata bahari yang indah, mulai dari pulau kecil, pantai, hingga panorama alam yang memikat untuk dikunjungi."
      />

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {wisataItems.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-2xl font-bold">{item.title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
