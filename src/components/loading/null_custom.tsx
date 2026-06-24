'use client';

import { WelcomeBannerProps } from '@/types';
import { CustomImage } from '@/components';

export const NotiPostNull = ({
  message = 'There are currently no articles. Please check back later.',
}: WelcomeBannerProps) => {
  return (
    <div className="flex max-w-xl mx-auto flex-col items-center justify-center py-10 space-y-4">
      <CustomImage src="/icons/logo.svg" alt="logo" width={50} height={50} />
      <p className="text-gray-700 text-lg">{message}</p>
    </div>
  );
};
