import { logError } from './logger.util';

/**
 * Pre-processes and enriches TiPTap HTML content on the server:
 * 1. Generates and inserts unique, SEO-friendly IDs for all headings (h1-h6) for TOC.
 * 2. Parses and expands `<div data-type="image-gallery">` structures into static responsive markup,
 *    allowing images to be fully indexed by search engines and displayed without layout shifts.
 */
export function enrichHtmlContent(html: string): string {
  if (!html) return '';

  let processedHtml = html;

  // 1. Add IDs to headings (h1-h6)
  const usedIds = new Set<string>();
  let headingIndex = 0;

  processedHtml = processedHtml.replace(
    /<(h[1-6])([^>]*)>(.*?)<\/\1>/gi,
    (match, tag, attrs, content) => {
      // Check if ID already exists
      const idMatch = attrs.match(/id="([^"]*)"/i);
      if (idMatch) {
        usedIds.add(idMatch[1]);
        return match;
      }

      // Strip inner tags to get pure text content for ID creation
      const text = content.replace(/<[^>]*>/g, '').trim();
      if (!text) return match;

      let id = text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[đĐ]/g, 'd')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();

      if (!id) {
        id = `heading-${headingIndex}`;
      }

      if (usedIds.has(id)) {
        id = `${id}-${headingIndex}`;
      }

      usedIds.add(id);
      headingIndex++;

      return `<${tag}${attrs} id="${id}">${content}</${tag}>`;
    }
  );

  // 2. Expand image galleries
  processedHtml = processedHtml.replace(
    /<div([^>]*data-type="image-gallery"[^>]*)>\s*<\/div>/gi,
    (match, attrsGroup) => {
      const imagesMatch = attrsGroup.match(/data-images="([^"]*)"/i);
      const layoutMatch = attrsGroup.match(/data-layout="([^"]*)"/i);

      if (!imagesMatch) return match;

      try {
        const decodedJson = imagesMatch[1]
          .replace(/&quot;/g, '"')
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&#39;/g, "'");

        const images = JSON.parse(decodedJson);
        if (!Array.isArray(images) || images.length === 0) return match;

        const layout = layoutMatch ? layoutMatch[1] : '2x2';
        const layoutClass =
          layout === '2x1' ? 'image-gallery-2x1' : 'image-gallery-2x2';

        const imagesHtml = images
          .map((img: any) => {
            const imgUrl = img.url || '';
            const imgAlt = img.alt || 'Gallery Image';
            return `<div class="image-gallery-item"><img src="${imgUrl}" alt="${imgAlt}" class="w-full h-full object-cover" loading="lazy" /></div>`;
          })
          .join('');

        let newAttrs = attrsGroup;
        const classMatch = attrsGroup.match(/class="([^"]*)"/i);
        if (classMatch) {
          const existingClasses = classMatch[1];
          newAttrs = attrsGroup.replace(
            /class="[^"]*"/i,
            `class="${existingClasses} image-gallery ${layoutClass}"`
          );
        } else {
          newAttrs = `${attrsGroup} class="image-gallery ${layoutClass}"`;
        }

        return `<div ${newAttrs}>${imagesHtml}</div>`;
      } catch (error) {
        logError('[enrichHtmlContent] Failed to parse gallery images:', error);
        return match;
      }
    }
  );

  return processedHtml;
}
