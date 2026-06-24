'use client';

import { queryClient } from '@/libs/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  // const isDev = process.env.NODE_ENV === 'development';

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
