import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updateGaleri } from "../../actions";

type EditGaleriPageProps = {
  params: Promise<{
    id: string;
  }>;
};

type GaleriItem = {
  id: string;
  title: string;
  description: string | null;
  image_path: string;
  published: boolean;
  display_order: number;
};

export default async function EditGaleriPage({ params }: EditGaleriPageProps) {
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

  const { data: galeri, error } = await supabase
    .from("galeri")
    .select("id, title, description, image_path, published, display_order")
    .eq("id", id)
    .single()
    .returns<GaleriItem>();

  if (error || !galeri) {
    notFound();
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("galeri").getPublicUrl(galeri.image_path);

  return (
    <main className="mx-auto max-w-3xl px-6 py-20 text-gray-700">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Edit Galeri</h1>
          <p className="mt-2 text-sm text-black">
            Perbarui data dokumentasi visual yang tampil di halaman galeri.
          </p>
        </div>

        <Link
          href="/admin/galeri"
          className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-black hover:bg-gray-50"
        >
          Kembali
        </Link>
      </div>

      <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <form action={updateGaleri} className="grid gap-4 md:grid-cols-2">
          <input type="hidden" name="id" value={galeri.id} />

          <div>
            <label htmlFor="title" className="mb-1 block text-sm font-medium">
              Judul Galeri
            </label>
            <input
              id="title"
              name="title"
              required
              defaultValue={galeri.title}
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
              defaultValue={galeri.display_order}
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
              defaultValue={galeri.description ?? ""}
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm text-black outline-none focus:border-black"
            />
          </div>

          <div className="md:col-span-2">
            <p className="mb-2 text-sm font-medium">Gambar Saat Ini</p>
            <Image
              src={publicUrl}
              alt={galeri.title}
              width={320}
              height={220}
              unoptimized
              className="h-48 w-full rounded-2xl object-cover"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="image" className="mb-1 block text-sm font-medium">
              Ganti Gambar
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm text-black outline-none focus:border-black"
            />
            <p className="mt-1 text-xs text-black">
              Kosongkan jika tidak ingin mengganti gambar.
            </p>
          </div>

          <label className="flex items-center gap-2 text-sm md:col-span-2">
            <input
              type="checkbox"
              name="published"
              defaultChecked={galeri.published}
              className="h-4 w-4 rounded border-gray-300"
            />
            Publish ke halaman publik
          </label>

          <div className="flex items-center gap-3 md:col-span-2">
            <button
              type="submit"
              className="rounded-xl bg-black px-5 py-2 text-sm font-medium text-white"
            >
              Simpan Perubahan
            </button>

            <Link
              href="/admin/galeri"
              className="rounded-xl border border-gray-300 px-5 py-2 text-sm font-medium text-black hover:bg-gray-50"
            >
              Batal
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}
