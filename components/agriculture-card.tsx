type AgricultureCardProps = {
  title: string;
  description: string;
  dark?: boolean;
};

export default function AgricultureCard({
  title,
  description,
  dark = false,
}: AgricultureCardProps) {
  if (dark) {
    return (
      <div className="rounded-3xl bg-white/10 p-5 backdrop-blur">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-white/80">
          {description}
        </p>
      </div>
    );
  }

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="mt-4 text-sm leading-7 text-slate-600">
        {description}
      </p>
    </article>
  );
}
