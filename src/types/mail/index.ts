// Entities
export * from './responses';

// Fetch response types
export type {
  FetchRecipientsResponse,
  FetchTemplatesResponse,
  FetchMailLogsResponse,
  RecipientResponse,
  TemplateResponse,
  MailLogResponse,
  SendMailResponse,
} from './type';

// DTO types
export type {
  CreateRecipientDTO,
  UpdateRecipientDTO,
  CreateTemplateDTO,
  UpdateTemplateDTO,
  SendMailDTO,
} from './dto';

// Schemas
export {
  CreateRecipientSchema,
  UpdateRecipientSchema,
  CreateTemplateSchema,
  UpdateTemplateSchema,
  SendMailSchema,
} from './dto';
