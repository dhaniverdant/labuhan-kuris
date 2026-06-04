import PageHero from "@/components/page-hero";
import GalleryCard from "@/components/gallery-card";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type GaleriItem = {
  id: string;
  title: string;
  description: string | null;
  image_path: string;
};

export default async function GaleriPage() {
  const supabase = await createClient();

  const { data: galeriItems, error } = await supabase
    .from("galeri")
    .select("id, title, description, image_path")
    .eq("published", true)
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false })
    .returns<GaleriItem[]>();

  if (error) {
    console.error("Failed to fetch galeri:", error);
  }

  const items = galeriItems ?? [];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <PageHero
        eyebrow="Galeri"
        title="Galeri Desa Labuhan Kuris"
        description="Dokumentasi visual Desa Labuhan Kuris yang menampilkan keindahan alam, aktivitas masyarakat, potensi wisata, dan sektor pertanian desa."
      />

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <h2 className="sr-only">Daftar galeri Desa Labuhan Kuris</h2>

        {items.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => {
              const {
                data: { publicUrl },
              } = supabase.storage.from("galeri").getPublicUrl(item.image_path);

              return (
                <GalleryCard
                  key={item.id}
                  title={item.title}
                  description={item.description ?? ""}
                  image={publicUrl}
                />
              );
            })}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Galeri belum tersedia
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600">
              Dokumentasi Desa Labuhan Kuris akan ditampilkan di halaman ini
              setelah data galeri ditambahkan oleh admin.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
