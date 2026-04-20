import { statistikSummary } from '@/data/statistik';

export default function StatistikSummaryCards() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {statistikSummary.map((item) => (
        <article
          key={item.label}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
            {item.label}
          </p>

          <div className="mt-4 flex items-end gap-2">
            <h2 className="text-4xl font-bold leading-none">{item.value}</h2>
            <span className="text-sm font-medium text-slate-500">
              {item.suffix}
            </span>
          </div>
        </article>
      ))}
    </div>
  );
}
