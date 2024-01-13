import * as Yup from 'yup';


export const AgreementSchema =  Yup.object().shape({
    airwayId: Yup.string().required('Mütləqdir!'),
    transferId: Yup.string().required('Mütləqdir!'),
    date: Yup.string().required('Mütləqdir!'),
    hotelName: Yup.string().required('Mütləqdir!'),
    roomType: Yup.string().required('Mütləqdir!'),
    isInsured: Yup.string().required('Mütləqdir!')
})