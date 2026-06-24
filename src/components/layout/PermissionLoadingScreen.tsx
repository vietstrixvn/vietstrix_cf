'use client';

import { Loader } from '../loading';

/**
 * Loading screen hiển thị khi đang load permissions
 * Có thể customize theo design của bạn
 */
export function PermissionLoadingScreen() {
  return (
    <div className="min-h-screen  bg-main flex items-center justify-center">
      <Loader />
    </div>
  );
}
