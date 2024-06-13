import * as Yup from "yup";

export const SalaryToBePaidSchema = Yup.object().shape({
  paymentId: Yup.string().required("Ödəniş növü seçilməlidir"),
  // employeeId: Yup.string().required("İşçi seçilməlidir"),
  salary: Yup.number().required("Məbləğ daxil edilməlidir"),
  extraSalary: Yup.number().required("Məbləğ daxil edilməlidir"),
  bonus: Yup.number().required("Məbləğ daxil edilməlidir"),
  note: Yup.string(),
});
