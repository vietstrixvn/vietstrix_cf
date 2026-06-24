/**
 * Property User Component Props
 *
 * Props interfaces for property user components
 */

import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import type { PropertyUser } from './responses';
import type { CreateUserPropertyFormSchema } from './dto';
import type z from 'zod';

// ============================================================================
// COMPONENT PROPS
// ============================================================================

/**
 * Props for UserTable component
 */
export interface UserTableProps {
  users: PropertyUser[];
  isLoading: boolean;
  isError: boolean;
  refreshKey?: () => void;
}

/**
 * Props for UserPropertyTable component
 */
export interface UserPropertyTableProps {
  users: PropertyUser[];
  isLoading: boolean;
  isError: boolean;
}

/**
 * Props for CreateUserProperty component
 */
export interface CreateUserPropertyProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  register: UseFormRegister<z.infer<typeof CreateUserPropertyFormSchema>>;
  setValue: (name: any, value: any) => void;
  errors: FieldErrors<z.infer<typeof CreateUserPropertyFormSchema>>;
  isPending: boolean;
}
