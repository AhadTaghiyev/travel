import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  { field: "No", headerName: "No", flex: 1, headerClassName: "header-item" },

  {
    field: "fullName",
    headerName: "Ad",
    flex: 1,
    headerClassName: "header-item",
  },
];
