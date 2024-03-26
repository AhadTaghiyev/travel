import { GridColDef } from "@mui/x-data-grid";

export const supplierColumns: GridColDef[] = [
  { field: "No", headerName: "No", flex: 1, headerClassName: "header-item" },

  {
    field: "name",
    headerName: "Ad",
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
export const refundColumns: GridColDef[] = [
  { field: "No", headerName: "No", flex: 1, headerClassName: "header-item" },
  {
    field: "customer",
    headerName: "Customer",
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
    field: "refundRef",
    headerName: "Refund Ref.", // Hola
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "refundableAmount",
    headerName: "Məbləğ",
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
export const salaryColumns: GridColDef[] = [
  { field: "No", headerName: "No", flex: 1, headerClassName: "header-item" },
  {
    field: "employee",
    headerName: "İşçi", // Hola
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
    field: "amount",
    headerName: "Məbləğ",
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
export const creditColumns: GridColDef[] = [
  { field: "No", headerName: "No", flex: 1, headerClassName: "header-item" },
  {
    field: "name",
    headerName: "Ad",
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
    field: "debit",
    headerName: "Debit",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "totalDebt",
    headerName: "Total Debt",
    flex: 1,
    headerClassName: "header-item",
  },
];
export const expenditureColumns: GridColDef[] = [
  { field: "No", headerName: "No", flex: 1, headerClassName: "header-item" },
  {
    field: "name",
    headerName: "Ad",
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
    field: "debit",
    headerName: "Debit",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "count",
    headerName: "Count",
    flex: 1,
    headerClassName: "header-item",
  },
];

export const advanceCollectsColumns: GridColDef[] = [
  { field: "No", headerName: "No", flex: 1, headerClassName: "header-item" },
  {
    field: "amount",
    headerName: "Məbləğ",
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
    headerName: "Date",
    flex: 1,
    headerClassName: "header-item",
  },
];
export const othersColumns: GridColDef[] = [
  { field: "No", headerName: "No", flex: 1, headerClassName: "header-item" },
  {
    field: "ref",
    headerName: "Ref.",
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
    field: "amount",
    headerName: "Məbləğ",
    flex: 1,
    headerClassName: "header-item",
  },
  {
    field: "description",
    headerName: "Description",
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
