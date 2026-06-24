'use client';

import { TableOfContentsProps, TocItem } from '@/types';
import { useState, useEffect } from 'react';

// Parse HTML to extract headings and generate TOC (client-side only)
function parseHtmlToToc(html: string): TocItem[] {
  if (!html || typeof window === 'undefined') return [];

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');

  const items: TocItem[] = [];
  const stack: TocItem[] = [];

  headings.forEach((heading, index) => {
    const level = parseInt(heading.tagName.substring(1));
    const text = heading.textContent?.trim() || '';

    if (!text) return;

    // Generate ID from text or use existing id (same logic as RichTextContent)
    let id = heading.id;
    if (!id) {
      id = text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[đĐ]/g, 'd')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();

      // Add index if duplicate
      if (items.some((item) => item.id === id)) {
        id = `${id}-${index}`;
      }
    }

    const item: TocItem = {
      id,
      label: text,
      level,
      children: [],
    };

    // Build hierarchy
    while (stack.length > 0 && stack[stack.length - 1].level >= level) {
      stack.pop();
    }

    if (stack.length === 0) {
      items.push(item);
    } else {
      const parent = stack[stack.length - 1];
      if (!parent.children) parent.children = [];
      parent.children.push(item);
    }

    stack.push(item);
  });

  return items;
}

function TocLink({ item, depth = 0 }: { item: TocItem; depth?: number }) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // Wait a bit for RichTextContent to add IDs if needed
    setTimeout(() => {
      const el = document.getElementById(item.id);
      if (el) {
        const yOffset = -120; // Offset for fixed header
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <li className="mb-1.5 text-gray-700 last:mb-0">
      <a
        href={`#${item.id}`}
        onClick={handleClick}
        className={`inline-block leading-relaxed text-main no-underline hover:text-secondary-700 hover:underline ${
          depth > 0 ? 'text-[13.5px]' : ''
        }`}
        style={{ paddingLeft: depth > 0 ? `${depth * 1.25}rem` : undefined }}
      >
        {item.label}
      </a>
      {item.children && item.children.length > 0 && (
        <ol className="m-0 mt-1 list-none p-0">
          {item.children.map((child) => (
            <TocLink key={child.id} item={child} depth={depth + 1} />
          ))}
        </ol>
      )}
    </li>
  );
}
import { useTranslations } from 'next-intl';

export default function TableOfContents({ htmlContent }: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const t = useTranslations('Page');

  useEffect(() => {
    if (htmlContent && typeof window !== 'undefined') {
      const items = parseHtmlToToc(htmlContent);
      setTocItems(items);
    }
  }, [htmlContent]);

  // Don't render if no headings found
  if (tocItems.length === 0) {
    return null;
  }

  return (
    <nav
      className="inline-block w-full rounded-md border border-gray-300 bg-secondary-50 px-[18px] py-3.5 text-sm "
      aria-label="Mục lục bài viết"
    >
      <div className="mb-2.5 flex items-center gap-2">
        <p className="m-0 text-[15px] font-semibold text-gray-900">
          {t('Toc')}
        </p>
        <button
          className="cursor-pointer border-none bg-transparent p-0 text-[13px] text-main underline hover:text-secondary-700"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
        >
          [{isOpen ? 'Hide' : 'Show'}]
        </button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? 'max-h-[500px] opacity-100'
            : 'pointer-events-none max-h-0 opacity-0'
        }`}
      >
        <ol className="m-0 list-none p-0">
          {tocItems.map((item) => (
            <TocLink key={item.id} item={item} />
          ))}
        </ol>
      </div>
    </nav>
  );
}
