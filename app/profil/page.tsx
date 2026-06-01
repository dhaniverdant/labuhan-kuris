"use client";

import PageHero from "@/components/page-hero";

export default function ProfilPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <PageHero
        eyebrow="Profil"
        title="Desa Labuhan Kuris"
        description="Mengenal Desa Labuhan Kuris lebih dekat: gambaran umum dan potensi utama."
      />

      <section className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
        <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold">Kepala Desa</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            Zubaidi H.M, A.Ma
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">Gambaran Umum</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Desa Labuhan Kuris secara administratif berada di Kecamatan Lape, Kabupaten Sumbawa, Nusa Tenggara Barat.
              Desa ini memiliki luas wilayah sekitar 138.250 Ha 
              dengan jumlah penduduk sekitar 5.203 jiwa yang tersebar di sembilan dusun: Aimual, Ketanga,
              Kuris, Labuhan Kuris, Labuhan Terata, Labuhan Terata Barat, Labuhan Terata Selatan,
              Ngali, dan Tanjung Bila.
              Desa Labuhan Kuris memiliki karakter wilayah yang kaya akan
              keindahan bahari dan didukung oleh aktivitas pertanian masyarakat.
              Potensi ini menjadi dasar penting dalam pengembangan ekonomi
              lokal, pariwisata, dan kesejahteraan masyarakat desa.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">Potensi Utama</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
              <li>
                • Wisata bahari berupa pantai, pulau kecil, dan panorama alam.
              </li>
              <li>• Pertanian padi sebagai sumber pangan dan ekonomi.</li>
              <li>• Budidaya semangka sebagai komoditas unggulan desa.</li>
              <li>
                • Peluang pengembangan desa berbasis wisata dan hasil bumi.
              </li>
            </ul>
          </div>
        </div>

      </section>
    </main>
  );
}
