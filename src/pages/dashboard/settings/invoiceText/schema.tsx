import * as Yup from "yup";

export const InvoiceTextSchema = Yup.object().shape({
  text: Yup.string().required("Text daxil edilməlidir"),
});
