import * as Yup from "yup";

// TODO: translate
export const CompanySchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  adress: Yup.string().required("Adress is required"),
  concurency: Yup.string().required("Concurency is required"),
  detail: Yup.string().required("Detail is required"),
  formFile: Yup.string().required("Image is required"),
});
