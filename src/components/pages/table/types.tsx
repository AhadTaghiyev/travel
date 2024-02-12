import { GridColDef } from "@mui/x-data-grid";

export interface ITableObject {
  columns: GridColDef[];
  api: string;
  onCreateClick?: () => void;
  showPrint?: boolean;
  deleteApi?: string;
  root: string;
  buttonText?: string;
  exportLink?: string;
  hasEditBtn?: boolean;
  hasDeleteBtn?: boolean;
  detailLink?: string;
  current?: string;
}
