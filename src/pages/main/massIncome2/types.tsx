export interface IMassIncomeModel {
    planeTicketId? : string,
    cooperativeTicketId? : string,
    individualTourId? : string,
    tourPackageId? : string,
    otherServiceTicketId? :string,
    debt : number,
    paidAmount : number,
    restOfAmount : number,
    description : string,
    paymentId:number
}