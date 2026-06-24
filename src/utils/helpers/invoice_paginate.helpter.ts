import { InvoiceItem } from "@/types";

export const PAGE_CONTENT_HEIGHT = 1003; // 1123 - 60 top - 60 bottom
export const PAGE1_HEADER_HEIGHT = 380; // header + parties + sectionTitle + tableHead
export const ROW_HEIGHT = 44; // chiều cao trung bình 1 item row (8+8 padding + 2 lines ~28)
export const FOOTER_SUMMARY_HEIGHT = 320; // notes+totals + bank + signature + footer

export function paginateItems<T = InvoiceItem >(
  items: T[]
): T[][] {
  if (items.length === 0) return [[]];

  const availPage1 =
    PAGE_CONTENT_HEIGHT - PAGE1_HEADER_HEIGHT - FOOTER_SUMMARY_HEIGHT;
  const availRest = PAGE_CONTENT_HEIGHT - FOOTER_SUMMARY_HEIGHT - 40; // 40 = table header only

  // Nếu toàn bộ items vừa trang 1 → 1 page duy nhất
  const maxPage1 = Math.max(1, Math.floor(availPage1 / ROW_HEIGHT));
  const maxRest = Math.max(1, Math.floor(availRest / ROW_HEIGHT));

  const pages: T[][] = [];
  const remaining = [...items];

  // Page 1
  pages.push(remaining.splice(0, maxPage1));

  // Page 2+
  while (remaining.length > 0) {
    pages.push(remaining.splice(0, maxRest));
  }

  return pages;
}
