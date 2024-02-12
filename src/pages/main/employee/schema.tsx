import * as Yup from "yup";

export const EmployeeSchema = Yup.object().shape({
  fullName: Yup.string().required("Müştəri adı daxil edilməlidir"),
  phone: Yup.string().required("Telefon nömrəsi daxil edilməlidir"),
  email: Yup.string()
    .email("Email doğru formatda deyil")
    .required("Email daxil edilməlidir"),
  position: Yup.string().required("Vəzifə daxil edilməlidir"), // Hola
  salary: Yup.number()
    .min(0, "Maaş mənfi ola bilməz") // Hola
    .required("Maaş daxil edilməlidir"), // Hola
});
