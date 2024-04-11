import * as Yup from "yup";

export const EmailSchema = Yup.object().shape({
  displayName: Yup.string().required("Ad daxil edilməlidir"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  secretKey: Yup.string().required("Secret key is required"),
});
