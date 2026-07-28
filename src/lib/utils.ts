import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatSquadValue(value: bigint | number | undefined | null): string {
  if (value === undefined || value === null) return "0 BP";
  const num = typeof value === "bigint" ? Number(value) : value;
  if (num >= 1_000_000_000_000) {
    return `${(num / 1_000_000_000_000).toFixed(1)}T BP`;
  }
  if (num >= 1_000_000_000) {
    return `${(num / 1_000_000_000).toFixed(1)}B BP`;
  }
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)}M BP`;
  }
  return `${num.toLocaleString()} BP`;
}

export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Safely serializes objects containing BigInt for Next.js Server-to-Client props.
 */
export function serializeData<T>(data: T): T {
  return JSON.parse(
    JSON.stringify(data, (_, value) =>
      typeof value === "bigint" ? Number(value) : value
    )
  );
}
