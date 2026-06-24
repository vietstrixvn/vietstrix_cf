/**
 * Portfolio Category Module Exports
 *
 * Public API for category types
 */

// Domain models & enums
export { CategoryStatus } from './responses';
export type {
  Category,
  CategoryData,
  CategoryProp,
  // Deprecated
  CategoryResponse,
} from './responses';

// Response types
export type { FetchCategoriesResponse } from './type';

// Component props
export type { CategoryTableProps } from './prop';

// DTOs & Schemas
export type { CreateCategoryDTO, UpdateCategoryDTO } from './dto';

export { CreateCategorySchema, UpdateCategorySchema } from './dto';

// Table columns
export { CategoryColumns } from './colum';
