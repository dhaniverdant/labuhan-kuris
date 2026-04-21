type StatPreviewCardProps = {
  label: string;
  value: string;
  description: string;
  accentClassName?: string;
};

export default function StatPreviewCard({
  label,
  value,
  description,
  accentClassName = 'text-sky-700',
}: StatPreviewCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className={`text-sm font-semibold uppercase tracking-[0.2em] ${accentClassName}`}>
        {label}
      </p>
      <h3 className="mt-3 text-3xl font-bold">{value}</h3>
      <p className="mt-2 text-sm text-slate-600">
        {description}
      </p>
    </div>
  );
}
