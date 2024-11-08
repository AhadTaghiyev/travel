import { GridColDef } from "@mui/x-data-grid";

export interface ITableObject {
  columns: GridColDef[];
  api: string;
  onCreateClick?: () => void;
  hidePrint?: boolean;
  hideFilter?: boolean;
  hideStartDate?: boolean;
  hideCreate?: boolean;
  hideEdit?: boolean;
  hideDelete?: boolean;
  hideReport?: boolean;
  hideStatus?: boolean;
  hideReceipt?: boolean;
  hideOperations?: boolean;
  deleteApi?: string;
  statusApi?: string;
  showOverflow?: boolean;
  addDateToReport?: boolean;
  root: string;
  buttonText?: string;
  exportLink?: string;
  detailLink?: string;
  defaultFilterValue?: string;
  filterOptions?: {
    label: string;
    value: string;
  }[];
  totalProps?: string[];
}
