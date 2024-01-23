import * as Yup from "yup";

export const MassIncomeSchema = Yup.object().shape({
  ticketType: Yup.string().required("Bilet növü mütləqdir!"), // Hola
  customerId: Yup.string().required("Müştəri seçilməlidir"),
  debt: Yup.number().min(0),
  invoiceId: Yup.string().required("Faktura seçilməlidir"), // Hola
  paidAmount: Yup.number()
    .required("Məbləğ daxil edilməlidir")
    .when("debt", ([debt]) => {
      return Yup.number().max(debt, "Məbləğ borcdan çox ola bilməz"); // Hola
    }),
  paymentId: Yup.string().required("Ödəniş növü seçilməlidir"),
});
