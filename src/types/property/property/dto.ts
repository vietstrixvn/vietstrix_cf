import { zodIsNotEmptyString } from '@/utils';
import z from 'zod';

export const CreatePropertyFormSchema = z.object({
  name: zodIsNotEmptyString('Property name cannot be blank'),
  subdomain: zodIsNotEmptyString('Subdomain cannot be blank'),
  description: z.string().optional(),
  email: z.string().email('Invalid email').or(z.literal('')).optional(),
  phone_number: z
    .string()
    .max(15)
    .regex(/^\d+$/, {
      message: 'Phone numbers can only contain digits.',
    })
    .or(z.literal(''))
    .optional(),
  map: z.string().optional(),
  image_url: z
    .string()
    .max(100, 'Image URLs must be a maximum of 100 characters.')
    .optional(),
  addresses: z.array(z.string()).optional(),
  domain: z
    .string()
    .max(255, 'Domain length is a maximum of 255 characters.')
    .optional(),
});

export type CreatePropertyDto = z.infer<typeof CreatePropertyFormSchema>;

export const UpdateGa4PropertyFormSchema = z.object({
  ga4_id: zodIsNotEmptyString('Ga4 id cannot be blank'),
});

export type UpdateGa4PropertyDto = z.infer<typeof UpdateGa4PropertyFormSchema>;

export const UpdateGtmPropertyFormSchema = z.object({
  gtm_id: zodIsNotEmptyString('Gtm id cannot be blank'),
});

export type UpdateGtmPropertyDto = z.infer<typeof UpdateGtmPropertyFormSchema>;

export const UpdateCorsSchema = z.object({
  origins: z.array(z.string().max(500)).optional(),
});

export type UpdateCorsDTO = z.output<typeof UpdateCorsSchema>;
