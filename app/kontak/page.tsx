import PageHero from "@/components/page-hero";
import { siteContact } from "@/data/site-contact";

export default function KontakPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <PageHero
        eyebrow="Kontak"
        title="Hubungi Desa Labuhan Kuris"
        description="Silakan hubungi kami untuk informasi lebih lanjut mengenai profil desa, potensi wisata, kerja sama, maupun kebutuhan informasi lainnya."
      />

      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">Informasi Kontak</h2>

            <div className="mt-6 space-y-5 text-sm leading-7 text-slate-600">
              <div>
                <p className="font-semibold text-slate-800">Nomor Telepon</p>
                <p>{siteContact.phoneDisplay}</p>
              </div>

              <div>
                <p className="font-semibold text-slate-800">Email</p>
                <a
                  href={siteContact.emailHref}
                  className="text-sky-700 transition hover:text-sky-900 hover:underline"
                >
                  {siteContact.emailDisplay}
                </a>
              </div>

              <div>
                <p className="font-semibold text-slate-800">Alamat</p>
                <p>{siteContact.addressLine1}</p>
                <p>{siteContact.addressLine2}</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">Media Sosial</h2>

            <div className="mt-6 space-y-5 text-sm leading-7 text-slate-600">
              <div>
                <p className="font-semibold text-slate-800">Facebook</p>
                <a
                  href={siteContact.facebookHref}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sky-700 transition hover:text-sky-900 hover:underline"
                >
                  {siteContact.facebookDisplay}
                </a>
              </div>

              <div>
                <p className="font-semibold text-slate-800">Instagram</p>
                <a
                  href={siteContact.instagramHref}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sky-700 transition hover:text-sky-900 hover:underline"
                >
                  {siteContact.instagramDisplay}
                </a>
              </div>

              <div>
                <p className="font-semibold text-slate-800">Jam Layanan</p>
                <p>{siteContact.serviceDays}</p>
                <p>{siteContact.serviceHours}</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:col-span-2">
            <h2 className="text-2xl font-bold">Lokasi Kantor</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Titik lokasi kantor desa dapat dilihat langsung melalui peta
              berikut.
            </p>

            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
              <iframe
                title="Lokasi Kantor Desa Labuhan Kuris"
                src={siteContact.mapsEmbedUrl}
                width="100%"
                height="420"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-2 lg:px-8">
        <hr className="border-slate-300" />
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">Tentang Aplikasi</h2>

            <div className="mt-6 space-y-5 text-sm leading-7 text-slate-600">
              <div>
                <p className="font-semibold text-slate-800">Teknologi</p>
                <p>TypeScript, Next.js, Node.js</p>
                <p>Tailwind CSS, Recharts, Supabase</p>
              </div>

              <div>
                <p className="font-semibold text-slate-800">Pengembang</p>
                <a
                  href="https://www.linkedin.com/in/rahmad-ramdhani/"
                  className="text-sky-700 transition hover:text-sky-900 hover:underline"
                >
                  Rahmad Ramdhani
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
