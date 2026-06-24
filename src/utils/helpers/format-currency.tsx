import type { SupportedCurrencies, SupportedLanguages } from '@/schema';
import { logError } from '../logger.util';

export function formastCurrency({
  amount,
  currency,
  language,
}: {
  amount: number;
  currency: SupportedCurrencies;
  language: SupportedLanguages;
}) {
  try {
    const validAmount = typeof amount === 'number' ? amount : 0;

    const value = validAmount?.toLocaleString(language, {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return value;
  } catch (error) {
    logError('Error formatting currency:', error);

    return '0.00';
  }
}
