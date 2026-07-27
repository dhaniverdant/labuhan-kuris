import PageHero from "@/components/page-hero";
import UmkmProductCard from "@/components/umkm-product-card";
import {
  getSiteContact,
  getWhatsAppUrl,
} from "@/lib/supabase/site-contact";
import { getPublishedUmkmProducts } from "@/lib/supabase/umkm";

export default async function UmkmPage() {
  const [products, siteContact] = await Promise.all([
    getPublishedUmkmProducts(),
    getSiteContact(),
  ]);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <PageHero
        eyebrow="UMKM"
        title="Produk Lokal Desa Labuhan Kuris"
        description="Temukan beragam produk unggulan masyarakat Desa Labuhan Kuris, mulai dari madu, garam, hingga hasil olahan lokal lainnya."
      />

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <h2 className="sr-only">Daftar Produk UMKM Desa Labuhan Kuris</h2>

        {products.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product, index) => (
              <UmkmProductCard
                key={product.id}
                name={product.name}
                description={product.description}
                producer={product.producer}
                price={product.price}
                measure={product.measure}
                imageUrl={product.image_url}
                whatsappUrl={getWhatsAppUrl(siteContact, product.name)}
                priority={index === 0}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600">
            Belum ada produk UMKM yang dipublikasikan.
          </div>
        )}
      </section>
    </main>
  );
}
