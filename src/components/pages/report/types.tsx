export interface IReportModel {
  headers: IReportTableHeader[];
  api: string;
}

export interface IReportTableHeader {
  fieldName: string;
  propertyName: string;
}

export interface ICurrency {
  name: string;
  value: number;
}
