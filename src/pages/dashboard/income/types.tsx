export type TicketType =
  | "planeTicket"
  | "cooperativeTicket"
  | "individualTour"
  | "tourPackage"
  | "otherServiceTicket";

export interface IIncomeModel {
  ticketType?: TicketType;
  date: Date;
  customerId?: string;
  invoiceIds?: string[];
  personalId: string;
  debt?: number;
  paymentId?: string;
  paidAmount?: number;
  description?: string;
  date?: Date;
}
