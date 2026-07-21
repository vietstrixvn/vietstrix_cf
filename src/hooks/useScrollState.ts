import { useState, useEffect, useRef } from 'react';

/**
 * Detects whether the user is actively scrolling.
 * Returns `true` while scrolling, `false` after idle for `idleMs`.
 *
 * Used to coordinate GPU workload — e.g. reducing WebGL shader speed
 * during scroll to give the browser compositor more headroom.
 */
export function useScrollState(idleMs = 150) {
  const [isScrolling, setIsScrolling] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolling(true);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setIsScrolling(false), idleMs);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(timeoutRef.current);
    };
  }, [idleMs]);

  return isScrolling;
}
