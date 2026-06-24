import React from 'react';

export const SectionTag = ({ title }: { title: string }) => {
  return (
    <div className="mb-6">
      <div className="relative mb-3 h-px w-full overflow-hidden rounded-none bg-transparent">
        <div
          className="absolute left-0 h-px w-full rounded-none bg-gray-300 transition-all duration-1000 ease-out delay-200"
          aria-hidden="true"
        />
      </div>
      <p className="text-sm font-medium uppercase tracking-wide text-foreground">
        /{title}
      </p>
    </div>
  );
};
