/**
 * Property User Module Exports
 *
 * Public API for property user types
 */

// Domain models
export type {
  PropertyUser,
  CreateUserPropertyResponse,
  // Deprecated
  UserListData,
} from './responses';

// Response types
export type { FetchUsersPropertyResponse } from './type';

// Component props
export type {
  UserTableProps,
  UserPropertyTableProps,
  CreateUserPropertyProps,
} from './prop';

export { CreateUserPropertyFormSchema } from './dto';
