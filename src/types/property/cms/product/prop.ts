import { ProductResponse } from './responese';

export interface ProductTableProps {
  products: ProductResponse[];
  isLoading: boolean;
  isError: boolean;
  refreshKey: () => void;
}
