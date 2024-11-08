export interface IInvoiceModel {
  date: Date;
  deadLine: Date;
  paymentId: number;
  customerId: number;
  paidAmount: number;
  explanation?: string;
  isCustomerPaid: boolean;
  isSupplierPaid: boolean;
  planeTickets: IPlaneTicketModel[];
  receiptImage?: File;
}
export interface IPlaneTicketModel {
  key?: string;
  id?: string | number;
  ticketNo: string;
  passengerName: string;
  segmentCount: number;
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
