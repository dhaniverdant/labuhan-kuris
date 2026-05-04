import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createWisata } from "./actions";

export default async function AdminWisataPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: adminUser } = await supabase
    .from("admin_users")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();

  if (!adminUser) {
    redirect("/admin/login");
  }

  const { data: wisataList, error } = await supabase
    .from("wisata")
    .select("id, name, slug, location, is_published, display_order")
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <div>
        <h1 className="text-2xl font-semibold">Admin Wisata</h1>
        <p className="mt-2 text-sm text-black">
          Kelola data wisata yang akan tampil di halaman publik.
        </p>
      </div>

      <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-black">Tambah Wisata</h2>

        <form action={createWisata} className="mt-6 grid gap-4 md:grid-cols-2 text-black">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium">
              Nama Wisata
            </label>
            <input
              id="name"
              name="name"
              required
              placeholder="Contoh: Pantai Labuhan Kuris"
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black"
            />
          </div>

          <div>
            <label htmlFor="slug" className="mb-1 block text-sm font-medium">
              Slug
            </label>
            <input
              id="slug"
              name="slug"
              placeholder="boleh kosong, otomatis dari nama"
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black"
            />
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="short_description"
              className="mb-1 block text-sm font-medium"
            >
              Deskripsi Singkat
            </label>
            <textarea
              id="short_description"
              name="short_description"
              rows={3}
              placeholder="Tulis deskripsi singkat wisata..."
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black"
            />
          </div>

          <div>
            <label
              htmlFor="location"
              className="mb-1 block text-sm font-medium"
            >
              Lokasi
            </label>
            <input
              id="location"
              name="location"
              placeholder="Contoh: Labuhan Kuris"
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black"
            />
          </div>

          <div>
            <label
              htmlFor="display_order"
              className="mb-1 block text-sm font-medium"
            >
              Urutan Tampil
            </label>
            <input
              id="display_order"
              name="display_order"
              type="number"
              defaultValue={0}
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black"
            />
          </div>

          <label className="flex items-center gap-2 text-sm md:col-span-2">
            <input
              type="checkbox"
              name="is_published"
              className="h-4 w-4 rounded border-gray-300"
            />
            Publish ke halaman publik
          </label>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="rounded-xl bg-black px-5 py-2 text-sm font-medium text-white"
            >
              Simpan Wisata
            </button>
          </div>
        </form>
      </section>

      <section className="mt-8">
        {error ? (
          <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            Gagal mengambil data: {error.message}
          </p>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <table className="min-w-full text-sm text-black">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="px-4 py-3">Nama</th>
                  <th className="px-4 py-3">Slug</th>
                  <th className="px-4 py-3">Lokasi</th>
                  <th className="px-4 py-3">Publish</th>
                  <th className="px-4 py-3">Urutan</th>
                </tr>
              </thead>
              <tbody>
                {wisataList && wisataList.length > 0 ? (
                  wisataList.map((item) => (
                    <tr key={item.id} className="border-t border-gray-100">
                      <td className="px-4 py-3">{item.name}</td>
                      <td className="px-4 py-3">{item.slug}</td>
                      <td className="px-4 py-3">{item.location ?? "-"}</td>
                      <td className="px-4 py-3">
                        {item.is_published ? "Ya" : "Tidak"}
                      </td>
                      <td className="px-4 py-3">{item.display_order}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-6 text-center text-black"
                    >
                      Belum ada data wisata.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
