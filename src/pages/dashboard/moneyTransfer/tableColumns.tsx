import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  { field: "No", headerName: "No", flex: 1, headerClassName: "header-item" },
  {
    field: "fromPayment",
    headerName: "Haradan",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "ref",
    headerName: "Ref",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "toPayment",
    headerName: "Haraya",
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
    field: "date",
    headerName: "Date",
    flex: 1,
    headerClassName: "header-item",
  },
];
