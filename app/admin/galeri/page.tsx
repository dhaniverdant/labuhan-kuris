import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { logout } from "../actions";
import { createGaleri } from "./actions";
import DeleteGaleriButton from "./delete-galeri-button";

export const dynamic = "force-dynamic";

type GaleriItem = {
  id: string;
  title: string;
  description: string | null;
  image_path: string;
  published: boolean;
  display_order: number;
};

export default async function AdminGaleriPage() {
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

  const { data: galeriList, error } = await supabase
    .from("galeri")
    .select("id, title, description, image_path, published, display_order")
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false })
    .returns<GaleriItem[]>();

  return (
    <main className="mx-auto max-w-5xl px-6 py-20 text-gray-700">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white">Admin Galeri</h1>
          <p className="mt-2 text-sm text-white">
            Kelola dokumentasi visual yang akan tampil di halaman galeri publik.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="cursor-pointer rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600"
          >
            Dashboard
          </Link>

          <form action={logout}>
            <button
              type="submit"
              className="cursor-pointer rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600"
            >
              Logout
            </button>
          </form>
        </div>
      </div>

      <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Tambah Galeri</h2>

        <form action={createGaleri} className="mt-6 grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="title" className="mb-1 block text-sm font-medium">
              Judul Galeri
            </label>
            <input
              id="title"
              name="title"
              required
              placeholder="Contoh: Pantai Labuhan Kuris"
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
            <label
              htmlFor="description"
              className="mb-1 block text-sm font-medium"
            >
              Deskripsi
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              placeholder="Tulis deskripsi singkat dokumentasi..."
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm text-black outline-none focus:border-black"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="image" className="mb-1 block text-sm font-medium">
              Gambar Galeri
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              required
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm text-black outline-none focus:border-black"
            />
            <p className="mt-1 text-xs text-black">
              Upload gambar dokumentasi. Gunakan file JPG, PNG, atau WebP.
            </p>
          </div>

          <label className="flex items-center gap-2 text-sm md:col-span-2">
            <input
              type="checkbox"
              name="published"
              className="h-4 w-4 rounded border-gray-300"
            />
            Publish ke halaman publik
          </label>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="rounded-xl bg-black px-5 py-2 text-sm font-medium text-white"
            >
              Simpan Galeri
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
                  <th className="px-4 py-3">Judul</th>
                  <th className="px-4 py-3">Deskripsi</th>
                  <th className="px-4 py-3">Publish</th>
                  <th className="px-4 py-3">Urutan</th>
                  <th className="px-4 py-3">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {galeriList && galeriList.length > 0 ? (
                  galeriList.map((item) => {
                    const {
                      data: { publicUrl },
                    } = supabase.storage
                      .from("galeri")
                      .getPublicUrl(item.image_path);

                    return (
                      <tr key={item.id} className="border-t border-gray-100">
                        <td className="px-4 py-3">
                          {publicUrl ? (
                            <Image
                              src={publicUrl}
                              alt={item.title}
                              width={80}
                              height={56}
                              className="h-14 w-20 rounded-lg object-cover"
                              unoptimized
                              loading="lazy"
                            />
                          ) : (
                            <div className="h-14 w-20 rounded-lg bg-gray-100" />
                          )}
                        </td>

                        <td className="px-4 py-3">{item.title}</td>
                        <td className="px-4 py-3">{item.description ?? "-"}</td>
                        <td className="px-4 py-3">
                          {item.published ? "Ya" : "Tidak"}
                        </td>
                        <td className="px-4 py-3">{item.display_order}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <Link
                              href={`/admin/galeri/${item.id}/edit`}
                              className="rounded-lg border border-gray-300 px-3 py-1 text-sm font-medium text-black hover:bg-gray-50"
                            >
                              Edit
                            </Link>

                            <DeleteGaleriButton
                              id={item.id}
                              title={item.title}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-6 text-center text-black"
                    >
                      Belum ada data galeri.
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
