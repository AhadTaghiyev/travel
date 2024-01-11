import * as Yup from "yup";

export const PaidCreditSchema = Yup.object().shape({
    date: Yup.string().required("Mütləqdir!"),
    paymentId: Yup.string().required("Mütləqdir!"),
    source: Yup.string().required("Mütləqdir!"),
    amount: Yup.number().min(1),
    note: Yup.string(),
    percentAmount: Yup.number().min(1)
});
