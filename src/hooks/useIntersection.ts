import { useState, useEffect, useRef, RefObject } from 'react';

interface UseIntersectionOptions extends IntersectionObserverInit {
  once?: boolean;
}

export function useIntersection<T extends HTMLElement = HTMLElement>(
  options: UseIntersectionOptions = {}
): [RefObject<T | null>, boolean] {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef<T | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        if (options.once) {
          observer.unobserve(entry.target);
        }
      } else {
        if (!options.once) {
          setIsIntersecting(false);
        }
      }
    }, options);

    const currentElement = elementRef.current;

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [options]);

  return [elementRef, isIntersecting];
}
