export interface ICorperativeTicket {
    ticketNo: string,
    purchasePrice: number,
    sellingPrice: number,
    commission: number,
    statutoryPrice: number,
    fee: number,
    paidAmount: number,
    note: string,
    deadline: Date | null,
    isSupplierPaid: boolean,
    isCustomerPaid: boolean,
    airWayId: string,
    customerId: string,
    supplierId: string,
    paymentId: string,
    invoiceNo?:number|null,
    supplierName?:string,
    customerPhone?:string
    customerEmail?:string,
    referanceNo?:number,
    passengerName?:string,
    customerName?:string,
    date:Date | null,
    direction: string,
    invoiceDirections: InvoiceDirection[] | null,
    debt?:number
}

export interface InvoiceDirection {
    flightDate:Date | null,
    direction:string | null
  }