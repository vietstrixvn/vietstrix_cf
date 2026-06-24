/**
 * Property Component Props
 *
 * Props interfaces for property components
 */

import type { PropertyCors, Property } from './responses';

// ============================================================================
// COMPONENT PROPS
// ============================================================================

/**
 * Props for PropertyList component
 */
export interface PropertyListProps {
  properties: Property[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onDeactivate?: (id: string) => void;
}

/**
 * Props for PropertyGroupCard component
 */
export interface PropertyGroupCardProps extends Property {
  isExpanded: boolean;
  onToggle: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onDeactivate?: (id: string) => void;
}

/**
 * Props for CorsConfigCard component
 */
export interface CorsConfigCardProps extends PropertyCors {
  onAdd?: () => void;
  onEdit?: (origin: string, index: number) => void;
  onDelete?: (origin: string, index: number) => void;
}
