import type { PaginatedResponse } from '../base/base.type';
import type {
  PermissionsResponse,
  ResourcesResponse,
  RolesResponse,
} from './rbac';
import type { LoginHistoryResponse, SessionResponse } from './responses';

export type FetchLoginHistoryListResponse =
  PaginatedResponse<LoginHistoryResponse>;

export type FetchSessionListResponse = PaginatedResponse<SessionResponse>;

export type FetchRoleListResponse = PaginatedResponse<RolesResponse>;

export type FetchPermissionListResponse =
  PaginatedResponse<PermissionsResponse>;

export type FetchResourcesListResponse = PaginatedResponse<ResourcesResponse>;
