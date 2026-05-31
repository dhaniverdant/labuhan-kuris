import PageHero from '@/components/page-hero';
import StatistikSummaryCards from '@/components/statistik-summary-cards';
import StatistikCharts from '@/components/statistik-charts';
import { getPublishedPendudukPerDusun, getPublishedStatistikSummary } from '@/lib/supabase/statistik';

export default async function StatistikPage() {
  const statistikSummary = await getPublishedStatistikSummary();
  const pendudukPerDusun = await getPublishedPendudukPerDusun();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <PageHero
        eyebrow="Statistik"
        title="Statistik Desa Labuhan Kuris"
        description="Rekapulasi data statistik penting terkait penduduk di Desa Labuhan Kuris."
      />

      <section className="mx-auto max-w-7xl space-y-8 px-6 py-16 lg:px-8">
        <StatistikSummaryCards items={statistikSummary} />
        <StatistikCharts pendudukPerDusun={pendudukPerDusun} />
      </section>
    </main>
  );
}