import Link from 'next/link';

export default function ProfilPreviewSection() {
  return (
    <section id="profil" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-700">
          Tentang Desa
        </p>
        <h2 className="mt-3 text-3xl font-bold md:text-4xl">
          Desa dengan kekayaan laut dan pertanian
        </h2>
        <p className="mt-4 text-base leading-7 text-slate-600">
          Desa Labuhan Kuris adalah salah satu desa dengan wilayah terluas di Kabupaten Sumbawa 
          dengan luas wilayah sekitar 138.250 Ha.
          Desa Labuhan Kuris memiliki perpaduan kekuatan antara wisata alam bahari dan sektor
          pertanian. Laut yang indah, pantai yang menawan, serta hasil padi, semangka, dan jagung
          memberi identitas yang kuat bagi desa ini.
        </p>

        <div className="mt-8">
          <Link
            href="/profil"
            className="inline-flex rounded-2xl bg-sky-700 px-6 py-3 font-semibold text-white transition hover:bg-sky-800"
          >
            Lihat selengkapnya
          </Link>
        </div>
      </div>
    </section>
  );
}
