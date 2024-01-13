import * as Yup from 'yup';


export const IndividualTourPackageSchema = Yup.object().shape({
    t: Yup.array().of(
        Yup.object().shape({
          
            customerId: Yup.string().required('Mütləqdir!'),
            tourId: Yup.string().required('Mütləqdir!'),
            transferId: Yup.string().required('Mütləqdir!'),
            diningId: Yup.string().required('Mütləqdir!'),
            supplierId: Yup.string().required('Mütləqdir!'),
            personalId: Yup.string().required('Mütləqdir!'),
            paymentId: Yup.string().required('Mütləqdir!'),
            youngerCount: Yup.number().min(1, 'Minimum 1 nəfər seçilməlidir').required('Mütləqdir!'),
            childrenCount: Yup.number().required('Mütləqdir!'),
            departureDate: Yup.string().required('Mütləqdir!'),
            arrivalDate: Yup.string().required('Mütləqdir!'),
            departureTime: Yup.string().required('Mütləqdir!'),
            arrivalTime: Yup.string().required('Mütləqdir!'),
            hotelName: Yup.string().required('Mütləqdir!'),
            roomName: Yup.string().required('Mütləqdir!'),
            reservationNumber: Yup.string().required('Mütləqdir!'),
            purchasePrice: Yup.string().required('Mütləqdir!'),
            sellingPrice: Yup.string().required('Mütləqdir!'),
            discount: Yup.string().required('Mütləqdir!'),
            deadline: Yup.string().required('Mütləqdir!'),
            paidAmount: Yup.string().required('Mütləqdir!'),
            note: Yup.string().required('Mütləqdir!'),
            explanation: Yup.string().required('Mütləqdir!'),

        })
    )
});
