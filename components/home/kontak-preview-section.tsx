import Link from 'next/link';

export default function KontakPreviewSection() {
  return (
    <section id="kontak" className="mx-auto max-w-7xl px-6 pb-20 pt-6 lg:px-8">
      <div className="rounded-4xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-700">
          Kontak
        </p>
        <h2 className="mt-3 text-3xl font-bold">Hubungi Desa Labuhan Kuris</h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
          Dapatkan informasi lebih lanjut mengenai profil desa, potensi wisata, kerja sama,
          dan kebutuhan informasi lainnya melalui halaman kontak.
        </p>

        <div className="mt-8">
          <Link
            href="/kontak"
            className="inline-flex rounded-2xl bg-sky-700 px-6 py-3 font-semibold text-white transition hover:bg-sky-800"
          >
            Lihat selengkapnya
          </Link>
        </div>
      </div>
    </section>
  );
}
