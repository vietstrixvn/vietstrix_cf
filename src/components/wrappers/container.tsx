'use client';

import { ContainerProps } from '@/types';
import React from 'react';

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  width,
}) => {
  const defaultWidthClasses =
    'lg:max-w-8xl md:max-w-7xl sm:max-w-6xl max-w-6xl';
  const widthClasses = width || defaultWidthClasses;

  return (
    <div
      className={`container w-full ${widthClasses} px-[10px] mx-auto relative ${className}`}
    >
      {children}
    </div>
  );
};
