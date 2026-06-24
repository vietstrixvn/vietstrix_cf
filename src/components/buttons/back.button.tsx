'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import type { PushButtonProps } from '@/types';
import { Arrows } from '@/assets';

export const BackButton: React.FC<PushButtonProps> = ({ href }) => {
  const router = useRouter();
  const handlePush = () => {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <button
      onClick={handlePush}
      className="
    flex items-center justify-center
     h-10 space-x-2 p-2 text-xl
     text-main font-medium
    hover:underline hover:text-main

    transition duration-300
  "
    >
      <Arrows.ArrowLeft size={26} />
      Back
    </button>
  );
};
