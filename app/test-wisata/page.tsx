import { getPublishedWisata } from "@/lib/supabase/wisata";

export default async function TestWisataPage() {
  const wisataList = await getPublishedWisata();

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-2xl font-semibold">Test Publik Wisata</h1>
      <p className="mt-2 text-sm text-gray-600">
        Halaman ini hanya untuk memastikan data published dari Supabase sudah
        bisa dibaca dari sisi publik.
      </p>

      <div className="mt-6 space-y-4">
        {wisataList.length > 0 ? (
          wisataList.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-gray-200 bg-white p-4"
            >
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="mt-1 text-sm text-gray-600">Slug: {item.slug}</p>
              <p className="mt-1 text-sm text-gray-600">
                Lokasi: {item.location ?? "-"}
              </p>
              <p className="mt-2 text-sm">{item.short_description ?? "-"}</p>
            </div>
          ))
        ) : (
          <p className="rounded-2xl border border-gray-200 bg-white p-4 text-sm text-gray-500">
            Belum ada data wisata published.
          </p>
        )}
      </div>
    </main>
  );
}
