import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (dateString: string, dateFormat?, options?) => {
  try {
    const parts = dateString.split(/[^0-9]/) as any;
    const date = new Date(
      Date.UTC(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5])
    );
    return format(date, dateFormat ?? "dd/MM/yyyy", options);
  } catch (error) {}
};

export function toLocalISOString(date) {
  const timezoneOffset = date.getTimezoneOffset() * 60000; // offset in milliseconds
  const localDate = new Date(date.getTime() - timezoneOffset); // adjust by timezone offset
  return localDate.toISOString().slice(0, -1); // remove the 'Z' at the end which indicates UTC
}
