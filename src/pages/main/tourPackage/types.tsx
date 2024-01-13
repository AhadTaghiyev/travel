export interface ITourPackage {
    customerId: string | null;
    tourId: string | null;
    transferId: string | null;
    diningId: string | null;
    supplierId: string | null;
    personalId: string | null;
    paymentId: string | null;
    youngerCount: number;
    childrenCount: number;
    departureDateTime: Date;
    arrivalDateTime: Date;
    hotelName: string;
    roomName: string;
    reservationNumber: string | null;
    purchasePrice: number;
    sellingPrice: number;
    discount: number;
    commonPrice: number;
    paidAmount: number;
    explanation: string;
    note: string;
    deadline: Date;
    isInsured: boolean;
    isCustomerPaid: boolean;
    isSupplierPaid: boolean;
    referanceNo?:number;
    supplierName?:string;
    customerName?:string;
    customerPhone?:string;
    customerEmail?:string;
    date: Date;

}

export interface IStore {
    customers: Array<object>;
    suppliers: Array<object>;
    payments: Array<object>;
    tours: Array<object>;
    transfers: Array<object>;
    dinings: Array<object>;
    personals: Array<object>;
}
export interface modalOptionType {
    field: string;
    component: React.ReactNode;
    apiService: ()=>void;
}
