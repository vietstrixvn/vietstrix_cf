import z from 'zod';

export const UpdateTicketFormSchema = z.object({
  status: z.enum(['open', 'in_progress', 'resolved', 'closed'], {
    message: 'Status must be one of: open, in_progress, resolved, closed',
  }),
  response: z.string().min(1, 'Response is required'),
});

export type UpdateTicketDTO = z.infer<typeof UpdateTicketFormSchema>;
