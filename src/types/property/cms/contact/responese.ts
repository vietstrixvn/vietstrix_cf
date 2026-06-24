export interface ContactResponse {
  id: string;
  email: string;
  post_id: string;
  full_name: string;
  message: string;
  phone_number: string;
  status: string;
  created_at: Date | string;
  updated_at: Date | string;
}

export interface ContactStatsResponse {
  total_contacts: number;
  pending_contacts: number;
  approved_contacts: number;
  rejected_contacts: number;
  period?: ContactStatsPeriod; // Optional - chỉ có khi có filter
  growth?: ContactStatsGrowth; // Optional - chỉ có khi có filter
}

export interface ContactStatsPeriod {
  start_date: string;
  end_date: string;
  label: string; // e.g., "Q1 2024", "January 2024", "2024"
}

export interface ContactStatsGrowth {
  total_change: number;
  total_percentage: number;
  pending_change: number;
  pending_percentage: number;
  approved_change: number;
  approved_percentage: number;
  rejected_change: number;
  rejected_percentage: number;
}

export type StatStatus = 'total' | 'pending' | 'approved' | 'rejected';

export const STATUS_CONFIG: Record<
  StatStatus,
  { label: string; color: string; bg: string; iconColor: string }
> = {
  total: {
    label: 'Total',
    color: '#378ADD',
    bg: '#E6F1FB',
    iconColor: '#185FA5',
  },
  pending: {
    label: 'Pending',
    color: '#EF9F27',
    bg: '#FAEEDA',
    iconColor: '#854F0B',
  },
  approved: {
    label: 'Approved',
    color: '#639922',
    bg: '#EAF3DE',
    iconColor: '#3B6D11',
  },
  rejected: {
    label: 'Rejected',
    color: '#E24B4A',
    bg: '#FCEBEB',
    iconColor: '#A32D2D',
  },
};
