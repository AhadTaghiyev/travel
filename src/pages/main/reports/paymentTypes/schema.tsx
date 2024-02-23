import * as Yup from "yup";

export const PaymentsTypeSchema = Yup.object().shape({
  paymentId: Yup.string().required("Ödəniş növü seçilməlidir"),
  paidAmount: Yup.number().required("Məbləğ daxil edilməlidir"),
  date: Yup.date().required(),
  description: Yup.string().optional(),
});
