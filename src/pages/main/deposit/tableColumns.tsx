import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  { field: "No", headerName: "No", flex: 1, headerClassName: "header-item" },
  {
    field: "customer",
    headerName: "Customer",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "amount",
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
  {
    field: "date",
    headerName: "Date",
    flex: 1,
    headerClassName: "header-item",
  },
];
