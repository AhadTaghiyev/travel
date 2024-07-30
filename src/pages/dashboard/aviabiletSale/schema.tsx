import * as Yup from "yup";

export const PlaneTicketSchema = Yup.object().shape({
  ticketNo: Yup.string().required("Bilet nömrəsi daxil edilməlidir"),
  passengerName: Yup.string().required("Sərnişin adı daxil edilməlidir"),
  segmentCount: Yup.number()
    .required("Segment sayı daxil edilməlidir")
    .min(0, "Segment sayı mənfi ola bilməz"),
  purchasePrice: Yup.number()
    .required("Alış qiyməti daxil edilməlidir")
    .min(0, "Alış qiyməti mənfi ola bilməz"),
  sellingPrice: Yup.number()
    .required("Satış qiyməti daxil edilməlidir")
    .min(0, "Satış qiyməti mənfi ola bilməz"),
  discount: Yup.number()
    .required("Endirim daxil edilməlidir")
    .min(0, "Endirim mənfi ola bilməz"),
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
      .when(['isCustomerPaid', 'isSupplierPaid'], ([isCustomerPaid,isSupplierPaid], sch) => {
        return (isCustomerPaid||isSupplierPaid) && !isEdit
          ? sch.required("Məbləğ daxil edilməlidir")
          : sch.notRequired();
      })
      .min(0, "Məbləğ mənfi ola bilməz"),
    planeTickets: Yup.array().of(PlaneTicketSchema),
  });
