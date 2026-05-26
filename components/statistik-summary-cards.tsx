type StatistikSummaryItem = {
  id?: string;
  label: string;
  value: number;
  suffix: string | null;
};

type StatistikSummaryCardsProps = {
  items: StatistikSummaryItem[];
};

function formatStatValue(value: number) {
  return value.toLocaleString("id-ID", {
    maximumFractionDigits: 2,
  });
}

export default function StatistikSummaryCards({
  items,
}: StatistikSummaryCardsProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <article
          key={item.id ?? item.label}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
            {item.label}
          </p>

          <div className="mt-4 flex items-end gap-2">
            <h2 className="text-4xl font-bold leading-none">
              {formatStatValue(item.value)}
            </h2>

            {item.suffix ? (
              <span className="text-sm font-medium text-slate-500">
                {item.suffix}
              </span>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}
