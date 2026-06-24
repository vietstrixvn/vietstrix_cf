'use client';

import React, {
  useRef,
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
  InputHTMLAttributes,
} from 'react';
import {
  sanitiseRawInput,
  parseCurrencyValue,
  formatCurrency as _formatCurrency,
  formatNumber,
} from '@/utils';

import { cn } from '@/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground border-input h-9 w-full min-w-0 rounded-md border bg-white px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 aria-invalid:border-destructive',
        className
      )}
      {...props}
    />
  );
}

export { Input };

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CurrencyInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value' | 'defaultValue'
> {
  /** Current numeric value (controlled). Pass undefined for uncontrolled. */
  value?: number;
  /** Default value for uncontrolled usage */
  defaultValue?: number;
  /** Called with the parsed numeric value (or NaN on empty / invalid) */
  onChange?: (value: number) => void;
  /** BCP-47 locale string, default "vi-VN" */
  locale?: string;
  /** ISO 4217 currency code, default "VND" */
  currency?: string;
  /** Show currency symbol as a prefix adornment */
  showSymbol?: boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Additional class on the wrapper div */
  wrapperClassName?: string;
}

export interface CurrencyInputRef {
  /** Returns the current raw numeric value */
  getValue: () => number;
  /** Programmatically set a value */
  setValue: (value: number) => void;
  focus: () => void;
  blur: () => void;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getCurrencySymbol(locale: string, currency: string): string {
  const parts = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).formatToParts(0);
  return parts.find((p) => p.type === 'currency')?.value ?? currency;
}

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * CurrencyInput
 *
 * Strategy:
 *  - While the user is TYPING  → store a raw string (digits + "."), no Intl call.
 *  - On BLUR                   → parse raw string → format with Intl → display.
 *  - On FOCUS                  → strip formatting back to raw so cursor works naturally.
 *
 * This means Intl.NumberFormat is called at most twice per focus session,
 * eliminating per-keystroke formatting lag on long numbers.
 */
const CurrencyInput = forwardRef<CurrencyInputRef, CurrencyInputProps>(
  (
    {
      value: controlledValue,
      defaultValue,
      onChange,
      locale = 'vi-VN',
      currency = 'VND',
      showSymbol = true,
      placeholder = '0',
      wrapperClassName = '',
      className = '',
      onBlur,
      onFocus,
      ...rest
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);

    // Track whether the user is actively editing
    const isFocusedRef = useRef(false);

    // Raw string while editing, formatted string while blurred
    const getInitialDisplay = () => {
      const init = controlledValue ?? defaultValue;
      if (init !== undefined && !isNaN(init)) {
        // For initial display, format properly
        return formatNumber(init, locale);
      }
      return '';
    };

    const [displayValue, setDisplayValue] = useState<string>(getInitialDisplay);

    // Sync controlled value → display when blurred
    // Don't update while user is typing to preserve trailing zeros
    const prevControlledRef = useRef(controlledValue);
    if (
      controlledValue !== prevControlledRef.current &&
      !isFocusedRef.current
    ) {
      prevControlledRef.current = controlledValue;
      const next =
        controlledValue !== undefined && !isNaN(controlledValue)
          ? formatNumber(controlledValue, locale)
          : '';
      setDisplayValue(next);
    }

    // ── Handlers ────────────────────────────────────────────────────────────

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        // Only sanitise — NO Intl call here. O(n) string ops only.
        const raw = sanitiseRawInput(e.target.value);
        setDisplayValue(raw);
        const num = parseCurrencyValue(raw);
        onChange?.(num);
      },
      [onChange]
    );

    const handleFocus = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        isFocusedRef.current = true;
        // Strip formatting but preserve the raw string (including trailing zeros)
        // Don't convert to number and back, as that loses "10.50" → "10.5"
        const stripped = displayValue.replace(/[^\d.-]/g, '');
        setDisplayValue(stripped);
        onFocus?.(e);
        // Move caret to end after state update
        requestAnimationFrame(() => {
          const el = inputRef.current;
          if (el) {
            el.selectionStart = el.selectionEnd = el.value.length;
          }
        });
      },
      [displayValue, onFocus]
    );

    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        isFocusedRef.current = false;
        const num = parseCurrencyValue(displayValue);
        // Only call Intl on blur — once per edit session
        const formatted = isNaN(num) ? '' : formatNumber(num, locale);
        setDisplayValue(formatted);
        onBlur?.(e);
      },
      [displayValue, locale, onBlur]
    );

    // ── Imperative handle ───────────────────────────────────────────────────

    useImperativeHandle(ref, () => ({
      getValue: () => parseCurrencyValue(displayValue),
      setValue: (v: number) => {
        // Format the value properly, don't lose trailing zeros
        const formatted = isNaN(v) ? '' : formatNumber(v, locale);
        setDisplayValue(formatted);
        onChange?.(v);
      },
      focus: () => inputRef.current?.focus(),
      blur: () => inputRef.current?.blur(),
    }));

    // ── Render ──────────────────────────────────────────────────────────────

    const symbol = showSymbol ? getCurrencySymbol(locale, currency) : null;

    return (
      <div
        className={`currency-input-wrapper ${wrapperClassName}`}
        style={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        {symbol && (
          <span
            className="currency-symbol"
            style={{
              position: 'absolute',
              left: '0.75rem',
              pointerEvents: 'none',
              userSelect: 'none',
              color: 'var(--color-text-secondary, #888)',
              fontSize: '0.875rem',
            }}
          >
            {symbol}
          </span>
        )}
        <input
          {...rest}
          ref={inputRef}
          type="text"
          inputMode="decimal"
          value={displayValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={`currency-input border border-gray-200 ${className}`}
          style={{
            paddingLeft: symbol ? '2.5rem' : '0.75rem',
            paddingRight: '0.75rem',
            paddingTop: '0.5rem',
            paddingBottom: '0.5rem',
            textAlign: 'right',
            fontVariantNumeric: 'tabular-nums',
            ...rest.style,
          }}
        />
      </div>
    );
  }
);

CurrencyInput.displayName = 'CurrencyInput';

export { CurrencyInput };
