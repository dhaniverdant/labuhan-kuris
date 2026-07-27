import Link from "next/link";
import { redirect } from "next/navigation";
import { CompressedImageInput } from "@/components/admin/compressed-image-input";
import { FormattedPriceInput } from "@/components/admin/formatted-price-input";
import { createClient } from "@/lib/supabase/server";
import { updateUmkmProduct } from "../../actions";

type EditUmkmPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditUmkmPage({ params }: EditUmkmPageProps) {
  const { id } = await params;
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

  const { data: product, error } = await supabase
    .from("umkm_products")
    .select(
      "id, name, description, producer, price, measure, is_published, display_order",
    )
    .eq("id", id)
    .maybeSingle();

  if (error || !product) {
    redirect("/admin/umkm");
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-20 text-black">
      <Link
        href="/admin/umkm"
        className="text-sm font-medium text-black underline"
      >
        ← Kembali ke Admin UMKM
      </Link>

      <h1 className="mt-6 text-2xl font-semibold">Edit Produk UMKM</h1>
      <p className="mt-2 text-sm">
        Ubah informasi produk yang akan tampil di halaman publik.
      </p>

      <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <form
          action={updateUmkmProduct}
          className="grid gap-4 md:grid-cols-2"
        >
          <input type="hidden" name="id" value={product.id} />

          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium">
              Nama Produk
            </label>
            <input
              id="name"
              name="name"
              required
              defaultValue={product.name}
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black"
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
              defaultValue={product.producer ?? ""}
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black"
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
              defaultValue={product.description ?? ""}
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black"
            />
          </div>

          <div>
            <label htmlFor="price" className="mb-1 block text-sm font-medium">
              Harga
            </label>
            <FormattedPriceInput defaultValue={product.price} />
          </div>

          <div>
            <label htmlFor="measure" className="mb-1 block text-sm font-medium">
              Ukuran / Isi
            </label>
            <input
              id="measure"
              name="measure"
              defaultValue={product.measure ?? ""}
              placeholder="Contoh: 600 ml, 500 gr, atau 12 pcs"
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
              defaultValue={product.display_order}
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black"
            />
          </div>

          <CompressedImageInput
            label="Ganti Gambar Produk"
            previewAlt="Preview gambar baru produk UMKM"
          />

          <label className="flex items-center gap-2 text-sm md:col-span-2">
            <input
              type="checkbox"
              name="is_published"
              defaultChecked={product.is_published}
              className="h-4 w-4 rounded border-gray-300"
            />
            Publish ke halaman publik
          </label>

          <div className="mt-6 flex flex-col gap-3 md:col-span-2 sm:flex-row sm:justify-end">
            <button
              type="submit"
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-black px-5 py-2 text-sm font-semibold text-white hover:bg-gray-800"
            >
              Simpan Perubahan
            </button>
            <Link
              href="/admin/umkm"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-gray-300 px-5 py-2 text-sm font-semibold hover:bg-gray-50"
            >
              Batal
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}
