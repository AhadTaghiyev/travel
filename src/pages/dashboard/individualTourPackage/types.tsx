export interface IInvoiceModel {
  date: Date;
  deadLine: Date;
  paymentId: number;
  customerId: number;
  paidAmount: number;
  explanation?: string;
  isCustomerPaid: boolean;
  isSupplierPaid: boolean;
  individualTourPackages: ITourPackageModel[];
}
export interface ITourPackageModel {
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
  key?: string;
  id?: string | number;
}
