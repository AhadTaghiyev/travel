import { GridColDef } from "@mui/x-data-grid";

export interface ITableObject {
  columns: GridColDef[];
  api: string;
  showPrint?: boolean;
  deleteApi?: string;
  root: string;
  buttonText?: string;
  exportLink?: string;
  deleteBtn?: boolean;
  detailLink?: string;
  current?: string;
}
