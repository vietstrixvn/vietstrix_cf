import { z } from 'zod';

// ==================== RECIPIENT ====================

export const CreateRecipientSchema = z.object({
  email: z.string().email('Invalid email'),
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  is_active: z.boolean().default(true),
});

export type CreateRecipientDTO = z.infer<typeof CreateRecipientSchema>;

export const UpdateRecipientSchema = CreateRecipientSchema.partial();

export type UpdateRecipientDTO = z.infer<typeof UpdateRecipientSchema>;

// ==================== TEMPLATE ====================

export const CreateTemplateSchema = z.object({
  name: z.string().min(1, 'Template name is required'),
  subject: z.string().min(1, 'Subject is required'),
  content: z.string().min(1, 'Content is required'),
  description: z.string().optional(),
  is_active: z.boolean().default(true),
});

export type CreateTemplateDTO = z.infer<typeof CreateTemplateSchema>;

export const UpdateTemplateSchema = CreateTemplateSchema.partial();

export type UpdateTemplateDTO = z.infer<typeof UpdateTemplateSchema>;

// ==================== SEND MAIL ====================

export const SendMailSchema = z.object({
  to: z.string().email('Invalid recipient email'),
  subject: z.string().min(1, 'Subject is required'),
  content: z.string().min(1, 'Content is required'),
});

export type SendMailDTO = z.infer<typeof SendMailSchema>;
