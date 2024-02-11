import * as Yup from "yup";

export const TransferSchema = Yup.object().shape({
  fromPaymentId: Yup.string().required("Ödəniş növü seçilməlidir"),
  toPaymentId: Yup.string().required("Ödəniş növü seçilməlidir"),
  amount: Yup.number().required("Məbləğ daxil edilməlidir"),
  date: Yup.date().required(),
  note: Yup.string().required("Qeyd daxil edilməlidir"), // Hola
});
