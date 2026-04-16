/**
 * Utility functions for formatting and unique identifier generation.
 */

/**
 * Formats an ISO date string into a user-friendly Indian English format.
 * @param iso - The ISO date string to format.
 * @returns A formatted date string (e.g., "16 Apr 2026").
 */
export const fmtDate = (iso: string): string => 
  new Date(iso).toLocaleDateString("en-IN", { 
    day: "numeric", 
    month: "short", 
    year: "numeric" 
  });

/**
 * Generates a random alphanumeric string for temporary client-side IDs.
 * @returns A unique string.
 */
export const genId = (): string => Math.random().toString(36).slice(2);
