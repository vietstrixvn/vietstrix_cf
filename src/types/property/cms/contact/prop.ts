/**
 * ==========================
 * 📌 @props ContactTableProps
 * ==========================
 */

import { ContactResponse } from './responese';

export interface ContactTableProps {
  contacts: ContactResponse[];
  isLoading: boolean;
  isError: boolean;
  refreshKey: () => void;
}
