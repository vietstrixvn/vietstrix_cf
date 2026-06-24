import { PaginationData } from '@/types';
import { ProductResponse } from './responese';

export interface FetchProductsResponse {
  pagination: PaginationData;
  results: ProductResponse[];
}
