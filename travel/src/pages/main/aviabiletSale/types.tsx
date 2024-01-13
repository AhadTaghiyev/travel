export interface IInvoiceModel {
  date: Date;
  deadline: Date;
  paymentId: number;
  customerId: number;
  paidAmount: number;
  explanation: string;
  isCustomerPaid: boolean;
  isSupplierPaid: boolean;
  planeTickets: IPlaneTicketModel[];
}
export interface IPlaneTicketModel {
  ticketNo: string;
  passengerName: string;
  segmentCount: number;
  purchasePrice: number;
  sellingPrice: number;
  discount: number;
  commonPrice: number;
  // explanation: string;
  supplierId: number;
  personalId: number;
  airWayId: number;
  referanceNo: number;
  invoiceDirections: IInvoiceDirections[];
}

export interface IInvoiceDirections {
  flightDate: Date;
  direction: string;
}
