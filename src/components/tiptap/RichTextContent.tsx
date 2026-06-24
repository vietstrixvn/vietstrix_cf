'use client';

import { logError } from '@/utils';
import { useEffect, useRef } from 'react';

interface RichTextContentProps {
  html: string;
  className?: string;
}

export function RichTextContent({ html, className }: RichTextContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    // Add IDs to headings for TOC navigation
    const headings = contentRef.current.querySelectorAll(
      'h1, h2, h3, h4, h5, h6'
    );
    const usedIds = new Set<string>();

    headings.forEach((heading, index) => {
      if (!heading.id) {
        const text = heading.textContent?.trim() || '';
        if (text) {
          let id = text
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[đĐ]/g, 'd')
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();

          // Handle duplicates
          if (usedIds.has(id)) {
            id = `${id}-${index}`;
          }

          usedIds.add(id);
          heading.id = id;
        }
      } else {
        usedIds.add(heading.id);
      }
    });

    // Find all image-gallery divs
    const galleries = contentRef.current.querySelectorAll(
      'div[data-type="image-gallery"]'
    );

    galleries.forEach((gallery) => {
      const imagesAttr = gallery.getAttribute('data-images');
      const layout = gallery.getAttribute('data-layout') || '2x2';

      if (!imagesAttr) return;

      try {
        const images = JSON.parse(imagesAttr);
        if (!Array.isArray(images) || images.length === 0) return;

        // Clear existing content
        gallery.innerHTML = '';

        // Add layout class
        gallery.classList.add('image-gallery');
        gallery.classList.add(
          layout === '2x1' ? 'image-gallery-2x1' : 'image-gallery-2x2'
        );

        // Create image elements
        images.forEach((img: any) => {
          const itemDiv = document.createElement('div');
          itemDiv.className = 'image-gallery-item';

          const imgElement = document.createElement('img');
          imgElement.src = img.url;
          imgElement.alt = img.alt || 'Image';
          imgElement.className = 'w-full h-full object-cover';

          itemDiv.appendChild(imgElement);
          gallery.appendChild(itemDiv);
        });
      } catch (error) {
        logError('Failed to parse gallery images:', error);
      }
    });
  }, [html]);

  return (
    <div
      ref={contentRef}
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
