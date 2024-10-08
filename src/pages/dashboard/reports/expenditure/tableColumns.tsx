import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  { field: "No", headerName: "No", flex: 1, headerClassName: "header-item" },
  {
    field: "ref",
    headerName: "Ref",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "name",
    headerName: "Ad",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "count",
    headerName: "Count",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "debit",
    headerName: "balance",
    flex: 1,
    headerClassName: "header-item",
  },
  // {
  //   field: "credit",
  //   headerName: "Credit",
  //   flex: 1,
  //   headerClassName: "header-item",
  // },
];
