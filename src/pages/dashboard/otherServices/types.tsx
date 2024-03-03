export interface IInvoiceModel {
  date: Date;
  deadLine: Date;
  paymentId: number;
  customerId: number;
  paidAmount: number;
  explanation?: string;
  isCustomerPaid: boolean;
  isSupplierPaid: boolean;
  otherServices: IOtherServiceModal[];
}
export interface IOtherServiceModal {
  key?: string;
  id?: string | number;
  serviceId: number;
  serviceName: string;
  purchasePrice: number;
  sellingPrice: number;
  discount: number;
  commonPrice: number;
  supplierId: number;
  personalId: number;
  // invoiceDirections: IInvoiceDirections[];
}

export interface IInvoiceDirections {
  flightDate: Date;
  direction: string;
}
