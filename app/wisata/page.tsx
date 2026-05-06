import PageHero from "@/components/page-hero";
import TourismCard from "@/components/tourism-card";
import { getPublishedWisata } from "@/lib/supabase/wisata";

export default async function WisataPage() {
  const wisataItems = await getPublishedWisata();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <PageHero
        eyebrow="Wisata"
        title="Wisata Desa Labuhan Kuris"
        description="Desa Labuhan Kuris memiliki potensi wisata bahari yang indah, mulai dari pulau kecil, pantai, hingga panorama alam yang memikat untuk dikunjungi."
      />

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <h2 className="sr-only">Daftar Wisata Desa Labuhan Kuris</h2>
        {wisataItems.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-3">
            {wisataItems.map((item, index) => (
              <TourismCard
                key={item.id}
                title={item.name}
                description={item.short_description ?? ""}
                imageUrl={item.image_url}
                priority={index === 0}
                href={`/wisata/${item.slug}`}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600">
            Belum ada data wisata yang dipublikasikan.
          </div>
        )}
      </section>
    </main>
  );
}
