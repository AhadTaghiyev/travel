export interface IOtherService {
    customerId: string|null;
    serviceManagerId: string|null;
    supplierId: string|null;
    personalId: string|null;
    paymentId: string|null;
    serviceName: string;
    passengerCount: number;
    purchasePrice: number;
    sellingPrice: number;
    discount: number;
    paidAmount: number;
    explanation: string;
    reservationNo: string;
    note: string;
    deadline: Date;
    flightDate: Date;
    isCustomerPaid: boolean;
    isSupplierPaid: boolean;
}

export interface IStore {
    customers: Array<object>;
    suppliers: Array<object>;
    payments: Array<object>;
    serviceManagers: Array<object>;
    personals: Array<object>;
}

