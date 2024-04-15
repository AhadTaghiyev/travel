import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  { field: "No", headerName: "No", flex: 1, headerClassName: "header-item" },
  {
    field: "date",
    headerName: "date",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "customerName",
    headerName: "Customer",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "ref",
    headerName: "Receipt Number",
    flex: 1,
    headerClassName: "header-item",
  },
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
    field: "balance",
    headerName: "Balance",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "payment",
    headerName: "Ödənişlər",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "description",
    headerName: "Description",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "personal",
    headerName: "Personal",
    flex: 1,
    headerClassName: "header-item",
  },
];
