import { TagResponse } from './responese';

export interface TagTableProps {
  tags: TagResponse[];
  isLoading: boolean;
  isError: boolean;
  refreshKey: () => void;
}

export interface CreateTagFormProps {
  onSuccess?: () => void;
}
