import * as Yup from "yup";

const FILE_SIZE = 1024 * 1024; // 1MB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

const CorperativeTicketSchema = Yup.object().shape({
  ticketNo: Yup.string().required("Bilet nömrəsi daxil edilməlidir"),
  purchasePrice: Yup.number()
    .required("Alış qiyməti daxil edilməlidir")
    .min(0, "Alış qiyməti mənfi ola bilməz"),
  sellingPrice: Yup.number()
    .required("Satış qiyməti daxil edilməlidir")
    .min(0, "Satış qiyməti mənfi ola bilməz"),
  fare: Yup.number()
    .required("Tarif daxil edilməlidir")
    .min(0, "Tarif mənfi ola bilməz"),
  taxes: Yup.number()
    .required("Vergilər daxile edilməlidir")
    .min(0, "Vergilər mənfi ola bilməz"),
  discount: Yup.number()
    .required("Komissiya daxil edilməlidir")
    .min(0, "Komissiya mənfi ola bilməz")
    .max(100, "Komissiya 100'dən çox ola bilməz"),
  commonPrice: Yup.number()
    .required("Ümumi qiymət daxil edilməlidir")
    .min(0, "Ümumi qiymət mənfi ola bilməz"),
  supplierId: Yup.string().required("Tədarikçi seçilməlidir"),

  personalId: Yup.string().required("Şəxsiyyət seçilməlidir"),
  airWayId: Yup.string().required("Aviaşirkət seçilməlidir"),
  invoiceDirections: Yup.array().of(
    Yup.object().shape({
      flightDate: Yup.date().required("Uçuş tarixi daxil edilməlidir"),
      direction: Yup.string().required("İstiqamət daxil edilməlidir"),
    })
  ),
});

export const getTicketSchema = (isEdit: boolean) =>
  Yup.object().shape({
    customerId: Yup.string().required("Müştəri seçilməlidir"),
    date: Yup.date().required(),
    deadLine: Yup.date().required(),
    explanation: Yup.string().nullable(),
    isSupplierPaid: Yup.boolean(),
    isCustomerPaid: Yup.boolean(),
    paymentId: Yup.string().when("isCustomerPaid", ([isCustomerPaid], sch) => {
      return isCustomerPaid && !isEdit
        ? sch.required("Ödəniş növü seçilməlidir")
        : sch.notRequired();
    }),
    paidAmount: Yup.number()
      .when("isCustomerPaid", ([isCustomerPaid], sch) => {
        return isCustomerPaid && !isEdit
          ? sch.required("Məbləğ daxil edilməlidir")
          : sch.notRequired();
      })
      .min(0, "Məbləğ mənfi ola bilməz"),
    corporativeTickets: Yup.array().of(CorperativeTicketSchema),
    receiptImage: Yup.mixed()
      .nullable()
      .test("fileSize", "The file size must not exceed 1MB.", (value) => {
        return !isEdit && value ? (value[0] instanceof File && value[0].size <= FILE_SIZE) : true;
      })
      .test(
        "fileFormat",
        "Only JPG, JPEG, and PNG formats are accepted.",
        (value) => {
          return !isEdit && value ? (value[0] instanceof File && SUPPORTED_FORMATS.includes(value[0].type)) : true;
        }
      ),
  });
