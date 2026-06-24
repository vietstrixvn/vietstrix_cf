export default function IntroMarquee() {
  return (
    <section className="w-full border-y bg-primary-100/60 border-main/10 py-8 sm:py-8 bg-surface-container-lowest overflow-hidden">
      <div className="flex whitespace-nowrap animate-infinite-scroll">
        <div className="flex items-center gap-4 px-8">
          <span className="text-main  font-medium text-2xl tracking-widest uppercase">
            STRATEGY · DESIGN · DEVELOPMENT ·
          </span>
          <span className="text-main  font-medium text-2xl tracking-widest uppercase">
            STRATEGY · DESIGN · DEVELOPMENT ·
          </span>
          <span className="text-main  font-medium text-2xl tracking-widest uppercase">
            STRATEGY · DESIGN · DEVELOPMENT ·
          </span>
        </div>
        <div className="flex items-center gap-4 px-8">
          <span className="text-main  font-medium text-2xl tracking-widest uppercase">
            STRATEGY · DESIGN · DEVELOPMENT ·
          </span>
          <span className="text-main  font-medium text-2xl tracking-widest uppercase">
            STRATEGY · DESIGN · DEVELOPMENT ·
          </span>
          <span className="text-main  font-medium text-2xl tracking-widest uppercase">
            STRATEGY · DESIGN · DEVELOPMENT ·
          </span>
        </div>
      </div>
    </section>
  );
}
