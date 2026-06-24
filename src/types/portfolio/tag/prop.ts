/**
 * Portfolio Tag Component Props
 *
 * Props interfaces for tag-related components
 */

import type { Tag } from './responses';

// ============================================================================
// COMPONENT PROPS
// ============================================================================

/**
 * Props for TagTable component
 */
export interface TagTableProps {
  tags: Tag[];
  isLoading: boolean;
  isError: boolean;
  refreshKey: () => void;
}
