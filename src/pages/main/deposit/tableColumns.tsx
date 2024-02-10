import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  { field: "No", headerName: "No", flex: 1, headerClassName: "header-item" },
  {
    field: "invoiceNo",
    headerName: "Invoice Number",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "paidAmount",
    headerName: "Ödənilən məbləğ",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "payment",
    headerName: "Ödənişlər",
    flex: 1,
    headerClassName: "header-item",
  },
];
