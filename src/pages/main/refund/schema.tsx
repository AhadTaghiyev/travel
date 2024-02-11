import * as Yup from "yup";

export const RefundSchema = Yup.object().shape(
  {
    date: Yup.date().required("Tarix seçilməlidir"),
    type: Yup.string().required("Tip seçilməlidir"), // Hola
    customerId: Yup.string().required("Müştəri seçilməlidir"),
    amount: Yup.number().min(0),
    invoiceId: Yup.object().when(
      "advancePaymentId",
      ([advancePaymentId], sch) => {
        return !advancePaymentId
          ? sch.required("Məhsul seçilməlidir")
          : sch.notRequired();
      }
    ), // Hola
    advancePaymentId: Yup.object().when("invoiceId", ([invoiceId], sch) => {
      return !invoiceId
        ? sch.required("Məhsul seçilməlidir")
        : sch.notRequired();
    }),
    paidToCustomer: Yup.number().when("amount", ([amount]) => {
      return Yup.number()
        .required("Məbləğ daxil edilməlidir")
        .max(amount, "Qaytarılan məbləğ qiymətdən çox ola bilməz");
    }),
    paymentId: Yup.string().required("Ödəniş növü seçilməlidir"),
  },
  [["advancePaymentId", "invoiceId"]]
);

export const RefundEditSchema = Yup.object().shape({
  paidAmount: Yup.number()
    .required("Məbləğ daxil edilməlidir")
    .when("debt", ([debt]) => {
      return Yup.number().max(debt, "Məbləğ borcdan çox ola bilməz");
    }),
  paymentId: Yup.string().required("Ödəniş növü seçilməlidir"),
});
