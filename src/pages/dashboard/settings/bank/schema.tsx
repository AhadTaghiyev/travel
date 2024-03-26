import * as Yup from "yup";

export const BankSchema = Yup.object().shape({
  name: Yup.string().required("Ad daxil edilməlidir"),
});
