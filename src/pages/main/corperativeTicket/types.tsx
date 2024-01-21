export interface IInvoiceModel {
  date: Date;
  deadLine: Date;
  paymentId: number;
  customerId: number;
  paidAmount: number;
  explanation?: string;
  isCustomerPaid: boolean;
  isSupplierPaid: boolean;
  corporativeTickets: ICorporateTicketModel[];
}

export interface ICorporateTicketModel {
  ticketNo: string;
  purchasePrice: number;
  sellingPrice: number;
  discount: number;
  commonPrice: number;
  supplierId: number;
  personalId: number;
  airWayId: number;
  invoiceDirections: IInvoiceDirections[];
  key?: string;
  id?: string | number;
}

export interface IInvoiceDirections {
  flightDate: Date;
  direction: string;
}
