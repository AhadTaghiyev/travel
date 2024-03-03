import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  { field: "No", headerName: "No", flex: 1, headerClassName: "header-item" },

  {
    field: "name",
    headerName: "Type",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "amount",
    headerName: "Amount",
    flex: 1,
    headerClassName: "header-item",
  },
];
