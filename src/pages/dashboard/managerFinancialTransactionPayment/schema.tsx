import * as Yup from "yup";

export const TransactionSchema = Yup.object().shape({
  paymentId: Yup.string().required("Ödəniş növü seçilməlidir"),
  managerFinancialTransactionId: Yup.string().required(
    "Transaction seçilməlidir"
  ), // TODO: Translate
  amount: Yup.number().required("Məbləğ daxil edilməlidir"),
  date: Yup.date().required(),
  note: Yup.string().required("Qeyd daxil edilməlidir"),
  status: Yup.number().required("Status seçilməlidir"),
});
