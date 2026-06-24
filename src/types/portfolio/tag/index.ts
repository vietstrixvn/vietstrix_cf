/**
 * Portfolio Tag Module Exports
 *
 * Public API for tag types
 */

// Domain models
export type {
  Tag,
  TagProp,
  // Deprecated
  TagResponse,
} from './responses';

// Response types
export type { FetchTagsResponse } from './type';

// Component props
export type { TagTableProps } from './prop';

// DTOs & Schemas
export type { CreateTagDTO, UpdateTagDTO } from './dto';

export { CreateTagSchema, UpdateTagSchema } from './dto';

// Table columns
export { TagColumns } from './colum';
