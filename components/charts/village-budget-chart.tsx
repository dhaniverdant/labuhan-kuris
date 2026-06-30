'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import ChartFrame from '@/components/charts/chart-frame';
import { danaDesa } from '@/data/statistik';

export default function VillageBudgetChart() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
          Dana Desa
        </p>
        <h2 className="mt-2 text-2xl font-bold">Anggaran dan Realisasi</h2>
        <p className="mt-6 text-lg leading-6 text-slate-600">
          Mohon maaf, data anggaran dan realisasi dana desa belum tersedia saat ini.
        </p>
      </div>

      {/* <ChartFrame>
        {({ width, height }) => (
          <BarChart width={width} height={height} data={danaDesa}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="anggaran" name="Anggaran" radius={[10, 10, 0, 0]} />
            <Bar dataKey="realisasi" name="Realisasi" radius={[10, 10, 0, 0]} />
          </BarChart>
        )}
      </ChartFrame> */}
    </div>
  );
}
