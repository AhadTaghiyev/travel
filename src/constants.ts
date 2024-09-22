import { az, enUS, ru } from "date-fns/locale";

export const BASE_URL = "http://localhost:5173";
export const SERVER_BASE_URL = "https://api.travacco.com/api/v1";
// export const SERVER_BASE_URL = "https://localhost:7155/api/v1";

export const locales = { az, en: enUS, ru };

export const ROLES = {
  LEADER: "Leader",
  WORKER: "Worker",
  ACCOUNTANT: "Accountant",
  Admin: "Admin",
};
