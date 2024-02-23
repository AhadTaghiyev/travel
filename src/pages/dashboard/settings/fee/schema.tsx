import * as Yup from "yup";

export const FeeSchema = Yup.object().shape({
  name: Yup.string().required("Ad daxil edilməlidir"),
});
