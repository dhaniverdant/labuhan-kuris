import PageHero from '@/components/page-hero';
import GalleryCard from '@/components/gallery-card';
import { galeriItems } from '@/data/galeri';

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
          {galeriItems.map((item) => (
            <GalleryCard
              key={item.title}
              title={item.title}
              description={item.description}
              image={item.image}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
