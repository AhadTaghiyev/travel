import * as Yup from "yup";

const FILE_SIZE = 1024 * 1024; // 1MB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

const TourPackageSchema = Yup.object().shape({
  otelName: Yup.string().required("Otel adı daxil edilməlidir"),
  roomName: Yup.string().required("Otaq adı daxil edilməlidir"),
  rezervationNumber: Yup.string().required(
    "Rezervasiya nömrəsi daxil edilməlidir"
  ),
  childrenCount: Yup.number().required("Uşaq sayı daxil edilməlidir"),
  adultCount: Yup.number().required("Böyük sayı daxil edilməlidir"),
  dateOfDeparture: Yup.date().required(),
  returnDate: Yup.date().required(),
  insurance: Yup.boolean().required("Sığorta seçilməlidir"),
  supplierId: Yup.string().required("Tədarikçi seçilməlidir"),
  personalId: Yup.string().required("Şəxsiyyət seçilməlidir"),
  tourId: Yup.number().required("Tur seçilməlidir"),
  transferId: Yup.number().required("Transfer seçilməlidir"),
  diningId: Yup.number().required("Yemək seçilməlidir"),
  purchasePrice: Yup.number().required("Alış qiyməti daxil edilməlidir"),
  sellingPrice: Yup.number().required("Satış qiyməti daxil edilməlidir"),
  discount: Yup.number().required("Endirim daxil edilməlidir"),
  commonPrice: Yup.number().required("Ümumi qiymət daxil edilməlidir"),
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
    paidAmount: Yup.number().when("isCustomerPaid", ([isCustomerPaid], sch) => {
      return isCustomerPaid && !isEdit
        ? sch.required("Məbləğ daxil edilməlidir")
        : sch.notRequired();
    }),
    individualTourPackages: Yup.array().of(TourPackageSchema),

    receiptImage: Yup.mixed()
      .nullable()
      .test("fileSize", "The file size must not exceed 1MB.", (value) => {
        return !isEdit && value ? (value[0] instanceof File && value[0].size <= FILE_SIZE) : true;
      })
      .test(
        "fileFormat",
        "Only JPG, JPEG, and PNG formats are accepted.",
        (value) => {
          // Ensure that value is a file before checking properties
          return !isEdit && value ? (value[0] instanceof File && SUPPORTED_FORMATS.includes(value[0].type)) : true;
        }
      ),
  });
