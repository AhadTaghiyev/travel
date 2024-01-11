import * as Yup from "yup";

export const GetCreditSchema = Yup.object().shape({
    date: Yup.string().required("Mütləqdir!"),
    paymentId: Yup.string().required("Mütləqdir!"),
    source: Yup.string().required("Mütləqdir!"),
    amount: Yup.number().min(1),
    note: Yup.string(),
});
