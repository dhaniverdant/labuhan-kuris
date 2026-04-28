import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

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
      <h1 className="text-2xl font-semibold">Admin Wisata</h1>
      <p className="mt-2 text-sm text-gray-600">
        Data di bawah ini dibaca langsung dari tabel wisata di Supabase.
      </p>

      {error ? (
        <p className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Gagal mengambil data: {error.message}
        </p>
      ) : (
        <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-500 text-left">
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
                  <tr key={item.id} className="border-t border-black text-amber-950">
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
                    className="px-4 py-6 text-center text-blue-950"
                  >
                    Belum ada data wisata.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
