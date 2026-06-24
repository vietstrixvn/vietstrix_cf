/**
 * Portfolio Contact Component Props
 *
 * Props interfaces for contact-related components
 */

import type { Contact } from './responses';

// ============================================================================
// COMPONENT PROPS
// ============================================================================

/**
 * Props for ContactTable component
 */
export interface ContactTableProps {
  contacts: Contact[];
  isLoading: boolean;
  isError: boolean;
  refreshKey: () => void;
}
