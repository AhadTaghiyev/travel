import * as Yup from "yup";

export const SupplierSchema = Yup.object().shape({
  name: Yup.string().required("Ad daxil edilməlidir"),
  balance: Yup.number().required("Balans daxil edilməlidir"), // Hola
});
