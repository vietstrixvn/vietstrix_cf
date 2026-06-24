'use client';

import { useState } from 'react';

type Size = 'sm' | 'md' | 'lg';
type Variant = 'default' | 'success' | 'danger' | 'warning';

interface SlideToggleProps {
  /** Trạng thái bật/tắt (controlled) */
  checked?: boolean;
  /** Giá trị mặc định (uncontrolled) */
  defaultChecked?: boolean;
  /** Callback khi thay đổi */
  onChange?: (checked: boolean) => void;
  /** Kích thước toggle */
  size?: Size;
  /** Màu sắc khi bật */
  variant?: Variant;
  /** Nhãn hiển thị bên phải */
  label?: string;
  /** Nhãn trạng thái ON */
  labelOn?: string;
  /** Nhãn trạng thái OFF */
  labelOff?: string;
  /** Hiển thị text ON/OFF bên trong toggle */
  showInnerLabel?: boolean;
  /** Vô hiệu hoá */
  disabled?: boolean;
  /** Class tuỳ chỉnh bên ngoài */
  className?: string;
}

const sizeMap: Record<
  Size,
  { track: string; thumb: string; translate: string; text: string }
> = {
  sm: {
    track: 'w-9 h-5',
    thumb: 'w-3.5 h-3.5 top-[3px] left-[3px]',
    translate: 'translate-x-4',
    text: 'text-[9px]',
  },
  md: {
    track: 'w-12 h-6',
    thumb: 'w-4.5 h-4.5 top-[3px] left-[3px]',
    translate: 'translate-x-6',
    text: 'text-[10px]',
  },
  lg: {
    track: 'w-16 h-8',
    thumb: 'w-6 h-6 top-[4px] left-[4px]',
    translate: 'translate-x-8',
    text: 'text-xs',
  },
};

const variantMap: Record<Variant, string> = {
  default: 'bg-blue-500',
  success: 'bg-emerald-500',
  danger: 'bg-red-500',
  warning: 'bg-amber-400',
};

export function SlideToggle({
  checked,
  defaultChecked = false,
  onChange,
  size = 'md',
  variant = 'default',
  label,
  labelOn,
  labelOff,
  showInnerLabel = false,
  disabled = false,
  className = '',
}: SlideToggleProps) {
  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked);

  const isOn = isControlled ? checked : internalChecked;

  const handleToggle = () => {
    if (disabled) return;
    const next = !isOn;
    if (!isControlled) setInternalChecked(next);
    onChange?.(next);
  };

  const s = sizeMap[size];
  const trackColor = isOn ? variantMap[variant] : 'bg-gray-300';
  const thumbSize =
    size === 'sm'
      ? 'w-3.5 h-3.5'
      : size === 'lg'
        ? 'w-6 h-6'
        : 'w-[18px] h-[18px]';

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <button
        type="button"
        role="switch"
        aria-checked={isOn}
        disabled={disabled}
        onClick={handleToggle}
        className={[
          'relative inline-flex flex-shrink-0 cursor-pointer rounded-full transition-colors duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500',
          s.track,
          trackColor,
          disabled ? 'opacity-40 cursor-not-allowed' : '',
        ].join(' ')}
      >
        {/* Inner label */}
        {showInnerLabel && (
          <span
            className={[
              'absolute inset-0 flex items-center select-none font-semibold tracking-wide transition-opacity duration-200',
              s.text,
              isOn
                ? 'justify-start pl-[6px] text-white'
                : 'justify-end pr-[6px] text-gray-500',
            ].join(' ')}
          >
            {isOn ? (labelOn ?? 'ON') : (labelOff ?? 'OFF')}
          </span>
        )}

        {/* Thumb */}
        <span
          className={[
            'absolute rounded-full bg-white shadow-md transition-transform duration-300 ease-in-out',
            thumbSize,
            size === 'sm'
              ? 'top-[3px] left-[3px]'
              : size === 'lg'
                ? 'top-1 left-1'
                : 'top-[3px] left-[3px]',
            isOn ? s.translate : 'translate-x-0',
          ].join(' ')}
        />
      </button>

      {/* External label */}
      {(label || labelOn || labelOff) && !showInnerLabel && (
        <span className="text-sm text-gray-700 select-none">
          {label ?? (isOn ? labelOn : labelOff)}
        </span>
      )}
    </div>
  );
}
