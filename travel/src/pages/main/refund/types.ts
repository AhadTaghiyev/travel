export interface RefundType {
    planeTicketId: string | null;
    cooperativeTicketId: string | null;
    individualTourId: string | null;
    tourPackageId: string | null;
    otherServiceTicketId: string | null;
    depositId: string | null;
    amount: number;
    paidToCustomer: number;
    forfeit: number;
}

export interface IStore {
    planeTickets: Array<object>;
    cooperativeTickets: Array<object>;
    individualTours: Array<object>;
    tourPackages: Array<object>;
    otherServiceTickets: Array<object>;
    deposits: Array<object>;
}

export interface Option {
    id: number;
    text: string;
    name: string;
    stateName: string;
    propToShow: string;
    getData: () => void;
}
