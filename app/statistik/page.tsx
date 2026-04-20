import PageHero from '@/components/page-hero';
import PopulationBarChart from '@/components/charts/population-bar-chart';
import StatistikSummaryCards from '@/components/statistik-summary-cards';

export default function StatistikPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <PageHero
        eyebrow="Statistik"
        title="Statistik Desa Labuhan Kuris"
        description="Gambaran umum data desa yang dapat menampilkan informasi penting mengenai potensi wilayah, masyarakat, serta sektor unggulan Desa Labuhan Kuris."
      />

      <section className="mx-auto max-w-7xl space-y-8 px-6 py-16 lg:px-8">
        <StatistikSummaryCards />
        <PopulationBarChart />
      </section>
    </main>
  );
}