import * as Yup from "yup";

export const WillBePaidSchema = Yup.object().shape({
  feeId: Yup.string().required("Ödəniş növü seçilməlidir"),
  totalAmount: Yup.number().required("Məbləğ daxil edilməlidir"),
  date: Yup.date().required(),
  note: Yup.string().required("Qeyd daxil edilməlidir"),
});
