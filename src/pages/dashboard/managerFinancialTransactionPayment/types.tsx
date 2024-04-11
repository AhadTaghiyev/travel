export interface ITransactionModel {
  paymentId: string;
  amount: number;
  date: Date;
  note: string;
  status: string;
  managerFinancialTransactionId: string;
}
