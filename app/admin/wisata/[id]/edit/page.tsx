import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updateWisata } from "../../actions";

type EditWisataPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditWisataPage({ params }: EditWisataPageProps) {
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

  const { data: wisata, error } = await supabase
    .from("wisata")
    .select(
      "id, name, slug, short_description, location, is_published, display_order",
    )
    .eq("id", id)
    .maybeSingle();

  if (error || !wisata) {
    redirect("/admin/wisata");
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-10 text-black">
      <div>
        <Link
          href="/admin/wisata"
          className="text-sm font-medium text-black underline"
        >
          ← Kembali ke Admin Wisata
        </Link>

        <h1 className="mt-6 text-2xl font-semibold">Edit Wisata</h1>
        <p className="mt-2 text-sm text-black">
          Ubah data wisata yang akan tampil di halaman publik.
        </p>
      </div>

      <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <form action={updateWisata} className="grid gap-4">
          <input type="hidden" name="id" value={wisata.id} />

          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium">
              Nama Wisata
            </label>
            <input
              id="name"
              name="name"
              required
              defaultValue={wisata.name}
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
              defaultValue={wisata.slug}
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm text-black outline-none focus:border-black"
            />
          </div>

          <div>
            <label
              htmlFor="short_description"
              className="mb-1 block text-sm font-medium"
            >
              Deskripsi Singkat
            </label>
            <textarea
              id="short_description"
              name="short_description"
              rows={4}
              defaultValue={wisata.short_description ?? ""}
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
              defaultValue={wisata.location ?? ""}
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
              defaultValue={wisata.display_order}
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm text-black outline-none focus:border-black"
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-black">
            <input
              type="checkbox"
              name="is_published"
              defaultChecked={wisata.is_published}
              className="h-4 w-4 rounded border-gray-300"
            />
            Publish ke halaman publik
          </label>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="rounded-xl bg-black px-5 py-2 text-sm font-medium text-white"
            >
              Simpan Perubahan
            </button>

            <Link
              href="/admin/wisata"
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
