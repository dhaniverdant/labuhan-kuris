'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import ChartFrame from '@/components/charts/chart-frame';
import { pendudukPerDusun } from '@/data/statistik';

export default function PopulationBarChart() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
          Statistik Penduduk
        </p>
        <h2 className="mt-2 text-2xl font-bold">Jumlah Penduduk per Dusun</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Grafik ini menampilkan persebaran jumlah penduduk di setiap dusun.
        </p>
      </div>

      <ChartFrame>
        {({ width, height }) => (
          <BarChart width={width} height={height} data={pendudukPerDusun}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="penduduk" radius={[12, 12, 0, 0]} />
          </BarChart>
        )}
      </ChartFrame>
    </div>
  );
}
