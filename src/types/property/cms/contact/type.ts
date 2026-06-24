import { PaginationData } from '@/types';
import { ContactResponse } from './responese';

export interface FetchContactsResponse {
  pagination: PaginationData;
  results: ContactResponse[];
}
