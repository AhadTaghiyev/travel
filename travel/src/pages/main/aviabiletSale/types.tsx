export interface IInvoiceModel{
  date: string,
  deadLine: string,
  customerId: number,
  isCustomerPaid: boolean,
  isSupplierPaid: boolean,
  paidAmount: number,
  paymentId: number,
  planeTickets: IPlaneTicketModel[]
}
export interface IPlaneTicketModel{
  ticketNo: string,
  passengerName: string,
  segmentCount: number,
  purchasePrice: number,
  sellingPrice: number,
  discount: number,
  commonPrice: number,
  explanation: string,
  supplierId: number,
  personalId: number,
  airWayId: number,
  referanceNo: number,
  invoiceDirections: IInvoiceDirections[]
}

export interface IInvoiceDirections{
  flightDate: string,
  direction: string
}