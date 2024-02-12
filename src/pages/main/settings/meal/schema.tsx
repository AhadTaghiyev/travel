import * as Yup from "yup";

export const MealSchema = Yup.object().shape({
  name: Yup.string().required("Ad daxil edilməlidir"),
});
