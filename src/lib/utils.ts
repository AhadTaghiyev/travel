import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (dateString: string, dateFormat?, options?) => {
  try {
    console.log("dateString", dateString);
    const parts = dateString.split(/[^0-9]/) as any;
    const date = new Date(
      Date.UTC(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5])
    );
    return format(date, dateFormat ?? "dd/MM/yyyy", options);
  } catch (error) {}
};

export const formatDateV2 = (dateString: string) => {
  const date = new Date(dateString);

  // Gerekli formatı elde etmek için tarih ve saat değerlerini al
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Aylar 0 tabanlıdır, bu yüzden +1 ekliyoruz
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  // İstenen formatta birleştir
  const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}`;
  return formattedDate;
};

export function toLocalISOString(date) {
  // Her zaman yeni bir Date nesnesi oluştur
  const currentDate = new Date(date); // Direkt date nesnesini kullan
  const timezoneOffset = currentDate.getTimezoneOffset() * 60000; // Offset in milliseconds
  const localDate = new Date(currentDate.getTime() - timezoneOffset); // Adjust by timezone offset
  return localDate.toISOString().slice(0, -1); // 'Z' işaretini kaldır
}

export const toLocalISOStringV2 = (date) => {
  const updatedDate = typeof date === "string" ? new Date(date) : date;
  const localDate = new Date(
    updatedDate.getTime() - updatedDate.getTimezoneOffset() * 60000
  );
  return localDate.toISOString().slice(0, 19); // "YYYY-MM-DDTHH:mm:ss"
};
