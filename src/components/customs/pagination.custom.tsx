'use client';

import { PaginationProps } from '@/types';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../ui';

const getPageNumbers = (
  currentPage: number,
  totalPage: number
): (number | 'ellipsis')[] => {
  if (totalPage <= 4) {
    return Array.from({ length: totalPage }, (_, i) => i + 1);
  }

  // Always show: first, last, current, and neighbors
  const pages: (number | 'ellipsis')[] = [];

  const showLeftEllipsis = currentPage > 3;
  const showRightEllipsis = currentPage < totalPage - 2;

  pages.push(1);

  if (showLeftEllipsis) {
    pages.push('ellipsis');
  }

  // Pages around current
  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPage - 1, currentPage + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (showRightEllipsis) {
    pages.push('ellipsis');
  }

  pages.push(totalPage);

  return pages;
};

export const CustomPagination = ({
  currentPage,
  totalPage,
  onPageChange,
}: PaginationProps) => {
  if (totalPage <= 1) return null;

  const pages = getPageNumbers(currentPage, totalPage);

  return (
    <div className="flex justify-center items-center scroll mt-4">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
              aria-disabled={currentPage === 1}
              className="text-main"
            />
          </PaginationItem>

          {pages.map((page, index) =>
            page === 'ellipsis' ? (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={page}>
                <PaginationLink
                  isActive={currentPage === page}
                  onClick={() => onPageChange(page)}
                  className={
                    currentPage === page
                      ? 'border-2 bg-main text-main font-bold border-main hover:bg-main-50 hover:border-main-600 px-4'
                      : 'border-2 bg-gray-50 text-gray-600 border-main-300 hover:bg-main hover:border-main px-4'
                  }
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            )
          )}

          <PaginationItem>
            <PaginationNext
              onClick={() => onPageChange(Math.min(currentPage + 1, totalPage))}
              aria-disabled={currentPage === totalPage}
              className="text-main"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
