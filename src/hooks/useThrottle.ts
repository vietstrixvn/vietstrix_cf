'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * ==========================
 * 📌 @HOOK useThrottle
 * ==========================
 *
 * @desc Custom hook để throttle giá trị, giới hạn số lần gọi trong khoảng thời gian
 * @param value - Giá trị cần throttle
 * @param limit - Thời gian giới hạn (ms), mặc định 1000ms
 * @returns Giá trị đã được throttle
 */
export function useThrottle<T>(value: T, limit: number = 1000): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastRan = useRef(Date.now());

  useEffect(() => {
    const handler = setTimeout(
      () => {
        if (Date.now() - lastRan.current >= limit) {
          setThrottledValue(value);
          lastRan.current = Date.now();
        }
      },
      limit - (Date.now() - lastRan.current)
    );

    return () => {
      clearTimeout(handler);
    };
  }, [value, limit]);

  return throttledValue;
}
