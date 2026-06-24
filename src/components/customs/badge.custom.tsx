export function FeaturesBadge({ title }: { title: string }) {
  return (
    <div className="inline-flex items-center gap-1.5 mb-4 sm:gap-2 border border-primary-200 px-3 py-2 sm:px-5 sm:py-2.5 bg-primary-50">
      <span className=" text-primary-800 text-xs sm:text-sm tracking-wide">
        {'///'}
      </span>
      <span className=" font-semibold text-[10px] sm:text-xs tracking-widest text-main uppercase">
        {title}
      </span>
    </div>
  );
}
