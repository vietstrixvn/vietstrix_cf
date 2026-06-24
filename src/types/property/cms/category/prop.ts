import { CategoryResponse } from './responese';

export interface CategoryTableProps {
  categories: CategoryResponse[];
  isLoading: boolean;
  isError: boolean;
  refreshKey: () => void;
}
