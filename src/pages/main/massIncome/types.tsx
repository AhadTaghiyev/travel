export type TicketType =
  | "planeTicket"
  | "cooperativeTicket"
  | "individualTour"
  | "tourPackage"
  | "otherServiceTicket";

export interface IMassIncomeModel {
  ticketType?: TicketType;
  customerId?: string;
  invoiceId?: string;
  debt?: number;
  paymentId?: string;
  paidAmount?: number;
}
