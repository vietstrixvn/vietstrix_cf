/**
 * Property Type Component Props
 *
 * Props interfaces for property type components
 */

import type { PropertyType } from './responses';

// ============================================================================
// COMPONENT PROPS
// ============================================================================

/**
 * Props for TypeTable component
 */
export interface TypeTableProps {
  types: PropertyType[];
  isLoading: boolean;
  isError: boolean;
  refreshKey: () => void;
}
