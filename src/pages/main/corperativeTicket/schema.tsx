import * as Yup from "yup";

const CorperativeTicketSchema = Yup.object().shape({
  ticketNo: Yup.string().required("Bilet nömrəsi daxil edilməlidir"),
  passengerName: Yup.string().required("Sərnişin adı daxil edilməlidir"),
  purchasePrice: Yup.number().required("Alış qiyməti daxil edilməlidir"),
  sellingPrice: Yup.number().required("Satış qiyməti daxil edilməlidir"),
  discount: Yup.number().required("Endirim daxil edilməlidir"),
  commonPrice: Yup.number().required("Ümumi qiymət daxil edilməlidir"),
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
    paidAmount: Yup.number().when("isCustomerPaid", ([isCustomerPaid], sch) => {
      return isCustomerPaid && !isEdit
        ? sch.required("Məbləğ daxil edilməlidir")
        : sch.notRequired();
    }),
    planeTickets: Yup.array().of(CorperativeTicketSchema),
  });
