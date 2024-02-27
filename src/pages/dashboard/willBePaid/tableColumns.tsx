import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  { field: "No", headerName: "No", flex: 1, headerClassName: "header-item" },

  {
    field: "id",
    headerName: "Qəbz Nömrəsi",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "name",
    headerName: "Ödənilən Təşkilat",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "ref",
    headerName: "Ref.",
    flex: 1,
    headerClassName: "header-item",
  },

  {
    field: "date",
    headerName: "Tarix",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "credit",
    headerName: "Borc",
    flex: 1,
    headerClassName: "header-item",
  },

  {
    field: "debit",
    headerName: "Ödəilən məbləğ",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "balance",
    headerName: "Ümumi məbləğ",
    flex: 1,
    headerClassName: "header-item",
  },
];
