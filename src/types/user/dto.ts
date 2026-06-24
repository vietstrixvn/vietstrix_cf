import z from 'zod';

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
