// components/Loading.tsx

import { Icons } from '@/assets';
import { LoadingProps } from '@/types';

export const LoadingSpin: React.FC<LoadingProps> = ({
  size = 32,
  message = 'Loading...',
  className = '',
  spanClassName = '',
}) => {
  return (
    <div>
      <Icons.Loader2 className={`animate-spin ${className}`} size={size} />
      <span className={`${spanClassName}`}>{message}</span>
    </div>
  );
};
