import { zodIsNotEmptyString } from '@/utils';
import z from 'zod';

export const CreateUserPropertyFormSchema = z
  .object({
    username: zodIsNotEmptyString('Username cannot be blank'),
    email: zodIsNotEmptyString('Email cannot be blank'),
    first_name: zodIsNotEmptyString('First name cannot be blank'),
    last_name: zodIsNotEmptyString('Last name cannot be blank'),
    role: zodIsNotEmptyString('Role cannot be blank'),

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
export type CreateUserPropertyFormDto = z.infer<
  typeof CreateUserPropertyFormSchema
>;

// Type for API request (excludes confirmPassword)
export type CreateUserPropertyDto = Omit<
  CreateUserPropertyFormDto,
  'confirmPassword'
>;
