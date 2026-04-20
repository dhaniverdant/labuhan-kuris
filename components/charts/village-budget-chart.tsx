'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { danaDesa } from '@/data/statistik';

export default function VillageBudgetChart() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
          Dana Desa
        </p>
        <h2 className="mt-2 text-2xl font-bold">Anggaran dan Realisasi</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Grafik ini menampilkan perbandingan anggaran dan realisasi pada setiap bidang.
        </p>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={danaDesa}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="anggaran" name="Anggaran" radius={[10, 10, 0, 0]} />
            <Bar dataKey="realisasi" name="Realisasi" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
