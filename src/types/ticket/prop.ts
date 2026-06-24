import { TicketListData } from './responses';

export interface TicketTableProps {
  tickets: TicketListData[];
  isLoading: boolean;
  isError: boolean;
}

export const statusColors: Record<string, string> = {
  open: 'text-blue-600 bg-blue-100',
  in_progress: 'text-yellow-600 bg-yellow-100',
  resolved: 'text-green-600 bg-green-100',
  closed: 'text-gray-600 bg-gray-100',
  rejected: 'text-red-600 bg-red-100',
};

export const statusLabels: Record<string, string> = {
  open: 'Open',
  in_progress: 'In Progress',
  resolved: 'Resolved',
  closed: 'Closed',
  rejected: 'Rejected',
};

export const priorityColors: Record<string, string> = {
  high: 'text-red-600 bg-red-100',
  medium: 'text-orange-600 bg-orange-100',
  low: 'text-green-600 bg-green-100',
};
