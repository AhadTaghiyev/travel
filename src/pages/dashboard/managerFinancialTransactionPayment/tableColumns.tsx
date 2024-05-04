import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  { field: "No", headerName: "No", flex: 1, headerClassName: "header-item" },
  {
    field: "ref",
    headerName: "Ref.",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "amount",
    headerName: "commonPrice",
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
    headerName: "Status",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "note",
    headerName: "Qeyd",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "date",
    headerName: "date",
    flex: 1,
    headerClassName: "header-item",
  },
];
