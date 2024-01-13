import * as Yup from "yup";

export const Schema = Yup.object().shape({
    customerId: Yup.string().required("Mütləqdir!"),
    date: Yup.string().required("Mütləqdir!"),
    paidAmount: Yup.number().min(1),
    note: Yup.string(),

});
