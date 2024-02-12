import * as Yup from "yup";

export const CustomerSchema = Yup.object().shape({
  fullName: Yup.string().required("Müştəri adı daxil edilməlidir"),
  phoneNumber: Yup.string().required("Telefon nömrəsi daxil edilməlidir"),
  email: Yup.string()
    .email("Email doğru formatda deyil")
    .required("Email daxil edilməlidir"),
});
