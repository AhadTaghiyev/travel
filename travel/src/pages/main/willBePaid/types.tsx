export interface IWillbePaidModel {
    date: Date,
    amount: number,
    fullname: string,
    note: string,
    paymentId: string,
    supplierId?: string,
    refundId?: string,
    feeId?: string,
    isPaid: boolean
}