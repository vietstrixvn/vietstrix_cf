/**
 * Strips all non-numeric characters except decimal separator.
 * Returns raw number string ready for parseFloat.
 */
export function stripFormatting(value: string): string {
  return value.replace(/[^\d.]/g, '');
}

/**
 * Parses a formatted or raw string into a number.
 * Returns NaN if invalid.
 */
export function parseCurrencyValue(value: string): number {
  const raw = stripFormatting(value);
  if (!raw || raw === '.') return NaN;
  return parseFloat(raw);
}

/**
 * Formats a number or string as currency string.
 * Uses Intl.NumberFormat — zero GC overhead, native speed.
 *
 * @example
 *   formatCurrency(1234567.89)       // "1.234.567,89"  (vi-VN, VND)
 *   formatCurrency("1234567.89", "en-US", "USD") // "$1,234,567.89"
 *   formatCurrency(1234567.89, "en-US", "USD") // "$1,234,567.89"
 */
export function formatCurrency(
  value: number | string,
  locale = 'vi-VN',
  currency = 'VND'
): string {
  // Convert string to number if needed
  const numValue = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(numValue)) return '';

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: currency === 'VND' ? 0 : 2,
    maximumFractionDigits: currency === 'VND' ? 0 : 2,
  }).format(numValue);
}

/**
 * Formats with grouping separators only (no currency symbol).
 * Use this for the "display while editing" state.
 *
 * @example
 *   formatNumber(1234567) // "1.234.567" (vi-VN)
 */
export function formatNumber(value: number, locale = 'vi-VN'): string {
  if (isNaN(value)) return '';
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Normalises a raw keystroke string:
 *  - Allows digits, one leading minus, one decimal point
 *  - Strips everything else immediately (before React re-render)
 *
 * Called on every onChange so the displayed value stays clean
 * without triggering a full Intl format on every keystroke.
 */
export function sanitiseRawInput(value: string): string {
  let s = value.replace(/[^\d.-]/g, '');
  const parts = s.split('.');
  if (parts.length > 2) s = parts[0] + '.' + parts.slice(1).join('');
  const dotIdx = s.indexOf('.');
  if (dotIdx > -1) {
    s = s.slice(0, dotIdx + 1) + s.slice(dotIdx + 1).replace(/\./g, '');
  }
  if (s.startsWith('-')) {
    s = '-' + s.slice(1).replace(/-/g, '');
  }
  return s;
}
