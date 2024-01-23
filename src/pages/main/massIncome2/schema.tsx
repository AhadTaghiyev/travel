import * as Yup from 'yup';


export const MassIncomeSchema =  Yup.object().shape({
    debt : Yup.string().required('Mütləqdir!'),
    paidAmount : Yup.string().required('Mütləqdir!'),
    restOfAmount : Yup.string().required('Mütləqdir!'),
    description : Yup.string().required('Mütləqdir!')
})