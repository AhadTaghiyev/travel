import * as Yup from "yup";

export const TourSchema = Yup.object().shape({
  name: Yup.string().required("Ad daxil edilməlidir"),
});
