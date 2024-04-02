import * as Yup from "yup";

export const PaidCreditSchema = Yup.object().shape({
  paymentId: Yup.string().required("Ödəniş növü seçilməlidir"),
  getCreditId: Yup.number().required("Haradan alındığı daxil edilməlidir"),
  amount: Yup.number().required("Məbləğ daxil edilməlidir"),
  date: Yup.date().required(),
});
