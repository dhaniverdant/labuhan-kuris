import SectionHeader from '@/components/section-header';
import StatPreviewCard from '@/components/stat-preview-card';
import {
  statistikSummary,
  danaDesa,
  hasilPertanian,
} from '@/data/statistik';

export default function StatistikPreviewSection() {
  return (
    <section id="statistik" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <SectionHeader
        eyebrow="Statistik"
        title="Gambaran singkat data desa"
        href="/statistik"
      />

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <StatPreviewCard
          label="Penduduk"
          value={`${statistikSummary[0].value}`}
          description="Gambaran jumlah penduduk desa secara umum."
          accentClassName="text-sky-700"
        />

        <StatPreviewCard
          label="Dana Desa"
          value={`${danaDesa.length} Bidang`}
          description="Ringkasan anggaran dan realisasi penggunaan dana desa."
          accentClassName="text-emerald-700"
        />

        <StatPreviewCard
          label="Pertanian"
          value={`${hasilPertanian.length} Komoditas`}
          description="Padi, semangka, dan jagung sebagai komoditas utama desa."
          accentClassName="text-amber-700"
        />
      </div>
    </section>
  );
}
