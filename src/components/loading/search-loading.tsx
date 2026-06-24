import { Loader2 } from 'lucide-react';

interface SearchLoadingProps {
  isSearching: boolean;
  className?: string;
}

/**
 * Component hiển thị loading indicator khi đang search (debouncing)
 */
export function SearchLoadingIndicator({
  isSearching,
  className = '',
}: SearchLoadingProps) {
  if (!isSearching) return null;

  return (
    <div
      className={`flex items-center gap-2 text-sm text-gray-500 ${className}`}
    >
      <Loader2 className="h-4 w-4 animate-spin" />
      <span>Searching...</span>
    </div>
  );
}
