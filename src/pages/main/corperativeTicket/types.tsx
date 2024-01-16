export interface IInvoiceModel {
  date: Date;
  deadLine: Date;
  paymentId: number;
  customerId: number;
  paidAmount: number;
  explanation?: string;
  isCustomerPaid: boolean;
  isSupplierPaid: boolean;
  planeTickets: ICorporateTicketModel[];
}

export interface ICorporateTicketModel {
  ticketNo: string;
  passengerName: string;
  purchasePrice: number;
  sellingPrice: number;
  discount: number;
  commonPrice: number;
  supplierId: number;
  personalId: number;
  airWayId: number;
  invoiceDirections: IInvoiceDirections[];
}

export interface IInvoiceDirections {
  flightDate: Date;
  direction: string;
}
