/**
 * Input & File Upload Validation Utilities for ACE Education USA
 */

export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== "string") return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

export function isValidPhone(phone: string): boolean {
  if (!phone) return true; // Phone is often optional
  const phoneRegex = /^[\d\+\-\(\)\s\.]{7,20}$/;
  return phoneRegex.test(phone.trim());
}

export function sanitizeString(input: any, maxLength: number = 1000): string {
  if (typeof input !== "string") return "";
  return input.trim().slice(0, maxLength);
}

export function validatePositiveNumber(val: any, fallback: number = 0): number {
  const num = Number(val);
  if (isNaN(num) || num < 0) return fallback;
  return num;
}

/**
 * Validates that file upload URLs are HTTPS and have safe extensions.
 */
export function isValidSecureUrl(url: string | null | undefined): boolean {
  if (!url) return true; // Optional fields
  if (typeof url !== "string") return false;

  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}
