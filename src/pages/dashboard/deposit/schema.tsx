import * as Yup from "yup";

export const AdvancePaymentsSchema = Yup.object().shape({
  customerId: Yup.string().required("Müştəri seçilməlidir"),
  paymentId: Yup.string().required("Ödəniş növü seçilməlidir"),
  paidAmount: Yup.number().required("Məbləğ daxil edilməlidir"),
  date: Yup.date().required(),
  description: Yup.string().optional(),
});
