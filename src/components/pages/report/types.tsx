export interface IReportModel {
  headers: IReportTableHeader[];
  api: string;
  title?: string;
  showCreateButton?: boolean;
  isTime?: boolean;
}

export interface IReportTableHeader {
  fieldName: string;
  propertyName: string;
}

export interface ICurrency {
  name: string;
  value: number;
}
