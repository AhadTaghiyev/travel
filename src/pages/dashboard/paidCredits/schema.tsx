import * as Yup from "yup";

export const PaidCreditSchema = Yup.object().shape({
  to: Yup.string().required("Haradan alındığı daxil edilməlidir"),
  amount: Yup.number().required("Məbləğ daxil edilməlidir"),
  date: Yup.date().required(),
});
