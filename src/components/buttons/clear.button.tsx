import { Icons } from '@/assets';

// components/buttons/clear-filters.button.tsx
interface ClearFiltersButtonProps {
  onClear: () => void;
  isVisible?: boolean; // chỉ hiện khi có filter active
}

export function ClearFiltersButton({
  onClear,
  isVisible = true,
}: ClearFiltersButtonProps) {
  if (!isVisible) return null;

  return (
    <button
      onClick={onClear}
      className="flex items-center gap-1 px-3 h-10 text-xs text-main border border-main rounded-md hover:bg-primary-50 whitespace-nowrap transition-colors"
    >
      <Icons.X className="h-3 w-3" />
      Clear filters
    </button>
  );
}
