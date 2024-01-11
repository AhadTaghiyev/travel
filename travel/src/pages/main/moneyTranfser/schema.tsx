import * as Yup from "yup";

export const MoneyTransferSchema = Yup.object().shape({
    date: Yup.string().required("Mütləqdir!"),
    fromPaymentId: Yup.string().required("Mütləqdir!"),
    toPaymentId: Yup.string().required("Mütləqdir!"),
    amount: Yup.number().min(1),
    note: Yup.string(),
});
