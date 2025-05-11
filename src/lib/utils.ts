
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format price in Indian Rupees
export function formatPrice(price: number): string {
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  
  return formatter.format(price);
}

// Converts a price to a friendly readable format (e.g., ₹1.2 Cr)
export function formatPriceShort(price: number): string {
  if (price >= 10000000) {
    // Convert to crores
    const crores = price / 10000000;
    return `₹${crores.toFixed(1)} Cr`;
  } else if (price >= 100000) {
    // Convert to lakhs
    const lakhs = price / 100000;
    return `₹${lakhs.toFixed(1)} L`;
  } else {
    // Format normally
    return formatPrice(price);
  }
}

// Format quantity with suffix (e.g. "1st", "2nd", "3rd")
export function formatOrdinal(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

// Scroll to top smoothly
export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Generate a random ID
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}
