/**
 * Portfolio Contact Module Exports
 *
 * Public API for contact types
 */

// Domain models & constants
export { STATUS_CONFIG } from './responses';
export type {
  Contact,
  ContactStatsResponse,
  ContactStatsPeriod,
  ContactStatsGrowth,
  StatStatus,
  // Deprecated
  ContactResponse,
} from './responses';

// Response types
export type { FetchContactsResponse } from './type';

// Component props
export type { ContactTableProps } from './prop';

// DTOs & Schemas
export type { CreateContactDTO } from './dto';

export { CreateContactSchema } from './dto';

// Table columns
export { ContactColumns } from './colum';
