'use client';

import { useEffect, useState } from 'react';
import { useLoading } from '@/contexts/loading.context';
import { Loader } from './loader';

export function DelayedLoading({
  duration = 2000,
  onComplete,
}: {
  duration?: number;
  onComplete?: () => void;
}) {
  const [done, setDone] = useState(false);
  const { setHeroReady } = useLoading();

  const handleLoadingComplete = () => {
    setDone(true);
    setHeroReady(true);
    onComplete?.();
  };

  if (done) return null;

  return (
    <Loader
      duration={duration}
      onLoadingComplete={handleLoadingComplete}
    />
  );
}
