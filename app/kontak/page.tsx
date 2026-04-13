export default function KontakPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <section className="relative min-h-[60vh] overflow-hidden bg-sky-900 text-white">
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-32 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-200">
            Kontak
          </p>
          <h1 className="mt-3 text-4xl font-bold md:text-6xl">
            Hubungi Desa Labuhan Kuris
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-white/85 md:text-lg">
            Silakan hubungi kami untuk informasi lebih lanjut mengenai profil
            desa, potensi wisata, kerja sama, maupun kebutuhan informasi
            lainnya.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">Informasi Kontak</h2>

            <div className="mt-6 space-y-5 text-sm leading-7 text-slate-600">
              <div>
                <p className="font-semibold text-slate-800">Nomor Telepon</p>
                <p>+62 1234 5678 999</p>
              </div>

              <div>
                <p className="font-semibold text-slate-800">Email</p>
                <a
                  href="mailto:desalabuhankuris@example.com"
                  className="text-sky-700 transition hover:text-sky-900 hover:underline"
                >
                  desalabuhankuris@example.com
                </a>
              </div>

              <div>
                <p className="font-semibold text-slate-800">Alamat</p>
                <p>Kantor Desa Labuhan Kuris</p>
                <p>Kecamatan XXX, Kabupaten XXX</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">Media Sosial</h2>

            <div className="mt-6 space-y-5 text-sm leading-7 text-slate-600">
              <div>
                <p className="font-semibold text-slate-800">Facebook</p>
                <p>facebook.com/desalabuhankuris</p>
              </div>

              <div>
                <p className="font-semibold text-slate-800">Instagram</p>
                <a
                  href="https://instagram.com/pokdarwis_labuhankuris"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sky-700 transition hover:text-sky-900 hover:underline"
                >
                  instagram.com/pokdarwis_labuhankuris
                </a>
              </div>

              <div>
                <p className="font-semibold text-slate-800">Jam Layanan</p>
                <p>Senin - Jumat</p>
                <p>08.00 - 16.00 WITA</p>
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2123.118509415253!2d117.63293859957922!3d-8.581188054424999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dcbbd61b49ae671%3A0x9d814474b849af2b!2sKantor%20desa%20labuhan%20kuris!5e1!3m2!1sen!2sid!4v1776079808014!5m2!1sen!2sid"
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
    </main>
  );
}
