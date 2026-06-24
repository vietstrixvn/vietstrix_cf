import type { JournalEntry } from '@/types';

/**
 * Export one or more JournalEntry records into the standard XLS template.
 * Columns match the template: JE NUMBER | Fund | Loc | Dept. | Object | Activity | Debit | Credit | Description
 */
export async function exportJournalToXls(
  entries: JournalEntry[],
  filename = 'journal-entries.xlsx'
) {
  const XLSX = await import('xlsx');

  // Build rows directly — skip broken template parsing (BIFF8 binary not reliable in browser)
  const header = [
    'JE NUMBER',
    'Fund',
    'Loc',
    'Dept.',
    'Object',
    'Activity',
    'Debit',
    'Credit',
    'Description',
  ];

  const rows: (string | number)[][] = [header];

  for (const entry of entries) {
    for (const line of entry.lines) {
      rows.push([
        entry.entry_number,
        '',
        '',
        '',
        line.account_code,
        '',
        line.debit_amount > 0 ? line.debit_amount : '',
        line.credit_amount > 0 ? line.credit_amount : '',
        line.description || entry.notes || '',
      ]);
    }
  }

  const ws = XLSX.utils.aoa_to_sheet(rows);

  // Column widths
  ws['!cols'] = [
    { wch: 18 }, // JE NUMBER
    { wch: 8 }, // Fund
    { wch: 8 }, // Loc
    { wch: 8 }, // Dept.
    { wch: 12 }, // Object
    { wch: 12 }, // Activity
    { wch: 16 }, // Debit
    { wch: 16 }, // Credit
    { wch: 40 }, // Description
  ];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Journal Entry');

  XLSX.writeFile(wb, filename);
}
