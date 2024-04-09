import * as Yup from "yup";

export const WillBePaidSchema = Yup.object().shape({
  paymentId: Yup.string().required("Ödəniş növü seçilməlidir"),
  amount: Yup.number().required("Məbləğ daxil edilməlidir"),
});
