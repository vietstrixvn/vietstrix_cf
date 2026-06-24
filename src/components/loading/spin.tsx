// components/Loading.tsx

import { Icons } from '@/assets';
import { LoadingProps } from '@/types';
import { string } from 'zod';

export const LoadingSpin: React.FC<LoadingProps> = ({
  size = 32,
  message = 'Loading...',
  className = string,
  spanClassName = string,
}) => {
  return (
    <div>
      <Icons.Loader2 className={`animate-spin ${className}`} size={size} />
      <span className={`${spanClassName}`}>{message}</span>
    </div>
  );
};
