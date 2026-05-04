import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getWisataImageUrl } from "@/lib/supabase/wisata";
import { createWisata } from "./actions";
import DeleteWisataButton from "./delete-wisata-button";

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
    .select("id, name, slug, location, image_path, is_published, display_order")
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  return (
    <main className="mx-auto max-w-5xl px-6 py-10 text-black">
      <div>
        <h1 className="text-2xl font-semibold">Admin Wisata</h1>
        <p className="mt-2 text-sm text-black">
          Kelola data wisata yang akan tampil di halaman publik.
        </p>
      </div>

      <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Tambah Wisata</h2>

        <form action={createWisata} className="mt-6 grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium">
              Nama Wisata
            </label>
            <input
              id="name"
              name="name"
              required
              placeholder="Contoh: Pantai Labuhan Kuris"
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm text-black outline-none focus:border-black"
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
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm text-black outline-none focus:border-black"
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
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm text-black outline-none focus:border-black"
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
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm text-black outline-none focus:border-black"
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
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm text-black outline-none focus:border-black"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="image" className="mb-1 block text-sm font-medium">
              Gambar Wisata
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm text-black outline-none focus:border-black"
            />
            <p className="mt-1 text-xs text-black">
              Upload gambar utama wisata. Untuk sementara gunakan file JPG, PNG,
              atau WebP.
            </p>
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
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="px-4 py-3">Gambar</th>
                  <th className="px-4 py-3">Nama</th>
                  <th className="px-4 py-3">Slug</th>
                  <th className="px-4 py-3">Lokasi</th>
                  <th className="px-4 py-3">Publish</th>
                  <th className="px-4 py-3">Urutan</th>
                  <th className="px-4 py-3">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {wisataList && wisataList.length > 0 ? (
                  wisataList.map((item) => {
                    const imageUrl = getWisataImageUrl(item.image_path);

                    return (
                      <tr key={item.id} className="border-t border-gray-100">
                        <td className="px-4 py-3">
                          {imageUrl ? (
                            <Image
                              src={imageUrl}
                              alt={item.name}
                              width={80}
                              height={56}
                              className="h-14 w-20 rounded-lg object-cover"
                            />
                          ) : (
                            <div className="h-14 w-20 rounded-lg bg-gray-100" />
                          )}
                        </td>

                        <td className="px-4 py-3">{item.name}</td>
                        <td className="px-4 py-3">{item.slug}</td>
                        <td className="px-4 py-3">{item.location ?? "-"}</td>
                        <td className="px-4 py-3">
                          {item.is_published ? "Ya" : "Tidak"}
                        </td>
                        <td className="px-4 py-3">{item.display_order}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <Link
                              href={`/admin/wisata/${item.id}/edit`}
                              className="rounded-lg border border-gray-300 px-3 py-1 text-sm font-medium text-black hover:bg-gray-50"
                            >
                              Edit
                            </Link>

                            <DeleteWisataButton id={item.id} name={item.name} />
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={7}
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
