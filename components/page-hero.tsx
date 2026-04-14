type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export default function PageHero({
  eyebrow,
  title,
  description,
}: PageHeroProps) {
  return (
    <section className="relative min-h-[60vh] overflow-hidden bg-sky-900 text-white">
      <div className="mx-auto max-w-7xl px-6 pb-20 pt-32 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-200">
          {eyebrow}
        </p>

        <h1 className="mt-3 text-4xl font-bold md:text-6xl">
          {title}
        </h1>

        <p className="mt-6 max-w-3xl text-base leading-7 text-white/85 md:text-lg">
          {description}
        </p>
      </div>
    </section>
  );
}
