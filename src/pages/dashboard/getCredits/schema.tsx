import * as Yup from "yup";

export const GetCreditSchema = Yup.object().shape({
  bankId: Yup.number().required("Haradan alındığı daxil edilməlidir"),
  amount: Yup.number().required("Məbləğ daxil edilməlidir"),
  date: Yup.date().required(),
});
