export interface IInvoiceModel {
  date: Date;
  deadLine: Date;
  paymentId: number;
  customerId: number;
  paidAmount: number;
  explanation?: string;
  isCustomerPaid: boolean;
  isSupplierPaid: boolean;
  receiptImage?: File;
  tourPackages: ITourPackageModel[];
}
export interface ITourPackageModel {
  key?: string;
  id?: string | number;
  otelName: string;
  roomName: string;
  rezervationNumber: string;
  childrenCount: number;
  adultCount: number;
  dateOfDeparture: Date;
  returnDate: Date;
  insurance: boolean;
  supplierId: string;
  personalId: string;
  tourId: number;
  transferId: number;
  diningId: number;
  purchasePrice: number;
  sellingPrice: number;
  discount: number;
  commonPrice: number;
}
