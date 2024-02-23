import * as Yup from "yup";

export const ServiceSchema = Yup.object().shape({
  name: Yup.string().required("Ad daxil edilməlidir"),
});
