/**
 * Ticket Module Type Definitions
 *
 * Domain models and interfaces for ticket/support system
 */

import type { TicketImageProp } from '../media/responses';

/**
 * Ticket - Support ticket information
 */
export interface Ticket {
  id: string;
  title: string;
  description: string;
  service: string;
  type: string;
  full_name: string;
  email: string;
  status: string;
  priority: boolean;
  response: string;
  images: TicketImageProp[];
  property_id: string;
  created_by: string;
  updated_by: string;
  created_at: Date | string;
  updated_at: Date | string;
}

/**
 * @deprecated Use Ticket instead
 */
export type TicketListData = Ticket;
