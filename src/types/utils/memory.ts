/**
 * Memory Management Utilities
 *
 * Helper functions and hooks to prevent memory leaks
 */

import { logDebug, logError, logWarn } from '@/utils';
import { useEffect, useRef, useCallback } from 'react';

// ============================================================================
// CLEANUP UTILITIES
// ============================================================================

/**
 * Create a cleanup tracker for debugging memory leaks
 */
export class CleanupTracker {
  private cleanups: Map<string, () => void> = new Map();
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  /**
   * Register a cleanup function
   */
  register(id: string, cleanup: () => void): void {
    if (this.cleanups.has(id)) {
      logWarn(`[${this.name}] Cleanup already registered: ${id}`);
    }
    this.cleanups.set(id, cleanup);
  }

  /**
   * Execute and remove a specific cleanup
   */
  cleanup(id: string): void {
    const cleanup = this.cleanups.get(id);
    if (cleanup) {
      cleanup();
      this.cleanups.delete(id);
    }
  }

  /**
   * Execute all cleanups
   */
  cleanupAll(): void {
    this.cleanups.forEach((cleanup, id) => {
      try {
        cleanup();
      } catch (error) {
        logError(`[${this.name}] Cleanup failed for ${id}:`, error);
      }
    });
    this.cleanups.clear();
  }

  /**
   * Get count of pending cleanups
   */
  getPendingCount(): number {
    return this.cleanups.size;
  }
}

// ============================================================================
// REACT HOOKS
// ============================================================================

/**
 * Hook to detect memory leaks in development
 * Logs warnings if component renders too many times
 */
export function useMemoryLeakDetector(
  componentName: string,
  options: {
    maxRenders?: number;
    logMount?: boolean;
    logUnmount?: boolean;
  } = {}
) {
  const { maxRenders = 100, logMount = true, logUnmount = true } = options;

  const renderCount = useRef(0);

  renderCount.current++;

  useEffect(() => {
    if (logMount) {
      logDebug(`[${componentName}] Mounted`);
    }

    return () => {

      if (logUnmount) {
      }

      if (renderCount.current > maxRenders) {
        logWarn(
          `[${componentName}] High render count: ${renderCount.current} (max: ${maxRenders})`
        );
      }
    };
  }, [componentName, logMount, logUnmount, maxRenders]);
}

/**
 * Hook to safely manage event listeners
 * Automatically cleans up on unmount
 */
export function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  element: Window | HTMLElement = window,
  options?: AddEventListenerOptions
) {
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = (event: Event) => {
      savedHandler.current(event as WindowEventMap[K]);
    };

    element.addEventListener(eventName, eventListener, options);

    return () => {
      element.removeEventListener(eventName, eventListener, options);
    };
  }, [eventName, element, options]);
}

/**
 * Hook to safely manage intervals
 * Automatically clears on unmount
 */
export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;

    const id = setInterval(() => savedCallback.current(), delay);

    return () => clearInterval(id);
  }, [delay]);
}

/**
 * Hook to safely manage timeouts
 * Automatically clears on unmount
 */
export function useTimeout(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;

    const id = setTimeout(() => savedCallback.current(), delay);

    return () => clearTimeout(id);
  }, [delay]);
}

/**
 * Hook to track component lifecycle
 * Useful for debugging mount/unmount issues
 */
export function useLifecycleLogger(componentName: string) {
  useEffect(() => {
    return () => {
      logDebug(` ${componentName} unmounted`);
    };
  }, [componentName]);
}

/**
 * Hook to create a stable callback that won't cause re-renders
 * Useful for preventing memory leaks from callback dependencies
 */
export function useStableCallback<T extends (...args: any[]) => any>(
  callback: T
): T {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return useCallback(((...args) => callbackRef.current(...args)) as T, []);
}

// ============================================================================
// DATA MANAGEMENT
// ============================================================================

/**
 * Limit array size to prevent memory bloat
 */
