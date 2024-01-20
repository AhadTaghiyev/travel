import * as Yup from "yup";

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
  referenceNo: Yup.number().required("Referans nömrəsi daxil edilməlidir"),
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
    tourPackages: Yup.array().of(TourPackageSchema),
  });
