/**
 * Cắt ngắn đoạn text dài quá maxLength, thêm dấu ... nếu cần
 * @param text Chuỗi gốc
 * @param maxLength Độ dài tối đa được hiển thị
 * @returns Text đã cắt ngắn
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '...';
}

function decodeHtmlEntities(str: string): string {
  return str.replace(/&[a-zA-Z0-9#x]+;/g, (match) => {
    switch (match) {
      case '&amp;': return '&';
      case '&lt;': return '<';
      case '&gt;': return '>';
      case '&quot;': return '"';
      case '&apos;':
      case '&#39;': return "'";
      case '&nbsp;': return ' ';
      case '&ndash;': return '–';
      case '&mdash;': return '—';
    }
    if (match.startsWith('&#')) {
      const isHex = match.charAt(2).toLowerCase() === 'x';
      const numStr = isHex ? match.slice(3, -1) : match.slice(2, -1);
      const code = parseInt(numStr, isHex ? 16 : 10);
      if (!isNaN(code)) {
        return String.fromCharCode(code);
      }
    }
    return match;
  });
}

export function truncateHtmlToText(html: string, maxLength: number): string {
  if (!html) return '';
  // Strip HTML tags and decode entities uniformly on both server and client
  const text = decodeHtmlEntities(html.replace(/<[^>]*>/g, ''));
  return text.length > maxLength
    ? text.slice(0, maxLength).trim() + '...'
    : text;
}

