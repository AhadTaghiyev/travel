import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (dateString: string, dateFormat = "dd/MM/yyyy") => {
  const parts = dateString.split(/[^0-9]/) as any;
  const date = new Date(
    Date.UTC(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5])
  );
  return format(date, dateFormat);
};
