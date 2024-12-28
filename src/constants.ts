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

export enum InvoiceType {
  B2C = "b2c",
  B2B = "b2b",
  INDIVIDUAL_TOUR = "individual tour",
  TOUR_PACKAGE = "tour package",
  OTHER_SERVICE = "other service",
  Refund = "refund",
}

export const DEFAULT_YEAR = 2023;
