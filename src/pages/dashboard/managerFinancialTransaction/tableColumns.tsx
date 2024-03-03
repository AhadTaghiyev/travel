import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  { field: "No", headerName: "No", flex: 1, headerClassName: "header-item" },

  {
    field: "amount",
    headerName: "Amount",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "payment",
    headerName: "Payment",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "status",
    headerName: "Payment",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "note",
    headerName: "Note",
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
