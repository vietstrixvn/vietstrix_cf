import { LoginHistoryResponse } from './responses';

export interface HistoryTableProps {
  histories: LoginHistoryResponse[];
  isLoading: boolean;
  isError: boolean;
}
