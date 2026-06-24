import { z } from 'zod';

export const CreateContactSchema = z.object({
  full_name: z.string().min(1, 'Name is required').max(100),
  post_id: z.string().max(50).optional(),
  message: z.string().min(1, 'Message is required').max(1000),
  phone_number: z.string().min(1, 'Phone number is required').max(100),
  email: z.string().min(1, 'Mail is required').max(100),
  captcha_token: z.string().min(1, 'Captcha token is required'),
});

export type CreateContactDTO = z.infer<typeof CreateContactSchema>;

export const approveContactSchema = z.object({
  ids: z
    .array(z.string())
    .min(1, 'At least one user must be selected.')
    .optional(),
  status: z.string().min(1, 'Action is required.'),
});

export type ApproveContactDto = z.infer<typeof approveContactSchema>;
