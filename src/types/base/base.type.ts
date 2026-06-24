/**
 * Base Type Definitions
 *
 * Core types used across the entire application.
 * All modules should import from here to maintain consistency.
 */

// ============================================================================
// API RESPONSE WRAPPERS
// ============================================================================

/**
 * Standard API response wrapper
 * Used for all API endpoints
 */
export interface ApiResponse<T> {
  success: boolean;
  code: number;
  message: string;
  data: T;
}

/**
 * @deprecated Use ApiResponse instead
 */
export interface BaseResponse<T = any> {
  success: boolean;
  code: number;
  message: string;
  data: T;
}

// ============================================================================
// PAGINATION
// ============================================================================

/**
 * Pagination metadata
 */
export interface PaginationData {
  current_page: number;
  page_size: number;
  total_pages: number;
  total_records: number;
  has_next: boolean;
  has_prev: boolean;
}

/**
 * Paginated data structure
 * Contains results array and pagination metadata
 */
export interface PaginatedData<T> {
  results: T[];
  pagination: PaginationData;
}

// ============================================================================
// GENERIC TYPE UTILITIES
// ============================================================================

/**
 * Generic paginated response wrapper
 * Usage: PaginatedResponse<User>
 */
export type PaginatedResponse<T> = ApiResponse<PaginatedData<T>>;

/**
 * Generic single item response wrapper
 * Usage: SingleResponse<User>
 */
export type SingleResponse<T> = ApiResponse<T>;

/**
 * Generic list response wrapper (without pagination)
 * Usage: ListResponse<User>
 */
export type ListResponse<T> = ApiResponse<T[]>;

// ============================================================================
// FILTERS
// ============================================================================

/**
 * Generic filter parameters for API requests
 */
export interface Filters {
  [key: string]: string | number | string[] | undefined;
}

// ============================================================================
// UI TYPES
// ============================================================================

export interface NavItem {
  title: string;
  url: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface TocItem {
  id: string;
  label: string;
  level: number;
  children?: TocItem[];
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type NonReadonly<T> = {
  -readonly [P in keyof T]: T[P] extends object ? NonReadonly<T[P]> : T[P];
};
