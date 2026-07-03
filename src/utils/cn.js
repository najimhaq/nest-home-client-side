import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * clsx + tailwind-merge combine kore
 * - clsx = conditional classes handle kore
 * - tailwindMerge = conflicting tailwind classes resolve kore
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
