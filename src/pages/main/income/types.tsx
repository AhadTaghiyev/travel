export type TicketType =
  | "planeTicket"
  | "cooperativeTicket"
  | "individualTour"
  | "tourPackage"
  | "otherServiceTicket";

export interface IIncomeModel {
  ticketType?: TicketType;
  customerId?: string;
  invoiceId?: string;
  debt?: number;
  paymentId?: string;
  paidAmount?: number;
}