export function limitArraySize<T>(
  array: T[],
  maxSize: number,
  strategy: 'fifo' | 'lifo' = 'fifo'
): T[] {
  if (array.length <= maxSize) return array;

  if (strategy === 'fifo') {
    // Keep newest items (remove from start)
    return array.slice(-maxSize);
  } else {
    // Keep oldest items (remove from end)
    return array.slice(0, maxSize);
  }
}

/**
 * Deep clone with size limit to prevent memory issues
 */
export function safeDeepClone<T>(
  obj: T,
  maxDepth: number = 10,
  currentDepth: number = 0
): T {
  if (currentDepth >= maxDepth) {
    logWarn('Max depth reached in safeDeepClone');
    return obj;
  }

  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) =>
      safeDeepClone(item, maxDepth, currentDepth + 1)
    ) as T;
  }

  const cloned = {} as T;
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = safeDeepClone(obj[key], maxDepth, currentDepth + 1);
    }
  }

  return cloned;
}

/**
 * Create a WeakMap-based cache for objects
 * Automatically garbage collected when objects are no longer referenced
 */
export function createWeakCache<K extends object, V>() {
  const cache = new WeakMap<K, V>();

  return {
    get(key: K): V | undefined {
      return cache.get(key);
    },
    set(key: K, value: V): void {
      cache.set(key, value);
    },
    has(key: K): boolean {
      return cache.has(key);
    },
    delete(key: K): boolean {
      return cache.delete(key);
    },
  };
}

// ============================================================================
// SENSITIVE DATA CLEANUP
// ============================================================================

/**
 * Securely clear sensitive data from memory
 * Overwrites with random data before deletion
 */
export function secureClear(obj: any): void {
  if (!obj || typeof obj !== 'object') return;

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];

      if (typeof value === 'string') {
        // Overwrite string with random data
        obj[key] = Array(value.length)
          .fill(0)
          .map(() => String.fromCharCode(Math.random() * 256))
          .join('');
      } else if (typeof value === 'object' && value !== null) {
        secureClear(value);
      }

      delete obj[key];
    }
  }
}

/**
 * Clear auth tokens from all storage
 */
export function clearAuthStorage(): void {
  // Clear localStorage
  const authKeys = ['auth-storage', 'access_token', 'refresh_token'];
  authKeys.forEach((key) => {
    const value = localStorage.getItem(key);
    if (value) {
      localStorage.removeItem(key);
    }
  });

  // Clear sessionStorage
  sessionStorage.clear();

  // Clear cookies (if any)
  document.cookie.split(';').forEach((cookie) => {
    const name = cookie.split('=')[0].trim();
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  });
}

// ============================================================================
// PERFORMANCE MONITORING
// ============================================================================

/**
 * Monitor memory usage (Chrome only)
 */
export function getMemoryUsage(): {
  usedJSHeapSize: number;
  totalJSHeapSize: number;
  jsHeapSizeLimit: number;
} | null {
  if ('memory' in performance) {
    const memory = (performance as any).memory;
    return {
      usedJSHeapSize: memory.usedJSHeapSize,
      totalJSHeapSize: memory.totalJSHeapSize,
      jsHeapSizeLimit: memory.jsHeapSizeLimit,
    };
  }
  return null;
}

/**
 * Log memory usage
 */
export function logMemoryUsage(label: string = 'Memory'): void {
  const usage = getMemoryUsage();
  if (usage) {
    const usedMB = (usage.usedJSHeapSize / 1024 / 1024).toFixed(2);
    const totalMB = (usage.totalJSHeapSize / 1024 / 1024).toFixed(2);
    const limitMB = (usage.jsHeapSizeLimit / 1024 / 1024).toFixed(2);
  }
}

/**
 * Hook to monitor memory usage
 */
export function useMemoryMonitor(
  interval: number = 5000,
  label: string = 'Memory'
) {
  useInterval(() => {
    logMemoryUsage(label);
  }, interval);
}
