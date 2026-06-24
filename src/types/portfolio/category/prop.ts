/**
 * Portfolio Category Component Props
 *
 * Props interfaces for category-related components
 */

import type { Category } from './responses';

// ============================================================================
// COMPONENT PROPS
// ============================================================================

/**
 * Props for CategoryTable component
 */
export interface CategoryTableProps {
  categories: Category[];
  isLoading: boolean;
  isError: boolean;
  refreshKey: () => void;
}
