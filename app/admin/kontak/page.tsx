import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getSiteContact } from "@/lib/supabase/site-contact";
import { logout } from "../actions";
import { updateSiteContact } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminKontakPage() {
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

  const siteContact = await getSiteContact();

  return (
    <main className="mx-auto max-w-5xl px-6 py-20 text-gray-700">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Admin Kontak</h1>
          <p className="mt-2 text-sm text-black">
            Kelola nomor telepon, email, media sosial, alamat, jam layanan, dan
            peta lokasi yang tampil di halaman kontak publik.
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
        <h2 className="text-lg font-semibold">Edit Informasi Kontak</h2>

        <form
          action={updateSiteContact}
          className="mt-6 grid gap-4 md:grid-cols-2"
        >
          <div>
            <label
              htmlFor="phoneDisplay"
              className="mb-1 block text-sm font-medium"
            >
              Tampilan Nomor Telepon
            </label>
            <input
              id="phoneDisplay"
              name="phoneDisplay"
              defaultValue={siteContact.phoneDisplay}
              placeholder="Contoh: 0812-3456-7890"
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm text-black outline-none focus:border-black"
            />
          </div>

          <div>
            <label
              htmlFor="phoneHref"
              className="mb-1 block text-sm font-medium"
            >
              Link Nomor Telepon
            </label>
            <input
              id="phoneHref"
              name="phoneHref"
              defaultValue={siteContact.phoneHref}
              placeholder="Contoh: tel:+6281234567890"
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm text-black outline-none focus:border-black"
            />
          </div>

          <div>
            <label
              htmlFor="emailDisplay"
              className="mb-1 block text-sm font-medium"
            >
              Tampilan Email
            </label>
            <input
              id="emailDisplay"
              name="emailDisplay"
              defaultValue={siteContact.emailDisplay}
              placeholder="Contoh: desa@email.com"
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm text-black outline-none focus:border-black"
            />
          </div>

          <div>
            <label
              htmlFor="emailHref"
              className="mb-1 block text-sm font-medium"
            >
              Link Email
            </label>
            <input
              id="emailHref"
              name="emailHref"
              defaultValue={siteContact.emailHref}
              placeholder="Contoh: mailto:desa@email.com"
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm text-black outline-none focus:border-black"
            />
          </div>

          <div>
            <label
              htmlFor="facebookDisplay"
              className="mb-1 block text-sm font-medium"
            >
              Tampilan Facebook
            </label>
            <input
              id="facebookDisplay"
              name="facebookDisplay"
              defaultValue={siteContact.facebookDisplay}
              placeholder="Contoh: Desa Labuhan Kuris"
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm text-black outline-none focus:border-black"
            />
          </div>

          <div>
            <label
              htmlFor="facebookHref"
              className="mb-1 block text-sm font-medium"
            >
              Link Facebook
            </label>
            <input
              id="facebookHref"
              name="facebookHref"
              defaultValue={siteContact.facebookHref}
              placeholder="https://facebook.com/..."
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm text-black outline-none focus:border-black"
            />
          </div>

          <div>
            <label
              htmlFor="instagramDisplay"
              className="mb-1 block text-sm font-medium"
            >
              Tampilan Instagram
            </label>
            <input
              id="instagramDisplay"
              name="instagramDisplay"
              defaultValue={siteContact.instagramDisplay}
              placeholder="Contoh: @desalabuhankuris"
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm text-black outline-none focus:border-black"
            />
          </div>

          <div>
            <label
              htmlFor="instagramHref"
              className="mb-1 block text-sm font-medium"
            >
              Link Instagram
            </label>
            <input
              id="instagramHref"
              name="instagramHref"
              defaultValue={siteContact.instagramHref}
              placeholder="https://instagram.com/..."
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm text-black outline-none focus:border-black"
            />
          </div>

          <div>
            <label
              htmlFor="addressLine1"
              className="mb-1 block text-sm font-medium"
            >
              Alamat Baris 1
            </label>
            <input
              id="addressLine1"
              name="addressLine1"
              defaultValue={siteContact.addressLine1}
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm text-black outline-none focus:border-black"
            />
          </div>

          <div>
            <label
              htmlFor="addressLine2"
              className="mb-1 block text-sm font-medium"
            >
              Alamat Baris 2
            </label>
            <input
              id="addressLine2"
              name="addressLine2"
              defaultValue={siteContact.addressLine2}
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm text-black outline-none focus:border-black"
            />
          </div>

          <div>
            <label
              htmlFor="serviceDays"
              className="mb-1 block text-sm font-medium"
            >
              Hari Layanan
            </label>
            <input
              id="serviceDays"
              name="serviceDays"
              defaultValue={siteContact.serviceDays}
              placeholder="Senin - Jumat"
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm text-black outline-none focus:border-black"
            />
          </div>

          <div>
            <label
              htmlFor="serviceHours"
              className="mb-1 block text-sm font-medium"
            >
              Jam Layanan
            </label>
            <input
              id="serviceHours"
              name="serviceHours"
              defaultValue={siteContact.serviceHours}
              placeholder="08.00 - 16.00 WITA"
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm text-black outline-none focus:border-black"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="mapsUrl" className="mb-1 block text-sm font-medium">
              Google Maps URL
            </label>
            <input
              id="mapsUrl"
              name="mapsUrl"
              defaultValue={siteContact.mapsUrl}
              placeholder="https://maps.app.goo.gl/..."
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm text-black outline-none focus:border-black"
            />
            <p className="mt-1 text-xs text-black">
              Link ini dipakai untuk tombol “Lihat di Google Maps”.
            </p>
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="mapsEmbedUrl"
              className="mb-1 block text-sm font-medium"
            >
              Google Maps Embed URL
            </label>
            <textarea
              id="mapsEmbedUrl"
              name="mapsEmbedUrl"
              rows={4}
              defaultValue={siteContact.mapsEmbedUrl}
              placeholder="https://www.google.com/maps/embed?pb=..."
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm text-black outline-none focus:border-black"
            />
            <p className="mt-1 text-xs text-black">
              Masukkan hanya isi atribut src dari iframe Google Maps.
            </p>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="cursor-pointer rounded-xl bg-black px-5 py-2 text-sm font-medium text-white"
            >
              Simpan Kontak
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
