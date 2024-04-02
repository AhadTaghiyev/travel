import * as Yup from "yup";

export const Schema = Yup.object().shape({
    name: Yup.string().required("Mütləqdir!"),
    phone: Yup.string(),
    city: Yup.string(),
    email: Yup.string(),
});
