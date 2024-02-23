import * as Yup from "yup";

export const AirwaySchema = Yup.object().shape({
  name: Yup.string().required("Ad daxil edilməlidir"),
});
