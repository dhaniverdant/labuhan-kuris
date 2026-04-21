"use client";

import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import ChartFrame from "@/components/charts/chart-frame";
import { hasilPertanian } from "@/data/statistik";

export default function AgricultureOutputChart() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
          Hasil Pertanian
        </p>
        <h2 className="mt-2 text-2xl font-bold">Produksi Komoditas Utama</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Grafik ini menampilkan gambaran hasil produksi komoditas pertanian
          utama desa.
        </p>
      </div>

      <ChartFrame>
        {({ width, height }) => (
          <BarChart width={width} height={height} data={hasilPertanian}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="hasil" radius={[12, 12, 0, 0]} />
          </BarChart>
        )}
      </ChartFrame>
    </div>
  );
}
