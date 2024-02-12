import * as Yup from "yup";

export const GetCreditSchema = Yup.object().shape({
  from: Yup.string().required("Haradan alındığı daxil edilməlidir"), // Hola
  amount: Yup.number().required("Məbləğ daxil edilməlidir"),
  date: Yup.date().required(),
});
