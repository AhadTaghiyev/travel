import * as Yup from "yup";

export const Schema = Yup.object().shape({
    fullName:  Yup.string().required("Mütləqdir!"),
    email:  Yup.string(),
    phoneNumber:  Yup.string(),
    position:  Yup.string(),
    salary: Yup.number().min(1),
});
