'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import type { PushButtonProps } from '@/types';
import { Plus } from 'lucide-react';
import { cn } from '@/utils';

export const PushButton: React.FC<PushButtonProps> = ({
  href,
  label,
  className,
  onClick,
  ...props
}) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e);
    } else if (href) {
      router.push(href);
    }
  };

  return (
    <button
      className={cn(
        'group flex items-center gap-2 rounded-md bg-main p-1 pr-6 transition-all hover:bg-main-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-main-200 focus-visible:ring-offset-2',
        className
      )}
      onClick={handleClick}
      {...props}
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-md border-2 border-main bg-white transition-transform group-hover:scale-105">
        <Plus className="h-4 w-4 text-main" strokeWidth={2.5} />
      </div>
      <span className="whitespace-nowrap text-xs font-semibold tracking-wide text-[#e6f4f1]">
        {label}
      </span>
    </button>
  );
};
