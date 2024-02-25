import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  { field: "No", headerName: "No", flex: 1, headerClassName: "header-item" },
  {
    field: "name",
    headerName: "Ad",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "count",
    headerName: "Count", // Hola
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "debit",
    headerName: "Debit", // Hola
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "credit",
    headerName: "Credit", // Hola
    flex: 1,
    headerClassName: "header-item",
  },
];
