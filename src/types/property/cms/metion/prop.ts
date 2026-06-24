import { MentionResponse } from './responese';

export interface MentionTableProps {
  mentions: MentionResponse[];
  isLoading: boolean;
  isError: boolean;
  refreshKey: () => void;
}

export interface UpdateMentionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mention: MentionResponse | null;
}
