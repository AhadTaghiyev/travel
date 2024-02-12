import * as Yup from "yup";

export const SupplierSchema = Yup.object().shape({
  name: Yup.string().required("Ad daxil edilməlidir"),
});
