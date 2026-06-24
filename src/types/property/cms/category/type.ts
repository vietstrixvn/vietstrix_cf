import { PaginationData } from '@/types';
import { CategoryResponse } from './responese';

export interface FetchCategoriesResponse {
  pagination: PaginationData;
  results: CategoryResponse[];
}
