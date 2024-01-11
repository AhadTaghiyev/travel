import * as Yup from "yup";

export const SupplierDebtSchema = Yup.object().shape({
    date: Yup.string().required("Mütləqdir!"),
    paymentId: Yup.string().required("Mütləqdir!"),
    amount: Yup.number().min(1),
    note: Yup.string(),
    supplierId:Yup.string().required("Mütləqdir!"),
    isFromSupplier: Yup.boolean(),
});
