export interface RolesResponse {
  id: string;
  title: string;
  description: string;
  is_system: boolean;
  created_at: Date | string;
  updated_at: Date | string;
}

export interface PermissionsResponse {
  id: string;
  action: string;
  description: string;
  created_at: Date | string;
  updated_at: Date | string;
}

export interface ResourcesResponse {
  id: string;
  title: string;
  description: string;
  created_at: Date | string;
  updated_at: Date | string;
}

export interface UserPermissionsResponse {
  id: string;
  user_id: string;
  permission_id: string;
  resource_id: string;
  granted_by: string;
  granted_at: Date | string;
  expires_at: Date | string;
  reason: string;
  permission: {
    id: string;
    action: string;
    description: string;
  };
  resource: {
    id: string;
    title: string;
    description: string;
  };
  created_at: Date | string;
  updated_at: Date | string;
}

export interface RolePermissionsResponse {
  resource: string;
  action: string;
  source: string;
}

export interface DirectPermissionsResponse {
  resource: string;
  action: string;
  source: string;
}

export interface UserEffectivePermissionsResponse {
  user_id: string;
  role_permissions: RolePermissionsResponse[];
  direct_permissions: DirectPermissionsResponse[];
}
