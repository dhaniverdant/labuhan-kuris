import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CompressedImageInput } from "@/components/admin/compressed-image-input";
import { FormattedPriceInput } from "@/components/admin/formatted-price-input";
import { createClient } from "@/lib/supabase/server";
import { getUmkmImageUrl } from "@/lib/supabase/umkm";
import { logout } from "../actions";
import { createUmkmProduct } from "./actions";
import DeleteUmkmButton from "./delete-umkm-button";

export default async function AdminUmkmPage() {
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

  const { data: products, error } = await supabase
    .from("umkm_products")
    .select(
      "id, name, producer, price, measure, image_path, is_published, display_order",
    )
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  return (
    <main className="mx-auto max-w-5xl px-6 py-20 text-gray-700">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white">Admin UMKM</h1>
          <p className="mt-2 text-sm text-white">
            Kelola produk lokal yang akan tampil di halaman publik.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600"
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
        <h2 className="text-lg font-semibold">Tambah Produk UMKM</h2>

        <form
          action={createUmkmProduct}
          className="mt-6 grid gap-4 md:grid-cols-2"
        >
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium">
              Nama Produk
            </label>
            <input
              id="name"
              name="name"
              required
              placeholder="Contoh: Madu Hutan"
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm text-black outline-none focus:border-black"
            />
          </div>

          <div>
            <label
              htmlFor="producer"
              className="mb-1 block text-sm font-medium"
            >
              Nama Produsen / UMKM
            </label>
            <input
              id="producer"
              name="producer"
              placeholder="Contoh: Kelompok Madu Kuris"
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
              rows={4}
              placeholder="Jelaskan keunggulan produk lokal ini..."
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm text-black outline-none focus:border-black"
            />
          </div>

          <div>
            <label htmlFor="price" className="mb-1 block text-sm font-medium">
              Harga
            </label>
            <FormattedPriceInput />
          </div>

          <div>
            <label htmlFor="measure" className="mb-1 block text-sm font-medium">
              Ukuran / Isi
            </label>
            <input
              id="measure"
              name="measure"
              placeholder="Contoh: 600 ml, 500 gr, atau 12 pcs"
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

          <CompressedImageInput
            label="Gambar Produk"
            previewAlt="Preview gambar produk UMKM"
          />

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
              Simpan Produk
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
          <div className="w-full overflow-x-auto rounded-3xl border border-gray-200 bg-white [-webkit-overflow-scrolling:touch]">
            <table className="w-full min-w-205 text-sm">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="px-4 py-3">Gambar</th>
                  <th className="px-4 py-3">Produk</th>
                  <th className="px-4 py-3">Produsen</th>
                  <th className="px-4 py-3">Harga</th>
                  <th className="px-4 py-3">Ukuran / Isi</th>
                  <th className="px-4 py-3">Publish</th>
                  <th className="px-4 py-3">Urutan</th>
                  <th className="sticky right-0 z-10 bg-gray-50 px-4 py-3">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {products && products.length > 0 ? (
                  products.map((product) => {
                    const imageUrl = getUmkmImageUrl(product.image_path);

                    return (
                      <tr key={product.id} className="border-t border-gray-100">
                        <td className="px-4 py-3">
                          {imageUrl ? (
                            <Image
                              src={imageUrl}
                              alt={product.name}
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
                        <td className="px-4 py-3 font-medium text-black">
                          {product.name}
                        </td>
                        <td className="px-4 py-3 text-black">
                          {product.producer ?? "-"}
                        </td>
                        <td className="px-4 py-3 text-black">
                          {product.price ?? "-"}
                        </td>
                        <td className="px-4 py-3 text-black">
                          {product.measure ?? "-"}
                        </td>
                        <td className="px-4 py-3 text-black">
                          {product.is_published ? "Ya" : "Tidak"}
                        </td>
                        <td className="px-4 py-3 text-black">
                          {product.display_order}
                        </td>
                        <td className="sticky right-0 bg-white px-4 py-3">
                          <div className="flex items-center gap-2">
                            <Link
                              href={`/admin/umkm/${product.id}/edit`}
                              className="rounded-lg border border-gray-300 px-3 py-1 text-sm font-medium text-black hover:bg-gray-50"
                            >
                              Edit
                            </Link>
                            <DeleteUmkmButton
                              id={product.id}
                              name={product.name}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-4 py-6 text-center text-black"
                    >
                      Belum ada produk UMKM.
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
