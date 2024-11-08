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
    field: "debit",
    headerName: "Debit",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "credit",
    headerName: "Credit",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "balance",
    headerName: "Balans",
    flex: 1,
    headerClassName: "header-item",
  },
];
