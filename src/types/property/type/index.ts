/**
 * Property Type Module Exports
 *
 * Public API for property type types
 */

// Domain models
export type {
  PropertyType,
  TypeProp,
  PropertyStat,
  // Deprecated
  TypeResponse,
} from './responses';

// Response types
export type { FetchTypesResponse } from './type';

// Component props
export type { TypeTableProps } from './prop';

// Table columns
export { TypeColumns } from './colum';
