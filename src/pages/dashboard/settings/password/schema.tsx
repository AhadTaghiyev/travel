import * as Yup from "yup";

export const PasswordSchema = Yup.object().shape({
  exsistPassword: Yup.string().required("Parol daxil edilməlidir"),
  newPassword: Yup.string().required("Parol daxil edilməlidir"),
});
