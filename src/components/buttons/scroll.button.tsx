'use client';

import { ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';

export const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const toggleVisibility = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          setIsVisible(window.scrollY > 300);
          ticking = false;
        });
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-center gap-3 z-50">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="w-12 h-12 bg-main text-white rounded-md shadow-md hover:bg-secondary-700 flex items-center justify-center transition duration-300"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
};
