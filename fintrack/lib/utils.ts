import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(
  value: number | string,
  options: {
    currency?: string;
    locale?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  } = {}
): string {
  const {
    currency = 'IDR',
    locale = 'id-ID',
    minimumFractionDigits = 0,
    maximumFractionDigits = 0,
  } = options;

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value as number);
}

export const SECURE_MODE_KEY = 'secure_mode';

export function formatCurrencyWithSecure(
  value: number | string,
  isSecure?: boolean,
  options: {
    currency?: Intl.NumberFormatOptions['currency'];
    locale?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  } = {}
): string {
  const {
    currency = 'IDR',
    locale = 'id-ID',
    minimumFractionDigits = 0,
    maximumFractionDigits = 0,
  } = options;

  const numericValue =
    typeof value === 'string' ? Number(value) : value;

  if (value === null || value === undefined || isNaN(numericValue)) {
    return 'Rp 0';
  }

  if (isSecure) {
    return `${currency === 'IDR' ? 'Rp' : currency} ••••`;
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(numericValue);
}

export const greeting = (() => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Pagi';
  if (hour < 15) return 'Siang';
  if (hour < 18) return 'Sore';
  return 'Malam';
})();