import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  { field: "No", headerName: "No", flex: 1, headerClassName: "header-item" },

  {
    field: "debt",
    headerName: "Ümumi məbləğ",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "paidAmount",
    headerName: "Ödəilən məbləğ",
    flex: 1,
    headerClassName: "header-item",
  },
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
    field: "date",
    headerName: "Tarix",
    flex: 1,
    headerClassName: "header-item",
  },
];
