import * as Yup from 'yup';


export const OtherServiceSchema = Yup.object().shape({

            customerId: Yup.string().required('Mütləqdir!'),
            supplierId: Yup.string().required('Mütləqdir!'),
            personalId: Yup.string().required('Mütləqdir!'),
            serviceManagerId: Yup.string().required('Mütləqdir!'),
            passengerCount: Yup.number().min(1, 'Minimum 1 nəfər seçilməlidir').required('Mütləqdir!'),
            reservationNo: Yup.string().required('Mütləqdir!'),
            purchasePrice: Yup.string().required('Mütləqdir!'),
            sellingPrice: Yup.string().required('Mütləqdir!'),
            discount: Yup.string().required('Mütləqdir!'),
            deadline: Yup.string().required('Mütləqdir!'),
            paidAmount: Yup.string(),
            note: Yup.string(),
            explanation: Yup.string(),

});


export const OtherServiceListSchema = Yup.object().shape({
    ot: Yup.array().of(
        Yup.object().shape({
          
            customerId: Yup.string().required('Mütləqdir!'),
            supplierId: Yup.string().required('Mütləqdir!'),
            personalId: Yup.string().required('Mütləqdir!'),
            serviceManagerId: Yup.string().required('Mütləqdir!'),
            passengerCount: Yup.number().min(1, 'Minimum 1 nəfər seçilməlidir').required('Mütləqdir!'),
            reservationNo: Yup.string().required('Mütləqdir!'),
            purchasePrice: Yup.string().required('Mütləqdir!'),
            sellingPrice: Yup.string().required('Mütləqdir!'),
            discount: Yup.string().required('Mütləqdir!'),
            deadline: Yup.string().required('Mütləqdir!'),
            flightDate: Yup.string().required('Mütləqdir!'),
            paidAmount: Yup.string(),
            note: Yup.string(),
            explanation: Yup.string(),

        })
    )
});