// components/ui/search-input.tsx
import { Icons } from '@/assets';
import { Input } from '@/components/ui/input';
import { cn } from '@/utils';

// components/buttons/search.button.tsx
interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onEnter: () => void; // gọi khi nhấn Enter
  onClear: () => void; // gọi khi nhấn ✕
  placeholder?: string;
  className?: string;
}

export function SearchInput({
  value,
  onChange,
  onEnter,
  onClear,
  placeholder = 'Search (Press Enter)',
  className,
}: SearchInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onEnter();
    }
  };

  return (
    <div className={cn('relative w-full md:w-64', className)}>
      <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input
        placeholder={placeholder}
        className="pl-10 pr-8 text-xs rounded-md h-10 bg-white"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {value && (
        <button
          onClick={onClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      )}
    </div>
  );
}
