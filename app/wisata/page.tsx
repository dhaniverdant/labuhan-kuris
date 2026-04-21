import PageHero from '@/components/page-hero';
import TourismCard from '@/components/tourism-card';
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
            <TourismCard
              key={item.title}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
