export interface IIndividualTour {
    customerId: string ,
    tourId: string ,
    transferId: string ,
    diningId: string ,
    supplierId: string ,
    personalId: string ,
    paymentId: string ,
    youngerCount: number,
    childrenCount: number,
    departureDate: Date,
    departureTime: string ,
    arrivalDate: Date,
    arrivalTime: string ,
    hotelName: string ,
    roomName: string ,
    reservationNumber: string ,
    purchasePrice: number,
    sellingPrice: number,
    discount: number,
    commonPrice: number,
    paidAmount: number,
    explanation: string ,
    note: string ,
    deadline: Date,
    isInsured: boolean,
    isCustomerPaid: boolean,
    isSupplierPaid: boolean,
    date: Date | null
}

export interface IStore {
    customers: Array<object>;
    suppliers: Array<object>;
    payments: Array<object>;
    serviceManagers: Array<object>;
    personals: Array<object>;
}