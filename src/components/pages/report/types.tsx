export interface IReportModel {
  headers: IReportTableHeader[];
  api: string;
}

export interface IReportTableHeader {
  fieldName: string;
  propertyName: string;
}
