export interface IReportModel{
    headers : IReportTableHeader[];
    api: string;
    service : string;
}

export interface IReportTableHeader {
    fieldName: string,
    propertyName : string,
 
}
