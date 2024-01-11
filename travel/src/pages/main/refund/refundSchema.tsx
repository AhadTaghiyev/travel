import * as Yup from 'yup';

export const RefundSchema = Yup.object().shape({
  planeTicketId: Yup.string().nullable(),
  cooperativeTicketId: Yup.string().nullable(),
  individualTourId: Yup.string().nullable(),
  tourPackageId: Yup.string().nullable(),
  otherServiceTicketId: Yup.string().nullable(),
  depositId: Yup.string().nullable(),
  amount: Yup.number(),
  paidToCustomer: Yup.number(),
  forfeit: Yup.number(),
});