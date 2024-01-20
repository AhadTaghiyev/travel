import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (dateString) => {
  // Assuming dateString is in a format that can be parsed by new Date()
  return format(new Date(dateString), "dd/MM/yyyy");
};
