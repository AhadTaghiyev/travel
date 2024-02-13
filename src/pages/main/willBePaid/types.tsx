export type Type =
  | "planeTicket"
  | "cooperativeTicket"
  | "individualTour"
  | "tourPackage"
  | "deposit"
  | "otherServiceTicket";

export interface IWillBePaidModel {
  type?: Type;
  customerId?: string;
  invoiceId?: { label: string; value: string } | null;
  advancePaymentId?: { label: string; value: string } | null;
  paymentId?: string;
  amount?: number;
  paidToCustomer?: number;
  forfeit?: number;
  date: Date;
}
