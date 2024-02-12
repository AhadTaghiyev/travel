import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  { field: "No", headerName: "No", flex: 1, headerClassName: "header-item" },
  {
    field: "from",
    headerName: "Haradan",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "amount",
    headerName: "Məbləğ", // Hola
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
