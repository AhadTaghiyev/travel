import * as Yup from "yup";

const FILE_SIZE = 1024 * 1024; // 1MB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

export const MassIncomeSchema = Yup.object().shape({
  ticketType: Yup.string().required("Bilet növü seçilməlidir"),
  customerId: Yup.string().required("Müştəri seçilməlidir"),
  personalId: Yup.string().required("Personal seçilməlidir"),
  date: Yup.date().required(),
  debt: Yup.number().min(0),
  invoiceIds: Yup.array().min(1, "Faktura seçilməlidir"),
  paidAmount: Yup.number()
    .required("Məbləğ daxil edilməlidir")
    .when("debt", ([debt]) => {
      return Yup.number().max(debt, "Məbləğ borcdan çox ola bilməz");
    }),
  paymentId: Yup.string().required("Ödəniş növü seçilməlidir"),
  description: Yup.string().optional(),
});

export const MassIncomeEditSchema = Yup.object().shape({
  date: Yup.date().required(),
  paidAmount: Yup.number()
    .required("Məbləğ daxil edilməlidir")
    .when("debt", ([debt]) => {
      return Yup.number().max(debt, "Məbləğ borcdan çox ola bilməz");
    }),
  paymentId: Yup.string().required("Ödəniş növü seçilməlidir"),
  description: Yup.string().optional(),

  receiptImage: Yup.mixed()
      .nullable()
      .test("fileSize", "The file size must not exceed 1MB.", (value) => {
        return value ? (value[0] instanceof File && value[0].size <= FILE_SIZE) : true;
      })
      .test(
        "fileFormat",
        "Only JPG, JPEG, and PNG formats are accepted.",
        (value) => {
          // Ensure that value is a file before checking properties
          return value ? (value[0] instanceof File && SUPPORTED_FORMATS.includes(value[0].type)) : true;
        }
      ),
});
