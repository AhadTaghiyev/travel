import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  { field: "No", headerName: "No", flex: 1, headerClassName: "header-item" },
  {
    field: "invoiceNo",
    headerName: "Məhsul nömrəsi",
    flex: 1,
    headerClassName: "header-item",
    renderCell: (params) => {
      return params.row.invoiceNo || params.row.advancePaymentNo;
    },
  },
  {
    field: "amount",
    headerName: "Ödənilən məbləğ",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "paidToCustomer",
    headerName: "Qaytarılan məbləğ",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "forfeit",
    headerName: "Cərimə",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "payment",
    headerName: "Ödəniş",
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
