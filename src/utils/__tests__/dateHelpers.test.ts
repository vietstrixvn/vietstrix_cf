import { datetimeLocalToISO, isoToDatetimeLocal } from '../dateHelpers';

describe('dateHelpers', () => {
  describe('datetimeLocalToISO', () => {
    it('should convert start date correctly', () => {
      const result = datetimeLocalToISO('2026-11-20T00:00', false);
      expect(result).toBe('2026-11-20T00:00:00Z');
    });

    it('should convert end date correctly', () => {
      const result = datetimeLocalToISO('2026-11-30T23:59', true);
      expect(result).toBe('2026-11-30T23:59:59Z');
    });

    it('should handle date without time for start date', () => {
      const result = datetimeLocalToISO('2026-11-20', false);
      expect(result).toBe('2026-11-20T00:00:00Z');
    });

    it('should handle date without time for end date', () => {
      const result = datetimeLocalToISO('2026-11-30', true);
      expect(result).toBe('2026-11-30T23:59:59Z');
    });

    it('should return current date ISO string for empty input', () => {
      const result = datetimeLocalToISO('', false);
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
    });
  });

  describe('isoToDatetimeLocal', () => {
    it('should convert ISO string to datetime-local format', () => {
      const result = isoToDatetimeLocal('2026-11-20T00:00:00Z');
      expect(result).toBe('2026-11-20T00:00');
    });

    it('should handle empty string', () => {
      const result = isoToDatetimeLocal('');
      expect(result).toBe('');
    });

    it('should handle invalid date', () => {
      const result = isoToDatetimeLocal('invalid-date');
      expect(result).toBe('');
    });
  });
});
