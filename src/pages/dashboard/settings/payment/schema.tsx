import * as Yup from "yup";

export const PaymentSchema = Yup.object().shape({
  type: Yup.string().required("Ad daxil edilməlidir"),
  amount: Yup.number().required("Məbləğ daxil edilməlidir"),
});
