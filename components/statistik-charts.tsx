'use client';

import dynamic from 'next/dynamic';

const PopulationBarChart = dynamic(
  () => import('@/components/charts/population-bar-chart'),
  { ssr: false }
);

const VillageBudgetChart = dynamic(
  () => import('@/components/charts/village-budget-chart'),
  { ssr: false }
);

const AgricultureOutputChart = dynamic(
  () => import('@/components/charts/agriculture-output-chart'),
  { ssr: false }
);

export default function StatistikCharts() {
  return (
    <div className="space-y-8">
      <PopulationBarChart />
      <VillageBudgetChart />
      <AgricultureOutputChart />
    </div>
  );
}