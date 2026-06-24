import { zodIsNotEmptyString } from '@/utils';
import { z } from 'zod';

export const loginFormSchema = z.object({
  username: zodIsNotEmptyString('Username could not be trống.'),

  password: zodIsNotEmptyString('Password cannot be left blank.').refine(
    (val) => val.length >= 8,
    {
      message: 'Password must have at least 8 characters.',
    }
  ),
});

export const CreateManagerFormSchema = z
  .object({
    username: zodIsNotEmptyString('Username cannot be blank'),
    email: zodIsNotEmptyString('Email cannot be blank'),
    first_name: zodIsNotEmptyString('First name cannot be blank'),
    last_name: zodIsNotEmptyString('Last name cannot be blank'),
    password: zodIsNotEmptyString('Password cannot be blank').refine(
      (val) => val.length >= 8,
      {
        message: 'Password must have at least 8 characters.',
      }
    ),
    confirmPassword: zodIsNotEmptyString('Confirm password cannot be blank'),
    phone_number: z
      .string()
      .max(15)
      .regex(/^\d+$/, {
        message: 'Phone numbers can only contain digits.',
      })
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: `Password doesn't match.`,
    path: ['confirmPassword'],
  });

export type CreateManagerDto = z.infer<typeof CreateManagerFormSchema>;

export const activeUserSchema = z.object({
  user_ids: z
    .array(z.string())
    .min(1, 'At least one user must be selected.')
    .optional(),
});

export type ActiveUserDto = z.infer<typeof activeUserSchema>;

export const UpdateAvatarSchema = z.object({
  avatar_id: zodIsNotEmptyString('Avatar cannot be blank.'),
});

export type UpdateAvatarDTO = z.infer<typeof UpdateAvatarSchema>;

export const UpdateProfileSchema = z.object({
  first_name: zodIsNotEmptyString(
    'First and middle names cannot be left blank.'
  ),
  last_name: zodIsNotEmptyString('Last name cannot be left blank.  '),
  phone_number: z
    .string()
    .max(15)
    .regex(/^\d+$/, {
      message: 'Phone numbers can only contain digits.',
    })
    .optional(),
});

export type UpdateProfileDTO = z.infer<typeof UpdateProfileSchema>;

export const ForgotSchema = z.object({
  email: zodIsNotEmptyString('Email cannot be blank'),
});

export type ForgotPasswordDTO = z.infer<typeof ForgotSchema>;

export const CreateUserFormSchema = z
  .object({
    username: z.string().trim().min(1, 'Username cannot be blank'),
    email: z.string().trim().min(1, 'Email cannot be blank'),
    first_name: z.string().trim().min(1, 'First name cannot be blank'),
    last_name: z.string().trim().min(1, 'Last name cannot be blank'),
    role_ids: z.array(z.string()).min(1, 'At least one role must be selected'),

    password: z
      .string()
      .trim()
      .min(8, 'Password must have at least 8 characters.')
      .nullable()
      .optional(),

    confirmPassword: z.string().trim().optional().nullable(),

    phone_number: z
      .string()
      .max(15)
      .regex(/^\d+$/, {
        message: 'Phone numbers can only contain digits.',
      })
      .optional(),
  })
  .refine(
    (data) => {
      // nếu có password thì mới check confirm
      if (data.password) {
        return data.password === data.confirmPassword;
      }
      return true;
    },
    {
      message: `Password doesn't match.`,
      path: ['confirmPassword'],
    }
  );
// Type for form (includes confirmPassword)
export type CreateUserFormDto = z.infer<typeof CreateUserFormSchema>;

// Type for API request (excludes confirmPassword)
export type CreateUserDto = Omit<CreateUserFormDto, 'confirmPassword'>;

// Activation DTO
export const ActivateAccountSchema = z
  .object({
    token: z.string().min(1, 'Token is required'),
    password: z
      .string()
      .trim()
      .min(8, 'Password must have at least 8 characters.'),
    confirmPassword: z.string().trim().min(1, 'Confirm password is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: `Password doesn't match.`,
    path: ['confirmPassword'],
  });

export type ActivateAccountDto = z.infer<typeof ActivateAccountSchema>;

export const ChangePasswordFormSchema = z
  .object({
    new_password: z
      .string()
      .min(1, 'Password cannot be blank')
      .min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Confirm password cannot be blank'),
    old_password: z
      .string()
      .min(1, 'Password cannot be blank')
      .min(8, 'Password must be at least 8 characters'),
  })
  .refine((data) => data.new_password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type ChangePasswordDTO = z.infer<typeof ChangePasswordFormSchema>;

// API request type (only old and new password)
export interface ChangePasswordRequest {
  old_password: string;
  new_password: string;
}

// API response type
export interface ChangePasswordResponse {
  success: boolean;
  message: string;
}

export const ResetPasswordFormSchema = z
  .object({
    new_password: z
      .string()
      .min(1, 'Password cannot be blank')
      .min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Confirm password cannot be blank'),
  })
  .refine((data) => data.new_password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type ResetPasswordDTO = z.infer<typeof ResetPasswordFormSchema>;

export const CreateRoleFormSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  description: z.string().max(200).optional(),
  is_system: z.boolean().default(false),
});

export type CreateRoleDTO = z.infer<typeof CreateRoleFormSchema>;

export const UpdateRoleFormSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  description: z.string().max(200).optional(),
});

export type UpdateRoleDTO = z.infer<typeof UpdateRoleFormSchema>;

export const AssignPermissionFormSchema = z.object({
  permission_ids: z
    .array(z.string())
    .min(1, 'At least one permission must be selected.')
    .optional(),
});

export type AssignPermissionDTO = z.infer<typeof AssignPermissionFormSchema>;

export const AssignUserFormSchema = z.object({
  user_id: z.string().min(1, 'User Id is required').max(100),
  role_id: z.string().min(1, 'Title is required').max(100),
});

export type AssignUserDTO = z.infer<typeof AssignUserFormSchema>;

export const CreatePermissionFormSchema = z.object({
  resource_id: z.string().min(1, 'Resource Id is required').max(100),
  action: z.enum(['create', 'read', 'update', 'delete', 'suspend'], {
    message: 'Status must be one of: create ,read, update, delete, suspend',
  }),
});

export type CreatePermissionDTO = z.infer<typeof CreatePermissionFormSchema>;

export const CreaetResourceFormSchema = z.object({
  title: z.string().min(1, 'User Id is required').max(100),
  description: z.string().min(1, 'Title is required').max(100),
});

export type CreaetResourceDTO = z.infer<typeof CreaetResourceFormSchema>;

export const GrantPermissionFormSchema = z.object({
  user_id: z.string().min(1, 'User Id is required').max(100),
  permission_id: z.string().min(1, 'Title is required').max(100),
});

export type GrantPermissionDTO = z.infer<typeof GrantPermissionFormSchema>;

export const CheckUserPermissionFormSchema = z.object({
  user_id: z.string().min(1, 'User Id is required').max(100),
  permission_id: z.string().min(1, 'Title is required').max(100),
});

export type CheckUserPermissionDTO = z.infer<
  typeof CheckUserPermissionFormSchema
>;
