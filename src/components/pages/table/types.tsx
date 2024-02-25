import { GridColDef } from "@mui/x-data-grid";

export interface ITableObject {
  columns: GridColDef[];
  api: string;
  onCreateClick?: () => void;
  hidePrint?: boolean;
  hideFilter?: boolean;
  hideCreate?: boolean;
  hideEdit?: boolean;
  hideDelete?: boolean;
  hideReport?: boolean;
  deleteApi?: string;
  root: string;
  buttonText?: string;
  exportLink?: string;
  detailLink?: string;
  defaultFilterValue?: string;
  filterOptions?: {
    label: string;
    value: string;
  }[];
}
