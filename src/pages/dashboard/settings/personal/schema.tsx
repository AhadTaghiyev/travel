import * as Yup from "yup";

export const PersonalSchema = Yup.object().shape({
  fullName: Yup.string().required("Ad daxil edilməlidir"),
});
