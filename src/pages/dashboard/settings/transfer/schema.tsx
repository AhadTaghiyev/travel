import * as Yup from "yup";

export const TransferSchema = Yup.object().shape({
  name: Yup.string().required("Ad daxil edilməlidir"),
});
