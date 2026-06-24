export function FilterChip({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="inline-flex items-center h-[30px] rounded-md border border-zinc-200 bg-white text-xs overflow-hidden divide-x divide-zinc-200">
      <span className="px-2 text-[10px] font-medium text-zinc-400 shrink-0">
        {label}
      </span>
      <div className="px-1 flex items-center h-full">{children}</div>
    </div>
  );
}
