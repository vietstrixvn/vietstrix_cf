import React from 'react';
import type { HeaderProps } from '@/types';

export const Header: React.FC<HeaderProps> = ({ title, className }) => {
  return (
    <div
      className={`mb-6 rounded-md bg-linear-to-r from-primary-950 via-primary-500 to-primary-200 text-white text-lg font-bold px-6 py-4 ${className}`}
    >
      {title}
    </div>
  );
};
