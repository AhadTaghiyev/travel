export interface ITransferModel {
  fromPaymentId: string;
  toPaymentId: string;
  amount: number;
  date: Date;
  note: string;
}
