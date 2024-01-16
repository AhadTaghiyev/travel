import * as Yup from 'yup';

export const PlaneTicketsCreateSchema = Yup.object().shape({
    tickets: Yup.array().of(
        Yup.object().shape({
            ticketNo: Yup.string()
            .min(2, 'Ən azı 2 hərf olmalıdı!')
            .max(20, 'Maksimum 20 hərf ola bilər!')
            .required('Mütləqdir!'),
            passengerName: Yup.string()
            .min(2, 'Ən azı 2 hərf olmalıdı!')
            .max(20, 'Maksimum 20 hərf ola bilər!')
            .required('Mütləqdir!'),
            segmentCount: Yup.string().required('Mütləqdir!'),
            purchasePrice: Yup.string().required('Mütləqdir!'),
            sellingPrice: Yup.string().required('Mütləqdir!'),
            flightDate: Yup.string().required('Mütləqdir!'),
            deadline: Yup.string().required('Mütləqdir!'),
            direction: Yup.string().required('Mütləqdir!'),
            discount: Yup.string().required('Mütləqdir!'),
            commonPrice: Yup.string().required('Mütləqdir!'),
            // paidAmount: Yup.string().required('Mütləqdir!'),
            customerId: Yup.string().required('Mütləqdir!'),
            supplierId: Yup.string().required('Mütləqdir!'),
            personalId: Yup.string().required('Mütləqdir!'),
            airWayId: Yup.string().required('Mütləqdir!'),
        })
    )
});

export const PlaneTicketUpdateSchema =  Yup.object().shape({
    ticketNo: Yup.string()
    .min(2, 'Ən azı 2 hərf olmalıdı!')
    .max(20, 'Maksimum 20 hərf ola bilər!')
    .required('Mütləqdir!'),
    passengerName: Yup.string()
    .min(2, 'Ən azı 2 hərf olmalıdı!')
    .max(20, 'Maksimum 20 hərf ola bilər!')
    .required('Mütləqdir!'),
    segmentCount: Yup.string().required('Mütləqdir!'),
    purchasePrice: Yup.string().required('Mütləqdir!'),
    sellingPrice: Yup.string().required('Mütləqdir!'),
    flightDate: Yup.string().required('Mütləqdir!'),
    deadline: Yup.string().required('Mütləqdir!'),
    direction: Yup.string().required('Mütləqdir!'),
    discount: Yup.string().required('Mütləqdir!'),
    commonPrice: Yup.string().required('Mütləqdir!'),
    // paidAmount: Yup.string().required('Mütləqdir!'),
    customerId: Yup.string().required('Mütləqdir!'),
    supplierId: Yup.string().required('Mütləqdir!'),
    personalId: Yup.string().required('Mütləqdir!'),
    airWayId: Yup.string().required('Mütləqdir!'),
})