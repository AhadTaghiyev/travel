import * as Yup from 'yup';


export const WillbePaidSchema =  Yup.object().shape({

    date: Yup.string().required('Mütləqdir!'),
    amount: Yup.string().required('Mütləqdir!'),
    fullname: Yup.string().required('Mütləqdir!'),
    note: Yup.string().required('Mütləqdir!'),
    paymentId: Yup.string().required('Mütləqdir!'),
})