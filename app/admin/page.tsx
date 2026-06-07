import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { logout } from "./actions";

export default async function AdminDashboardPage() {
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

  return (
    <main className="mx-auto max-w-5xl px-6 py-24 text-white">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard Admin</h1>
          <p className="mt-2 text-sm text-white">
            Pilih data website Desa Labuhan Kuris yang ingin dikelola.
          </p>
        </div>

        <form action={logout}>
          <button
            type="submit"
            className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-white hover:bg-gray-50"
          >
            Logout
          </button>
        </form>
      </div>

      <section className="mt-8 grid gap-6 md:grid-cols-2">
        <Link
          href="/admin/wisata"
          className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
            Wisata
          </p>
          <h2 className="mt-3 text-xl font-bold text-black">
            Kelola Data Wisata
          </h2>
          <p className="mt-2 text-sm leading-6 text-black">
            Tambah, edit, hapus, upload gambar, dan atur publikasi wisata desa.
          </p>
        </Link>

        <Link
          href="/admin/statistik"
          className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
            Statistik
          </p>
          <h2 className="mt-3 text-xl font-bold text-black">
            Kelola Data Statistik
          </h2>
          <p className="mt-2 text-sm leading-6 text-black">
            Ubah ringkasan statistik dan data jumlah penduduk per dusun.
          </p>
        </Link>

        <Link
          href="/admin/galeri"
          className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
            Galeri
          </p>
          <h2 className="mt-3 text-xl font-bold text-black">
            Kelola Data Galeri
          </h2>
          <p className="mt-2 text-sm leading-6 text-black">
            Tambah, edit, hapus, upload gambar, dan atur publikasi galeri desa.
          </p>
        </Link>

        <Link
          href="/admin/kontak"
          className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
            Kontak
          </p>
          <h2 className="mt-3 text-xl font-bold text-black">
            Kelola Data Kontak
          </h2>
          <p className="mt-2 text-sm leading-6 text-black">
            Ubah nomor telepon, email, media sosial, alamat, jam layanan, dan
            peta lokasi desa.
          </p>
        </Link>
      </section>
    </main>
  );
}
