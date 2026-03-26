import Link from 'next/link';

export default function ProfilPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <section className="bg-sky-900 px-6 py-20 text-white lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-200">
            Profil Desa
          </p>
          <h1 className="mt-3 text-4xl font-bold md:text-5xl">
            Desa Labuhan Kuris
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-white/85 md:text-lg">
            Desa Labuhan Kuris adalah desa yang memiliki kekayaan potensi wisata bahari
            dan pertanian. Keindahan alam pesisir, pemandangan sawah, serta komoditas
            unggulan desa menjadi kekuatan utama dalam pengembangan desa.
          </p>

          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex rounded-2xl bg-white px-6 py-3 font-semibold text-sky-800 transition hover:bg-slate-100"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">Gambaran Umum</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Desa Labuhan Kuris memiliki karakter wilayah yang kaya akan keindahan
              bahari dan didukung oleh aktivitas pertanian masyarakat. Potensi ini
              menjadi dasar penting dalam pengembangan ekonomi lokal, pariwisata,
              dan kesejahteraan masyarakat desa.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">Potensi Utama</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
              <li>• Wisata bahari berupa pantai, pulau kecil, dan panorama alam.</li>
              <li>• Pertanian padi sebagai sumber pangan dan ekonomi.</li>
              <li>• Budidaya semangka sebagai komoditas unggulan desa.</li>
              <li>• Peluang pengembangan desa berbasis wisata dan hasil bumi.</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold">Arah Pengembangan Desa</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            Ke depan, Desa Labuhan Kuris dapat memperkuat identitasnya sebagai desa
            yang memadukan sektor wisata dan pertanian. Dengan promosi digital,
            pengelolaan potensi lokal, serta dukungan masyarakat, desa ini memiliki
            peluang besar untuk berkembang menjadi destinasi yang dikenal lebih luas.
          </p>
        </div>
      </section>
    </main>
  );
}