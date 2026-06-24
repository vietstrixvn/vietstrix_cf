/**
 * Convert datetime-local input value to ISO 8601 format with UTC timezone
 * Backend expects: "YYYY-MM-DDTHH:mm:ssZ" (with Z for UTC)
 *
 * @param datetimeLocal - String from datetime-local input (YYYY-MM-DDTHH:mm)
 * @param isEndDate - If true, set time to 23:59:59, otherwise 00:00:00
 * @returns ISO 8601 string with UTC timezone (YYYY-MM-DDTHH:mm:ssZ)
 *
 * Examples:
 * - datetimeLocalToISO("2026-11-20T00:00", false) => "2026-11-20T00:00:00Z"
 * - datetimeLocalToISO("2026-11-30T23:59", true) => "2026-11-30T23:59:59Z"
 */
export function datetimeLocalToISO(
  datetimeLocal: string,
  isEndDate: boolean = false
): string {
  if (!datetimeLocal) {
    return new Date().toISOString();
  }

  // Parse the datetime-local value (YYYY-MM-DDTHH:mm)
  const [datePart, timePart] = datetimeLocal.split('T');

  if (!datePart) {
    throw new Error(`Invalid date format: ${datetimeLocal}`);
  }

  // If no time part, use 00:00 or 23:59 depending on isEndDate
  const time = timePart || (isEndDate ? '23:59' : '00:00');

  // For end dates, use 23:59:59, for start dates use 00:00:00
  const seconds = isEndDate ? '59' : '00';

  // Construct ISO 8601 format WITH UTC timezone: YYYY-MM-DDTHH:mm:ssZ
  const isoString = `${datePart}T${time}:${seconds}Z`;

  // Validate the date
  const date = new Date(isoString);
  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date format: ${datetimeLocal}`);
  }

  return isoString;
}

/**
 * Convert ISO 8601 string to datetime-local input value
 * @param isoString - ISO 8601 string (with or without timezone)
 * @returns String for datetime-local input (YYYY-MM-DDTHH:mm)
 */
export function isoToDatetimeLocal(isoString: string): string {
  if (!isoString) {
    return '';
  }

  try {
    const date = new Date(isoString);

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return '';
    }

    // Format: YYYY-MM-DDTHH:mm (local time)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  } catch  {
    return '';
  }
}
